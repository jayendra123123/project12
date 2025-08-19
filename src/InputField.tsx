import React, { useState } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email';
  clearable?: boolean;
  onClear?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  onClear,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === 'password';
  const hasError = invalid || !!errorMessage;
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg',
  };
  const getVariantClasses = () => {
    const baseClasses = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';
    if (hasError) {
      switch (variant) {
        case 'filled':
          return `${baseClasses} bg-red-50 border-red-300 text-red-900 focus:border-red-500`;
        case 'outlined':
          return `${baseClasses} bg-white border-red-300 focus:border-red-500`;
        case 'ghost':
          return `${baseClasses} bg-transparent border-transparent border-b-2 border-b-red-300 rounded-none focus:border-b-red-500`;
      }
    }
    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-500`;
      case 'outlined':
        return `${baseClasses} bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500`;
      case 'ghost':
        return `${baseClasses} bg-transparent border-transparent border-b-2 border-b-gray-300 rounded-none hover:border-b-gray-400 focus:border-b-blue-500`;
      default:
        return baseClasses;
    }
  };
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleClear = () => onClear?.();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={`block text-sm font-medium mb-1 ${hasError ? 'text-red-700' : 'text-gray-700'}`}>{label}</label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            ${getVariantClasses()}
            ${sizeClasses[size]}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
            ${isPassword || clearable || loading ? 'pr-10' : ''}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {loading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
          {clearable && value && !loading && (
            <button type="button" onClick={handleClear} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear input">
              <X className="h-4 w-4" />
            </button>
          )}
          {isPassword && !loading && (
            <button type="button" onClick={handleTogglePassword} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      {(errorMessage || helperText) && (
        <p id={hasError ? `${inputId}-error` : `${inputId}-helper`} className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`} role={hasError ? 'alert' : undefined}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
