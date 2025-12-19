const { Schema, model } = require('mongoose')

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = model('Service', serviceSchema)
