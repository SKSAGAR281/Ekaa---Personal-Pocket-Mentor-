import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, TrendingUp, Award, Target } from 'lucide-react';

export const VoiceJournaling: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Array<{
    id: string;
    title: string;
    duration: number;
    date: string;
    feedback: {
      pronunciation: number;
      fluency: number;
      clarity: number;
      confidence: number;
    };
    suggestions: string[];
  }>>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const topics = [
    "Describe your day",
    "Share a recent achievement",
    "Talk about your goals",
    "Express your feelings",
    "Practice introducing yourself",
    "Discuss a challenge you overcame"
  ];

  const weeklyGoal = 5;
  const completedThisWeek = recordings.length;

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Simulate AI feedback generation
    const newRecording = {
      id: Date.now().toString(),
      title: selectedTopic || `Recording ${recordings.length + 1}`,
      duration: recordingTime,
      date: new Date().toLocaleDateString(),
      feedback: {
        pronunciation: Math.floor(Math.random() * 30) + 70, // 70-100
        fluency: Math.floor(Math.random() * 25) + 75, // 75-100
        clarity: Math.floor(Math.random() * 20) + 80, // 80-100
        confidence: Math.floor(Math.random() * 35) + 65, // 65-100
      },
      suggestions: [
        "Try speaking a bit slower for better clarity",
        "Great confidence! Keep practicing daily",
        "Focus on pronunciation of longer words"
      ]
    };

    setRecordings(prev => [newRecording, ...prev]);
    setShowFeedback(true);
    setSelectedTopic('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎤 Confidence Journal</h1>
          <p className="text-gray-600">Voice-recorded thoughts with AI feedback</p>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Goal
            </h2>
            <span className="text-sm text-gray-600">{completedThisWeek}/{weeklyGoal} recordings</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((completedThisWeek / weeklyGoal) * 100, 100)}%` }}
            ></div>
          </div>
          {completedThisWeek >= weeklyGoal && (
            <div className="flex items-center text-green-600 text-sm mt-2">
              <Award className="w-4 h-4 mr-1" />
              Goal achieved! Keep up the great work!
            </div>
          )}
        </div>

        {/* Recording Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Start Recording</h2>
          
          {/* Topic Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a topic (optional)
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Free speaking</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Recording Controls */}
          <div className="text-center">
            <div className="mb-4">
              <div className="text-2xl font-mono text-gray-800 mb-2">
                {formatTime(recordingTime)}
              </div>
              {isRecording && (
                <div className="flex items-center justify-center text-red-500">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  Recording...
                </div>
              )}
            </div>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* AI Feedback Modal */}
        {showFeedback && recordings.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">AI Feedback</h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(recordings[0].feedback).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(value)}`}>
                    {value}%
                  </div>
                  <div className="text-sm text-gray-600 capitalize">{key}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(value)}`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Suggestions for improvement:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                {recordings[0].suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Recording History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Your Progress
            </h2>
            <span className="text-sm text-gray-600">{recordings.length} recordings</span>
          </div>

          {recordings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mic className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No recordings yet. Start your first voice journal entry!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recordings.map((recording) => (
                <div key={recording.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{recording.title}</h3>
                    <span className="text-sm text-gray-500">{recording.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Duration: {formatTime(recording.duration)}</span>
                    <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm">
                      <Play className="w-4 h-4 mr-1" />
                      Play
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(recording.feedback).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-sm font-semibold ${getScoreColor(value)}`}>
                          {value}%
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};