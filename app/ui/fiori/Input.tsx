'use client';

import React from 'react';
import { Input as UI5Input, Label } from '@ui5/webcomponents-react';
import clsx from 'clsx';

interface FioriInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  state?: 'none' | 'success' | 'warning' | 'error' | 'information';
  stateMessage?: string;
  icon?: React.ReactNode;
  showClearIcon?: boolean;
}

export function FioriInput({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  label,
  required = false,
  disabled = false,
  readonly = false,
  type = 'text',
  className,
  onChange,
  onBlur,
  onFocus,
  state = 'none',
  stateMessage,
  icon,
  showClearIcon = false,
  ...rest
}: FioriInputProps) {
  const inputClasses = clsx(
    'fiori-input',
    {
      'fiori-input--invalid': state === 'error',
      'fiori-input--warning': state === 'warning',
      'fiori-input--success': state === 'success',
      'fiori-input--disabled': disabled,
      'fiori-input--readonly': readonly,
    },
    className
  );

  const valueState = state === 'error' ? 'Error' : 
                   state === 'warning' ? 'Warning' : 
                   state === 'success' ? 'Success' : 
                   state === 'information' ? 'Information' : 'None';

  return (
    <div className="fiori-input-wrapper">
      {label && (
        <Label 
          htmlFor={id}
          required={required}
          className="fiori-input__label"
        >
          {label}
        </Label>
      )}
      <UI5Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readonly={readonly}
        type={type}
        className={inputClasses}
        valueState={valueState}
        valueStateMessage={stateMessage}
        showClearIcon={showClearIcon}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
      {stateMessage && (
        <div className={`fiori-input__message fiori-input__message--${state}`}>
          {stateMessage}
        </div>
      )}
    </div>
  );
}

export default FioriInput;
