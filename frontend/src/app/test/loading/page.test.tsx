// src/app/test/loading/page.test.tsx
import { render, screen } from '@testing-library/react';
import { LoadingTestClient } from './LoadingTestClient';

// Mock the SlowComponent
jest.mock('./SlowComponent', () => ({
  SlowComponent: () => <div>Content loaded!</div>
}));

// Mock the loading components
jest.mock('@/components/loading', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading Spinner</div>,
  LoadingDots: () => <div data-testid="loading-dots">Loading Dots</div>,
  SkeletonCard: () => <div data-testid="skeleton-card">Skeleton Card</div>
}));

// Mock AsyncBoundary
jest.mock('@/components/loading/AsyncBoundary', () => ({
  AsyncBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Suspense
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Loading Test Page', () => {
  it('renders the page title', () => {
    render(<LoadingTestClient />);
    expect(screen.getByText('Loading States Testing')).toBeInTheDocument();
  });

  it('renders all loading components', () => {
    render(<LoadingTestClient />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('loading-dots')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
  });

  it('renders section headings', () => {
    render(<LoadingTestClient />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getAllByText('Loading Dots')).toHaveLength(2)
    expect(screen.getByText('Skeleton Loading')).toBeInTheDocument();
    expect(screen.getByText('Async Boundary Test')).toBeInTheDocument();
  });
});