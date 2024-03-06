const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter.js");
const {
  notFound,
  globalErrorhandler,
} = require("./middlewares/globalErrorHandler.js");
const categoryRouter = require("./routes/category/categoryRouter.js");
require("./config/database.js")();
const postRouter = require("./routes/post/postRouter.js");
const commentRouter = require("./routes/comments/commentRouter.js");

// server
const app = express();

// middlewares
app.use(express.json()); // pass the incoming datas

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

// Not found middleware
app.use(notFound);
// Error middleware
app.use(globalErrorhandler);

const server = http.createServer(app);
// Start  the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`server is running ${PORT}`));
