import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, MessageCircle, Calendar, User, Share2, Edit, Trash2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && user) {
      setIsLiked(post.likes.includes(user.id));
    }
  }, [post, user]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!comment.trim()) return;
    
    try {
      setIsSubmitting(true);
      await axios.post(
        `http://localhost:5000/api/posts/${id}/comment`,
        { text: comment },
        { withCredentials: true }
      );
      
      setComment('');
      fetchPost();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}/like`,
        {},
        { withCredentials: true }
      );
      
      fetchPost();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        { withCredentials: true }
      );
      
      navigate('/');
    } catch (err: any) {
      console.error(err);
    }
  };

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
        <p className="text-red-500 mb-6">{error || 'Post not found'}</p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const isAuthor = user && post.author._id === user.id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                <span>{formattedDate(post.createdAt)}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center mb-8">
              <img
                src={post.author.profilePicture || "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600"}
                alt={post.author.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900">{post.author.username}</p>
                <p className="text-sm text-gray-500">
                  {post.author.bio || "Writer at BlogHub"}
                </p>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center ${
                    isLiked ? 'text-red-500' : 'text-gray-500'
                  } hover:text-red-500`}
                >
                  <Heart size={20} className="mr-1" fill={isLiked ? "currentColor" : "none"} />
                  <span>{post.likes.length}</span>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:text-blue-500"
                  onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <MessageCircle size={20} className="mr-1" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-green-500">
                  <Share2 size={20} className="mr-1" />
                  <span>Share</span>
                </button>
              </div>

              {isAuthor && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit/${post._id}`}
                    className="p-2 text-gray-500 hover:text-blue-500"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="comments-section" className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({post.comments.length})</h2>

        <div className="mb-8">
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={user ? "Add a comment..." : "Login to comment..."}
                disabled={!user}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              ></textarea>
            </div>
            <div className="flex justify-end">
              {user ? (
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Login to Comment
                </Link>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {post.comments.length > 0 ? (
            post.comments.map((comment: any, index: number) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start">
                  <img
                    src={comment.user.profilePicture || "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={comment.user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{comment.user.username}</h4>
                      <span className="text-sm text-gray-500">
                        {formattedDate(comment.date)}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Post</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PostDetailPage;