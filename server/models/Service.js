import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default model('Service', serviceSchema);
