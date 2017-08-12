const Log = require("../models/logModel");

module.exports = {
  getAllLogs: (req, res, next) => {
    Log.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  addNewLog: (req, res, next) => {
    Log(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  getLogById: (req, res, next) => {
    const { id } = req.params;
    Log.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeLogInfo: (req, res, next) => {
    const { id } = req.params;
    Log.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteLog: (req, res, next) => {
    const { id } = req.params;
    Log.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  getUserLogs: (req, res, next) => {
    const { userId } = req.params;
    Log.find({ uid: userId })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
