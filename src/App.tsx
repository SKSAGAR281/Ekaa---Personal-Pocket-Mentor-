import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AudioLessons } from './components/AudioLessons';
import { RoleplaySimulations } from './components/RoleplaySimulations';
import { VoiceJournaling } from './components/VoiceJournaling';
import { Community } from './components/Community';
import { Dashboard } from './components/Dashboard';
import { MicroLearning } from './components/MicroLearning';
import { GoalTracker } from './components/GoalTracker';
import { VoiceAssistant } from './components/VoiceAssistant';
import { SkillPathways } from './components/SkillPathways';
import { SafetyToolkit } from './components/SafetyToolkit';
import { OfflinePacks } from './components/OfflinePacks';
import { UserProvider } from './context/UserContext';

export type Page = 'home' | 'lessons' | 'roleplay' | 'journal' | 'community' | 'dashboard' | 'microlearning' | 'goals' | 'voice' | 'skills' | 'safety' | 'offline';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'lessons':
        return <AudioLessons />;
      case 'roleplay':
        return <RoleplaySimulations />;
      case 'journal':
        return <VoiceJournaling />;
      case 'community':
        return <Community />;
      case 'dashboard':
        return <Dashboard />;
      case 'microlearning':
        return <MicroLearning />;
      case 'goals':
        return <GoalTracker />;
      case 'voice':
        return <VoiceAssistant />;
      case 'skills':
        return <SkillPathways />;
      case 'safety':
        return <SafetyToolkit />;
      case 'offline':
        return <OfflinePacks />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="pt-16">
          {renderPage()}
        </main>
      </div>
    </UserProvider>
  );
}

export default App;