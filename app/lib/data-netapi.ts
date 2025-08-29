// Data access layer for your existing .NET Web API
import netApiClient from '@/utils/netapi/client';
import { formatCurrency, parseStringToDate } from './utils';

// Transform .NET API response to match your existing data structure
const transformInvoiceData = (apiInvoice: any) => ({
  id: apiInvoice.docNum || apiInvoice.id,
  customer_id: apiInvoice.custCode || apiInvoice.docNum,
  name: apiInvoice.custName || 'Unknown Customer',
  email: '',
  image_url: '/customers/default-avatar.png',
  docNum: apiInvoice.docNum,
  date: parseStringToDate(apiInvoice.docDate) || new Date(),
  amount: apiInvoice.totalwithGST || apiInvoice.totalb4GST || 0,
  status: apiInvoice.status === 'Done' ? 'done' : 'pending',
  pdf_url: apiInvoice.pdfUrl || null,
  delivery_date: apiInvoice.deliveryDate ? parseStringToDate(apiInvoice.deliveryDate) : null,
  upload_date: apiInvoice.createdAt ? parseStringToDate(apiInvoice.createdAt) : null,
  uploader_username: apiInvoice.uploaderUsername || null,
  has_uploaded_pdf: !!apiInvoice.pdfUrl,
});

// Add new invoice using your existing PurchaseInvoice/Add endpoint
export async function addInvoice(invoiceData: any) {
  try {
    console.log('[NetAPI] Adding new invoice...');
    
    const response = await netApiClient.addInvoice(invoiceData);
    
    if (!response || response.error) {
      throw new Error(response?.error || 'Failed to add invoice');
    }

    return response; // Your API returns the created invoice
  } catch (error) {
    console.error('[NetAPI] Error adding invoice:', error);
    throw error;
  }
}

// Upload files using your existing Upload/Add endpoint
export async function uploadFiles(files: File[], additionalData?: Record<string, string>) {
  try {
    console.log(`[NetAPI] Uploading ${files.length} files...`);
    
    const response = await netApiClient.uploadFiles(files, additionalData);
    
    return response; // Return whatever your Upload/Add endpoint returns
  } catch (error) {
    console.error('[NetAPI] Error uploading files:', error);
    throw error;
  }
}

// For functions that don't exist in your API yet, we'll return placeholder data
// You can add these endpoints to your .NET API later

export async function fetchCardData() {
  try {
    // You'll need to add a dashboard/stats endpoint to your .NET API
    // For now, return default values
    console.log('[NetAPI] Card data endpoint not implemented yet');
    return {
      numberOfInvoices: 0,
      numberOfPendingInvoices: 0,
      totalRevenue: 0,
    };
  } catch (error) {
    console.error('[NetAPI] Error fetching card data:', error);
    throw new Error('Failed to fetch card data from .NET API');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
  status?: string,
  dateFrom?: string,
  dateTo?: string,
  amountMin?: string,
  amountMax?: string,
  userRole?: string,
  currentUsername?: string,
  filterByUser?: string
) {
  try {
    console.log('[NetAPI] Get invoices endpoint not implemented yet');
    // You'll need to add a GET endpoint to PurchaseInvoiceController
    return [];
  } catch (error) {
    console.error('[NetAPI] Error fetching filtered invoices:', error);
    throw new Error('Failed to fetch invoices from .NET API');
  }
}

export async function fetchInvoiceById(docNum: string) {
  try {
    console.log('[NetAPI] Get invoice by ID endpoint not implemented yet');
    // You'll need to add a GET by ID endpoint to PurchaseInvoiceController
    throw new Error('Get invoice by ID not implemented in .NET API');
  } catch (error) {
    console.error('[NetAPI] Error fetching invoice by ID:', error);
    throw error;
  }
}

export async function fetchInvoicesPages(query: string) {
  console.log('[NetAPI] Pagination endpoint not implemented yet');
  return 1; // Default value
}

export async function updateInvoiceStatus(invoiceId: string, newStatus: string) {
  try {
    console.log('[NetAPI] Update invoice status endpoint not implemented yet');
    // You'll need to add an UPDATE endpoint to PurchaseInvoiceController
    throw new Error('Update invoice status not implemented in .NET API');
  } catch (error) {
    console.error('[NetAPI] Error updating invoice status:', error);
    throw error;
  }
}

export async function deleteInvoice(invoiceId: string, shouldRedirect: boolean = true) {
  try {
    console.log('[NetAPI] Delete invoice endpoint not implemented yet');
    // You'll need to add a DELETE endpoint to PurchaseInvoiceController
    throw new Error('Delete invoice not implemented in .NET API');
  } catch (error) {
    console.error('[NetAPI] Error deleting invoice:', error);
    throw error;
  }
}

// Placeholder functions for features that need .NET API endpoints
export async function fetchCustomers() { return []; }
export async function fetchFilteredCustomers(query: string) { return []; }
export async function fetchCategoryTotals() { return [{ Category: 'No Data', TotalAmount: 0 }]; }
export async function fetchUsersWithUploads() { return []; }
export async function fetchUserCategoryTotals(username: string) { return [{ Category: 'No Data', TotalAmount: 0 }]; }
export async function fetchTopUploaders() { return []; }