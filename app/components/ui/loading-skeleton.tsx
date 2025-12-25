import { memo } from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = memo(({ className = "" }: LoadingSkeletonProps) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
));

export const PageSkeleton = memo(() => (
  <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
          <LoadingSkeleton className="h-6 w-3/4 mx-auto" />
          <LoadingSkeleton className="h-4 w-1/2 mx-auto" />
          <LoadingSkeleton className="h-10 mt-8" />
          <LoadingSkeleton className="h-12" />
          <LoadingSkeleton className="h-12" />
        </div>
      </div>
    </div>
  </div>
));