// src/app/test/error/page.test.tsx
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { APIErrorTester } from '../lib/utils';

// Suppress console errors from expected error throws
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Error Test Page', () => {
  it('shows normal content when no error occurs', () => {
    render(
      <ErrorBoundary>
        <APIErrorTester shouldFail={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('API working')).toBeInTheDocument();
  });

  it('shows API error boundary when API error is triggered', () => {
    render(
      <ErrorBoundary>
        <APIErrorTester shouldFail={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});