export const LoadingDots = () => (
    <div className="flex space-x-1 items-center justify-center p-2" role="status">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-pulse"
          style={{ animationDelay: `${dot * 150}ms` }}
        >
          <span className="sr-only">.</span>
        </div>
      ))}
    </div>
  );