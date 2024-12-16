// src/app/page.tsx
import { AsyncBoundary } from '@/components/loading';
import { api } from '@/lib/api/client';
import { HealthCheckResponse } from '@/lib/api/types';
import { Suspense } from 'react';

// Example async component that will trigger loading state
async function HealthStatus() {
  // Force delay to see loading state (remove in production)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const health = await api.get<HealthCheckResponse>('/health');
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">System Status</h2>
      <div className="space-y-2">
        <p>Status: {health.status}</p>
        <p>Database: {health.database}</p>
        {health.timestamp && <p>Last Check: {health.timestamp}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Welcome to the Development Environment!</h1>
      
      <AsyncBoundary>
        <Suspense fallback={<div className="text-center">Loading health status...</div>}>
          
          <HealthStatus />
        </Suspense>
      </AsyncBoundary>
    </main>
  );
}

// 33 {/* @ts-expect-error Async Server Component */}