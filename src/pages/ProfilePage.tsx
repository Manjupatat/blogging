import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Calendar, PenSquare } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import PostCard from '../components/posts/PostCard';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/posts?author=${user?.id}`,
        { withCredentials: true }
      );
      
      setPosts(response.data.posts);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch your posts');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">You need to be logged in</h2>
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-6 py-8 relative">
          <div className="absolute -top-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="mt-16 md:mt-0 md:ml-36">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.username}</h1>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Edit Profile
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>Joined April 2023</span>
              </div>
              <div className="flex items-center">
                <PenSquare size={18} className="mr-2" />
                <span>{posts.length} Posts</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700">
                {user.bio || "No bio yet. Tell us about yourself!"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Posts
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'liked'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Liked Posts
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Saved Posts
            </button>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchUserPosts}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : activeTab === 'posts' && posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">You haven't created any posts yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your thoughts with the community</p>
            <Link
              to="/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Your First Post
            </Link>
          </div>
        ) : activeTab === 'posts' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {activeTab === 'liked' ? 'Liked Posts' : 'Saved Posts'} will be available soon
            </h3>
            <p className="text-gray-600">This feature is coming in a future update</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;