import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  noPadding = false 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200';
  const paddingClasses = noPadding ? '' : 'p-6';
  const hoverClasses = hover ? 'transition-transform duration-200 hover:translate-y-[-4px] hover:shadow-md' : '';
  
  return (
    <div className={`${baseClasses} ${paddingClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;