'use client';

import React from 'react';
import clsx from 'clsx';

interface FioriButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'emphasized' | 'transparent' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

export function FioriButton({
  children,
  className,
  onClick,
  disabled = false,
  variant = 'default',
  size = 'medium',
  icon,
  type = 'button',
  href,
  ...rest
}: FioriButtonProps) {
  const buttonClasses = clsx(
    'fiori-button',
    {
      'fiori-button--emphasized': variant === 'emphasized',
      'fiori-button--transparent': variant === 'transparent',
      'fiori-button--ghost': variant === 'ghost',
      'fiori-button--small': size === 'small',
      'fiori-button--large': size === 'large',
    },
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...rest}
      >
        {icon && <span className="fiori-button__icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      {...rest}
    >
      {icon && <span className="fiori-button__icon">{icon}</span>}
      {children}
    </button>
  );
}

// Legacy compatibility - keep the same interface as the original Button
export function Button({ children, className, ...rest }: any) {
  return (
    <FioriButton className={className} {...rest}>
      {children}
    </FioriButton>
  );
}

export default FioriButton;
