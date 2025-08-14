import React from 'react';
import { PrioritizationScore } from '../utils/prioritizationAlgorithm';
import { TrendingUp, TrendingDown, Zap, Target, Users, Clock } from 'lucide-react';

interface PrioritizationScoreCardProps {
  score: PrioritizationScore;
  rank: number;
}

export function PrioritizationScoreCard({ score, rank }: PrioritizationScoreCardProps) {
  const { feature, totalScore, breakdown, recommendation, reasoning } = score;

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
            #{rank}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{feature.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
            {(totalScore * 100).toFixed(0)}
          </div>
          <div className="text-xs text-gray-500">Priority Score</div>
        </div>
      </div>

      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getRecommendationColor(recommendation)}`}>
        {recommendation.toUpperCase()} PRIORITY
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-xs text-gray-500">Impact</span>
          </div>
          <div className="text-sm font-semibold">{(breakdown.impactScore * 100).toFixed(0)}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-xs text-gray-500">Effort</span>
          </div>
          <div className="text-sm font-semibold">{(breakdown.effortScore * 100).toFixed(0)}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-xs text-gray-500">Sentiment</span>
          </div>
          <div className="text-sm font-semibold">{(breakdown.sentimentScore * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="space-y-1">
        <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">AI Reasoning</h4>
        {reasoning.slice(0, 3).map((reason, index) => (
          <div key={index} className="text-xs text-gray-600 flex items-start">
            <span className="mr-1">•</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
