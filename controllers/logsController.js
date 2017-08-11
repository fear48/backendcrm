const Log = require("../models/logModel");

module.exports = {
  getAllLogs: (req, res) => {
    Log.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  addNewLog: (req, res) => {
    Log(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getLogById: (req, res) => {
    const { id } = req.params;
    Log.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  changeLogInfo: (req, res) => {
    const { id } = req.params;
    Log.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteLog: (req, res) => {
    const { id } = req.params;
    Log.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  getUserLogs: (req, res) => {
    const { userId } = req.params;
    Log.find({ uid: userId })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
