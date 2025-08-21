'use client';

import { useState } from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';
import MobileNav from '../ui/dashboard/mobile-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Side Navigation */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <SideNav />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="mobile-header-title text-lg font-semibold text-gray-900">SAP Business One</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}