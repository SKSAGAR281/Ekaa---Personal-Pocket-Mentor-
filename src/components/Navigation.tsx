import React from 'react';
import { User, BookOpen, Users, Mic, Trophy, Home, Zap, Target, Volume2, Briefcase, Shield, Download } from 'lucide-react';
import type { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'microlearning' as Page, label: 'Daily Learn', icon: Zap },
    { id: 'lessons' as Page, label: 'Lessons', icon: BookOpen },
    { id: 'goals' as Page, label: 'Goals', icon: Target },
    { id: 'roleplay' as Page, label: 'Practice', icon: Users },
    { id: 'journal' as Page, label: 'Journal', icon: Mic },
    { id: 'voice' as Page, label: 'Voice Help', icon: Volume2 },
    { id: 'skills' as Page, label: 'Skills', icon: Briefcase },
    { id: 'community' as Page, label: 'Community', icon: Users },
    { id: 'safety' as Page, label: 'Safety', icon: Shield },
    { id: 'offline' as Page, label: 'Offline', icon: Download },
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-green-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
              Ekaa
            </span>
          </div>
          
          <div className="hidden lg:flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    currentPage === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:hidden">
            <select
              value={currentPage}
              onChange={(e) => onNavigate(e.target.value as Page)}
              className="px-3 py-2 rounded-lg border border-purple-200 bg-white text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}