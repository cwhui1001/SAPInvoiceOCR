'use client';

import React from 'react';
import { signOut } from '@/app/dashboard/account/actions';

interface FioriShellBarProps {
  primaryTitle?: string;
  secondaryTitle?: string;
  logo?: React.ReactNode;
  showMenuButton?: boolean;
  onMenuButtonClick?: () => void;
  userDisplayName?: string;
  userInitials?: string;
  userImage?: string;
}

export function FioriShellBar({
  primaryTitle = 'Invoice Management',
  secondaryTitle,
  logo,
  showMenuButton = true,
  onMenuButtonClick,
  userDisplayName = 'User',
  userInitials = 'U',
  userImage,
}: FioriShellBarProps) {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--sap-shell-background-color)',
        borderBottom: '1px solid var(--sap-list-border-color)',
        padding: 'var(--sap-spacing-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#ffffff',
        minHeight: '3rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sap-spacing-medium)' }}>
        {showMenuButton && (
          <button
            onClick={onMenuButtonClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            ☰
          </button>
        )}
        <h1 style={{ margin: 0, fontSize: 'var(--sap-font-size-large)', fontWeight: '600' }}>
          {primaryTitle}
        </h1>
        {secondaryTitle && (
          <span style={{ fontSize: 'var(--sap-font-size-medium)', opacity: 0.8 }}>
            {secondaryTitle}
          </span>
        )}
      </div>

      {/* User Profile Menu */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleUserMenuToggle}
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'var(--sap-brand-color)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--sap-font-size-small)',
            fontWeight: '600',
          }}
        >
          {userInitials}
        </button>

        {/* User Menu Dropdown */}
        {userMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: 'var(--sap-tile-background-color)',
              border: '1px solid var(--sap-list-border-color)',
              borderRadius: 'var(--sap-border-radius-medium)',
              boxShadow: 'var(--sap-shadow-level2)',
              minWidth: '200px',
              zIndex: 1000,
              marginTop: 'var(--sap-spacing-small)',
            }}
          >
            <button
              onClick={() => {
                setUserMenuOpen(false);
                window.location.href = '/dashboard/account';
              }}
              style={{
                width: '100%',
                padding: 'var(--sap-spacing-medium)',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: '1px solid var(--sap-list-border-color)',
              }}
            >
              Profile Settings
            </button>
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: 'var(--sap-spacing-medium)',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--sap-negative-color)',
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default FioriShellBar;
