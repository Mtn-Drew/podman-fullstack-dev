// src/app/test/error/page.tsx
'use client';

import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { APIErrorBoundary } from '@/components/error/APIErrorBoundary';
import { useState } from 'react';
import { APIErrorTester, ErrorThrower } from '../lib/utils';


export default function ErrorTestPage() {
  const [throwError, setThrowError] = useState(false);
  const [throwAPIError, setThrowAPIError] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Error Boundary Testing</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl">Component Error Test</h2>
        <button 
          onClick={() => setThrowError(prev => !prev)}
          className="px-4 py-2 bg-red-100 text-red-700 rounded"
        >
          Toggle Error
        </button>
        <ErrorBoundary>
          <ErrorThrower shouldThrow={throwError} />
        </ErrorBoundary>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">API Error Test</h2>
        <button 
          onClick={() => setThrowAPIError(prev => !prev)}
          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded"
        >
          Toggle API Error
        </button>
        <APIErrorBoundary>
          <APIErrorTester shouldFail={throwAPIError} />
        </APIErrorBoundary>
      </section>
    </div>
  );
}