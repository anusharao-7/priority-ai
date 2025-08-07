import React from 'react';
import { Feature } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import { getSentimentEmoji } from '../utils/sentimentAnalysis';

interface FeatureCardProps {
  feature: Feature;
  onEdit: (feature: Feature) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export function FeatureCard({ feature, onEdit, onDelete, isDragging }: FeatureCardProps) {
  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-red-100 text-red-700'
  };

  const statusColors = {
    backlog: 'bg-gray-100 text-gray-700',
    'in progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700'
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-move ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
      draggable
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(feature);
            }}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(feature.id);
            }}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{feature.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[feature.priority]}`}>
          {feature.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[feature.status]}`}>
          {feature.status}
        </span>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Impact: {feature.impact}</span>
          <span>Effort: {feature.effort}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <span>{getSentimentEmoji(feature.sentimentScore > 0.1 ? 'positive' : feature.sentimentScore < -0.1 ? 'negative' : 'neutral')}</span>
            <span>{feature.sentimentScore.toFixed(1)}/10</span>
          </span>
          <span>Usage: {feature.usageCount}</span>
        </div>
      </div>
    </div>
  );
}
