import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Features } from './pages/Features';
import { Prioritization } from './pages/Prioritization';
import { SmartPrioritization } from './pages/SmartPrioritization';
import { FeedbackPage } from './pages/Feedback';
import { Analytics } from './pages/Analytics';
import { useFeatureData } from './hooks/useFeatureData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const {
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
  } = useFeatureData();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard metrics={getDashboardMetrics()} />;
      case 'features':
        return (
          <Features
            features={features}
            onUpdateFeature={updateFeature}
            onDeleteFeature={deleteFeature}
          />
        );
      case 'prioritization':
        return (
          <Prioritization
            features={features}
            onUpdateFeature={updateFeature}
            onDeleteFeature={deleteFeature}
          />
        );
      case 'smart-prioritization':
        return (
          <SmartPrioritization
            features={features}
            usageData={usageData}
          />
        );
      case 'feedback':
        return (
          <FeedbackPage
            features={features}
            feedback={feedback}
            onAddFeedback={addFeedback}
            getFeatureFeedback={getFeatureFeedback}
          />
        );
      case 'analytics':
        return (
          <Analytics
            features={features}
            usageData={usageData}
            getFeatureUsage={getFeatureUsage}
          />
        );
      default:
        return <Dashboard metrics={getDashboardMetrics()} />;
    }
  };

  const getPageInfo = () => {
    const pageInfo = {
      dashboard: { title: 'Dashboard', subtitle: 'Overview of your feature prioritization progress' },
      features: { title: 'Features', subtitle: 'Manage and track all your product features' },
      prioritization: { title: 'Prioritization', subtitle: 'Interactive priority matrix for strategic planning' },
      'smart-prioritization': { title: 'Smart Prioritization', subtitle: 'AI-powered prioritization using sentiment and usage analytics' },
      feedback: { title: 'Feedback', subtitle: 'Collect and analyze user feedback with sentiment analysis' },
      analytics: { title: 'Analytics', subtitle: 'Usage insights and performance metrics' }
    };
    return pageInfo[currentPage as keyof typeof pageInfo] || pageInfo.dashboard;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header
          title={getPageInfo().title}
          subtitle={getPageInfo().subtitle}
          onAddFeature={addFeature}
        />
        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
