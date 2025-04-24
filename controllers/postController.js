
const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.id });
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
  await post.deleteOne();
  res.json({ message: 'Deleted' });
};
