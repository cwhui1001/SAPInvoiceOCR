import { CardWrapper, Card } from '@/app/ui/dashboard/cards';
import { inter } from '@/app/ui/fonts';
import { fetchCardData, fetchCategoryTotals, fetchUsersWithUploads, fetchTopUploaders } from '@/app/lib/data';
import CategoryPieChart from '@/app/ui/dashboard/CategoryPieChart';
import UserCategoryPieChart from '@/app/ui/dashboard/UserCategoryPieChart';
import TopUploaders from '@/app/ui/dashboard/TopUploaders';

export default async function Page() {
  console.log('Starting Page render');
  const { numberOfInvoices, numberOfPendingInvoices } = await fetchCardData();
  const categoryTotals = await fetchCategoryTotals();
  const usersWithUploads = await fetchUsersWithUploads();
  const topUploaders = await fetchTopUploaders();

  return (
    <main>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#32363a', margin: '0 0 4px 0' }}>
          SAP Business One - Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#6a6d70', margin: 0 }}>
          Invoice Management System - Key metrics and insights
        </p>
      </div>
      {/* Key Metrics Row */}
      <div className="sap-grid sap-grid-4" style={{ marginBottom: '24px' }}>
          {/* Total Invoices Card */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">Total Invoices</h3>
              <p className="sap-fiori-card-subtitle">All time</p>
            </div>
            <div className="sap-fiori-card-content">
              <div className="sap-metric">
                <div className="sap-metric-value">{numberOfInvoices}</div>
                <div className="sap-metric-change positive">+12% vs last month</div>
              </div>
            </div>
          </div>

          {/* Pending Invoices Card */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">Pending Invoices</h3>
              <p className="sap-fiori-card-subtitle">Awaiting approval</p>
            </div>
            <div className="sap-fiori-card-content">
              <div className="sap-metric">
                <div className="sap-metric-value">{numberOfPendingInvoices}</div>
                <div className="sap-metric-change negative">+3 vs yesterday</div>
              </div>
            </div>
          </div>

          {/* Total Value Card */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">Total Value</h3>
              <p className="sap-fiori-card-subtitle">This month</p>
            </div>
            <div className="sap-fiori-card-content">
              <div className="sap-metric">
                <div className="sap-metric-value">€47.2<span className="sap-metric-unit">K</span></div>
                <div className="sap-metric-change positive">+8.5% vs last month</div>
              </div>
            </div>
          </div>

          {/* Average Processing Time Card */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">Avg Processing Time</h3>
              <p className="sap-fiori-card-subtitle">Last 30 days</p>
            </div>
            <div className="sap-fiori-card-content">
              <div className="sap-metric">
                <div className="sap-metric-value">2.4<span className="sap-metric-unit">days</span></div>
                <div className="sap-metric-change positive">-0.3 days vs last month</div>
              </div>
            </div>
          </div>
        </div>

      {/* Charts Row */}
      <div className="sap-grid sap-grid-2">
          {/* Category Distribution Chart */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">Invoice Categories</h3>
              <p className="sap-fiori-card-subtitle">Distribution by category</p>
            </div>
            <div className="sap-fiori-card-content">
              <CategoryPieChart categoryTotals={categoryTotals} />
            </div>
          </div>

          {/* User Activity Chart */}
          <div className="sap-fiori-card">
            <div className="sap-fiori-card-header">
              <h3 className="sap-fiori-card-title">User Activity</h3>
              <p className="sap-fiori-card-subtitle">Uploads by user and category</p>
            </div>
            <div className="sap-fiori-card-content">
              <UserCategoryPieChart users={usersWithUploads} />
            </div>
          </div>
        </div>

      {/* Top Uploaders */}
      <div className="sap-fiori-card" style={{ marginTop: '16px' }}>
        <div className="sap-fiori-card-header">
          <h3 className="sap-fiori-card-title">Top Contributors</h3>
          <p className="sap-fiori-card-subtitle">Most active users this month</p>
        </div>
        <div className="sap-fiori-card-content">
          <TopUploaders uploaders={topUploaders} />
        </div>
      </div>
    </main>
  );
}