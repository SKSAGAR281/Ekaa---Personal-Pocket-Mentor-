import React, { useState } from 'react';
import { Download, Package, CheckCircle, Clock, Wifi, WifiOff, Play, FileText, Volume2 } from 'lucide-react';

interface OfflinePack {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  duration: string;
  contents: {
    audio: number;
    video: number;
    text: number;
  };
  isDownloaded: boolean;
  isDownloading: boolean;
  downloadProgress: number;
  lastUpdated: string;
}

export function OfflinePacks() {
  const [packs, setPacks] = useState<OfflinePack[]>([
    {
      id: '1',
      title: 'This Week\'s Power Pack',
      description: 'Essential lessons for confidence building and daily motivation',
      category: 'Featured',
      size: '25 MB',
      duration: '45 minutes',
      contents: { audio: 5, video: 1, text: 3 },
      isDownloaded: true,
      isDownloading: false,
      downloadProgress: 100,
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Financial Literacy Basics',
      description: 'Complete guide to budgeting, saving, and smart spending',
      category: 'Finance',
      size: '18 MB',
      duration: '30 minutes',
      contents: { audio: 4, video: 2, text: 2 },
      isDownloaded: false,
      isDownloading: false,
      downloadProgress: 0,
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'English Speaking Confidence',
      description: 'Pronunciation tips and conversation starters',
      category: 'Language',
      size: '32 MB',
      duration: '60 minutes',
      contents: { audio: 8, video: 1, text: 4 },
      isDownloaded: false,
      isDownloading: false,
      downloadProgress: 0,
      lastUpdated: '3 days ago'
    },
    {
      id: '4',
      title: 'Digital Safety Essentials',
      description: 'Protect yourself online with these crucial safety tips',
      category: 'Safety',
      size: '15 MB',
      duration: '25 minutes',
      contents: { audio: 3, video: 2, text: 5 },
      isDownloaded: true,
      isDownloading: false,
      downloadProgress: 100,
      lastUpdated: '5 days ago'
    },
    {
      id: '5',
      title: 'Parenting Wisdom',
      description: 'Gentle parenting techniques and child development insights',
      category: 'Parenting',
      size: '28 MB',
      duration: '50 minutes',
      contents: { audio: 6, video: 2, text: 3 },
      isDownloaded: false,
      isDownloading: false,
      downloadProgress: 0,
      lastUpdated: '1 week ago'
    },
    {
      id: '6',
      title: 'Home Business Starter',
      description: 'Turn your skills into income with practical business tips',
      category: 'Business',
      size: '22 MB',
      duration: '40 minutes',
      contents: { audio: 5, video: 1, text: 4 },
      isDownloaded: false,
      isDownloading: false,
      downloadProgress: 0,
      lastUpdated: '4 days ago'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOnline, setIsOnline] = useState(true);

  const categories = ['All', 'Featured', 'Finance', 'Language', 'Safety', 'Parenting', 'Business'];

  const downloadPack = (packId: string) => {
    setPacks(packs.map(pack => 
      pack.id === packId 
        ? { ...pack, isDownloading: true, downloadProgress: 0 }
        : pack
    ));

    // Simulate download progress
    const interval = setInterval(() => {
      setPacks(currentPacks => 
        currentPacks.map(pack => {
          if (pack.id === packId && pack.isDownloading) {
            const newProgress = pack.downloadProgress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return {
                ...pack,
                isDownloading: false,
                isDownloaded: true,
                downloadProgress: 100
              };
            }
            return { ...pack, downloadProgress: newProgress };
          }
          return pack;
        })
      );
    }, 200);
  };

  const deletePack = (packId: string) => {
    setPacks(packs.map(pack => 
      pack.id === packId 
        ? { ...pack, isDownloaded: false, downloadProgress: 0 }
        : pack
    ));
  };

  const filteredPacks = selectedCategory === 'All' 
    ? packs 
    : packs.filter(pack => pack.category === selectedCategory);

  const downloadedPacks = packs.filter(pack => pack.isDownloaded);
  const totalDownloadedSize = downloadedPacks.reduce((total, pack) => {
    return total + parseInt(pack.size.replace(' MB', ''));
  }, 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📥 Offline Learning Packs</h1>
          <p className="text-lg text-gray-600">
            Download content bundles for learning without internet connection
          </p>
        </div>

        {/* Connection Status */}
        <div className={`flex items-center space-x-2 mb-6 p-3 rounded-lg ${
          isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          <span className="font-medium">
            {isOnline ? 'Connected - Ready to download' : 'Offline - Using downloaded content'}
          </span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="ml-auto text-sm underline"
          >
            {isOnline ? 'Simulate Offline' : 'Go Online'}
          </button>
        </div>

        {/* Storage Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Storage Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{downloadedPacks.length}</div>
              <div className="text-sm text-gray-600">Downloaded Packs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalDownloadedSize} MB</div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {downloadedPacks.reduce((total, pack) => total + pack.contents.audio + pack.contents.video + pack.contents.text, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {downloadedPacks.reduce((total, pack) => total + parseInt(pack.duration.split(' ')[0]), 0)} min
              </div>
              <div className="text-sm text-gray-600">Content Duration</div>
            </div>
          </div>
        </div>

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

        {/* Packs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPacks.map((pack) => (
            <div key={pack.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">{pack.category}</span>
                  </div>
                  {pack.isDownloaded && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{pack.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pack.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{pack.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{pack.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{pack.lastUpdated}</span>
                  </div>
                </div>

                {/* Content Breakdown */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contents:</h4>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Volume2 className="w-3 h-3 text-purple-600" />
                      <span>{pack.contents.audio} Audio</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3 text-red-600" />
                      <span>{pack.contents.video} Video</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span>{pack.contents.text} Text</span>
                    </div>
                  </div>
                </div>

                {/* Download Progress */}
                {pack.isDownloading && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Downloading...</span>
                      <span className="font-medium">{pack.downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pack.downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {pack.isDownloaded ? (
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium">
                      <Play className="w-4 h-4" />
                      <span>Open Pack</span>
                    </button>
                    <button
                      onClick={() => deletePack(pack.id)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ) : pack.isDownloading ? (
                  <button
                    disabled
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Downloading...</span>
                  </button>
                ) : (
                  <button
                    onClick={() => downloadPack(pack.id)}
                    disabled={!isOnline}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                      isOnline
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{isOnline ? 'Download Pack' : 'Offline - Cannot Download'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Offline Benefits */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits of Offline Learning</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <WifiOff className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Learn without internet</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-medium">Save data and time</span>
              </div>
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Curated content bundles</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Always available content</span>
              </div>
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-600" />
                <span className="font-medium">One-time download</span>
              </div>
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Audio-first learning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Recommendation */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl text-white p-6">
          <h3 className="text-xl font-bold mb-4">This Week's Recommended Pack</h3>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Financial Literacy Basics</h4>
            <p className="text-sm opacity-90 mb-3">
              Perfect for beginners wanting to understand budgeting and saving. 
              Includes practical exercises you can do offline.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm">18 MB • 30 minutes • 8 lessons</span>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}