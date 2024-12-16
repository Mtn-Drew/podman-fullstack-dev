interface SkeletonProps {
    className?: string;
  }
  
  export const Skeleton = ({ className = "" }: SkeletonProps) => (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );