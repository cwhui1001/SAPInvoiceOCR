// .NET Web API Client
export interface ApiResponse<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
  error?: string;
}

class NetApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5251/api/v1';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    // Add authentication token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    console.log(`[NetAPI] ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[NetAPI] Error ${response.status}:`, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      // Handle empty responses (like DELETE operations)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log(`[NetAPI] Response:`, result);
        return result;
      } else {
        return {} as T;
      }
    } catch (error) {
      console.error(`[NetAPI] Request failed:`, error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('netapi_token') || localStorage.getItem('auth_token');
    }
    return null;
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('netapi_token', token);
    }
  }

  public clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('netapi_token');
      localStorage.removeItem('auth_token');
    }
  }

  // Purchase Invoice API Methods (matching your exact .NET controller)
  public async addInvoice(invoiceData: any): Promise<any> {
    return this.request('/PurchaseInvoice/Add', {
      method: 'POST',
      body: JSON.stringify(invoiceData),
    });
  }

  // You'll need to add these endpoints to your .NET API
  public async getAllInvoices(queryParams?: {
    query?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/PurchaseInvoice/GetAll${params.toString() ? `?${params.toString()}` : ''}`);
  }

  public async getInvoiceById(id: string): Promise<ApiResponse> {
    return this.request(`/PurchaseInvoice/GetById/${id}`);
  }

  public async updateInvoice(id: string, invoiceData: any): Promise<ApiResponse> {
    return this.request(`/PurchaseInvoice/Update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(invoiceData),
    });
  }

  public async deleteInvoice(id: string): Promise<ApiResponse> {
    return this.request(`/PurchaseInvoice/Delete/${id}`, {
      method: 'DELETE',
    });
  }

  // File Upload Methods (matching your exact Upload controller)
  public async uploadFiles(files: File[], additionalData?: Record<string, string>): Promise<any> {
    const formData = new FormData();
    
    // Add all files to formData (your .NET controller expects List<IFormFile> files parameter)
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const token = this.getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log(`[NetAPI] Uploading to /Upload/Add with ${files.length} files`);

    return fetch(`${this.baseUrl}/Upload/Add`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(async response => {
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[NetAPI] Upload failed:`, errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return { success: true }; // For non-JSON responses
      }
    });
  }

  // Authentication Methods (you might need to add these to your .NET API)
  public async login(credentials: { username: string; password: string }): Promise<ApiResponse> {
    return this.request('/Auth/Login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  public async logout(): Promise<void> {
    try {
      await this.request('/Auth/Logout', { method: 'POST' });
    } finally {
      this.clearAuthToken();
    }
  }

  public async getCurrentUser(): Promise<ApiResponse> {
    return this.request('/Auth/Me');
  }

  // Health check method
  public async healthCheck(): Promise<boolean> {
    try {
      // Try to ping a simple endpoint
      await fetch(`${this.baseUrl.replace('/api/v1', '')}/swagger/index.html`, {
        method: 'HEAD',
      });
      return true;
    } catch (error) {
      console.error('[NetAPI] Health check failed:', error);
      return false;
    }
  }

  // Get base URL for debugging
  public getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Export singleton instance
const netApiClient = new NetApiClient();
export default netApiClient;