'use client';

import { APIError } from '@/lib/api/client';
import { useEffect, useState } from 'react';

interface APIErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: APIError) => React.ReactNode;
}

export function APIErrorBoundary({ children, fallback }: APIErrorBoundaryProps) {
  const [error, setError] = useState<APIError | null>(null);

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof APIError) {
        setError(event.reason);
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, []);

  if (error) {
    return fallback ? (
      fallback(error)
    ) : (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h2 className="text-lg font-semibold text-yellow-800">API Error</h2>
        <p className="mt-2 text-yellow-700">Status: {error.status}</p>
        <p className="text-yellow-600">{error.message}</p>
      </div>
    );
  }

  return children;
}