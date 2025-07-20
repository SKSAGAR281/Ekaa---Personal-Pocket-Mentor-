import React, { useState } from 'react';
import { Play, Pause, CheckCircle, Clock, Star, Award, Volume2, FileText, Video } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface MicroLesson {
  id: string;
  title: string;
  category: string;
  type: 'audio' | 'video' | 'text';
  duration: string;
  content: string;
  badge?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
}

export function MicroLearning() {
  const { user, updateUserProgress } = useUser();
  const [playingLesson, setPlayingLesson] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Today');
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  const categories = ['Today', 'Self-Confidence', 'Financial Literacy', 'Safety Tips', 'Parenting', 'Digital Skills'];

  const todayLessons: MicroLesson[] = [
    {
      id: 'daily-1',
      title: 'Morning Confidence Boost',
      category: 'Self-Confidence',
      type: 'audio',
      duration: '1:00',
      content: 'Start your day with positive affirmations and breathing exercises to build inner strength.',
      badge: 'Confidence Builder',
      difficulty: 'Beginner',
      points: 10
    },
    {
      id: 'daily-2',
      title: 'Smart Spending Tip',
      category: 'Financial Literacy',
      type: 'text',
      duration: '0:45',
      content: 'Learn the 50-30-20 rule: 50% needs, 30% wants, 20% savings. Track your expenses for one week.',
      badge: 'Money Saver',
      difficulty: 'Beginner',
      points: 15
    },
    {
      id: 'daily-3',
      title: 'Online Safety Check',
      category: 'Safety Tips',
      type: 'video',
      duration: '1:15',
      content: 'Quick guide to recognizing phishing emails and protecting your personal information online.',
      badge: 'Safety Guardian',
      difficulty: 'Intermediate',
      points: 20
    }
  ];

  const allLessons: MicroLesson[] = [
    ...todayLessons,
    {
      id: 'conf-1',
      title: 'Speaking Up in Meetings',
      category: 'Self-Confidence',
      type: 'audio',
      duration: '1:30',
      content: 'Practical tips for contributing meaningfully to workplace discussions.',
      badge: 'Voice of Confidence',
      difficulty: 'Intermediate',
      points: 25
    },
    {
      id: 'fin-1',
      title: 'Emergency Fund Basics',
      category: 'Financial Literacy',
      type: 'video',
      duration: '1:20',
      content: 'Why you need an emergency fund and how to start building one with small amounts.',
      badge: 'Financial Planner',
      difficulty: 'Beginner',
      points: 20
    },
    {
      id: 'safety-1',
      title: 'Home Security Checklist',
      category: 'Safety Tips',
      type: 'text',
      duration: '0:50',
      content: 'Simple steps to make your home safer: door locks, lighting, and emergency contacts.',
      badge: 'Home Guardian',
      difficulty: 'Beginner',
      points: 15
    },
    {
      id: 'parent-1',
      title: 'Positive Discipline Techniques',
      category: 'Parenting',
      type: 'audio',
      duration: '1:40',
      content: 'Gentle but effective ways to guide children\'s behavior without harsh punishment.',
      badge: 'Mindful Parent',
      difficulty: 'Intermediate',
      points: 30
    },
    {
      id: 'digital-1',
      title: 'Creating Strong Passwords',
      category: 'Digital Skills',
      type: 'video',
      duration: '1:10',
      content: 'Learn to create memorable yet secure passwords and use password managers safely.',
      badge: 'Digital Defender',
      difficulty: 'Beginner',
      points: 15
    }
  ];

  const filteredLessons = selectedCategory === 'Today' 
    ? todayLessons 
    : allLessons.filter(lesson => lesson.category === selectedCategory);

  const handlePlayPause = (lessonId: string) => {
    if (playingLesson === lessonId) {
      setPlayingLesson(null);
    } else {
      setPlayingLesson(lessonId);
      // Simulate lesson completion
      setTimeout(() => {
        setPlayingLesson(null);
        if (!completedToday.includes(lessonId)) {
          setCompletedToday([...completedToday, lessonId]);
          updateUserProgress(lessonId, 'lesson');
        }
      }, 2000);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return Volume2;
      case 'video': return Video;
      case 'text': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'text': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayPoints = completedToday.reduce((total, lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    return total + (lesson?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📚 Daily Micro-Learning</h1>
          <p className="text-lg text-gray-600">
            Quick 1-minute lessons to build confidence and life skills every day
          </p>
        </div>

        {/* Daily Progress */}
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Today's Progress</h3>
              <p className="opacity-90">
                {completedToday.length} lessons completed • {todayPoints} points earned
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{completedToday.length}/3</div>
              <div className="text-sm opacity-90">Daily Goal</div>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${Math.min((completedToday.length / 3) * 100, 100)}%` }}
            ></div>
          </div>
          {completedToday.length >= 3 && (
            <div className="mt-4 flex items-center space-x-2 text-yellow-300">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Daily Goal Achieved! 🎉</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        {/* Lessons Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => {
            const TypeIcon = getTypeIcon(lesson.type);
            const isCompleted = completedToday.includes(lesson.id);
            const isPlaying = playingLesson === lesson.id;

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
                  isCompleted ? 'ring-2 ring-green-200' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(lesson.type)}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-purple-600 font-medium">{lesson.category}</span>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{lesson.content}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{lesson.duration}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{lesson.points}</span>
                    </div>
                  </div>

                  {lesson.badge && (
                    <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800 font-medium">Badge: {lesson.badge}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handlePlayPause(lesson.id)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                      isPlaying
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Learning...</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Review</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Start Learning</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Challenge */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Challenge</h3>
              <p className="text-gray-600">Complete 15 micro-lessons this week</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="w-full bg-yellow-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((completedToday.length / 15) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700">{completedToday.length}/15</span>
          </div>
        </div>
      </div>
    </div>
  );
}