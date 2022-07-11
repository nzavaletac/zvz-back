require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./database");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const messageRouter = require("./routes/message.routes");

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "It´s working!" });
});

app.use("/messages", messageRouter);
app.use("/admin", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
