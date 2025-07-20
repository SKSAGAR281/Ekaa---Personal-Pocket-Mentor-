import React, { useState } from 'react';
import { Briefcase, Play, Star, MapPin, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  earning_potential: string;
  tools_needed: string[];
  market_demand: 'High' | 'Medium' | 'Low';
  completed_lessons: number;
}

interface LocalBusiness {
  id: string;
  name: string;
  skill: string;
  location: string;
  rating: number;
  reviews: number;
  contact: string;
  description: string;
}

export function SkillPathways() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'skills' | 'marketplace'>('skills');

  const categories = ['All', 'Cooking', 'Beauty & Care', 'Crafts', 'Digital Services', 'Teaching', 'Home Services'];

  const skills: Skill[] = [
    {
      id: '1',
      title: 'Home Cooking & Catering',
      description: 'Learn to cook traditional and modern dishes for catering services',
      category: 'Cooking',
      difficulty: 'Beginner',
      duration: '4 weeks',
      lessons: 12,
      earning_potential: '₹15,000-30,000/month',
      tools_needed: ['Basic kitchen equipment', 'Quality ingredients', 'Food containers'],
      market_demand: 'High',
      completed_lessons: 3
    },
    {
      id: '2',
      title: 'Mehendi & Henna Art',
      description: 'Master intricate henna designs for weddings and festivals',
      category: 'Beauty & Care',
      difficulty: 'Intermediate',
      duration: '3 weeks',
      lessons: 10,
      earning_potential: '₹500-2,000/event',
      tools_needed: ['Henna cones', 'Design templates', 'Practice sheets'],
      market_demand: 'High',
      completed_lessons: 0
    },
    {
      id: '3',
      title: 'Embroidery & Tailoring',
      description: 'Create beautiful embroidered garments and alterations',
      category: 'Crafts',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      lessons: 18,
      earning_potential: '₹10,000-25,000/month',
      tools_needed: ['Sewing machine', 'Threads', 'Fabrics', 'Needles'],
      market_demand: 'Medium',
      completed_lessons: 0
    },
    {
      id: '4',
      title: 'Social Media Management',
      description: 'Help local businesses grow their online presence',
      category: 'Digital Services',
      difficulty: 'Beginner',
      duration: '3 weeks',
      lessons: 9,
      earning_potential: '₹8,000-20,000/month',
      tools_needed: ['Smartphone', 'Internet connection', 'Design apps'],
      market_demand: 'High',
      completed_lessons: 0
    },
    {
      id: '5',
      title: 'Home Tutoring',
      description: 'Teach children in your neighborhood various subjects',
      category: 'Teaching',
      difficulty: 'Beginner',
      duration: '2 weeks',
      lessons: 8,
      earning_potential: '₹200-500/hour',
      tools_needed: ['Teaching materials', 'Books', 'Whiteboard'],
      market_demand: 'High',
      completed_lessons: 0
    },
    {
      id: '6',
      title: 'House Cleaning Services',
      description: 'Professional cleaning techniques for homes and offices',
      category: 'Home Services',
      difficulty: 'Beginner',
      duration: '1 week',
      lessons: 5,
      earning_potential: '₹300-800/house',
      tools_needed: ['Cleaning supplies', 'Equipment', 'Uniform'],
      market_demand: 'Medium',
      completed_lessons: 0
    }
  ];

  const localBusinesses: LocalBusiness[] = [
    {
      id: '1',
      name: 'Priya\'s Kitchen',
      skill: 'Home Cooking',
      location: 'Indore, MP',
      rating: 4.8,
      reviews: 127,
      contact: '+91 98765 43210',
      description: 'Specializes in traditional Maharashtrian and North Indian cuisine for events'
    },
    {
      id: '2',
      name: 'Meera Mehendi Art',
      skill: 'Mehendi',
      location: 'Pune, MH',
      rating: 4.9,
      reviews: 89,
      contact: '+91 87654 32109',
      description: 'Bridal mehendi specialist with 5+ years experience'
    },
    {
      id: '3',
      name: 'Sunita\'s Stitching',
      skill: 'Tailoring',
      location: 'Delhi, DL',
      rating: 4.7,
      reviews: 156,
      contact: '+91 76543 21098',
      description: 'Custom clothing and alterations with quick turnaround'
    },
    {
      id: '4',
      name: 'Digital Didi',
      skill: 'Social Media',
      location: 'Bangalore, KA',
      rating: 4.6,
      reviews: 43,
      contact: '+91 65432 10987',
      description: 'Helping small businesses grow online presence'
    }
  ];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">💼 Skill-to-Income Pathways</h1>
          <p className="text-lg text-gray-600">
            Learn marketable skills and connect with local opportunities
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Learn Skills
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'marketplace'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Local Marketplace
          </button>
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
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

            {/* Skills Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <div key={skill.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-purple-600 font-medium">{skill.category}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
                        {skill.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{skill.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{skill.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lessons:</span>
                        <span className="font-medium">{skill.lessons} modules</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Earning Potential:</span>
                        <span className="font-medium text-green-600">{skill.earning_potential}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Market Demand:</span>
                        <span className={`font-medium ${getDemandColor(skill.market_demand)}`}>
                          {skill.market_demand}
                        </span>
                      </div>
                    </div>

                    {skill.completed_lessons > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{skill.completed_lessons}/{skill.lessons}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(skill.completed_lessons / skill.lessons) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tools Needed:</h4>
                      <div className="flex flex-wrap gap-1">
                        {skill.tools_needed.map((tool, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      <Play className="w-4 h-4" />
                      <span>{skill.completed_lessons > 0 ? 'Continue Learning' : 'Start Learning'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Local Business Directory</h2>
              <p className="text-gray-600">Connect with skilled professionals in your area</p>
            </div>

            <div className="space-y-6">
              {localBusinesses.map((business) => (
                <div key={business.id} className="bg-white rounded-xl shadow-lg p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{business.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{business.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{business.skill}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{business.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">{business.reviews} reviews</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{business.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Contact: {business.contact}
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Your Business */}
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Your Business?</h3>
                <p className="text-gray-600 mb-4">
                  Complete skill courses and get listed in our local marketplace
                </p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  List Your Services
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <h3 className="text-xl font-bold mb-4">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Sunita from Delhi</h4>
                  <p className="text-sm opacity-90">Tailoring Business</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                "Started with Ekaa's tailoring course. Now I earn ₹20,000/month from home!"
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Priya from Mumbai</h4>
                  <p className="text-sm opacity-90">Catering Service</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                "My cooking skills turned into a thriving catering business serving 50+ events monthly."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}