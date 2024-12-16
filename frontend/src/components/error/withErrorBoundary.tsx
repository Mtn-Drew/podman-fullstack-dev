import { ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}