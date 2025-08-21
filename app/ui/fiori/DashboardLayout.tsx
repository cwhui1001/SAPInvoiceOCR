'use client';

import React, { useState } from 'react';
import FioriNavigation from './Navigation';
import FioriShellBar from './ShellBar';

interface FioriDashboardLayoutProps {
  children: React.ReactNode;
}

export function FioriDashboardLayout({ children }: FioriDashboardLayoutProps) {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setSideNavCollapsed(!sideNavCollapsed);
  };

  return (
    <div
      className="sap-fiori-shell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}
    >
      {/* Shell Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #354a5f 0%, #2c3e50 100%)',
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        }}
      >
        <FioriShellBar
          showMenuButton={true}
          onMenuButtonClick={handleMenuToggle}
        />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Side Navigation */}
        <div
          className="sap-fiori-nav"
          style={{
            width: sideNavCollapsed ? '60px' : '280px',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(180deg, #354a5f 0%, #2c3e50 100%)',
            boxShadow: '2px 0 16px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
          }}
        >
          <FioriNavigation collapsed={sideNavCollapsed} />
        </div>

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            padding: '32px',
            overflow: 'auto',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            position: 'relative',
          }}
        >
          {/* Content Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 112, 243, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FioriDashboardLayout;
