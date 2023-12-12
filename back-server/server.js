const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");
const commentRouter = require("./routes/comment");
const path = require("path");
const cors = require("cors");

  app.use(cors());
  app.use(express.json());
  app.set("port", process.env.PORT || 5555);
  app.use("/user", userRouter);
  app.use("/board", boardRouter);
  app.use("/comment", commentRouter);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "..", "front-web", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "front-web", "build", "index.html")
    );
  });
  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "port waiting...");
  });