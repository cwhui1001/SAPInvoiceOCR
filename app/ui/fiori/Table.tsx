'use client';

import React from 'react';
import clsx from 'clsx';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
}

interface FioriTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  selectable?: boolean;
  multiSelect?: boolean;
  onRowClick?: (row: any, index: number) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  loading?: boolean;
  emptyMessage?: string;
  stickyColumnHeader?: boolean;
}

export function FioriTable({
  columns,
  data,
  className,
  selectable = false,
  multiSelect = false,
  onRowClick,
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  stickyColumnHeader = true,
  ...rest
}: FioriTableProps) {
  const tableClasses = clsx(
    'fiori-table',
    {
      'fiori-table--selectable': selectable,
      'fiori-table--loading': loading,
    },
    className
  );

  const handleRowClick = (row: any, index: number) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  if (loading) {
    return (
      <div className={tableClasses}>
        <div className="fiori-table__loading">
          Loading...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={tableClasses}>
        <div className="fiori-table__empty">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={tableClasses}>
      {/* Table Header */}
      <div className="fiori-table__header">
        {columns.map((column) => (
          <div
            key={column.key}
            className="fiori-table__header-cell"
            style={{
              width: column.width,
              minWidth: column.minWidth,
            }}
          >
            <span className="fiori-table__header-text">
              {column.header}
            </span>
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="fiori-table__body">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="fiori-table__row">
            {columns.map((column) => (
              <div
                key={column.key}
                className="fiori-table__cell"
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                }}
              >
                {row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FioriTable;
