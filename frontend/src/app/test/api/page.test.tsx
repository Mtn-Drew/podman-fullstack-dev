import { render, screen, waitFor } from '@testing-library/react';
import APITestPage from './page';
import { api } from '@/lib/api/client';
import { HealthCheckResponse } from '@/lib/api/types';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('APITestPage', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    render(<APITestPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display health check data when API call succeeds', async () => {
    const mockHealthData: HealthCheckResponse = {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };

    // Mock successful API response
    (api.get as jest.Mock).mockResolvedValueOnce(mockHealthData);

    render(<APITestPage />);

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Verify API was called correctly
    expect(api.get).toHaveBeenCalledWith('/health');

    // Check if data is displayed
    expect(screen.getByText(/Health Check Response/i)).toBeInTheDocument();
    expect(screen.getByText(/"status": "ok"/i)).toBeInTheDocument();
    expect(screen.getByText(/"database": "connected"/i)).toBeInTheDocument();
  });

  it('should display error message when API call fails', async () => {
    const errorMessage = 'Failed to fetch health check data';
    
    // Mock failed API response
    (api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<APITestPage />);

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Check if error message is displayed
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should handle database disconnected state', async () => {
    const mockHealthData: HealthCheckResponse = {
      status: 'error',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed',
    };

    // Mock API response with database error
    (api.get as jest.Mock).mockResolvedValueOnce(mockHealthData);

    render(<APITestPage />);

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Verify error state is displayed correctly
    expect(screen.getByText(/"status": "error"/i)).toBeInTheDocument();
    expect(screen.getByText(/"database": "disconnected"/i)).toBeInTheDocument();
    expect(screen.getByText(/"error": "Database connection failed"/i)).toBeInTheDocument();
  });
});