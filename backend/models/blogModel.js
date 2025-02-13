// const mongoose = require('mongoose');
import mongoose from 'mongoose';

export const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  category: String,
  tags: [String],
  content: String,
  summary: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: String,
      comment: String,
      date: Date
    }
  ]
});

export default mongoose.model('Blog', blogSchema);
