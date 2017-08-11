const History = require("../models/historyModel");

module.exports = {
  getAllHistory: (req, res) => {
    History.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  addNewHistory: (req, res) => {
    History(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => res.status(500).send(err));
  },
  getHistoryById: (req, res) => {
    const { id } = req.params;
    History.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  changeHistoryInfo: (req, res) => {
    const { id } = req.params;
    History.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteHistory: (req, res) => {
    const { id } = req.params;
    History.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
