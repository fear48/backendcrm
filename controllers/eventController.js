import Event from "../models/eventModel";

export default {
  getAllEvents: (req, res, next) => {
    Event.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  addNewEvent: (req, res, next) => {
    Event(req.body)
      .save()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  getEventById: (req, res, next) => {
    const { id } = req.params;
    Event.findOne(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteEventById: (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeEventInfo: (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
