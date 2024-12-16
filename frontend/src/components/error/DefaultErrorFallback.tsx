interface ErrorFallbackProps {
    error?: Error;
    resetError?: () => void;
  }
  
  export const DefaultErrorFallback = ({ error, resetError }: ErrorFallbackProps) => (
    <div className="min-h-[200px] p-6 bg-red-50 border border-red-100 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
      {error && (
        <pre className="text-sm text-red-600 bg-red-50/50 p-3 rounded mt-2 overflow-auto">
          {error.message}
        </pre>
      )}
      {resetError && (
        <button
          onClick={resetError}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );