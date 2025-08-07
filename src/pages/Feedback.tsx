import React, { useState } from 'react';
import { Feature, Feedback } from '../types';
import { MessageCircle, Send } from 'lucide-react';
import { getSentimentEmoji, getSentimentColor } from '../utils/sentimentAnalysis';

interface FeedbackProps {
  features: Feature[];
  feedback: Feedback[];
  onAddFeedback: (featureId: string, text: string, author?: string) => void;
  getFeatureFeedback: (featureId: string) => Feedback[];
}

export function FeedbackPage({ features, feedback, onAddFeedback, getFeatureFeedback }: FeedbackProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeature || !feedbackText.trim()) return;

    onAddFeedback(selectedFeature, feedbackText.trim(), authorName.trim() || undefined);
    setFeedbackText('');
    setAuthorName('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);
  const selectedFeatureFeedback = selectedFeature ? getFeatureFeedback(selectedFeature) : [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600 mt-2">Collect and analyze user feedback with sentiment analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Feedback Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Feedback</h2>
            
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feature *
                </label>
                <select
                  value={selectedFeature}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a feature</option>
                  {features.map(feature => (
                    <option key={feature.id} value={feature.id}>
                      {feature.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback *
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Share your thoughts about this feature..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!selectedFeature || !feedbackText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          </div>
        </div>

        {/* Feedback Display */}
        <div className="lg:col-span-2">
          {selectedFeature ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedFeatureData?.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{selectedFeatureData?.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span>{getSentimentEmoji(selectedFeatureData?.sentimentScore > 0.1 ? 'positive' : selectedFeatureData?.sentimentScore < -0.1 ? 'negative' : 'neutral')}</span>
                      <span className={`text-lg font-semibold ${getSentimentColor(selectedFeatureData?.sentimentScore > 0.1 ? 'positive' : selectedFeatureData?.sentimentScore < -0.1 ? 'negative' : 'neutral')}`}>
                        {selectedFeatureData?.sentimentScore.toFixed(1)}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {selectedFeatureFeedback.length} feedback items
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {selectedFeatureFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFeatureFeedback
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map(feedback => (
                        <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span>{getSentimentEmoji(feedback.sentiment)}</span>
                              <span className={`text-sm font-medium ${getSentimentColor(feedback.sentiment)}`}>
                                {feedback.sentiment}
                              </span>
                              {feedback.author && (
                                <span className="text-sm text-gray-600">
                                  by {feedback.author}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDate(feedback.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-900">{feedback.text}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            Sentiment Score: {feedback.sentimentScore.toFixed(2)}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No feedback yet for this feature</p>
                    <p className="text-sm text-gray-400">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Feature
                </h3>
                <p className="text-gray-500">
                  Choose a feature from the dropdown to view its feedback and add new comments
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Feedback Overview */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
          <p className="text-gray-600 mt-1">Latest feedback across all features</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {feedback
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 10)
              .map(item => {
                const feature = features.find(f => f.id === item.featureId);
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-600">
                          {feature?.title}
                        </span>
                        <span>{getSentimentEmoji(item.sentiment)}</span>
                        <span className={`text-sm font-medium ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </span>
                        {item.author && (
                          <span className="text-sm text-gray-600">
                            by {item.author}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-900">{item.text}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
