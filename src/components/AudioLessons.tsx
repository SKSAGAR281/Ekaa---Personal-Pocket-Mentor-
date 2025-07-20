import React, { useState } from 'react';
import { Play, Pause, BookOpen, Clock, CheckCircle, Lock, Volume2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Lesson {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  audioContent: string;
  keyPoints: string[];
  isCompleted: boolean;
  isLocked: boolean;
}

export function AudioLessons() {
  const { user, updateUserProgress } = useUser();
  const [playingLesson, setPlayingLesson] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentTime, setCurrentTime] = useState(0);

  const lessons: Lesson[] = [
    // Spoken English
    {
      id: 'english-1',
      title: 'Greeting People Confidently',
      category: 'Spoken English',
      duration: '1:00',
      description: 'Learn proper greetings for different situations and times of day',
      difficulty: 'Beginner',
      audioContent: 'Good morning! Today we\'ll learn confident greetings. Start with "Good morning" before 12 PM, "Good afternoon" until 6 PM, and "Good evening" after that. Practice saying "Hello, how are you?" with a smile. Remember: eye contact and a warm tone make all the difference!',
      keyPoints: ['Use appropriate time-based greetings', 'Maintain eye contact', 'Speak with a warm, friendly tone', 'Practice "How are you?" responses'],
      isCompleted: user.completedLessons.includes('english-1'),
      isLocked: false
    },
    {
      id: 'english-2',
      title: 'Asking for Help Politely',
      category: 'Spoken English',
      duration: '1:15',
      description: 'Master polite phrases to ask for assistance in any situation',
      difficulty: 'Beginner',
      audioContent: 'When you need help, start with "Excuse me" or "Could you please help me?" Always say "thank you" and "please." For example: "Excuse me, could you please tell me where the bank is?" Practice these magic words: Please, Thank you, Excuse me, and Sorry.',
      keyPoints: ['Start with "Excuse me"', 'Use "Could you please..."', 'Always say thank you', 'Practice the four magic words'],
      isCompleted: user.completedLessons.includes('english-2'),
      isLocked: false
    },
    
    // Personal Hygiene & Health
    {
      id: 'health-1',
      title: 'Daily Handwashing Routine',
      category: 'Personal Hygiene & Health',
      duration: '1:00',
      description: 'Learn the proper 20-second handwashing technique',
      difficulty: 'Beginner',
      audioContent: 'Wash your hands for 20 seconds - that\'s singing "Happy Birthday" twice! Use soap, scrub between fingers, under nails, and wrists. Wash before eating, after using the bathroom, and when you come home. Clean hands prevent 80% of common illnesses!',
      keyPoints: ['Wash for 20 seconds minimum', 'Scrub all areas including between fingers', 'Use soap every time', 'Wash at key times daily'],
      isCompleted: user.completedLessons.includes('health-1'),
      isLocked: false
    },
    {
      id: 'health-2',
      title: 'Recognizing Health Warning Signs',
      category: 'Personal Hygiene & Health',
      duration: '1:30',
      description: 'Know when to seek medical help immediately',
      difficulty: 'Intermediate',
      audioContent: 'Watch for these warning signs: persistent fever over 3 days, severe headache with neck stiffness, difficulty breathing, chest pain, or sudden weakness. For women: unusual bleeding, severe abdominal pain, or breast lumps need immediate attention. Trust your instincts - when in doubt, consult a doctor.',
      keyPoints: ['Monitor fever duration', 'Watch for breathing difficulties', 'Note sudden weakness or pain', 'Trust your instincts about your body'],
      isCompleted: user.completedLessons.includes('health-2'),
      isLocked: false
    },

    // Digital Awareness
    {
      id: 'digital-1',
      title: 'Creating Strong Passwords',
      category: 'Digital Awareness',
      duration: '1:00',
      description: 'Protect your accounts with unbreakable passwords',
      difficulty: 'Beginner',
      audioContent: 'Create strong passwords with 8+ characters: mix uppercase, lowercase, numbers, and symbols. Use phrases like "MyDog@2024!" instead of "password123". Never use the same password twice. Write them down safely or use your phone\'s password manager. Change passwords if any account gets hacked.',
      keyPoints: ['Use 8+ characters with mixed types', 'Create memorable phrases', 'Never reuse passwords', 'Store passwords safely'],
      isCompleted: user.completedLessons.includes('digital-1'),
      isLocked: false
    },
    {
      id: 'digital-2',
      title: 'Spotting Online Scams',
      category: 'Digital Awareness',
      duration: '1:20',
      description: 'Identify and avoid common internet frauds',
      difficulty: 'Intermediate',
      audioContent: 'Red flags: urgent messages asking for money, "You\'ve won a lottery" emails, requests for bank details, or "Click here immediately" links. Real banks never ask for passwords via email. When in doubt, call the company directly. Remember: if it sounds too good to be true, it probably is!',
      keyPoints: ['Be suspicious of urgent money requests', 'Banks never ask for passwords via email', 'Verify by calling directly', 'Trust your gut feelings'],
      isCompleted: user.completedLessons.includes('digital-2'),
      isLocked: false
    },

    // Financial Basics
    {
      id: 'finance-1',
      title: 'Understanding Your Bank Statement',
      category: 'Financial Basics',
      duration: '1:15',
      description: 'Read and understand every line of your bank statement',
      difficulty: 'Beginner',
      audioContent: 'Your bank statement shows: opening balance, all deposits (money in), all withdrawals (money out), and closing balance. Check for unknown transactions monthly. Look for fees you don\'t understand. Keep statements for at least one year. If something looks wrong, call your bank immediately.',
      keyPoints: ['Check statements monthly', 'Understand all transaction types', 'Question unknown charges', 'Keep records for one year'],
      isCompleted: user.completedLessons.includes('finance-1'),
      isLocked: false
    },
    {
      id: 'finance-2',
      title: 'Building an Emergency Fund',
      category: 'Financial Basics',
      duration: '1:25',
      description: 'Start saving for unexpected expenses today',
      difficulty: 'Intermediate',
      audioContent: 'Start small: save ₹50 daily for emergencies. Aim for 3-6 months of expenses. Keep this money separate from daily spending. Use a savings account, not cash at home. Emergency fund is for real emergencies: job loss, medical bills, or urgent repairs - not shopping or vacations!',
      keyPoints: ['Start with ₹50 daily', 'Aim for 3-6 months expenses', 'Keep separate from spending money', 'Use only for real emergencies'],
      isCompleted: user.completedLessons.includes('finance-2'),
      isLocked: false
    },

    // Women's Rights & Safety
    {
      id: 'rights-1',
      title: 'Know Your Workplace Rights',
      category: 'Women\'s Rights & Safety',
      duration: '1:30',
      description: 'Understand your legal protections at work',
      difficulty: 'Intermediate',
      audioContent: 'You have the right to: equal pay for equal work, maternity leave, safe working conditions, and freedom from harassment. No one can fire you for being pregnant or getting married. If someone makes you uncomfortable, document it and report to HR or your supervisor. Know your company\'s complaint process.',
      keyPoints: ['Equal pay is your legal right', 'Maternity leave is protected', 'Document any harassment', 'Know your company\'s complaint process'],
      isCompleted: user.completedLessons.includes('rights-1'),
      isLocked: false
    },
    {
      id: 'rights-2',
      title: 'Personal Safety in Public Spaces',
      category: 'Women\'s Rights & Safety',
      duration: '1:20',
      description: 'Stay safe and confident in public areas',
      difficulty: 'Beginner',
      audioContent: 'Trust your instincts - if something feels wrong, it probably is. Stay alert: avoid headphones in isolated areas, keep your phone charged, and tell someone where you\'re going. Walk confidently, make eye contact, and don\'t hesitate to ask for help. Remember: your safety is more important than being polite.',
      keyPoints: ['Trust your instincts always', 'Stay alert in public', 'Keep phone charged', 'Safety over politeness'],
      isCompleted: user.completedLessons.includes('rights-2'),
      isLocked: false
    }
  ];

  const categories = ['All', 'Spoken English', 'Personal Hygiene & Health', 'Digital Awareness', 'Financial Basics', 'Women\'s Rights & Safety'];

  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const handlePlayPause = (lessonId: string) => {
    if (playingLesson === lessonId) {
      setPlayingLesson(null);
      setCurrentTime(0);
    } else {
      setPlayingLesson(lessonId);
      setCurrentTime(0);
      // Simulate audio playback
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        const duration = parseInt(lesson.duration.split(':')[1]) + (parseInt(lesson.duration.split(':')[0]) * 60);
        const interval = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= duration) {
              clearInterval(interval);
              setPlayingLesson(null);
              updateUserProgress(lessonId, 'lesson');
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentLesson = lessons.find(l => l.id === playingLesson);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🎧 Daily Dose Audio Lessons</h1>
          <p className="text-lg text-gray-600">
            1-minute audio lessons to build confidence and essential life skills
          </p>
        </div>

        {/* Audio Player */}
        {currentLesson && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-purple-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{currentLesson.title}</h3>
                <p className="text-sm text-gray-600">{currentLesson.category}</p>
              </div>
              <div className="text-sm text-gray-500">
                {formatTime(currentTime)} / {currentLesson.duration}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">{currentLesson.audioContent}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
              <ul className="space-y-1">
                {currentLesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${currentLesson ? (currentTime / (parseInt(currentLesson.duration.split(':')[1]) + (parseInt(currentLesson.duration.split(':')[0]) * 60))) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        )}

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
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`bg-white rounded-xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
                lesson.isLocked ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">{lesson.category}</span>
                  </div>
                  {lesson.isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {lesson.isLocked && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{lesson.description}</p>

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
                </div>

                <button
                  onClick={() => !lesson.isLocked && handlePlayPause(lesson.id)}
                  disabled={lesson.isLocked}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                    lesson.isLocked
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : playingLesson === lesson.id
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : lesson.isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {lesson.isLocked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Previous Lesson</span>
                    </>
                  ) : playingLesson === lesson.id ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : lesson.isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Listen Again</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play Lesson</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Progress</h3>
              <p className="opacity-90">
                You've completed {user.completedLessons.length} out of {lessons.length} lessons
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {Math.round((user.completedLessons.length / lessons.length) * 100)}%
              </div>
              <div className="text-sm opacity-90">Complete</div>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${(user.completedLessons.length / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}