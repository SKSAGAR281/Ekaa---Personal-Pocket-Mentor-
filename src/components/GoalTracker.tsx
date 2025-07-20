import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, Award, CheckCircle, Clock, Edit, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  streak: number;
  isCompleted: boolean;
  createdDate: string;
}

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedToday: boolean;
  completedDates: string[];
}

export function GoalTracker() {
  const [activeTab, setActiveTab] = useState<'goals' | 'habits'>('goals');
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showNewHabit, setShowNewHabit] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Speak English Daily',
      description: 'Practice speaking English for at least 10 minutes every day',
      category: 'Language',
      targetValue: 30,
      currentValue: 7,
      unit: 'days',
      deadline: '2024-04-15',
      streak: 7,
      isCompleted: false,
      createdDate: '2024-03-15'
    },
    {
      id: '2',
      title: 'Save ₹50 Daily',
      description: 'Build an emergency fund by saving ₹50 every day',
      category: 'Finance',
      targetValue: 1500,
      currentValue: 350,
      unit: '₹',
      deadline: '2024-04-30',
      streak: 7,
      isCompleted: false,
      createdDate: '2024-03-15'
    }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: '5 minutes of mindfulness to start the day',
      category: 'Wellness',
      frequency: 'daily',
      streak: 12,
      completedToday: true,
      completedDates: ['2024-03-15', '2024-03-14', '2024-03-13']
    },
    {
      id: '2',
      title: 'Read Financial News',
      description: 'Stay updated with financial literacy content',
      category: 'Learning',
      frequency: 'daily',
      streak: 5,
      completedToday: false,
      completedDates: ['2024-03-14', '2024-03-13', '2024-03-12']
    },
    {
      id: '3',
      title: 'Family Budget Review',
      description: 'Review and update family expenses',
      category: 'Finance',
      frequency: 'weekly',
      streak: 3,
      completedToday: false,
      completedDates: ['2024-03-10', '2024-03-03', '2024-02-25']
    }
  ]);

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
          }
        : habit
    ));
  };

  const updateGoalProgress = (goalId: string, increment: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            currentValue: Math.min(goal.targetValue, Math.max(0, goal.currentValue + increment)),
            isCompleted: (goal.currentValue + increment) >= goal.targetValue
          }
        : goal
    ));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-green-600';
    if (streak >= 7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const categories = ['All', 'Language', 'Finance', 'Wellness', 'Learning', 'Career', 'Health'];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🎯 Goal Tracker & Habit Builder</h1>
          <p className="text-lg text-gray-600">
            Set personal goals, build positive habits, and track your progress
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'goals'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Goals
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'habits'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Habits
          </button>
        </div>

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Goals</h2>
              <button
                onClick={() => setShowNewGoal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Goal</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{goal.title}</h3>
                      <p className="text-gray-600 text-sm">{goal.description}</p>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                      {goal.category}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          goal.isCompleted ? 'bg-green-500' : 'bg-purple-600'
                        }`}
                        style={{ width: `${getProgressPercentage(goal.currentValue, goal.targetValue)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Due: {goal.deadline}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStreakColor(goal.streak)}`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{goal.streak} day streak</span>
                      </div>
                    </div>
                  </div>

                  {goal.isCompleted ? (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Goal Completed! 🎉</span>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateGoalProgress(goal.id, -1)}
                        className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => updateGoalProgress(goal.id, 1)}
                        className="flex-1 py-2 px-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        +1
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Daily Habits</h2>
              <button
                onClick={() => setShowNewHabit(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Habit</span>
              </button>
            </div>

            <div className="space-y-4">
              {habits.map((habit) => (
                <div key={habit.id} className="bg-white rounded-xl shadow-lg p-6 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleHabitCompletion(habit.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          habit.completedToday
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {habit.completedToday && <CheckCircle className="w-5 h-5" />}
                      </button>
                      <div>
                        <h3 className="font-semibold text-gray-900">{habit.title}</h3>
                        <p className="text-gray-600 text-sm">{habit.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getStreakColor(habit.streak)}`}>
                          {habit.streak}
                        </div>
                        <div className="text-xs text-gray-500">streak</div>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {habit.frequency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Overview */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <h3 className="text-xl font-bold mb-4">This Week's Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm opacity-90">Goals Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Habits Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm opacity-90">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Motivational Reminders */}
        <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-yellow-600" />
            <h3 className="text-lg font-bold text-gray-900">Gentle Reminders</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">💪 Stay Consistent</h4>
              <p className="text-gray-600 text-sm">Small daily actions lead to big results. You're doing great!</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🎯 Focus on Progress</h4>
              <p className="text-gray-600 text-sm">Every step forward counts, no matter how small.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}