interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {/* Spinner */}
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-brand-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      
      {/* Loading Text */}
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
}