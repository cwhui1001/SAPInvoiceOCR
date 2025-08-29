'use client';

import { useState } from 'react';
import netApiClient from '@/utils/netapi/client';

export default function TestNetApi() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string>('');

  const testConnection = async () => {
    setLoading(true);
    try {
      const connected = await netApiClient.healthCheck();
      setIsConnected(connected);
      console.log('API Base URL:', netApiClient.getBaseUrl());
    } catch (error) {
      setIsConnected(false);
      console.error('Connection test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const testUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);
    setLoading(true);
    setUploadResult('');

    try {
      const result = await netApiClient.uploadFiles(files);
      setUploadResult(`Upload successful: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setUploadResult(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const testAddInvoice = async () => {
    setLoading(true);
    try {
      const testInvoice = {
        docNum: `TEST-${Date.now()}`,
        custName: 'Test Customer',
        totalwithGST: 100.50,
        status: 'Pending'
      };
      
      const result = await netApiClient.addInvoice(testInvoice);
      setUploadResult(`Add invoice successful: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setUploadResult(`Add invoice failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">.NET API Connection Test</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>API Base URL:</strong> {netApiClient.getBaseUrl()}</p>
          <p><strong>Current DATABASE_TYPE:</strong> {process.env.DATABASE_TYPE || 'supabase'}</p>
        </div>

        <button 
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>

        {isConnected !== null && (
          <div className={`p-3 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isConnected ? '✅ Connected to .NET API' : '❌ Cannot connect to .NET API'}
          </div>
        )}

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Test Upload Endpoint</h3>
          <input 
            type="file" 
            multiple 
            onChange={testUpload}
            disabled={loading}
            className="mb-2"
          />
          <p className="text-sm text-gray-600">Select files to test your Upload/Add endpoint</p>
        </div>

        <button 
          onClick={testAddInvoice}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Add Invoice'}
        </button>

        {uploadResult && (
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Result:</h4>
            <pre className="text-sm overflow-x-auto">{uploadResult}</pre>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">Next Steps:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>1. Make sure your .NET API is running on http://localhost:5251</li>
          <li>2. Test the connection first</li>
          <li>3. Try uploading a file to test your Upload/Add endpoint</li>
          <li>4. Try adding a test invoice to test your PurchaseInvoice/Add endpoint</li>
          <li>5. Change DATABASE_TYPE=netapi in .env.local to switch to .NET API</li>
        </ul>
      </div>
    </div>
  );
}