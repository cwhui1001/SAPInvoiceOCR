'use client';

import React, { useState } from 'react';
import { CloudArrowUpIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import BulkUploadDialog from '@/app/ui/invoices/bulk-upload-dialog';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export default function QuickActions() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const quickActions: QuickAction[] = [
    {
      title: 'Upload Files',
      description: 'Upload invoice documents for processing',
      icon: CloudArrowUpIcon,
      onClick: () => {
        setShowUploadDialog(true);
      }
    },
    {
      title: 'View Invoices',
      description: 'View invoice details and history',
      icon: ChartBarIcon,
      onClick: () => {
        window.location.href = '/dashboard/invoices';
      }
    }
  ];

  return (
    <>
      <div className="space-y-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-3 rounded-md text-left hover:bg-gray-50 transition-colors min-w-0"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{action.title}</p>
                <p className="text-sm text-gray-500 truncate">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bulk Upload Dialog */}
      <BulkUploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
      />
    </>
  );
}
