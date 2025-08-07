import React, { useState, useCallback } from 'react';
import { Feature, PriorityQuadrant } from '../types';
import { FeatureCard } from '../components/FeatureCard';
import { Info } from 'lucide-react';

interface PrioritizationProps {
  features: Feature[];
  onUpdateFeature: (id: string, updates: Partial<Feature>) => void;
  onDeleteFeature: (id: string) => void;
}

interface QuadrantInfo {
  title: string;
  description: string;
  color: string;
  textColor: string;
}

const quadrantInfo: Record<PriorityQuadrant, QuadrantInfo> = {
  'quick-wins': {
    title: 'Quick Wins',
    description: 'High Impact, Low Effort',
    color: 'bg-green-50 border-green-200',
    textColor: 'text-green-700'
  },
  'major-projects': {
    title: 'Major Projects',
    description: 'High Impact, High Effort',
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700'
  },
  'fill-ins': {
    title: 'Fill-ins',
    description: 'Low Impact, Low Effort',
    color: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-700'
  },
  'questionable': {
    title: 'Questionable',
    description: 'Low Impact, High Effort',
    color: 'bg-red-50 border-red-200',
    textColor: 'text-red-700'
  }
};

export function Prioritization({ features, onUpdateFeature, onDeleteFeature }: PrioritizationProps) {
  const [draggedFeature, setDraggedFeature] = useState<Feature | null>(null);
  const [dragOverQuadrant, setDragOverQuadrant] = useState<PriorityQuadrant | null>(null);

  const getQuadrant = useCallback((feature: Feature): PriorityQuadrant => {
    const highImpact = feature.impact >= 6;
    const lowEffort = feature.effort <= 5;

    if (highImpact && lowEffort) return 'quick-wins';
    if (highImpact && !lowEffort) return 'major-projects';
    if (!highImpact && lowEffort) return 'fill-ins';
    return 'questionable';
  }, []);

  const handleDragStart = (e: React.DragEvent, feature: Feature) => {
    setDraggedFeature(feature);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, quadrant: PriorityQuadrant) => {
    e.preventDefault();
    setDragOverQuadrant(quadrant);
  };

  const handleDragLeave = () => {
    setDragOverQuadrant(null);
  };

  const handleDrop = (e: React.DragEvent, quadrant: PriorityQuadrant) => {
    e.preventDefault();
    setDragOverQuadrant(null);

    if (!draggedFeature) return;

    // Update feature based on quadrant
    let updates: Partial<Feature> = {};

    switch (quadrant) {
      case 'quick-wins':
        updates = { impact: Math.max(6, draggedFeature.impact), effort: Math.min(5, draggedFeature.effort) };
        break;
      case 'major-projects':
        updates = { impact: Math.max(6, draggedFeature.impact), effort: Math.max(6, draggedFeature.effort) };
        break;
      case 'fill-ins':
        updates = { impact: Math.min(5, draggedFeature.impact), effort: Math.min(5, draggedFeature.effort) };
        break;
      case 'questionable':
        updates = { impact: Math.min(5, draggedFeature.impact), effort: Math.max(6, draggedFeature.effort) };
        break;
    }

    onUpdateFeature(draggedFeature.id, updates);
    setDraggedFeature(null);
  };

  const getQuadrantFeatures = (quadrant: PriorityQuadrant) => {
    return features.filter(feature => getQuadrant(feature) === quadrant);
  };

  const renderQuadrant = (quadrant: PriorityQuadrant) => {
    const info = quadrantInfo[quadrant];
    const quadrantFeatures = getQuadrantFeatures(quadrant);
    const isDragOver = dragOverQuadrant === quadrant;

    return (
      <div
        key={quadrant}
        className={`p-4 rounded-lg border-2 min-h-96 transition-all ${info.color} ${
          isDragOver ? 'border-blue-400 bg-blue-100' : ''
        }`}
        onDragOver={(e) => handleDragOver(e, quadrant)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, quadrant)}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-semibold ${info.textColor}`}>{info.title}</h3>
            <p className="text-sm text-gray-600">{info.description}</p>
          </div>
          <div className="text-xs text-gray-500">
            {quadrantFeatures.length} features
          </div>
        </div>

        <div className="space-y-3">
          {quadrantFeatures.map(feature => (
            <div
              key={feature.id}
              draggable
              onDragStart={(e) => handleDragStart(e, feature)}
              className={draggedFeature?.id === feature.id ? 'opacity-50' : ''}
            >
              <FeatureCard
                feature={feature}
                onEdit={() => {}}
                onDelete={onDeleteFeature}
                isDragging={draggedFeature?.id === feature.id}
              />
            </div>
          ))}
        </div>

        {quadrantFeatures.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <p className="text-sm">Drop features here</p>
              <p className="text-xs">{info.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Prioritization</h1>
        <p className="text-gray-600 mt-2">Interactive priority matrix for strategic planning</p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">How to use the Priority Matrix:</h3>
            <div className="mt-2 text-sm text-blue-800">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Quick Wins:</strong> Prioritize these features first (High Impact, Low Effort)</li>
                <li><strong>Major Projects:</strong> Plan these carefully and allocate sufficient resources (High Impact, High Effort)</li>
                <li><strong>Fill-ins:</strong> Consider these features when you have spare capacity (Low Impact, Low Effort)</li>
                <li><strong>Questionable:</strong> Consider if these features are worth pursuing (Low Impact, High Effort)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderQuadrant('quick-wins')}
        {renderQuadrant('major-projects')}
        {renderQuadrant('fill-ins')}
        {renderQuadrant('questionable')}
      </div>
    </div>
  );
}
