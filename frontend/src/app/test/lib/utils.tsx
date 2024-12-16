// src/app/test/utils.tsx
'use client';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, JSXElementConstructor } from 'react';

// Component that throws an error for testing
export function ErrorThrower({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
}

interface APIErrorTesterProps {
  shouldFail?: boolean;
}

export function APIErrorTester({ shouldFail = false }: APIErrorTesterProps) {
  if (shouldFail) {
    throw new Error('API Error');
  }
  return <div>API working</div>;
}

// Add any providers here
const AllTheProviders = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
    </>
  );
};

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  wrapper?: JSXElementConstructor<ProvidersProps>;
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = options?.wrapper ?? AllTheProviders;
  return render(ui, { ...options, wrapper: Wrapper });
};

// re-export everything
export * from '@testing-library/react';