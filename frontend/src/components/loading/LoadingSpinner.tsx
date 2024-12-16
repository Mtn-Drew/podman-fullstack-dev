export const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );