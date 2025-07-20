import React, { useState } from 'react';
import { Mic, Volume2, Languages, HelpCircle, MessageSquare, Play, Pause } from 'lucide-react';

interface VoiceQuery {
  id: string;
  question: string;
  answer: string;
  language: string;
  category: string;
}

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentQueries, setRecentQueries] = useState<VoiceQuery[]>([]);

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' }
  ];

  const commonQueries = [
    {
      question: "How do I open a bank account?",
      category: "Banking",
      answer: "To open a bank account, you need: 1) Identity proof (Aadhaar, PAN), 2) Address proof, 3) Passport photos, 4) Initial deposit. Visit your nearest bank branch with these documents."
    },
    {
      question: "How to improve my English speaking?",
      category: "Language",
      answer: "Practice daily: 1) Speak to yourself in mirror, 2) Read aloud for 10 minutes, 3) Listen to English songs/movies, 4) Join conversation groups, 5) Use voice recording apps."
    },
    {
      question: "What is a good monthly budget plan?",
      category: "Finance",
      answer: "Follow 50-30-20 rule: 50% for needs (rent, food), 30% for wants (entertainment), 20% for savings. Track expenses daily and review monthly."
    },
    {
      question: "How to stay safe online?",
      category: "Safety",
      answer: "Online safety tips: 1) Use strong passwords, 2) Don't share personal info, 3) Verify before clicking links, 4) Use secure websites (https), 5) Keep software updated."
    },
    {
      question: "How to build confidence?",
      category: "Personal Growth",
      answer: "Build confidence by: 1) Setting small achievable goals, 2) Celebrating small wins, 3) Learning new skills, 4) Positive self-talk, 5) Helping others."
    }
  ];

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setCurrentQuery("How do I open a bank account?");
    }, 3000);
  };

  const playResponse = (query: VoiceQuery) => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  const askQuestion = (question: string, answer: string, category: string) => {
    const newQuery: VoiceQuery = {
      id: Date.now().toString(),
      question,
      answer,
      language: selectedLanguage,
      category
    };
    setRecentQueries([newQuery, ...recentQueries.slice(0, 4)]);
    setCurrentQuery(question);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🗣️ Voice Assistant</h1>
          <p className="text-lg text-gray-600">
            Get voice-based guidance in your preferred language
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Language</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Input */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isListening 
              ? 'bg-red-100 border-4 border-red-500 animate-pulse' 
              : 'bg-purple-100 border-4 border-purple-500'
          }`}>
            <Mic className={`w-12 h-12 ${isListening ? 'text-red-600' : 'text-purple-600'}`} />
          </div>

          {isListening ? (
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Listening...</h3>
              <p className="text-gray-600">Speak your question clearly</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ask Me Anything</h3>
              <p className="text-gray-600 mb-6">Tap the microphone and ask your question</p>
              <button
                onClick={startListening}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Start Speaking
              </button>
            </div>
          )}

          {currentQuery && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">You asked: "{currentQuery}"</p>
              <button
                onClick={() => playResponse(recentQueries[0])}
                className={`mt-3 flex items-center space-x-2 mx-auto px-4 py-2 rounded-lg transition-colors ${
                  isPlaying 
                    ? 'bg-red-600 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Playing...' : 'Play Answer'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Common Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Common Questions</h2>
          <div className="space-y-3">
            {commonQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => askQuestion(query.question, query.answer, query.category)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{query.question}</h3>
                    <span className="text-sm text-purple-600">{query.category}</span>
                  </div>
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Queries */}
        {recentQueries.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Questions</h2>
            <div className="space-y-4">
              {recentQueries.map((query) => (
                <div key={query.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{query.question}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {query.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{query.answer}</p>
                  <button
                    onClick={() => playResponse(query)}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Play in {languages.find(l => l.code === query.language)?.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Languages className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Multi-Language Support</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get answers in Hindi, Tamil, Marathi, Bengali, Gujarati, and English. 
              Voice responses adapt to your preferred language.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Offline Ready</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Download common responses for offline use. Perfect for areas with 
              limited internet connectivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}