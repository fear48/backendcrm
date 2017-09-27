import randomString from 'randomstring'
import Client from '../models/clientModel'


export default {
  getAllClients(req, res, next) {
    Client
      .find({}, { randomId: 0, _id: 0 })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  addClient(req, res, next) {
    Client(req.body)
      .save()
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  changeClient(req, res, next) {
    const { id } = req.params;
    Client
      .findOneAndUpdate({ phoneNumber: id }, { ...req.body })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  deleteClient(req, res, next) {
    const { id } = req.params
    Client
      .findOneAndRemove({ phoneNumber: id })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  addComment(req, res, next) {
    const { id } = req.params;
    const { text, uid, rating = [] } = req.body;
    const randomId = randomString.generate({
      length: 12,
      charset: 'alphabetic'
    })
    if (text && uid) {
      Client
        .findOneAndUpdate({ phoneNumber: id }, { $push: { comments: { text, uid, rating, randomId } } })
        .then(response => res.send(response))
        .catch(err => {
          next({ status: 403, message: err.message })
        })
    } else {
      next({ status: 403, message: 'Bad data provided' })
    }
  },
  deleteComment(req, res, next) {
    const { id, commentId } = req.params;
    Client
      .findOneAndUpdate({ phoneNumber: id }, { $pull: { comments: { randomId: commentId } } })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  rateComment(req, res, next) {
    const { id, commentId } = req.params;
    const { rate } = req.body;
    if (rate > 5 || rate < 0) return next({ status: 403, message: 'Bad data: rate' })
    Client
      .findOne({ phoneNumber: id })
      .then(({ comments }) => {
        const updatedComments = [];
        comments.forEach((item, index) => {
          if (item.randomId === commentId) {
            updatedComments.push(item)
            updatedComments[index].rating = rate
          } else {
            updatedComments.push(item)
          }
        });
        return Client.findOneAndUpdate({ phoneNumber: id }, { comments: updatedComments })
      }).then(response => {
        res.send(response)
      }).catch(err => next({ status: 403, message: err.message }))
  }
}