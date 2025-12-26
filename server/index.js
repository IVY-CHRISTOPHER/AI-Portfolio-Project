require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDb } = require('./config/db')
const projectRoutes = require('./routes/projectRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express() // Express API for projects/services/contact

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => res.json({ status: 'ok' })) // simple liveness check
app.use('/api/projects', projectRoutes) // CRUD for projects
app.use('/api/services', serviceRoutes) // CRUD for services
app.use('/api/contact', contactRoutes) // email-sending endpoint

const port = process.env.PORT || 3000

connectDb() // connect to MongoDB before starting server
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port:${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
