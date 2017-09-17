import Transaction from "../models/transactionModel";
import User from "../models/userModel";

export default {
  getAllTransactions: (req, res, next) => {
    Transaction.find()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 500, message: err.message });
      });
  },
  addNewTransaction: (req, res, next) => {
    const { uid } = req.body;
    User.findById(uid).then(({ name, surname, phoneNumber }) =>
      Transaction({
        ...req.body,
        name,
        surname,
        phoneNumber
      })
        .save()
        .then(() => Transaction.find({}))
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          next({ status: 500, message: err.message });
        })
    );
  },
  getTransactioById: (req, res, next) => {
    const { id } = req.params;
    Transaction.findOne({ _id: id })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  changeTransactionInfo: (req, res, next) => {
    const { id } = req.params;
    if (req.body.uid) {
      User.findOne({ _id: req.body.uid }).then(({ name, surname, phoneNumber }) =>
        Transaction
          .findOneAndUpdate({ _id: id }, { ...req.body, name, surname, phoneNumber })
          .then(response => { res.send(response) })
          .catch(err => {
            next({ status: 403, message: err.message });
          })
      )
    } else {
      Transaction.findOneAndUpdate({ _id: id }, req.body)
        .then(response => { res.send(response) })
        .catch(err => {
          next({ status: 403, message: err.message });
        });
    }
  },
  deleteTransaction: (req, res, next) => {
    const { id } = req.params;
    Transaction.findByIdAndRemove(id)
      .then(() => Transaction.find({}))
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  },
  getUserTransaction: (req, res, next) => {
    const { userId } = req.params;
    Transaction.find({ uid: userId })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
