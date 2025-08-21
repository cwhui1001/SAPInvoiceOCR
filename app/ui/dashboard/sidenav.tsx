import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SAPBusinessOneLogo from '@/app/ui/sap-business-one-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/dashboard/account/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo Section */}
      <Link
        className="flex h-16 items-center justify-start px-6 border-b border-gray-100"
        href="/"
      >
        <SAPBusinessOneLogo
          width={140}
          height={28}
        />
      </Link>

      {/* Navigation Section */}
      <div className="flex-1 py-6">
        <div className="space-y-1">
          <NavLinks />
        </div>
      </div>

      {/* Sign Out Section */}
      <div className="p-4 border-t border-gray-100">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <PowerIcon className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
