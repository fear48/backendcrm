const User = require("../models/userModel");
const History = require("../models/historyModel");
const Events = require("../models/eventModel");

module.exports = {
  getAllUsers: (req, res) => {
    User.find().then(response => {
      res.send(response);
    });
  },
  getUserInfo: (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  changeUserInfo: (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  getUsersComments: (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .then(response => {
        res.send(response.comments);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  addCommentToUser: (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, {
      $push: { comments: req.body }
    }).then(response => {
      res.status(404).send(response);
    });
  },
  deleteCommentById: (req, res) => {
    const { id, commentId } = req.params;
    User.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  getUserHistory: (req, res) => {
    const { id } = req.params;
    History.find({ uid: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  getUserEvents: (req, res) => {
    const { id } = req.params;
    Event.find({ uid: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
