import React from 'react';
import { BookOpen, Users, Mic, Trophy, ArrowRight, Star, Zap, Target, Volume2, Briefcase, Shield, Download } from 'lucide-react';
import type { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Zap,
      title: 'Daily Micro-Learning',
      description: '1-minute life lessons with badges and progress tracking',
      page: 'microlearning' as Page,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Goal Tracker',
      description: 'Set personal goals with visual tracking and gentle reminders',
      page: 'goals' as Page,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Volume2,
      title: 'Voice Assistant',
      description: 'Get guidance in Hindi, Tamil, Marathi and other local languages',
      page: 'voice' as Page,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Briefcase,
      title: 'Skill-to-Income',
      description: 'Learn marketable skills and connect with local business opportunities',
      page: 'skills' as Page,
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Safety Toolkit',
      description: 'SOS button, emergency contacts, and essential safety tips',
      page: 'safety' as Page,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Download,
      title: 'Offline Learning',
      description: 'Download content packs for learning without internet',
      page: 'offline' as Page,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Your Personal
              <span className="block text-yellow-300">Pocket Mentor</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Empowering women, girls, and homemakers with confidence-building tools, local language support, and practical life skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('microlearning')}
                className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('community')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-700 transition-colors duration-200"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From daily micro-lessons to offline learning packs - your complete toolkit for personal and professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => onNavigate(feature.page)}
                  className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center mt-4 text-purple-600 group-hover:text-purple-700">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">100+</div>
              <div className="text-purple-200">Micro-Lessons</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">6</div>
              <div className="text-purple-200">Local Languages</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">50+</div>
              <div className="text-purple-200">Skill Pathways</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-200">Offline Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-6">
            "Ekaa's voice assistant in Hindi helped me understand banking better. Now I manage my family's budget confidently and even started a small catering business!"
          </blockquote>
          <div className="text-gray-600">
            <div className="font-semibold">Sunita M.</div>
            <div>Home-based Entrepreneur, Indore</div>
          </div>
        </div>
      </section>
    </div>
  );
}