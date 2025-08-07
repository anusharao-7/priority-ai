import React from 'react';
import { Feature, UsageData } from '../types';
import { TrendingUp, TrendingDown, Activity, Users } from 'lucide-react';

interface AnalyticsProps {
  features: Feature[];
  usageData: UsageData[];
  getFeatureUsage: (featureId: string) => UsageData[];
}

export function Analytics({ features, usageData, getFeatureUsage }: AnalyticsProps) {
  // Calculate metrics
  const totalUsage = features.reduce((sum, f) => sum + f.usageCount, 0);
  const avgSentiment = features.reduce((sum, f) => sum + f.sentimentScore, 0) / features.length;
  const totalFeedback = features.reduce((sum, f) => sum + f.feedbackCount, 0);
  const activeFeatures = features.filter(f => f.usageCount > 0).length;

  // Top features by usage
  const topFeatures = features
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 5);

  // Features by sentiment
  const topRatedFeatures = features
    .sort((a, b) => b.sentimentScore - a.sentimentScore)
    .slice(0, 5);

  const renderUsageChart = (featureId: string) => {
    const data = getFeatureUsage(featureId).slice(-7);
    const maxUsage = Math.max(...data.map(d => d.count));
    
    return (
      <div className="flex items-end space-x-1 h-12">
        {data.map((point, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-t w-4"
            style={{ 
              height: `${(point.count / maxUsage) * 100}%`,
              minHeight: '4px'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Usage insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usage</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsage}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% this week
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Sentiment</p>
              <p className="text-3xl font-bold text-gray-900">{avgSentiment.toFixed(1)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.3 this week
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-3xl font-bold text-gray-900">{totalFeedback}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="w-3 h-3 mr-1" />
                -5% this week
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Features</p>
              <p className="text-3xl font-bold text-gray-900">{activeFeatures}</p>
              <p className="text-sm text-gray-500 mt-1">
                of {features.length} total
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Used Features */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Most Used Features</h2>
            <p className="text-gray-600 mt-1">Features ranked by usage count</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topFeatures.map((feature, index) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-500">{feature.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {renderUsageChart(feature.id)}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{feature.usageCount}</p>
                      <p className="text-xs text-gray-500">uses</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Rated Features */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Rated Features</h2>
            <p className="text-gray-600 mt-1">Features with highest sentiment scores</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topRatedFeatures.map((feature, index) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-500">{feature.feedbackCount} feedback items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      {feature.sentimentScore.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500">sentiment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Performance Grid */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Feature Performance Overview</h2>
          <p className="text-gray-600 mt-1">Complete performance metrics for all features</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Feature</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sentiment</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Feedback</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Impact/Effort</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map(feature => (
                <tr key={feature.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{feature.title}</div>
                    <div className="text-sm text-gray-500">{feature.status}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{feature.usageCount}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      feature.sentimentScore > 0.1 ? 'text-green-600' :
                      feature.sentimentScore < -0.1 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {feature.sentimentScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{feature.feedbackCount}</td>
                  <td className="px-6 py-4 text-gray-900">{feature.impact}/{feature.effort}</td>
                  <td className="px-6 py-4">
                    {renderUsageChart(feature.id)}
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
