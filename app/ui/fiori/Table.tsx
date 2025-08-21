'use client';

import React from 'react';
import { 
  Table as UI5Table, 
  TableColumn, 
  TableRow, 
  TableCell 
} from '@ui5/webcomponents-react';
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
    <UI5Table
      className={tableClasses}
      stickyColumnHeader={stickyColumnHeader}
      {...rest}
    >
      {/* Table Header */}
      {columns.map((column) => (
        <TableColumn
          key={column.key}
          style={{
            width: column.width,
            minWidth: column.minWidth,
          }}
        >
          <span className="fiori-table__header-text">
            {column.header}
          </span>
        </TableColumn>
      ))}

      {/* Table Rows */}
      {data.map((row, index) => (
        <TableRow
          key={index}
          className="fiori-table__row"
          onClick={() => handleRowClick(row, index)}
        >
          {columns.map((column) => (
            <TableCell
              key={`${index}-${column.key}`}
              className="fiori-table__cell"
            >
              {row[column.key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </UI5Table>
  );
}

export default FioriTable;
