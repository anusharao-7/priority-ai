import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Play } from 'lucide-react';

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps = [
  {
    title: "Welcome to PriorityAI! 🚀",
    content: "Your smart feature prioritization companion. Let's take a quick tour of what makes this tool special.",
    image: "🎯"
  },
  {
    title: "Dashboard Overview",
    content: "Get instant insights with key metrics, priority distribution, and recent activity. Everything you need at a glance.",
    image: "📊"
  },
  {
    title: "Feature Management",
    content: "Add, edit, and organize features with rich metadata. Filter by status, priority, or sentiment to find what matters.",
    image: "📝"
  },
  {
    title: "Interactive Priority Matrix",
    content: "Drag and drop features between quadrants! Quick Wins, Major Projects, Fill-ins, and Questionable - visual prioritization made easy.",
    image: "🎲"
  },
  {
    title: "AI-Powered Smart Prioritization",
    content: "Our algorithm combines 6 metrics: Impact, Effort, Sentiment, Usage, Trends, and Urgency. Customize weights to match your strategy!",
    image: "🧠"
  },
  {
    title: "Sentiment Analysis",
    content: "Real-time feedback analysis with emoji indicators. Know exactly how users feel about each feature.",
    image: "😊"
  },
  {
    title: "Usage Analytics",
    content: "Track feature adoption with trend charts, usage metrics, and performance insights. Data-driven decisions made simple.",
    image: "📈"
  }
];

export function DemoTour({ isOpen, onClose }: DemoTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTour = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentTour.image}</span>
            <h3 className="text-xl font-bold text-gray-900">{currentTour.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">{currentTour.content}</p>
        </div>

        {/* Progress indicator */}
        <div className="flex space-x-2 mb-6">
          {tourSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors ${
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-sm text-gray-500">
            {currentStep + 1} of {tourSteps.length}
          </span>

          <button
            onClick={nextStep}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>{currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}</span>
            {currentStep === tourSteps.length - 1 ? (
              <Play className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
