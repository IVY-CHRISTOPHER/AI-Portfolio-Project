const mongoose = require('mongoose')

const connectDb = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = { connectDb }
