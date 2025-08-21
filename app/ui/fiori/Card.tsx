'use client';

import React from 'react';
import { Card as UI5Card, CardHeader } from '@ui5/webcomponents-react';
import clsx from 'clsx';

interface FioriCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

export function FioriCard({
  children,
  className,
  title,
  subtitle,
  headerAction,
  onClick,
  hoverable = false,
  ...rest
}: FioriCardProps) {
  const cardClasses = clsx(
    'fiori-card',
    {
      'fiori-card--hoverable': hoverable,
      'fiori-card--clickable': onClick,
    },
    className
  );

  return (
    <UI5Card
      className={cardClasses}
      onClick={onClick}
      {...rest}
    >
      {(title || subtitle || headerAction) && (
        <CardHeader
          titleText={title}
          subtitleText={subtitle}
          action={headerAction}
        />
      )}
      <div className="fiori-card__content">
        {children}
      </div>
    </UI5Card>
  );
}

export default FioriCard;
