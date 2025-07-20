import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  completedLessons: string[];
  completedSimulations: string[];
  journalEntries: number;
  communityPosts: number;
  streakDays: number;
  joinDate: string;
}

interface UserContextType {
  user: UserData;
  updateUserProgress: (itemId: string, type: 'lesson' | 'simulation' | 'journal' | 'post') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>({
    completedLessons: [],
    completedSimulations: [],
    journalEntries: 0,
    communityPosts: 0,
    streakDays: 0,
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const updateUserProgress = (itemId: string, type: 'lesson' | 'simulation' | 'journal' | 'post') => {
    setUser(prev => {
      switch (type) {
        case 'lesson':
          if (!prev.completedLessons.includes(itemId)) {
            return {
              ...prev,
              completedLessons: [...prev.completedLessons, itemId],
              streakDays: prev.streakDays + 1
            };
          }
          return prev;
        case 'simulation':
          if (!prev.completedSimulations.includes(itemId)) {
            return {
              ...prev,
              completedSimulations: [...prev.completedSimulations, itemId],
              streakDays: prev.streakDays + 1
            };
          }
          return prev;
        case 'journal':
          return {
            ...prev,
            journalEntries: prev.journalEntries + 1,
            streakDays: prev.streakDays + 1
          };
        case 'post':
          return {
            ...prev,
            communityPosts: prev.communityPosts + 1
          };
        default:
          return prev;
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUserProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}