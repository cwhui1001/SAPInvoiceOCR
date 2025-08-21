'use client';

import React from 'react';
import { 
  Card as UI5Card, 
  CardHeader, 
  NumericHeader,
  Icon,
  Title,
  Text
} from '@ui5/webcomponents-react';
import { 
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

interface FioriCardWrapperProps {
  totalInvoices: number;
  totalPending: number;
  invoiceTrend: number[];
  pendingTrend: number[];
}

export function FioriCardWrapper({
  totalInvoices,
  totalPending,
  invoiceTrend,
  pendingTrend,
}: FioriCardWrapperProps) {
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--sap-spacing-large)',
        width: '100%',
        marginBottom: 'var(--sap-spacing-large)',
      }}
    >
      <FioriCard 
        title="Total Invoices" 
        value={totalInvoices} 
        type="invoices" 
        trendData={invoiceTrend} 
      />
      <FioriCard 
        title="Pending Invoices" 
        value={totalPending} 
        type="pending" 
        trendData={pendingTrend} 
      />
    </div>
  );
}

interface FioriCardProps {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
  trendData: number[];
}

export function FioriCard({
  title,
  value,
  type,
  trendData,
}: FioriCardProps) {
  const Icon = iconMap[type];

  const variants = {
    invoices: { 
      color: 'var(--sap-information-color)',
      backgroundColor: '#ebf8ff',
      icon: 'document',
    },
    customers: { 
      color: 'var(--sap-positive-color)',
      backgroundColor: '#f0fff4',
      icon: 'group',
    },
    pending: { 
      color: 'var(--sap-critical-color)',
      backgroundColor: '#fffbeb',
      icon: 'pending',
    },
    collected: { 
      color: 'var(--sap-brand-color)',
      backgroundColor: '#eff6ff',
      icon: 'money-bills',
    },
  };

  const variant = variants[type] || {
    color: 'var(--sap-neutral-color)',
    backgroundColor: '#f9fafb',
    icon: 'document',
  };

  // Prepare chart data
  const chartData = trendData.map((value, index) => ({
    name: `${index + 1}`,
    value,
  }));

  // Calculate percentage change
  const percentageChange = trendData.length > 1 
    ? ((trendData[trendData.length - 1] - trendData[0]) / trendData[0]) * 100
    : 0;

  const isPositive = percentageChange >= 0;

  return (
    <UI5Card
      style={{
        backgroundColor: 'var(--sap-tile-background-color)',
        border: '1px solid var(--sap-list-border-color)',
        borderRadius: 'var(--sap-border-radius-large)',
        boxShadow: 'var(--sap-shadow-level1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--sap-shadow-level2)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--sap-shadow-level1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <CardHeader
        titleText={title}
        style={{
          padding: 'var(--sap-spacing-medium)',
          borderBottom: '1px solid var(--sap-list-border-color)',
        }}
      />
      
      <div style={{ padding: 'var(--sap-spacing-medium)' }}>
        {/* Main Value and Icon */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--sap-spacing-medium)',
          }}
        >
          <div>
            <Title 
              level="H2"
              style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: variant.color,
                margin: 0,
              }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Title>
          </div>
          
          <div 
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: variant.backgroundColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Icon && (
              <Icon 
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  color: variant.color,
                }}
              />
            )}
          </div>
        </div>

        {/* Trend Indicator */}
        {trendData.length > 1 && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sap-spacing-small)',
              marginBottom: 'var(--sap-spacing-medium)',
            }}
          >
            {isPositive ? (
              <ArrowUpIcon 
                style={{
                  width: '1rem',
                  height: '1rem',
                  color: 'var(--sap-positive-color)',
                }}
              />
            ) : (
              <ArrowDownIcon 
                style={{
                  width: '1rem',
                  height: '1rem',
                  color: 'var(--sap-negative-color)',
                }}
              />
            )}
            <Text 
              style={{
                fontSize: 'var(--sap-font-size-small)',
                color: isPositive ? 'var(--sap-positive-color)' : 'var(--sap-negative-color)',
                fontWeight: '600',
              }}
            >
              {Math.abs(percentageChange).toFixed(1)}%
            </Text>
            <Text 
              style={{
                fontSize: 'var(--sap-font-size-small)',
                color: 'var(--sap-neutral-color)',
              }}
            >
              vs last period
            </Text>
          </div>
        )}

        {/* Mini Chart */}
        {chartData.length > 1 && (
          <div style={{ height: '60px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={variant.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={variant.color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={variant.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${type})`}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--sap-tile-background-color)',
                    border: '1px solid var(--sap-list-border-color)',
                    borderRadius: 'var(--sap-border-radius-medium)',
                    fontSize: 'var(--sap-font-size-small)',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </UI5Card>
  );
}

// Legacy compatibility exports
export { FioriCardWrapper as CardWrapper, FioriCard as Card };

export default FioriCardWrapper;
