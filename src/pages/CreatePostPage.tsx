import React from 'react';
import PostForm from '../components/posts/PostForm';
import { motion } from 'framer-motion';

const CreatePostPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600 mb-8">Share your thoughts, ideas, or stories with our community</p>
        <PostForm />
      </div>
    </motion.div>
  );
};

export default CreatePostPage;