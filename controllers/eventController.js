const Event = require("../models/eventModel");

module.exports = {
  getAllEvents: (req, res) => {
    Event.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  addNewEvent: (req, res) => {
    Event(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getEventById: (req, res) => {
    const { id } = req.params;
    Event.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteEventById: (req, res) => {
    const { id } = req.params;
    Event.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  changeEventInfo: (req, res) => {
    const { id } = req.params;
    Event.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
