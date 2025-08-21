import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SAP Business One Style Side Navigation */}
      <div className="w-64 flex-shrink-0">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
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