// src/components/error/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
    return null;
  };

  const originalEnv = process.env;

  beforeEach(() => {
    // Prevent console.error from cluttering test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock process.env
    process.env = { ...originalEnv, NODE_ENV: 'test' };
  });

  afterEach(() => {
    // Restore process.env
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('provides error details in development mode', () => {
    // Set NODE_ENV for this specific test
    process.env = { ...originalEnv, NODE_ENV: 'development' };
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
   
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});