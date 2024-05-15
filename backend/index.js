const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/index")

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log("The port is listening on http://localhost:3000");
})