import { Feature, Feedback, UsageData, ActivityItem } from '../types';

export const mockFeatures: Feature[] = [
  {
    id: '1',
    title: 'Smart Search',
    description: 'AI-powered product search with natural language processing',
    status: 'backlog',
    priority: 'high',
    impact: 8,
    effort: 5,
    tags: ['AI', 'Search', 'UX'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    usageCount: 80,
    sentimentScore: 0.63,
    feedbackCount: 12
  },
  {
    id: '2',
    title: 'Real-time Chat',
    description: 'Live customer support chat with automated responses',
    status: 'in progress',
    priority: 'medium',
    impact: 8,
    effort: 8,
    tags: ['Communication', 'Support'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
    usageCount: 45,
    sentimentScore: 0.71,
    feedbackCount: 8
  },
  {
    id: '3',
    title: 'Team Collaboration',
    description: 'Real-time collaborative editing and comments',
    status: 'in progress',
    priority: 'high',
    impact: 9,
    effort: 6,
    tags: ['Collaboration', 'Productivity'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28'),
    usageCount: 25,
    sentimentScore: 0.82,
    feedbackCount: 15
  },
  {
    id: '4',
    title: 'Dark Mode',
    description: 'Toggle between light and dark themes',
    status: 'backlog',
    priority: 'low',
    impact: 4,
    effort: 3,
    tags: ['UI', 'Accessibility'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
    usageCount: 15,
    sentimentScore: 0.58,
    feedbackCount: 5
  },
  {
    id: '5',
    title: 'Mobile App',
    description: 'Native mobile application for iOS and Android',
    status: 'backlog',
    priority: 'high',
    impact: 9,
    effort: 9,
    tags: ['Mobile', 'Native'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-30'),
    usageCount: 0,
    sentimentScore: 0.45,
    feedbackCount: 3
  },
  {
    id: '6',
    title: 'Advanced Analytics',
    description: 'Detailed performance metrics and reporting',
    status: 'backlog',
    priority: 'medium',
    impact: 6,
    effort: 8,
    tags: ['Analytics', 'Reporting'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-01'),
    usageCount: 0,
    sentimentScore: 0.33,
    feedbackCount: 2
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'f1',
    featureId: '1',
    text: 'This search feature is absolutely amazing! It understands exactly what I\'m looking for.',
    sentiment: 'positive',
    sentimentScore: 0.8,
    createdAt: new Date('2024-01-28T10:30:00'),
    author: 'Sarah Chen'
  },
  {
    id: 'f2',
    featureId: '1',
    text: 'The search results are very relevant and fast. Great job!',
    sentiment: 'positive',
    sentimentScore: 0.7,
    createdAt: new Date('2024-01-27T14:15:00'),
    author: 'Mike Johnson'
  },
  {
    id: 'f3',
    featureId: '2',
    text: 'Chat response time could be faster, but the automated responses are helpful.',
    sentiment: 'neutral',
    sentimentScore: 0.2,
    createdAt: new Date('2024-01-26T09:45:00')
  },
  {
    id: 'f4',
    featureId: '3',
    text: 'Love the real-time collaboration! Makes teamwork so much easier.',
    sentiment: 'positive',
    sentimentScore: 0.9,
    createdAt: new Date('2024-01-25T16:20:00'),
    author: 'Alex Rivera'
  },
  {
    id: 'f5',
    featureId: '4',
    text: 'Dark mode is nice but the contrast could be better in some areas.',
    sentiment: 'neutral',
    sentimentScore: 0.1,
    createdAt: new Date('2024-01-24T11:00:00')
  }
];

export const mockUsageData: UsageData[] = [
  { featureId: '1', date: '2024-01-20', count: 45 },
  { featureId: '1', date: '2024-01-21', count: 52 },
  { featureId: '1', date: '2024-01-22', count: 48 },
  { featureId: '1', date: '2024-01-23', count: 61 },
  { featureId: '1', date: '2024-01-24', count: 58 },
  { featureId: '1', date: '2024-01-25', count: 67 },
  { featureId: '1', date: '2024-01-26', count: 73 },
  { featureId: '2', date: '2024-01-20', count: 28 },
  { featureId: '2', date: '2024-01-21', count: 32 },
  { featureId: '2', date: '2024-01-22', count: 35 },
  { featureId: '2', date: '2024-01-23', count: 41 },
  { featureId: '2', date: '2024-01-24', count: 38 },
  { featureId: '2', date: '2024-01-25', count: 44 },
  { featureId: '2', date: '2024-01-26', count: 49 }
];

export const mockActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'feedback_added',
    description: 'Added feedback with neutral sentiment',
    timestamp: new Date('2024-01-30T15:30:00'),
    featureId: '4'
  },
  {
    id: 'a2',
    type: 'feedback_added',
    description: 'Added feedback with positive sentiment',
    timestamp: new Date('2024-01-30T20:45:00'),
    featureId: '1'
  },
  {
    id: 'a3',
    type: 'feedback_added',
    description: 'Added feedback with positive sentiment',
    timestamp: new Date('2024-01-30T25:15:00'),
    featureId: '3'
  },
  {
    id: 'a4',
    type: 'status_changed',
    description: 'Changed status from backlog to in progress',
    timestamp: new Date('2024-01-29T11:20:00'),
    featureId: '2'
  },
  {
    id: 'a5',
    type: 'feature_added',
    description: 'Created new feature: Advanced Analytics',
    timestamp: new Date('2024-01-28T09:10:00'),
    featureId: '6'
  }
];
