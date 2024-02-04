const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter.js");
require("./config/database.js")();

// server
const app = express();
// middlewares
app.use(express.json()); // pass the incoming data

// Routes
app.use("/api/v1/users", usersRouter);

const server = http.createServer(app);
// Start  the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`server is running ${PORT}`));

