const express = require("express");
const app = express();
const loginRouter = require("../routes/login.router");
const retrieveRouter = require("../routes/retrieve.router");
const writeFileEnvelopeInfoRouter = require("../routes/file-handler.router");
const getEnvelopesInfoRouter = require("../routes/readerHandler-router");
app.use(express.json()); //convert every request to a js object

app.use("/redirect", loginRouter);
app.use("/retrieve", retrieveRouter);
app.use("readerHandler", getEnvelopesInfoRouter)
app.use("file-handler", writeFileEnvelopeInfoRouter);

module.exports = app;
