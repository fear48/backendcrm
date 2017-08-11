const Room = require("../models/roomModel");

module.exports = {
  getAllRooms: (req, res) => {
    Room.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  addNewRoom: (req, res) => {
    Room(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getRoom: (req, res) => {
    const { id } = req.params;
    Room.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  changeRoomInfo: (req, res) => {
    const { id } = req.params;
    Room.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteRoom: (req, res) => {
    const { id } = req.params;
    Room.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
