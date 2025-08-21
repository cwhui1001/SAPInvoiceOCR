import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sap-fiori-shell flex h-screen">
      {/* SAP Fiori Side Navigation */}
      <div className="sap-fiori-nav">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="sap-fiori-content-with-sidebar">
        {children}
      </div>
    </div>
  );
}