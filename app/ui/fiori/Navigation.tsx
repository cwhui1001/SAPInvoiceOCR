'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  CogIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import { useIsSuperadmin } from '@/app/hooks/useRole';
import { signOut } from '@/app/dashboard/account/actions';
import AcmeLogo from '@/app/ui/acme-logo';

// Navigation items configuration
const navigationItems = [
  { 
    key: 'home', 
    text: 'Home', 
    href: '/dashboard', 
    icon: 'home',
  },
  {
    key: 'invoices',
    text: 'Invoices',
    href: '/dashboard/invoices',
    icon: 'document',
  },
  { 
    key: 'profile', 
    text: 'Profile', 
    href: '/dashboard/account', 
    icon: 'person-placeholder',
  },
];

const superadminItems = [
  { 
    key: 'admin', 
    text: 'Admin Management', 
    href: '/dashboard/admin-management', 
    icon: 'settings',
  },
];

interface FioriNavigationProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function FioriNavigation({ collapsed = false, onToggle }: FioriNavigationProps) {
  const pathname = usePathname();
  const isSuperadmin = useIsSuperadmin();

  const allItems = [...navigationItems, ...(isSuperadmin ? superadminItems : [])];

  return (
    <div className="fiori-shell">
      {/* Logo Section */}
      <div className="fiori-shell__header">
        <Link
          href="/"
          className="fiori-shell__logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--sap-spacing-medium)',
            backgroundColor: 'var(--sap-brand-color)',
            color: '#ffffff',
            textDecoration: 'none',
            minHeight: '3rem',
          }}
        >
          <AcmeLogo />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav
        style={{
          height: 'calc(100vh - 3rem)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Navigation Header */}
        {!collapsed && (
          <div style={{
            padding: '16px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '16px',
          }}>
            <h3 style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              margin: 0,
              opacity: 0.9,
              letterSpacing: '0.5px',
            }}>
              NAVIGATION
            </h3>
          </div>
        )}

        {allItems.map((item) => {
          const isActive = pathname === item.href;
          const iconMap: { [key: string]: string } = {
            'home': '🏠',
            'invoices': '📄',
            'profile': '👤',
            'admin': '⚙️',
          };

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`sap-fiori-nav-item ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: collapsed ? '16px 12px' : '16px 20px',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                position: 'relative',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <span style={{
                fontSize: '18px',
                marginRight: collapsed ? '0' : '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
              }}>
                {iconMap[item.key] || '📄'}
              </span>
              {!collapsed && (
                <span style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  letterSpacing: '0.3px',
                }}>
                  {item.text}
                </span>
              )}
              {isActive && !collapsed && (
                <span style={{
                  marginLeft: 'auto',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                }} />
              )}
            </Link>
          );
        })}

        {/* Sign Out Button */}
        <div style={{ marginTop: 'auto', padding: 'var(--sap-spacing-medium)' }}>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                width: '100%',
                color: '#ffffff',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--sap-border-radius-medium)',
                padding: 'var(--sap-spacing-medium)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <span style={{ marginRight: collapsed ? '0' : 'var(--sap-spacing-small)' }}>
                🚪
              </span>
              {!collapsed && 'Sign Out'}
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

// Legacy compatibility component
export function FioriSideNav() {
  return <FioriNavigation />;
}

export default FioriNavigation;
