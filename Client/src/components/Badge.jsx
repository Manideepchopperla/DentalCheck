import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'md'
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    gray: 'bg-gray-100 text-gray-800'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };
  
  const getStatusVariant = (children) => {
    if (typeof children !== 'string') return variant;
    
    const status = children.toLowerCase();
    if (status === 'pending') return 'warning';
    if (status === 'in-progress') return 'primary';
    if (status === 'completed') return 'success';
    if (status === 'cancelled') return 'error';
    
    return variant;
  };
  
  const chosenVariant = getStatusVariant(children);
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[chosenVariant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};

export default Badge;