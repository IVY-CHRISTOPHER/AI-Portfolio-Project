const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

// SMTP configuration pulled from environment variables
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_RECIPIENT, MAIL_FROM } = process.env
const smtpPort = Number(SMTP_PORT) || 587
const recipient = CONTACT_RECIPIENT || SMTP_USER
const emailConfigured = SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS

// Create a transporter only when SMTP is fully configured
const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: smtpPort,
      secure: SMTP_SECURE === 'true' || smtpPort === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null

// POST /api/contact sends an email with the submitted form data
router.post('/', async (req, res) => {
  if (!transporter || !recipient) {
    return res.status(500).json({ error: 'Email is not configured on the server' })
  }

  const { name, email, message, topic } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      replyTo: email,
      to: recipient,
      subject: topic || 'Project inquiry',
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || 'Project inquiry'}\n\n${message}`,
    })
    res.json({ success: true })
  } catch (err) {
    console.error('Failed to send contact email', err)
    res.status(502).json({ error: 'Failed to send email' })
  }
})

module.exports = router
