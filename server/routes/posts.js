import express from 'express';
import Post from '../models/Post.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await Post.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture bio')
      .populate('comments.user', 'username profilePicture');
      
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, tags, coverImage } = req.body;
    
    const newPost = new Post({
      title,
      content,
      author: req.userId,
      category,
      tags: tags || [],
      coverImage
    });
    
    await newPost.save();
    
    const populatedPost = await Post.findById(newPost._id)
      .populate('author', 'username profilePicture');
    
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, category, tags, coverImage } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        tags,
        coverImage
      },
      { new: true }
    ).populate('author', 'username profilePicture');
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.unshift({
      user: req.userId,
      text
    });
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('comments.user', 'username profilePicture');
    
    res.json(updatedPost.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like/unlike post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if already liked
    if (post.likes.includes(req.userId)) {
      // Unlike
      post.likes = post.likes.filter(
        like => like.toString() !== req.userId
      );
    } else {
      // Like
      post.likes.unshift(req.userId);
    }
    
    await post.save();
    
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;