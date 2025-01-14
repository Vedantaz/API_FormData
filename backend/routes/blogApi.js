const express = require('express');
const Post = require('./models/Post');
const router = express.Router();

router.post('/posts', async (req, res) => {
    try {
      const newPost = new Post(req.body);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  });

  router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });

module.exports = router;