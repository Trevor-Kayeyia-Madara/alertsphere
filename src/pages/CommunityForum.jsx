import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaComments, FaPlus } from 'react-icons/fa';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', anonymous: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'citizen') {
      navigate('/');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://alertsphere-data.onrender.com/api/community');
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: newPost.title,
      content: newPost.content,
      author_id: newPost.anonymous ? null : localStorage.getItem('userId'),
    };

    try {
      await axios.post('https://alertsphere-data.onrender.com/api/community/create', payload);
      setNewPost({ title: '', content: '', anonymous: false });
      fetchPosts();
    } catch (err) {
      console.error('Error posting:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 text-xl mr-3">
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <FaComments /> Community Forum
        </h2>
      </div>

      {/* Create New Post */}
      <form onSubmit={handlePostSubmit} className="bg-white shadow rounded-lg p-4 mb-6 space-y-4">
  <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
    <FaPlus /> Share an Update or Safety Tip
  </h3>
  <input
    type="text"
    placeholder="Title"
    value={newPost.title}
    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
    className="w-full border border-blue-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />
  <textarea
    placeholder="Write your message here..."
    value={newPost.content}
    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
    className="w-full border border-blue-300 rounded px-4 py-2 h-28 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />
  <label className="flex items-center space-x-2 text-sm text-gray-700">
    <input
      type="checkbox"
      checked={newPost.anonymous}
      onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked })}
      className="accent-blue-600"
    />
    <span>Post anonymously</span>
  </label>
  <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    {loading ? 'Posting...' : 'Post'}
  </button>
</form>


      {/* Posts List */}
      <div className="space-y-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-xl shadow border border-blue-100">
              <h4 className="text-lg font-bold text-blue-700 mb-1">{post.title}</h4>
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-3">
                {post.author_id ? 'Posted by a community member' : 'Posted anonymously'} on{' '}
                {new Date(post.date_time_created).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">
            No posts yet. Be the first to share a safety tip or concern.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;
