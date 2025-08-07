import { useState, useCallback } from 'react';
import { Feature, Feedback, UsageData, ActivityItem, DashboardMetrics } from '../types';
import { mockFeatures, mockFeedback, mockUsageData, mockActivity } from '../data/mockData';
import { analyzeSentiment } from '../utils/sentimentAnalysis';

export function useFeatureData() {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [usageData, setUsageData] = useState<UsageData[]>(mockUsageData);
  const [activity, setActivity] = useState<ActivityItem[]>(mockActivity);

  const addFeature = useCallback((newFeature: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>) => {
    const feature: Feature = {
      ...newFeature,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setFeatures(prev => [...prev, feature]);
    
    // Add activity
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      type: 'feature_added',
      description: `Created new feature: ${feature.title}`,
      timestamp: new Date(),
      featureId: feature.id
    };
    setActivity(prev => [newActivity, ...prev]);
  }, []);

  const updateFeature = useCallback((id: string, updates: Partial<Feature>) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id 
        ? { ...feature, ...updates, updatedAt: new Date() }
        : feature
    ));
  }, []);

  const deleteFeature = useCallback((id: string) => {
    setFeatures(prev => prev.filter(feature => feature.id !== id));
    setFeedback(prev => prev.filter(fb => fb.featureId !== id));
  }, []);

  const addFeedback = useCallback((featureId: string, text: string, author?: string) => {
    const sentiment = analyzeSentiment(text);
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      featureId,
      text,
      sentiment: sentiment.sentiment,
      sentimentScore: sentiment.score,
      createdAt: new Date(),
      author
    };
    
    setFeedback(prev => [...prev, newFeedback]);
    
    // Update feature sentiment and feedback count
    updateFeatureSentiment(featureId);
    
    // Add activity
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      type: 'feedback_added',
      description: `Added feedback with ${sentiment.sentiment} sentiment`,
      timestamp: new Date(),
      featureId
    };
    setActivity(prev => [newActivity, ...prev]);
  }, []);

  const updateFeatureSentiment = useCallback((featureId: string) => {
    const featureFeedback = feedback.filter(fb => fb.featureId === featureId);
    if (featureFeedback.length === 0) return;
    
    const avgSentiment = featureFeedback.reduce((sum, fb) => sum + fb.sentimentScore, 0) / featureFeedback.length;
    
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            sentimentScore: avgSentiment,
            feedbackCount: featureFeedback.length,
            updatedAt: new Date()
          }
        : feature
    ));
  }, [feedback]);

  const getDashboardMetrics = useCallback((): DashboardMetrics => {
    const totalFeatures = features.length;
    const inProgress = features.filter(f => f.status === 'in progress').length;
    const avgSentiment = features.reduce((sum, f) => sum + f.sentimentScore, 0) / totalFeatures;
    
    const priorityDistribution = {
      high: features.filter(f => f.priority === 'high').length,
      medium: features.filter(f => f.priority === 'medium').length,
      low: features.filter(f => f.priority === 'low').length
    };
    
    return {
      totalFeatures,
      inProgress,
      avgSentiment: avgSentiment || 0,
      usageGrowth: 25, // Mock growth percentage
      priorityDistribution,
      recentActivity: activity.slice(0, 10)
    };
  }, [features, activity]);

  const getFeatureFeedback = useCallback((featureId: string) => {
    return feedback.filter(fb => fb.featureId === featureId);
  }, [feedback]);

  const getFeatureUsage = useCallback((featureId: string) => {
    return usageData.filter(usage => usage.featureId === featureId);
  }, [usageData]);

  return {
    features,
    feedback,
    usageData,
    activity,
    addFeature,
    updateFeature,
    deleteFeature,
    addFeedback,
    getDashboardMetrics,
    getFeatureFeedback,
    getFeatureUsage
  };
}
