const express = require('express')
const Project = require('../models/Project')

const router = express.Router()

router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

router.post('/', async (req, res) => {
  const project = await Project.create(req.body)
  res.status(201).json(project)
})

router.patch('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(project)
})

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = router
