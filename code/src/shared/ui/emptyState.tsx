import React from 'react';

interface EmptyStateProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  testId?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  testId,
}: EmptyStateProps) => (
  <div
    data-testid={testId}
    className=' bg-gray-50 border border-gray-200 rounded-xl p-12 text-center'
  >
    {icon && <div className='text-gray-400 text-5xl mb-4'>{icon}</div>}
    <div className='text-gray-600 text-lg font-semibold mb-2'>{title}</div>
    {description && <p className='text-gray-500'>{description}</p>}
  </div>
);
