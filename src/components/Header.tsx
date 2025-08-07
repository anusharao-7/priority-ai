import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddFeatureModal } from './AddFeatureModal';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAddFeature: (feature: any) => void;
}

export function Header({ title, subtitle, onAddFeature }: HeaderProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Feature</span>
        </button>
      </div>

      <AddFeatureModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={onAddFeature}
      />
    </header>
  );
}
