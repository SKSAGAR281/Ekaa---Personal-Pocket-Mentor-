import React, { useState } from 'react';
import { Shield, Phone, AlertTriangle, Eye, Lock, Wifi, CreditCard, MessageCircle } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  relationship: string;
}

interface SafetyTip {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  urgency: 'high' | 'medium' | 'low';
}

export function SafetyToolkit() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Police', number: '100', relationship: 'Emergency Service' },
    { id: '2', name: 'Women Helpline', number: '1091', relationship: 'Emergency Service' },
    { id: '3', name: 'Ambulance', number: '108', relationship: 'Emergency Service' }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  const safetyTips: SafetyTip[] = [
    {
      id: '1',
      title: 'Recognize Phishing Emails',
      category: 'Online Safety',
      description: 'Look for suspicious sender addresses, urgent language, and requests for personal information. Never click links from unknown sources.',
      icon: Eye,
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Secure Your Passwords',
      category: 'Digital Security',
      description: 'Use unique passwords for each account. Include uppercase, lowercase, numbers, and symbols. Consider using a password manager.',
      icon: Lock,
      urgency: 'high'
    },
    {
      id: '3',
      title: 'Safe Public WiFi Usage',
      category: 'Digital Security',
      description: 'Avoid accessing sensitive information on public WiFi. Use VPN when possible and ensure websites use HTTPS.',
      icon: Wifi,
      urgency: 'medium'
    },
    {
      id: '4',
      title: 'ATM Safety Tips',
      category: 'Financial Safety',
      description: 'Cover your PIN, check for card skimmers, use ATMs in well-lit areas, and never accept help from strangers.',
      icon: CreditCard,
      urgency: 'high'
    },
    {
      id: '5',
      title: 'Social Media Privacy',
      category: 'Online Safety',
      description: 'Review privacy settings regularly, don\'t share location in real-time, and be cautious about personal information in posts.',
      icon: MessageCircle,
      urgency: 'medium'
    }
  ];

  const activateSOS = () => {
    setSosActivated(true);
    // Simulate SOS activation
    setTimeout(() => {
      setSosActivated(false);
    }, 5000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🛡️ Safety Toolkit</h1>
          <p className="text-lg text-gray-600">
            Your comprehensive safety resource for digital and personal security
          </p>
        </div>

        {/* SOS Button */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency SOS</h2>
          <button
            onClick={activateSOS}
            disabled={sosActivated}
            className={`w-32 h-32 rounded-full text-white font-bold text-xl transition-all duration-200 ${
              sosActivated 
                ? 'bg-red-700 animate-pulse cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95'
            }`}
          >
            {sosActivated ? 'SENDING...' : 'SOS'}
          </button>
          <p className="text-gray-600 mt-4">
            {sosActivated 
              ? 'Emergency alert sent to your contacts!' 
              : 'Tap and hold for 3 seconds to send emergency alert'
            }
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
            <button
              onClick={() => setShowAddContact(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Add Contact
            </button>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-gray-700">{contact.number}</span>
                  <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Safety Tips & Guidelines</h2>
          <div className="space-y-4">
            {safetyTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.id} className={`p-4 rounded-lg border ${getUrgencyColor(tip.urgency)}`}>
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBadge(tip.urgency)}`}>
                          {tip.urgency} priority
                        </span>
                      </div>
                      <p className="text-sm text-purple-600 mb-2">{tip.category}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Safety Checklist */}
        <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Safety Checklist</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Digital Safety</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Check for software updates</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Review recent account activity</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Backup important data</span>
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Personal Safety</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Share location with trusted contacts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Check emergency contact numbers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Review safety routes</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Resources */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <h3 className="text-xl font-bold mb-4">Important Safety Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">National Emergency Numbers</h4>
              <div className="space-y-1 text-sm">
                <p>Police: 100</p>
                <p>Fire: 101</p>
                <p>Ambulance: 108</p>
                <p>Women Helpline: 1091</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Cyber Crime Helpline</h4>
              <div className="space-y-1 text-sm">
                <p>National: 1930</p>
                <p>Report online fraud</p>
                <p>Identity theft support</p>
                <p>Digital harassment</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Mental Health Support</h4>
              <div className="space-y-1 text-sm">
                <p>KIRAN: 1800-599-0019</p>
                <p>24/7 counseling</p>
                <p>Crisis intervention</p>
                <p>Emotional support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Contact Modal */}
        {showAddContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Emergency Contact</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Family Member</option>
                    <option>Friend</option>
                    <option>Colleague</option>
                    <option>Neighbor</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddContact(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}