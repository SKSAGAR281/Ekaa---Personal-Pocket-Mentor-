import React from 'react';
import { Trophy, Target, Calendar, TrendingUp, Award, Flame, BookOpen, Users, Star, Gift } from 'lucide-react';

export function Dashboard() {
  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: Star, earned: true },
    { id: 2, name: 'Consistent Learner', description: 'Complete 7 days in a row', icon: Flame, earned: true },
    { id: 3, name: 'Community Helper', description: 'Help 5 community members', icon: Users, earned: false },
    { id: 4, name: 'Goal Achiever', description: 'Complete your first goal', icon: Target, earned: false },
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 3, target: 3 },
    { day: 'Tue', completed: 2, target: 3 },
    { day: 'Wed', completed: 3, target: 3 },
    { day: 'Thu', completed: 1, target: 3 },
    { day: 'Fri', completed: 0, target: 3 },
    { day: 'Sat', completed: 0, target: 3 },
    { day: 'Sun', completed: 0, target: 3 },
  ];

  const stats = {
    totalLessons: 9,
    currentStreak: 4,
    totalPoints: 450,
    badgesEarned: 2,
    goalsCompleted: 1,
    communityHelps: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Learning Journey</h1>
          <p className="text-gray-600">Track your progress and celebrate your achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{stats.totalLessons}</span>
            </div>
            <p className="text-sm text-gray-600">Lessons Completed</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{stats.currentStreak}</span>
            </div>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{stats.totalPoints}</span>
            </div>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.badgesEarned}</span>
            </div>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-600">{stats.goalsCompleted}</span>
            </div>
            <p className="text-sm text-gray-600">Goals Achieved</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-pink-600" />
              <span className="text-2xl font-bold text-pink-600">{stats.communityHelps}</span>
            </div>
            <p className="text-sm text-gray-600">Community Helps</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Weekly Progress</h2>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.completed / day.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{day.completed}/{day.target}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-800">This Week's Goal</span>
                <span className="text-sm text-purple-600">9/21 lessons</span>
              </div>
              <div className="mt-2 bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="text-green-600">
                        <Award className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Next Milestone</h3>
                  <p className="text-sm opacity-90">Complete 10 more lessons to unlock "Learning Champion"</p>
                </div>
                <Gift className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <BookOpen className="w-4 h-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Completed "Building Self-Confidence"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Achieved goal "Daily English Practice"</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Helped a community member with financial planning</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}