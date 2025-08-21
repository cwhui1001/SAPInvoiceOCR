'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Button as UI5Button,
  Dialog,
  Text,
  Title,
  MessageStrip
} from '@ui5/webcomponents-react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteInvoice } from '@/app/lib/actions';

export function FioriCreateInvoice() {
  return (
    <Link href="/dashboard/invoices/create">
      <UI5Button
        design="Emphasized"
        icon="add"
        style={{
          backgroundColor: 'var(--sap-button-emphasized-background)',
          borderColor: 'var(--sap-button-emphasized-border-color)',
          color: 'var(--sap-button-emphasized-text-color)',
        }}
      >
        <span className="hidden md:inline">Create Invoice</span>
        <span className="md:hidden">Create</span>
      </UI5Button>
    </Link>
  );
}

export function FioriUpdateInvoice({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/invoices/${id}/edit`}>
      <UI5Button
        design="Transparent"
        icon="edit"
        tooltip="Edit Invoice"
        style={{
          color: 'var(--sap-brand-color)',
          minWidth: '2.5rem',
          padding: '0.5rem',
        }}
      />
    </Link>
  );
}

interface FioriDeleteInvoiceProps {
  id: string;
  onModalStateChange?: (isOpen: boolean) => void;
}

export function FioriDeleteInvoice({ id, onModalStateChange }: FioriDeleteInvoiceProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowConfirmation = (show: boolean) => {
    setShowConfirmation(show);
    onModalStateChange?.(show);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await deleteInvoice(id);
      setShowConfirmation(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete invoice');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <UI5Button
        design="Transparent"
        icon="delete"
        tooltip="Delete Invoice"
        onClick={() => handleShowConfirmation(true)}
        style={{
          color: 'var(--sap-negative-color)',
          minWidth: '2.5rem',
          padding: '0.5rem',
        }}
      />

      <Dialog
        open={showConfirmation}
        onAfterClose={() => handleShowConfirmation(false)}
        headerText="Confirm Deletion"
        style={{
          width: '400px',
        }}
      >
        <div style={{ padding: 'var(--sap-spacing-medium)' }}>
          <Text style={{ marginBottom: 'var(--sap-spacing-medium)' }}>
            Are you sure you want to delete this invoice? This action cannot be undone.
          </Text>
          
          {error && (
            <MessageStrip
              design="Negative"
              style={{ marginBottom: 'var(--sap-spacing-medium)' }}
            >
              {error}
            </MessageStrip>
          )}
        </div>

        <div 
          slot="footer"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--sap-spacing-small)',
            padding: 'var(--sap-spacing-medium)',
          }}
        >
          <UI5Button
            design="Transparent"
            onClick={() => handleShowConfirmation(false)}
            disabled={isDeleting}
          >
            Cancel
          </UI5Button>
          <UI5Button
            design="Emphasized"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              backgroundColor: 'var(--sap-negative-color)',
              borderColor: 'var(--sap-negative-color)',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </UI5Button>
        </div>
      </Dialog>
    </>
  );
}

// Legacy compatibility exports
export { FioriCreateInvoice as CreateInvoice };
export { FioriUpdateInvoice as UpdateInvoice };
export { FioriDeleteInvoice as DeleteInvoice };

export default {
  CreateInvoice: FioriCreateInvoice,
  UpdateInvoice: FioriUpdateInvoice,
  DeleteInvoice: FioriDeleteInvoice,
};
