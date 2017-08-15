import User from "../models/userModel";
import History from "../models/historyModel";
import Event from "../models/eventModel";

export default {
  getAllUsers: (req, res, next) => {
    User.find({}, { password: 0 })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  getUserInfo: (req, res, next) => {
    const { id } = req.params;
    User.findOne({ _id: id }, { password: 0 })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeUserInfo: (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteUser: (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  getUsersComments: (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
      .then(response => {
        res.send(response.comments);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  addCommentToUser: (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, {
      $push: { comments: req.body }
    })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  deleteCommentById: (req, res, next) => {
    const { id, commentId } = req.params;
    User.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  getUserHistory: (req, res, next) => {
    const { id } = req.params;
    History.find({ uid: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  getUserEvents: (req, res, next) => {
    const { id } = req.params;
    Event.find({ uid: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
