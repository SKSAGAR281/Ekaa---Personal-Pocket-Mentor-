import React, { useState } from 'react';
import { MessageCircle, Plus, Search, Users, TrendingUp, Smile, ThumbsUp, Sparkles, Heart, Share2 } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  category: string;
  title: string;
  content: string;
  reactions: {
    thumbsUp: number;
    heart: number;
    celebrate: number;
  };
  comments: number;
  userReaction: string | null;
  tags: string[];
  isLiked?: boolean;
  likes?: number;
}


export function Community() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Anonymous',
      avatar: 'A',
      timestamp: 'Just now',
      category: 'Getting Started',
      title: 'New to Ekaa - feeling excited!',
      content: 'Just joined this community and already feeling inspired by all the supportive messages. Looking forward to starting my learning journey with everyone here! 💪',
      reactions: { thumbsUp: 0, heart: 0, celebrate: 0 },
      comments: 0,
      userReaction: null,
      tags: ['welcome', 'newbie', 'excited'],
      isLiked: false,
      likes: 0
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Career Development', 'English Skills', 'Personal Growth', 'Financial Literacy', 'Health & Wellness'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addReaction = (postId: string, reactionType: 'thumbsUp' | 'heart' | 'celebrate') => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        reactions: {
          ...post.reactions,
          [reactionType]: post.userReaction === reactionType 
            ? post.reactions[reactionType] - 1 
            : post.reactions[reactionType] + 1
        },
        userReaction: post.userReaction === reactionType ? null : reactionType
      } : post
    ));
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        isLiked: !post.isLiked,
        likes: post.isLiked ? (post.likes || 0) - 1 : (post.likes || 0) + 1
      } : post
    ));
  };

  const reactionButtons = [
    { type: 'thumbsUp' as const, icon: ThumbsUp, label: 'Helpful', color: 'text-blue-600' },
    { type: 'heart' as const, icon: '❤️', label: 'Support', color: 'text-red-600' },
    { type: 'celebrate' as const, icon: Sparkles, label: 'Celebrate', color: 'text-yellow-600' }
  ];
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🤝 Teach Me Sister</h1>
          <p className="text-lg text-gray-600">
            A safe space for real-talk Q&A, peer support, and learning together
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowNewPost(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{post.author}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">{post.category}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Emoji Reactions */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 mb-4">
                    {reactionButtons.map((reaction) => {
                      const isActive = post.userReaction === reaction.type;
                      const count = post.reactions[reaction.type];
                      return (
                        <button
                          key={reaction.type}
                          onClick={() => addReaction(post.id, reaction.type)}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {typeof reaction.icon === 'string' ? (
                            <span className="text-sm">{reaction.icon}</span>
                          ) : (
                            <reaction.icon className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">{count}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          post.isLiked
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.likes || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sister Circle Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Sisters</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Posts Today</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Active Now</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['#confidence', '#english', '#safety', '#finance', '#goals'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-purple-600 font-medium">{topic}</span>
                    <span className="text-sm text-gray-500">New</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sister Circle Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Be respectful and supportive</li>
                <li>• Real talk, but always with kindness</li>
                <li>• Keep posts relevant to personal growth</li>
                <li>• Anonymous by default for safety</li>
                <li>• Use emoji reactions to reduce toxicity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="What would you like to share?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      rows={6}
                      placeholder="Share your experience, ask for advice, or celebrate your achievements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., confidence, milestone, help"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anonymous" className="rounded" />
                    <label htmlFor="anonymous" className="text-sm text-gray-700">Post anonymously</label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewPost(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}