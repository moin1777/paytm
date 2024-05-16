const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {User} = require("../db");
const {JWT_SECRET} = require("../config");
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
})
module.exports = router;