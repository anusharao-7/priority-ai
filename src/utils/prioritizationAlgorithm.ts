// Advanced prioritization algorithm combining multiple metrics
import { Feature } from '../types';

export interface PrioritizationScore {
  feature: Feature;
  totalScore: number;
  breakdown: {
    impactScore: number;
    effortScore: number;
    sentimentScore: number;
    usageScore: number;
    trendScore: number;
    urgencyScore: number;
  };
  recommendation: 'high' | 'medium' | 'low';
  reasoning: string[];
}

export interface PrioritizationWeights {
  impact: number;
  effort: number;
  sentiment: number;
  usage: number;
  trend: number;
  urgency: number;
}

// Default weights - can be customized
export const DEFAULT_WEIGHTS: PrioritizationWeights = {
  impact: 0.25,    // 25% - Business impact
  effort: 0.20,    // 20% - Development effort (inverse)
  sentiment: 0.20, // 20% - User sentiment
  usage: 0.15,     // 15% - Current usage
  trend: 0.10,     // 10% - Usage trend
  urgency: 0.10    // 10% - Time-based urgency
};

export function calculatePrioritizationScore(
  feature: Feature,
  usageData: any[] = [],
  weights: PrioritizationWeights = DEFAULT_WEIGHTS
): PrioritizationScore {
  // Impact Score (1-10 scale, normalized to 0-1)
  const impactScore = feature.impact / 10;

  // Effort Score (inverse - lower effort = higher score)
  const effortScore = (11 - feature.effort) / 10;

  // Sentiment Score (convert -1 to 1 scale to 0-1 scale)
  const sentimentScore = Math.max(0, (feature.sentimentScore + 1) / 2);

  // Usage Score (normalized based on max usage in dataset)
  const maxUsage = Math.max(100, feature.usageCount); // Minimum baseline of 100
  const usageScore = Math.min(1, feature.usageCount / maxUsage);

  // Trend Score (based on recent usage growth)
  const trendScore = calculateTrendScore(feature, usageData);

  // Urgency Score (based on how long feature has been in backlog)
  const urgencyScore = calculateUrgencyScore(feature);

  // Calculate weighted total score
  const totalScore = 
    (impactScore * weights.impact) +
    (effortScore * weights.effort) +
    (sentimentScore * weights.sentiment) +
    (usageScore * weights.usage) +
    (trendScore * weights.trend) +
    (urgencyScore * weights.urgency);

  // Determine recommendation
  let recommendation: 'high' | 'medium' | 'low';
  if (totalScore >= 0.7) recommendation = 'high';
  else if (totalScore >= 0.4) recommendation = 'medium';
  else recommendation = 'low';

  // Generate reasoning
  const reasoning = generateReasoning(feature, {
    impactScore,
    effortScore,
    sentimentScore,
    usageScore,
    trendScore,
    urgencyScore
  });

  return {
    feature,
    totalScore,
    breakdown: {
      impactScore,
      effortScore,
      sentimentScore,
      usageScore,
      trendScore,
      urgencyScore
    },
    recommendation,
    reasoning
  };
}

function calculateTrendScore(feature: Feature, usageData: any[]): number {
  const featureUsage = usageData.filter(d => d.featureId === feature.id);
  if (featureUsage.length < 2) return 0.5; // Neutral if no trend data

  const recent = featureUsage.slice(-3); // Last 3 data points
  const older = featureUsage.slice(-6, -3); // Previous 3 data points

  if (older.length === 0) return 0.5;

  const recentAvg = recent.reduce((sum, d) => sum + d.count, 0) / recent.length;
  const olderAvg = older.reduce((sum, d) => sum + d.count, 0) / older.length;

  if (olderAvg === 0) return recentAvg > 0 ? 1 : 0;

  const growthRate = (recentAvg - olderAvg) / olderAvg;
  
  // Convert growth rate to 0-1 score (capped at 100% growth = 1.0)
  return Math.max(0, Math.min(1, (growthRate + 1) / 2));
}

function calculateUrgencyScore(feature: Feature): number {
  const now = new Date();
  const daysSinceCreated = (now.getTime() - feature.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  
  // Features get more urgent over time, especially if high impact
  let urgencyMultiplier = 1;
  if (feature.impact >= 8) urgencyMultiplier = 1.5;
  else if (feature.impact >= 6) urgencyMultiplier = 1.2;

  // Urgency increases over time (30 days = 0.5, 60 days = 1.0)
  const timeUrgency = Math.min(1, daysSinceCreated / 60) * urgencyMultiplier;
  
  // Boost urgency for high-impact, low-effort features
  if (feature.impact >= 7 && feature.effort <= 4) {
    return Math.min(1, timeUrgency + 0.3);
  }

  return Math.min(1, timeUrgency);
}

function generateReasoning(feature: Feature, scores: any): string[] {
  const reasoning: string[] = [];

  // Impact reasoning
  if (scores.impactScore >= 0.8) {
    reasoning.push(`🎯 High business impact (${feature.impact}/10) - significant value potential`);
  } else if (scores.impactScore <= 0.3) {
    reasoning.push(`⚠️ Low business impact (${feature.impact}/10) - limited value potential`);
  }

  // Effort reasoning
  if (scores.effortScore >= 0.8) {
    reasoning.push(`⚡ Low development effort (${feature.effort}/10) - quick to implement`);
  } else if (scores.effortScore <= 0.3) {
    reasoning.push(`🏗️ High development effort (${feature.effort}/10) - resource intensive`);
  }

  // Sentiment reasoning
  if (scores.sentimentScore >= 0.7) {
    reasoning.push(`😊 Positive user sentiment (${feature.sentimentScore.toFixed(1)}) - users want this`);
  } else if (scores.sentimentScore <= 0.3) {
    reasoning.push(`😞 Negative user sentiment (${feature.sentimentScore.toFixed(1)}) - users are unhappy`);
  }

  // Usage reasoning
  if (scores.usageScore >= 0.7) {
    reasoning.push(`📈 High usage (${feature.usageCount}) - actively used feature`);
  } else if (scores.usageScore <= 0.2) {
    reasoning.push(`📉 Low usage (${feature.usageCount}) - underutilized feature`);
  }

  // Trend reasoning
  if (scores.trendScore >= 0.7) {
    reasoning.push(`🚀 Growing usage trend - gaining momentum`);
  } else if (scores.trendScore <= 0.3) {
    reasoning.push(`📉 Declining usage trend - losing interest`);
  }

  // Urgency reasoning
  if (scores.urgencyScore >= 0.7) {
    reasoning.push(`⏰ High urgency - has been waiting for attention`);
  }

  // Combination insights
  if (scores.impactScore >= 0.7 && scores.effortScore >= 0.7) {
    reasoning.push(`🎯 Perfect "Quick Win" - high impact, low effort`);
  }

  if (scores.sentimentScore >= 0.7 && scores.usageScore >= 0.7) {
    reasoning.push(`💎 User favorite - high usage and positive sentiment`);
  }

  return reasoning;
}

export function prioritizeFeatures(
  features: Feature[],
  usageData: any[] = [],
  weights?: PrioritizationWeights
): PrioritizationScore[] {
  return features
    .map(feature => calculatePrioritizationScore(feature, usageData, weights))
    .sort((a, b) => b.totalScore - a.totalScore);
}

export function getQuickWins(scores: PrioritizationScore[]): PrioritizationScore[] {
  return scores.filter(score => 
    score.breakdown.impactScore >= 0.6 && 
    score.breakdown.effortScore >= 0.6
  );
}

export function getMajorProjects(scores: PrioritizationScore[]): PrioritizationScore[] {
  return scores.filter(score => 
    score.breakdown.impactScore >= 0.6 && 
    score.breakdown.effortScore < 0.6
  );
}
