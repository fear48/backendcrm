const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const config = require("./config/config");
const usersRouter = require("./routers/users");
const historyRouter = require("./routers/history");
const roomsRouter = require("./routers/rooms");
const eventsRouter = require("./routers/events");
const passportRouter = require("./routers/passport");
const logsRouter = require("./routers/logs");

// INITIALIZE APP //
const app = express();

// CONNECTING TO DB //
mongoose.Promise = global.Promise;
mongoose
  .connect(config.database, { useMongoClient: true })
  .then(() => {
    console.log("Connecten successfully");
  })
  .catch(err => {
    throw new Error(err);
  });

// MIDDLEWARES //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PASSPORT //
app.use(passport.initialize());
require("./config/passport")(passport);

// ROUTES //
app.use("/api", passportRouter);
app.use("/api/users", usersRouter);
app.use("/api/history", historyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/logs", logsRouter);

// STARTING SERVER //
const port = process.env.port || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Server started on port ${port}`);
});
