'use client';

import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SAPBusinessOneLogo from '@/app/ui/sap-business-one-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/dashboard/account/actions';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/80 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header with close button */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
            <SAPBusinessOneLogo width={140} height={28} />
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 py-6 overflow-y-auto">
            <div className="space-y-1" onClick={onClose}>
              <NavLinks />
            </div>
          </div>

          {/* Sign Out Section */}
          <div className="p-4 border-t border-gray-100">
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                onClick={onClose}
              >
                <PowerIcon className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
