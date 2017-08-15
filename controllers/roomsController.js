import Room from "../models/roomModel";

export default {
  getAllRooms: (req, res, next) => {
    Room.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  addNewRoom: (req, res, next) => {
    Room(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  getRoom: (req, res, next) => {
    const { id } = req.params;
    Room.findOne({ _id: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeRoomInfo: (req, res, next) => {
    const { id } = req.params;
    Room.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteRoom: (req, res, next) => {
    const { id } = req.params;
    Room.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
