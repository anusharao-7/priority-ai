import React, { useState, useMemo } from 'react';
import { Feature } from '../types';
import { PrioritizationScoreCard } from '../components/PrioritizationScoreCard';
import { 
  prioritizeFeatures, 
  getQuickWins, 
  getMajorProjects,
  DEFAULT_WEIGHTS,
  PrioritizationWeights 
} from '../utils/prioritizationAlgorithm';
import { Brain, Settings, Zap, Target, TrendingUp } from 'lucide-react';

interface SmartPrioritizationProps {
  features: Feature[];
  usageData: any[];
}

export function SmartPrioritization({ features, usageData }: SmartPrioritizationProps) {
  const [weights, setWeights] = useState<PrioritizationWeights>(DEFAULT_WEIGHTS);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'quick-wins' | 'major-projects'>('all');

  const prioritizedFeatures = useMemo(() => {
    return prioritizeFeatures(features, usageData, weights);
  }, [features, usageData, weights]);

  const quickWins = useMemo(() => {
    return getQuickWins(prioritizedFeatures);
  }, [prioritizedFeatures]);

  const majorProjects = useMemo(() => {
    return getMajorProjects(prioritizedFeatures);
  }, [prioritizedFeatures]);

  const handleWeightChange = (key: keyof PrioritizationWeights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value / 100 }));
  };

  const resetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  const getDisplayFeatures = () => {
    switch (viewMode) {
      case 'quick-wins': return quickWins;
      case 'major-projects': return majorProjects;
      default: return prioritizedFeatures;
    }
  };

  const displayFeatures = getDisplayFeatures();

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              Smart Prioritization
            </h1>
            <p className="text-gray-600 mt-2">AI-powered feature prioritization using sentiment and usage analytics</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Algorithm Settings</span>
          </button>
        </div>
      </div>

      {/* Algorithm Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Prioritization Algorithm Weights</h3>
            <button
              onClick={resetWeights}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Reset to Defaults
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(weights).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key} ({(value * 100).toFixed(0)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={value * 100}
                  onChange={(e) => handleWeightChange(key as keyof PrioritizationWeights, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Impact:</strong> Business value and user benefit</p>
            <p><strong>Effort:</strong> Development complexity (inverted - lower effort = higher score)</p>
            <p><strong>Sentiment:</strong> User satisfaction and feedback</p>
            <p><strong>Usage:</strong> Current feature adoption</p>
            <p><strong>Trend:</strong> Usage growth trajectory</p>
            <p><strong>Urgency:</strong> Time-based priority boost</p>
          </div>
        </div>
      )}

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        <button
          onClick={() => setViewMode('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'all' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Features ({prioritizedFeatures.length})
        </button>
        <button
          onClick={() => setViewMode('quick-wins')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
            viewMode === 'quick-wins' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Quick Wins ({quickWins.length})</span>
        </button>
        <button
          onClick={() => setViewMode('major-projects')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
            viewMode === 'major-projects' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Major Projects ({majorProjects.length})</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Quick Wins</p>
              <p className="text-2xl font-bold text-green-900">{quickWins.length}</p>
              <p className="text-xs text-green-600">High impact, low effort</p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Major Projects</p>
              <p className="text-2xl font-bold text-blue-900">{majorProjects.length}</p>
              <p className="text-xs text-blue-600">High impact, high effort</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg Score</p>
              <p className="text-2xl font-bold text-purple-900">
                {prioritizedFeatures.length > 0 
                  ? (prioritizedFeatures.reduce((sum, f) => sum + f.totalScore, 0) / prioritizedFeatures.length * 100).toFixed(0)
                  : 0}
              </p>
              <p className="text-xs text-purple-600">Overall priority</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Prioritized Features List */}
      <div className="space-y-4">
        {displayFeatures.length > 0 ? (
          displayFeatures.map((score, index) => (
            <PrioritizationScoreCard
              key={score.feature.id}
              score={score}
              rank={index + 1}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No features to prioritize</h3>
            <p className="text-gray-500">Add some features to see AI-powered prioritization in action!</p>
          </div>
        )}
      </div>
    </div>
  );
}
