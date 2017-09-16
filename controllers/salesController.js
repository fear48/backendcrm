import Sale from '../models/salesModel';
import Room from '../models/roomModel';

export default {
  getAllSales: (req, res, next) => {
    Sale.find({}).then(response => {
      res.send(response)
    }).catch(err => {
      next({ status: 403, message: err.message })
    })
  },
  addNewSale: (req, res, next) => {
    const { roomId } = req.body;
    Room.findOne({ _id: roomId }).then(({ roomName }) => {

      Sale({ ...req.body, roomName }).save().then(response => {
        res.send(response)
      })

    }).catch(err => {
      next({ status: 403, message: err.message })
    })
  },
  changeSaleInfo: (req, res, next) => {
    const { id } = req.params;
    Sale.findByIdAndUpdate(id, req.body)
      .then(response => {
        res.send(response)
      }).catch(err => {
        next({ status: 403, message: err.message })
      })
  },
  deleteSale: (req, res, next) => {
    const { id } = req.params;
    Sale.findByIdAndRemove(id)
      .then(() => Sale.find({}))
      .then(response => {
        res.send(response)
      }).catch(err => {
        next({ status: 403, message: err.message })
      })
  }
}