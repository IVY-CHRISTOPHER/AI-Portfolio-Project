const express = require('express')
const Project = require('../models/Project')

const router = express.Router()

router.get('/projects', async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

router.post('/projects', async (req, res) => {
  const project = await Project.create(req.body)
  res.status(201).json(project)
})

router.patch('/projects/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(project)
})

router.delete('/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = router
