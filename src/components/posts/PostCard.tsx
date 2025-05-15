import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
    coverImage: string;
    category: string;
    createdAt: string;
    author: {
      username: string;
      profilePicture?: string;
    };
    likes: string[];
    comments: any[];
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {post.coverImage && (
        <Link to={`/post/${post._id}`} className="block">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      )}

      <div className="p-5">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>

        <Link to={`/post/${post._id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4">
          {truncateContent(post.content, 120)}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            <span>{post.author.username}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart size={16} className="mr-1 text-red-500" />
              <span className="text-sm text-gray-600">
                {post.likes.length}
              </span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1 text-blue-500" />
              <span className="text-sm text-gray-600">
                {post.comments.length}
              </span>
            </div>
          </div>
          <Link
            to={`/post/${post._id}`}
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;