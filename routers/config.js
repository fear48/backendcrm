import express from 'express'

import config, { changeConfig } from '../config/config';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(config.values)
})
router.post('/:field', (req, res, next) => {
  const { params: { field }, body: { value } } = req;

  try {
    changeConfig(field, value)
    res.send({ success: true })
  } catch (err) {
    next({ status: 403, message: err.message })
  }

})

export default router