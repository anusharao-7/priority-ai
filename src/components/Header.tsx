import React, { useState } from 'react';
import { Plus, Download, Play } from 'lucide-react';
import { AddFeatureModal } from './AddFeatureModal';
import { ExportModal } from './ExportModal';
import { DemoTour } from './DemoTour';
import { Feature } from '../types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAddFeature: (feature: any) => void;
  features?: Feature[];
}

export function Header({ title, subtitle, onAddFeature, features = [] }: HeaderProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDemoTour, setShowDemoTour] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowDemoTour(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Demo</span>
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>
      </div>

      <AddFeatureModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={onAddFeature}
      />
      
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        features={features}
      />
      
      <DemoTour
        isOpen={showDemoTour}
        onClose={() => setShowDemoTour(false)}
      />
    </header>
  );
}
