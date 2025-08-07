// Simple sentiment analysis using keyword-based approach
const positiveWords = [
  'amazing', 'awesome', 'excellent', 'fantastic', 'great', 'good', 'love', 'perfect',
  'wonderful', 'brilliant', 'outstanding', 'superb', 'magnificent', 'impressive',
  'helpful', 'useful', 'valuable', 'beneficial', 'effective', 'efficient',
  'innovative', 'creative', 'intuitive', 'user-friendly', 'seamless', 'smooth',
  'fast', 'quick', 'reliable', 'stable', 'robust', 'secure', 'clean', 'modern'
];

const negativeWords = [
  'terrible', 'awful', 'bad', 'horrible', 'hate', 'disgusting', 'worst',
  'useless', 'pointless', 'waste', 'broken', 'buggy', 'slow', 'laggy',
  'confusing', 'complicated', 'difficult', 'hard', 'frustrating', 'annoying',
  'disappointing', 'poor', 'lacking', 'missing', 'incomplete', 'flawed',
  'unreliable', 'unstable', 'insecure', 'outdated', 'clunky', 'messy'
];

const intensifiers = ['very', 'extremely', 'really', 'quite', 'totally', 'absolutely'];
const negators = ['not', 'no', 'never', 'nothing', 'nowhere', 'nobody'];

export function analyzeSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; score: number } {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let wordCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[^\w]/g, ''); // Remove punctuation
    let multiplier = 1;

    // Check for intensifiers
    if (i > 0 && intensifiers.includes(words[i - 1])) {
      multiplier = 1.5;
    }

    // Check for negators
    const hasNegator = i > 0 && negators.includes(words[i - 1]);

    if (positiveWords.includes(word)) {
      score += hasNegator ? -1 * multiplier : 1 * multiplier;
      wordCount++;
    } else if (negativeWords.includes(word)) {
      score += hasNegator ? 1 * multiplier : -1 * multiplier;
      wordCount++;
    }
  }

  // Normalize score between -1 and 1
  const normalizedScore = wordCount > 0 ? Math.max(-1, Math.min(1, score / wordCount)) : 0;

  let sentiment: 'positive' | 'negative' | 'neutral';
  if (normalizedScore > 0.1) {
    sentiment = 'positive';
  } else if (normalizedScore < -0.1) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return { sentiment, score: normalizedScore };
}

export function getSentimentEmoji(sentiment: 'positive' | 'negative' | 'neutral'): string {
  switch (sentiment) {
    case 'positive':
      return '😊';
    case 'negative':
      return '😞';
    default:
      return '😐';
  }
}

export function getSentimentColor(sentiment: 'positive' | 'negative' | 'neutral'): string {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600';
    case 'negative':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}
