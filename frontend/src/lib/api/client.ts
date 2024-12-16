// src/lib/api/client.ts

// Use window.location in the browser, fallback to environment variable in container
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      // Browser environment
      return process.env.NODE_ENV === 'development' 
        ? 'http://localhost:4000'
        : process.env.NEXT_PUBLIC_API_URL;
    }
    // Container/Server environment
    return process.env.NEXT_PUBLIC_API_URL || 'http://backend:4000';
  };
  
  export class APIError extends Error {
    constructor(public status: number, message: string) {
      super(message);
      this.name = 'APIError';
    }
  }
  
  async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new APIError(response.status, error.message);
    }
    return response.json();
  }
  
  export const api = {
    async get<T>(endpoint: string): Promise<T> {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}${endpoint}`);
      return handleResponse<T>(response);
    },
  
    async post<T>(endpoint: string, data: unknown): Promise<T> {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<T>(response);
    },
  
    async put<T>(endpoint: string, data: unknown): Promise<T> {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<T>(response);
    },
  
    async delete<T>(endpoint: string): Promise<T> {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      return handleResponse<T>(response);
    },
  };