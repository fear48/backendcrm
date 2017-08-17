import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";

import config from "./config/config";
import passportConfig from "./config/passport";
import usersRouter from "./routers/users";
import historyRouter from "./routers/history";
import roomsRouter from "./routers/rooms";
import eventsRouter from "./routers/events";
import passportRouter from "./routers/passport";
import logsRouter from "./routers/logs";
import transactionRouter from "./routers/transactions";
import tasksRouter from "./routers/tasks";
import errorHandler from "./middlewares/errorHandler";

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PASSPORT //
app.use(passport.initialize({}));
passportConfig(passport);

// LOGGING//
// app.use(savingLogs);  may be

// ROUTES //
app.use("/api", passportRouter);
// app.use(passport.authenticate("jwt", { session: false })); // cheak if unauthorized
app.use("/api/users", usersRouter);
app.use("/api/history", historyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/logs", logsRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/tasks", tasksRouter);

// ERRORS
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
}); // Error 404
app.use(errorHandler); // Always last (error handler)

// STARTING SERVER //
const port = process.env.port || 3001;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Server started on port ${port}`);
});
