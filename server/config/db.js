import mongoose from 'mongoose';
import { connect } from 'mongoose';
const db = "PersonalDB";

connect(`mongodb://127.0.0.1:27017/${db}`)
    .then(() => console.log(`Connected to MongoDB database: ${db}`))
    .catch((err) => console.error('Failed to connect to MongoDB', err)
  );
