import express from 'express'
import categoryController from '../controllers/categoryController'

const router = express.Router();

router.post('/', categoryController.addCategory)
router.delete('/:id', categoryController.deleteCategory)

export default router;