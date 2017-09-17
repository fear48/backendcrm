import Task from "../models/taskModel";
import User from "../models/userModel";

export default {
  getAllTasks: (req, res, next) => {
    Task.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  addNewTask: (req, res, next) => {
    const { uid } = req.body;
    User.findById(uid).then(({ name, surname }) =>
      Task({
        ...req.body,
        name,
        surname
      })
        .save()
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          next({ status: 500, message: err.message });
        })
    );
  },
  getTask: (req, res, next) => {
    const { id } = req.params;
    Task.findOne({ _id: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeTaskInfo: (req, res, next) => {
    const { id } = req.params;
    Task.findByIdAndUpdate(id, req.body)
      .then(response => Task.find({}))
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteTask: (req, res, next) => {
    const { id } = req.params;
    Task.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
