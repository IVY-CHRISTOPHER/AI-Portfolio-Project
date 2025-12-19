const { Schema, model } = require('mongoose')

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    timeline: { type: String, trim: true },
    description: { type: String, trim: true },
    outcome: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    link: { type: String, trim: true },
    photo: { type: String, trim: true }, // URL or base64 data URI
  },
  { timestamps: true }
)

module.exports = model('Project', projectSchema)
