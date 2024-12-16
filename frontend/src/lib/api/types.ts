// src/lib/api/types.ts
export interface HealthCheckResponse {
    status: 'ok' | 'error';
    database: 'connected' | 'disconnected';
    timestamp?: string;
    error?: string;
  }
  
  export interface APIResponse<T> {
    data?: T;
    error?: string;
    timestamp: string;
  }
  