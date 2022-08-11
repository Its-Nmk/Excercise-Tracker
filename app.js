const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

require("dotenv").config();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4000;

// * Connecting to database
require("./utility/databaseConnection");

const usersRouter = require("./routes/usersRouter");
const exerciseRouter = require("./routes/exerciseRouter");

// Routing
app.use("/users", usersRouter);
app.use("/exercises", exerciseRouter);

app.get("/", (req, res) => {
  res.send("Application Home");
});

// app.use(connection);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
