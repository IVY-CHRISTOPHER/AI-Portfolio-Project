const mongoose = require('mongoose')

const connectDb = async () => {
  const uri = process.env.MONGODB_URI
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = { connectDb }
