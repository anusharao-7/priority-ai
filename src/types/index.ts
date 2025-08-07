export interface Feature {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  impact: number; // 1-10
  effort: number; // 1-10
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  sentimentScore: number; // -1 to 1
  feedbackCount: number;
}

export interface Feedback {
  id: string;
  featureId: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  createdAt: Date;
  author?: string;
}

export interface UsageData {
  featureId: string;
  date: string;
  count: number;
}

export interface DashboardMetrics {
  totalFeatures: number;
  inProgress: number;
  avgSentiment: number;
  usageGrowth: number;
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'feature_added' | 'feedback_added' | 'status_changed' | 'priority_changed';
  description: string;
  timestamp: Date;
  featureId?: string;
}

export type PriorityQuadrant = 'quick-wins' | 'major-projects' | 'fill-ins' | 'questionable';
