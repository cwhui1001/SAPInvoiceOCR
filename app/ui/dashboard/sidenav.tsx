import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SAPBusinessOneLogo from '@/app/ui/sap-business-one-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/dashboard/account/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: '#6c757d' }}>
      {/* Logo Section */}
      <Link
        className="flex h-20 items-center justify-center border-b border-white/10 bg-[#5a6268] px-4"
        href="/"
      >
        <SAPBusinessOneLogo
          width={180}
          height={36}
        />
      </Link>

      {/* Navigation Section */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <NavLinks />
        </div>
      </div>

      {/* Sign Out Section */}
      <div className="p-4 border-t border-white/10">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <PowerIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
