// src/app/test/__tests__/test-utils.test.tsx
import { render, screen } from '@testing-library/react';
import { renderWithProviders, ErrorThrower, APIErrorTester } from '../lib/utils';

describe('Test Utilities', () => {
  describe('renderWithProviders', () => {
    const TestComponent = () => <div>Test Content</div>;

    it('renders content with providers', () => {
      const { getByText } = renderWithProviders(<TestComponent />);
      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('merges custom options with default options', () => {
      const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="custom-wrapper">{children}</div>
      );

      const { getByTestId } = renderWithProviders(<TestComponent />, {
        wrapper: CustomWrapper,
      });

      expect(getByTestId('custom-wrapper')).toBeInTheDocument();
    });
  });

  describe('ErrorThrower', () => {
    it('renders normally when not throwing', () => {
      render(<ErrorThrower shouldThrow={false} />);
      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('throws error when shouldThrow is true', () => {
      expect(() => render(<ErrorThrower shouldThrow={true} />)).toThrow('Test error');
    });
  });

  describe('APIErrorTester', () => {
    it('renders normally when not failing', () => {
      render(<APIErrorTester shouldFail={false} />);
      expect(screen.getByText('API working')).toBeInTheDocument();
    });

    it('throws error when shouldFail is true', () => {
      expect(() => render(<APIErrorTester shouldFail={true} />)).toThrow('API Error');
    });
  });
});