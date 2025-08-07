import React, { useState } from 'react';
import { Feature } from '../types';
import { Edit, Trash2, Filter } from 'lucide-react';
import { getSentimentEmoji, getSentimentColor } from '../utils/sentimentAnalysis';

interface FeaturesProps {
  features: Feature[];
  onUpdateFeature: (id: string, updates: Partial<Feature>) => void;
  onDeleteFeature: (id: string) => void;
}

export function Features({ features, onUpdateFeature, onDeleteFeature }: FeaturesProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');

  const filteredFeatures = features
    .filter(feature => statusFilter === 'all' || feature.status === statusFilter)
    .filter(feature => priorityFilter === 'all' || feature.priority === priorityFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'sentiment':
          return b.sentimentScore - a.sentimentScore;
        case 'usage':
          return b.usageCount - a.usageCount;
        case 'impact':
          return b.impact - a.impact;
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      backlog: 'bg-gray-100 text-gray-700',
      'in progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status as keyof typeof colors];
  };

  const getSentimentLabel = (score: number) => {
    if (score > 0.1) return 'positive';
    if (score < -0.1) return 'negative';
    return 'neutral';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Features</h1>
        <p className="text-gray-600 mt-2">Manage and track all your product features</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Filters:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Status</option>
            <option value="backlog">Backlog</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="updatedAt">Recently Updated</option>
            <option value="priority">Priority</option>
            <option value="sentiment">Sentiment</option>
            <option value="usage">Usage</option>
            <option value="impact">Impact</option>
          </select>
        </div>
      </div>

      {/* Features Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact/Effort
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeatures.map((feature) => (
                <tr key={feature.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {feature.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {feature.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(feature.priority)}`}>
                      {feature.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(feature.status)}`}>
                      {feature.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <span>{getSentimentEmoji(getSentimentLabel(feature.sentimentScore))}</span>
                      <span className={`text-sm font-medium ${getSentimentColor(getSentimentLabel(feature.sentimentScore))}`}>
                        {feature.sentimentScore.toFixed(1)}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {feature.impact}/{feature.effort}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {feature.usageCount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateFeature(feature.id, {})}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteFeature(feature.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
