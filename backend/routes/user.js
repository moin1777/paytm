const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {User, Account} = require("../db");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middlewares/middleware");
const router = express.Router();


const signupUserSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().max(20),
  lastName: zod.string().max(20),
  password: zod.string().min(6)
});
const signinUserSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6)
});
const updateBodySchema = zod.object({
  firstName: zod.string().max(20).optional(),
  lastName: zod.string().max(20).optional(),
  password: zod.string().min(6).optional()
});

router.post("/signup", async (req, res) => {
  const userData = req.body;
  const {success} = signupUserSchema.safeParse(userData);

  if (!success) {
    res.status(411).json({
      msg: "Invalid Inputs"
    });
    return;
  }

  const isUserExist = await User.findOne({
    username: userData.username
  });

  if (isUserExist) {
    res.status(411).json({
      msg: "Email already taken"
    });
    return;
  }

  const user = await User.create({
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password
  });

  await Account.create({
    userId: user._id,
    balance: 10_000
  });
  const userId = user._id;
  const token = jwt.sign({userId}, JWT_SECRET);

  res.json({
    msg: "User created successfully",
    jwt: token
  });
});

router.post("/signin", async (req, res) => {
  const userData = req.body;
  const {success} = signinUserSchema.safeParse(userData);

  if (!success) {
    res.status(411).json({
      msg: "Invalid Inputs"
    });
    return;
  }

  const user = await User.findOne({
    username: userData.username,
    password: userData.password
  });

  if (!user) {
    res.status(411).json({
      msg: "Error while logging in"
    });
    return;
  }

  const token = jwt.sign({
    userId: user._id
  }, JWT_SECRET);

  res.json({
    jwt: token
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const {success} = updateBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Error while updating information"
    });
  }

  await User.updateOne({_id: req.userId}, req.body);

  res.json({
    msg: "Updated successfully"
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const reqUser = await User.findOne({_id: req.userId});
  const filterUsers = await User.find({
    $or: [{
      firstName: {
        "$regex": filter
      }
    }, {
      lastName: {
        "$regex": filter
      }
    }]
  });

  const users = filterUsers.filter((user) => user.username.localeCompare(reqUser.username));
  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })
});

router.get("/userInfo", authMiddleware, async (req, res) => {
  const user = await User.findOne({_id: req.userId});
  const account = await Account.findOne({userId: req.userId});
  if (!user || !account) {
    return res.sendStatus(404);
  }
  let firstName = user.firstName;
  let balance = account.balance;
  res.json({
    firstName,
    balance
  });
});
module.exports = router;