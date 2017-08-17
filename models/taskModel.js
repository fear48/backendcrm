import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskModel = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  title: { type: String, required: true },
  task: { type: String, required: true },
  endDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), required: true },
  completed: { type: Boolean, default: false, required: true }
});

const Task = mongoose.model("Task", TaskModel, "tasks");
export default Task;
