import React, { useState } from 'react';
import { Users, Play, RotateCcw, CheckCircle, Star, ArrowRight, MapPin, Phone, CreditCard, Building } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  estimatedTime: string;
  prompts: string[];
  feedbackPoints: string[];
  icon: any;
}

interface SimulationState {
  currentScenario: Scenario | null;
  currentPromptIndex: number;
  userResponses: string[];
  isActive: boolean;
  isCompleted: boolean;
}

export function RoleplaySimulations() {
  const { user, updateUserProgress } = useUser();
  const [simulation, setSimulation] = useState<SimulationState>({
    currentScenario: null,
    currentPromptIndex: 0,
    userResponses: [],
    isActive: false,
    isCompleted: false
  });
  const [currentResponse, setCurrentResponse] = useState('');

  const scenarios: Scenario[] = [
    // Banking Scenarios
    {
      id: 'bank-visit-1',
      title: 'Opening Your First Bank Account',
      description: 'Practice the complete process of opening a savings account',
      difficulty: 'Beginner',
      category: 'Banking',
      estimatedTime: '8-10 minutes',
      icon: CreditCard,
      prompts: [
        'Greet the bank officer and explain that you want to open a savings account.',
        'The officer asks for your documents. List what you have brought.',
        'They ask about your monthly income and purpose of the account. Respond honestly.',
        'The officer explains minimum balance requirements. Ask any questions you have.',
        'You need to fill out a form. Ask for help with any sections you don\'t understand.',
        'Thank the officer and ask about when your account will be active.'
      ],
      feedbackPoints: [
        'Speak clearly and confidently',
        'Have all required documents ready',
        'Ask questions if you don\'t understand something',
        'Be honest about your financial situation',
        'Take notes of important information'
      ]
    },
    {
      id: 'bank-complaint-1',
      title: 'Making a Bank Complaint',
      description: 'Learn to address issues with your bank account professionally',
      difficulty: 'Intermediate',
      category: 'Banking',
      estimatedTime: '6-8 minutes',
      icon: CreditCard,
      prompts: [
        'Explain to the bank officer that there\'s an unauthorized transaction in your account.',
        'Provide details: date, amount, and that you didn\'t make this transaction.',
        'The officer asks for your account details and ID. Provide them.',
        'Ask what steps the bank will take to investigate this issue.',
        'Request a written complaint number and timeline for resolution.',
        'Ask for a temporary block on your account if needed.'
      ],
      feedbackPoints: [
        'Stay calm and factual',
        'Provide specific details about the issue',
        'Always get a complaint reference number',
        'Ask for written confirmation',
        'Know your rights as a customer'
      ]
    },

    // Medical/Clinic Scenarios
    {
      id: 'clinic-visit-1',
      title: 'Visiting a Doctor for the First Time',
      description: 'Navigate a medical consultation with confidence',
      difficulty: 'Beginner',
      category: 'Healthcare',
      estimatedTime: '7-9 minutes',
      icon: MapPin,
      prompts: [
        'Register at the reception desk and explain your symptoms briefly.',
        'The receptionist asks for your details and insurance information.',
        'You\'re called in to see the doctor. Greet them and explain your main concern.',
        'The doctor asks about your medical history. Share relevant information.',
        'Describe your symptoms clearly: when they started, how severe, what makes them better/worse.',
        'Ask the doctor to explain the diagnosis and treatment in simple terms.'
      ],
      feedbackPoints: [
        'Prepare a list of symptoms beforehand',
        'Bring all relevant medical documents',
        'Don\'t hesitate to ask for clarification',
        'Be honest about your lifestyle and habits',
        'Take notes or ask for written instructions'
      ]
    },
    {
      id: 'clinic-emergency-1',
      title: 'Handling a Medical Emergency',
      description: 'Learn to communicate effectively during urgent medical situations',
      difficulty: 'Advanced',
      category: 'Healthcare',
      estimatedTime: '5-7 minutes',
      icon: MapPin,
      prompts: [
        'You arrive at the emergency room. Quickly explain the emergency to the triage nurse.',
        'Provide the patient\'s basic information: age, known medical conditions, medications.',
        'Describe exactly what happened and when the symptoms started.',
        'The nurse asks about allergies and current medications. Respond accurately.',
        'Ask about waiting time and if there\'s anything you should do while waiting.',
        'Request updates on the patient\'s condition and next steps.'
      ],
      feedbackPoints: [
        'Stay calm and speak clearly',
        'Provide essential information first',
        'Know basic medical history of family members',
        'Don\'t leave out important details',
        'Ask for regular updates'
      ]
    },

    // Police/Legal Scenarios
    {
      id: 'police-complaint-1',
      title: 'Filing a Police Complaint',
      description: 'Learn the proper procedure for reporting incidents to police',
      difficulty: 'Intermediate',
      category: 'Legal/Safety',
      estimatedTime: '10-12 minutes',
      icon: Phone,
      prompts: [
        'Approach the duty officer and state that you want to file a complaint.',
        'Clearly explain what happened: who, what, when, where, and how.',
        'Provide any evidence you have: photos, documents, witness information.',
        'The officer asks for your personal details and contact information.',
        'Request a copy of the FIR (First Information Report) and the complaint number.',
        'Ask about the next steps in the investigation process.'
      ],
      feedbackPoints: [
        'Stick to facts, avoid emotional language',
        'Bring any evidence or documentation',
        'Always get a complaint number',
        'Know your rights during the process',
        'Follow up appropriately'
      ]
    },
    {
      id: 'police-harassment-1',
      title: 'Reporting Harassment or Abuse',
      description: 'Navigate the sensitive process of reporting harassment',
      difficulty: 'Advanced',
      category: 'Legal/Safety',
      estimatedTime: '8-10 minutes',
      icon: Phone,
      prompts: [
        'Ask to speak with a female officer if you\'re more comfortable.',
        'Explain the harassment incident(s) with specific dates and details.',
        'Describe the impact this has had on your daily life and safety.',
        'Provide any evidence: messages, photos, witness statements.',
        'Ask about protective measures available to you.',
        'Understand the legal process and your rights as a complainant.'
      ],
      feedbackPoints: [
        'You have the right to a female officer',
        'Document everything with dates and details',
        'Bring a trusted friend for support if needed',
        'Know about protective orders and safety measures',
        'Understand that you\'re not at fault'
      ]
    },

    // Job Interview Scenarios
    {
      id: 'interview-basic-1',
      title: 'Your First Job Interview',
      description: 'Master the basics of professional job interviews',
      difficulty: 'Beginner',
      category: 'Career',
      estimatedTime: '10-15 minutes',
      icon: Building,
      prompts: [
        'Enter the room, greet the interviewer, and introduce yourself.',
        'The interviewer asks "Tell me about yourself." Give a brief professional summary.',
        'Explain why you want this particular job and what interests you about the company.',
        'Describe your greatest strength with a specific example.',
        'The interviewer asks about a challenge you\'ve faced. Share how you overcame it.',
        'Ask thoughtful questions about the role and company culture.',
        'Thank the interviewer and ask about next steps in the process.'
      ],
      feedbackPoints: [
        'Maintain good eye contact and posture',
        'Keep answers concise but detailed',
        'Show enthusiasm and genuine interest',
        'Use specific examples to support your points',
        'Prepare thoughtful questions in advance'
      ]
    },
    {
      id: 'interview-advanced-1',
      title: 'Handling Difficult Interview Questions',
      description: 'Navigate challenging questions with confidence',
      difficulty: 'Advanced',
      category: 'Career',
      estimatedTime: '8-10 minutes',
      icon: Building,
      prompts: [
        'The interviewer asks about a gap in your employment. Explain honestly.',
        'They ask "What is your biggest weakness?" Turn it into a growth opportunity.',
        'Respond to "Why are you leaving your current job?" professionally.',
        'Handle the question "Where do you see yourself in 5 years?"',
        'Address "Why should we hire you over other candidates?"',
        'Negotiate when they ask about salary expectations.'
      ],
      feedbackPoints: [
        'Be honest but strategic in your responses',
        'Turn weaknesses into learning opportunities',
        'Never speak negatively about previous employers',
        'Show ambition but be realistic',
        'Research salary ranges beforehand'
      ]
    }
  ];

  const startSimulation = (scenario: Scenario) => {
    setSimulation({
      currentScenario: scenario,
      currentPromptIndex: 0,
      userResponses: [],
      isActive: true,
      isCompleted: false
    });
    setCurrentResponse('');
  };

  const submitResponse = () => {
    if (!simulation.currentScenario || !currentResponse.trim()) return;

    const newResponses = [...simulation.userResponses, currentResponse];
    const nextPromptIndex = simulation.currentPromptIndex + 1;

    if (nextPromptIndex >= simulation.currentScenario.prompts.length) {
      // Simulation completed
      setSimulation({
        ...simulation,
        userResponses: newResponses,
        isCompleted: true,
        isActive: false
      });
      updateUserProgress(simulation.currentScenario.id, 'simulation');
    } else {
      // Move to next prompt
      setSimulation({
        ...simulation,
        userResponses: newResponses,
        currentPromptIndex: nextPromptIndex
      });
    }
    setCurrentResponse('');
  };

  const resetSimulation = () => {
    setSimulation({
      currentScenario: null,
      currentPromptIndex: 0,
      userResponses: [],
      isActive: false,
      isCompleted: false
    });
    setCurrentResponse('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (simulation.isActive || simulation.isCompleted) {
    const scenario = simulation.currentScenario!;
    const currentPrompt = scenario.prompts[simulation.currentPromptIndex];

    if (simulation.isCompleted) {
      return (
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulation Completed!</h2>
              <p className="text-gray-600 mb-8">
                Great job completing "{scenario.title}". Here's your feedback:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Key Points to Remember:</h3>
                <ul className="space-y-2">
                  {scenario.feedbackPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => startSimulation(scenario)}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Choose Another</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{scenario.title}</h2>
              <button
                onClick={resetSimulation}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress: {simulation.currentPromptIndex + 1} of {scenario.prompts.length}</span>
                <span>{Math.round(((simulation.currentPromptIndex + 1) / scenario.prompts.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((simulation.currentPromptIndex + 1) / scenario.prompts.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-purple-900 mb-2">Scenario Prompt:</h3>
              <p className="text-purple-800">{currentPrompt}</p>
            </div>

            <div className="mb-6">
              <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                Your Response:
              </label>
              <textarea
                id="response"
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder="Type your response here. Take your time to think about your answer..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                Prompt {simulation.currentPromptIndex + 1} of {scenario.prompts.length}
              </div>
              <button
                onClick={submitResponse}
                disabled={!currentResponse.trim()}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <span>{simulation.currentPromptIndex === scenario.prompts.length - 1 ? 'Complete' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🎭 Practice Roleplay</h1>
          <p className="text-lg text-gray-600">
            Build confidence through interactive simulations of real-world scenarios
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            return (
              <div key={scenario.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-600 font-medium">{scenario.category}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{scenario.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{scenario.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{scenario.estimatedTime}</span>
                    <span>{scenario.prompts.length} prompts</span>
                  </div>

                  {user.completedSimulations.includes(scenario.id) && (
                    <div className="flex items-center space-x-2 text-green-600 mb-4">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}

                  <button
                    onClick={() => startSimulation(scenario)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <Play className="w-4 h-4" />
                    <span>{user.completedSimulations.includes(scenario.id) ? 'Practice Again' : 'Start Practice'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Practice Progress</h3>
              <p className="opacity-90">
                You've completed {user.completedSimulations.length} out of {scenarios.length} simulations
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {Math.round((user.completedSimulations.length / scenarios.length) * 100)}%
              </div>
              <div className="text-sm opacity-90">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}