import { LoadingSpinner, SkeletonCard } from '@/components/loading';

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <LoadingSpinner />
      </div>
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}