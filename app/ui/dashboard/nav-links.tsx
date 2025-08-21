'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useIsSuperadmin } from '@/app/hooks/useRole';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  
  { name: 'Profile', href: '/dashboard/account', icon: UserIcon },
];

// Superadmin-only links
const superadminLinks = [
  { name: 'Admin Management', href: '/dashboard/admin-management', icon: CogIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const isSuperadmin = useIsSuperadmin();

  // Debug logging
  console.log('Navigation - isSuperadmin:', isSuperadmin);

  return (
    <>
      {/* Main Navigation Links */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-white/15 text-white border-l-4 border-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <LinkIcon className="w-5 h-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}

      {/* Superadmin Links */}
      {isSuperadmin && (
        <>
          <div className="border-t border-white/10 my-4 pt-4">
            <p className="text-white/60 text-xs uppercase tracking-wider px-4 mb-2">
              Administration
            </p>
            {superadminLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-white/15 text-white border-l-4 border-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
