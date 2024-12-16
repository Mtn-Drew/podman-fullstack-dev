// src/components/loading/AsyncBoundary.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner'

interface AsyncBoundaryProps {
  children: React.ReactNode;
  errorFallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export const AsyncBoundary = ({ 
  children, 
  errorFallback,
  loadingFallback = <LoadingSpinner />
}: AsyncBoundaryProps) => (
  <ErrorBoundary fallback={errorFallback}>
    <Suspense fallback={loadingFallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
);