// src/app/test/loading/LoadingTestClient.tsx
'use client';

import { AsyncBoundary } from '@/components/loading/AsyncBoundary';
import { LoadingSpinner, LoadingDots, SkeletonCard } from '@/components/loading';
import { Suspense } from 'react';
import { SlowComponent } from './SlowComponent';

export function LoadingTestClient() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Loading States Testing</h1>
      <section className="space-y-4">
        <h2 className="text-xl">Loading Spinner</h2>
        <LoadingSpinner />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl">Loading Dots</h2>
        <LoadingDots />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl">Skeleton Loading</h2>
        <SkeletonCard />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl">Async Boundary Test</h2>
        <AsyncBoundary>
          <Suspense fallback={<LoadingSpinner />}>

            <SlowComponent />
          </Suspense>
        </AsyncBoundary>
      </section>
    </div>
  );
}