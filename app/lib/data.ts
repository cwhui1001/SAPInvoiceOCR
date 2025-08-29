// Hybrid data access layer - switches between Supabase and .NET API
import {
  fetchCardData as fetchCardDataSupabase,
  fetchFilteredInvoices as fetchFilteredInvoicesSupabase,
  fetchInvoicesPages as fetchInvoicesPagesSupabase,
  fetchInvoiceById as fetchInvoiceByIdSupabase,
  fetchCustomers as fetchCustomersSupabase,
  fetchFilteredCustomers as fetchFilteredCustomersSupabase,
  fetchCategoryTotals as fetchCategoryTotalsSupabase,
  fetchUsersWithUploads as fetchUsersWithUploadsSupabase,
  fetchUserCategoryTotals as fetchUserCategoryTotalsSupabase,
  fetchTopUploaders as fetchTopUploadersSupabase,
} from './data-supabase';

import {
  fetchCardData as fetchCardDataNetAPI,
  fetchFilteredInvoices as fetchFilteredInvoicesNetAPI,
  fetchInvoicesPages as fetchInvoicesPagesNetAPI,
  fetchInvoiceById as fetchInvoiceByIdNetAPI,
  fetchCustomers as fetchCustomersNetAPI,
  fetchFilteredCustomers as fetchFilteredCustomersNetAPI,
  fetchCategoryTotals as fetchCategoryTotalsNetAPI,
  fetchUsersWithUploads as fetchUsersWithUploadsNetAPI,
  fetchUserCategoryTotals as fetchUserCategoryTotalsNetAPI,
  fetchTopUploaders as fetchTopUploadersNetAPI,
  addInvoice as addInvoiceNetAPI,
  uploadFiles as uploadFilesNetAPI,
} from './data-netapi';

// Get database type from environment
const DATABASE_TYPE = process.env.DATABASE_TYPE || 'supabase';
const ITEMS_PER_PAGE = 6;

console.log(`[DataLayer] Using ${DATABASE_TYPE} as data source`);

// Export functions that switch based on DATABASE_TYPE
export const fetchCardData = DATABASE_TYPE === 'netapi' ? fetchCardDataNetAPI : fetchCardDataSupabase;
export const fetchFilteredInvoices = DATABASE_TYPE === 'netapi' ? fetchFilteredInvoicesNetAPI : fetchFilteredInvoicesSupabase;
export const fetchInvoicesPages = DATABASE_TYPE === 'netapi' ? fetchInvoicesPagesNetAPI : fetchInvoicesPagesSupabase;
export const fetchInvoiceById = DATABASE_TYPE === 'netapi' ? fetchInvoiceByIdNetAPI : fetchInvoiceByIdSupabase;
export const fetchCustomers = DATABASE_TYPE === 'netapi' ? fetchCustomersNetAPI : fetchCustomersSupabase;
export const fetchFilteredCustomers = DATABASE_TYPE === 'netapi' ? fetchFilteredCustomersNetAPI : fetchFilteredCustomersSupabase;
export const fetchCategoryTotals = DATABASE_TYPE === 'netapi' ? fetchCategoryTotalsNetAPI : fetchCategoryTotalsSupabase;
export const fetchUsersWithUploads = DATABASE_TYPE === 'netapi' ? fetchUsersWithUploadsNetAPI : fetchUsersWithUploadsSupabase;
export const fetchUserCategoryTotals = DATABASE_TYPE === 'netapi' ? fetchUserCategoryTotalsNetAPI : fetchUserCategoryTotalsSupabase;
export const fetchTopUploaders = DATABASE_TYPE === 'netapi' ? fetchTopUploadersNetAPI : fetchTopUploadersSupabase;

// .NET API specific functions
export const addInvoice = addInvoiceNetAPI;
export const uploadFiles = uploadFilesNetAPI;

// Export updateInvoiceStatus function (assuming it's used)
export async function updateInvoiceStatus(invoiceId: string, newStatus: string) {
  try {
    const supabase = await createAdminClient();

    // Map UI status (lowercase) to database status (capitalized)
    const dbStatus = newStatus.toLowerCase() === 'done' ? 'Done' : 'Pending';

    console.log('Updating invoice status:', { invoiceId, newStatus, dbStatus });

    const { data, error } = await supabase
      .from('OINV')
      .update({
        Status: dbStatus,
      })
      .eq('DocNum', invoiceId)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Update successful:', data);
    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating invoice status:', error);
    throw error;
  }
}

// Assuming createAdminClient and revalidatePath are available (e.g., from Next.js or Supabase utils)
import { createAdminClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';