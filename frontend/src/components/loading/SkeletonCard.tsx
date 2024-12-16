import { Skeleton } from './LoadingSkeleton';

export const SkeletonCard = () => (
    <div className="border rounded-lg p-4 w-full max-w-sm mx-auto">
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );