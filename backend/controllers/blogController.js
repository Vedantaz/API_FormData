// const Blog = require('../models/blogModel');
import {blogSchema} from '../models/blogModel.js';

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogSchema.find();
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Create a new blog
export const createBlogs = async (req, res) => {
  const { title, author, date, category, tags, content, summary } = req.body;
  try {
    const newBlog = new blogSchema({ title, author, date, category, tags, content, summary });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// module.exports = {createBlogs, getBlogs};   // commojs modules ,you should onky use ES Module syntax