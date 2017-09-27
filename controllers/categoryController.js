import Category from '../models/categoryModel'

export default {
  addCategory(req, res, next) {
    Category(req.body)
      .save()
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })

  },
  deleteCategory(req, res, next) {
    const { id } = req.params;
    Category
      .findOneAndRemove({ _id: id })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next({ status: 403, message: err.message })
      })
  }
}