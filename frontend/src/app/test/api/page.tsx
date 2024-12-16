// src/app/test/api/page.tsx
'use client';

import { api } from '@/lib/api/client';
import { HealthCheckResponse } from '@/lib/api/types';
import { useState, useEffect } from 'react';
import { AsyncBoundary } from '@/components/loading';
import { LoadingSpinner } from '@/components/loading';

export default function APITestPage() {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get<HealthCheckResponse>('/health');
        setHealthData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">API Integration Testing</h1>

      <section className="space-y-4">
        <h2 className="text-xl">Health Check Response</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(healthData, null, 2)}
        </pre>
      </section>
    </div>
  );
}