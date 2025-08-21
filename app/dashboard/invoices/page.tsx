import { Suspense } from 'react';
import { InvoiceSearch } from '@/app/ui/invoices/search';
import { StatusFilter } from '@/app/ui/invoices/status-filter-individual';
import { DateRangeFilter } from '@/app/ui/invoices/date-range-filter';
import { AmountRangeFilter } from '@/app/ui/invoices/amount-range-filter';
import { UserFilter } from '@/app/ui/invoices/user-filter';
import InvoicesTable from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { fetchFilteredInvoices, fetchInvoicesPages, fetchUsersWithUploads } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import UploadButton from '@/app/ui/invoices/upload-button';
import RefreshButton from '@/app/ui/invoices/refresh-button';
import { createClient } from '@/utils/supabase/server';

// Define the Invoice type (move to definitions.ts if not already there)
interface Invoice {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  docNum: string;
  date: Date;
  amount: string; // Formatted currency
  status: 'done' | 'pending';
  pdf_url: string | null;
  delivery_date: Date | null;
}

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    amountMin?: string;
    amountMax?: string;
    user?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const status = params?.status || '';
  const dateFrom = params?.dateFrom || '';
  const dateTo = params?.dateTo || '';
  const amountMin = params?.amountMin || '';
  const amountMax = params?.amountMax || '';
  const filterByUser = params?.user || '';
  const currentPage = Number(params?.page) || 1;

  // Get current user and role
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let userRole = '';
  let currentUsername = '';
  
  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('role, username')
      .eq('id', user.id)
      .single();
    
    if (profileData) {
      userRole = profileData.role || '';
      currentUsername = profileData.username || '';
    }
  }

  // Get users with uploads for the user filter (only for superadmin)
  let usersWithUploads: { username: string; displayName: string }[] = [];
  if (userRole === 'superadmin') {
    try {
      const users = await fetchUsersWithUploads();
      usersWithUploads = users
        .filter(u => u.username) // Only users with usernames
        .map(u => ({
          username: u.username,
          displayName: u.display_name || u.username
        }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const [invoices, totalPages] = await Promise.all([
    fetchFilteredInvoices(query, currentPage, status, dateFrom, dateTo, amountMin, amountMax, userRole, currentUsername, filterByUser) as Promise<Invoice[]>,
    fetchInvoicesPages(query),
  ]);

  return (
    <div className="w-full responsive-main" style={{ padding: '25px' , backgroundColor: '#faf9f9ff' }}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="responsive-title text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="responsive-subtitle mt-2 text-sm text-gray-600">
              Manage your invoices and track payments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RefreshButton />
            <UploadButton />
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <InvoiceSearch placeholder="Search invoices..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <StatusFilter />
              <DateRangeFilter />
              <AmountRangeFilter />
              {userRole === 'superadmin' && usersWithUploads.length > 0 && (
                <UserFilter users={usersWithUploads} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-6">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <InvoicesTable
            invoices={invoices.map((invoice) => ({
              ...invoice,
              amount: Number(
                typeof invoice.amount === 'string'
                  ? invoice.amount.replace(/[^0-9.-]+/g, '')
                  : invoice.amount
              ),
            }))}
          />
        </Suspense>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}