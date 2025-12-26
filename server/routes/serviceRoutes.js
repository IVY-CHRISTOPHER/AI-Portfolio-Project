const express = require('express')
const Service = require('../models/Service')

const router = express.Router()

router.get('/services', async (_req, res) => {
  const services = await Service.find().sort({ createdAt: -1 })
  res.json(services)
})

router.post('/services', async (req, res) => {
  const service = await Service.create(req.body)
  res.status(201).json(service)
})

router.patch('/services/:id', async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(service)
})

router.delete('/services/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = router
