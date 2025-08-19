import React, { useState } from 'react';
import { X, Download, FileText, Table, BarChart3 } from 'lucide-react';
import { Feature } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  features: Feature[];
}

export function ExportModal({ isOpen, onClose, features }: ExportModalProps) {
  const [exportType, setExportType] = useState<'csv' | 'json' | 'report'>('csv');

  if (!isOpen) return null;

  const exportData = () => {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (exportType) {
      case 'csv':
        const csvHeaders = 'Title,Description,Priority,Status,Impact,Effort,Sentiment,Usage,Feedback Count,Created Date\n';
        const csvRows = features.map(f => 
          `"${f.title}","${f.description}","${f.priority}","${f.status}",${f.impact},${f.effort},${f.sentimentScore.toFixed(2)},${f.usageCount},${f.feedbackCount},"${f.createdAt.toLocaleDateString()}"`
        ).join('\n');
        content = csvHeaders + csvRows;
        filename = 'features-export.csv';
        mimeType = 'text/csv';
        break;

      case 'json':
        content = JSON.stringify(features, null, 2);
        filename = 'features-export.json';
        mimeType = 'application/json';
        break;

      case 'report':
        const totalFeatures = features.length;
        const avgSentiment = features.reduce((sum, f) => sum + f.sentimentScore, 0) / totalFeatures;
        const priorityDist = {
          high: features.filter(f => f.priority === 'high').length,
          medium: features.filter(f => f.priority === 'medium').length,
          low: features.filter(f => f.priority === 'low').length
        };

        content = `# Feature Prioritization Report
Generated on: ${new Date().toLocaleDateString()}

## Summary
- Total Features: ${totalFeatures}
- Average Sentiment: ${avgSentiment.toFixed(2)}/10
- High Priority: ${priorityDist.high} features
- Medium Priority: ${priorityDist.medium} features  
- Low Priority: ${priorityDist.low} features

## Feature Details
${features.map(f => `
### ${f.title}
- **Description:** ${f.description}
- **Priority:** ${f.priority}
- **Status:** ${f.status}
- **Impact/Effort:** ${f.impact}/${f.effort}
- **Sentiment:** ${f.sentimentScore.toFixed(2)}/10
- **Usage:** ${f.usageCount}
- **Feedback:** ${f.feedbackCount} items
`).join('\n')}`;
        filename = 'features-report.md';
        mimeType = 'text/markdown';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Export Features</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="csv"
                  checked={exportType === 'csv'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="text-blue-600"
                />
                <Table className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">CSV Spreadsheet</div>
                  <div className="text-sm text-gray-500">For Excel, Google Sheets</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="json"
                  checked={exportType === 'json'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="text-blue-600"
                />
                <BarChart3 className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">JSON Data</div>
                  <div className="text-sm text-gray-500">For developers, APIs</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="report"
                  checked={exportType === 'report'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="text-blue-600"
                />
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">Markdown Report</div>
                  <div className="text-sm text-gray-500">For documentation, sharing</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={exportData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
