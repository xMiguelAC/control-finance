import { render, screen, waitFor } from '@testing-library/react';
import Monthlycard from '../monthlycard';

// Mock the fetch function
global.fetch = jest.fn();

describe('Monthlycard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch and display monthly data correctly', async () => {
    // Mock data that matches the API response structure
    const mockData = [
      {
        year: 2024,
        month: 1,
        totalIncome: 1000,
        totalExpenses: 500
      },
      {
        year: 2024,
        month: 2,
        totalIncome: 2000,
        totalExpenses: 1500
      }
    ];

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData
    });

    // Render the component
    render(<Monthlycard />);

    // Check if loading state is shown initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the data to be loaded and transformed
    await waitFor(() => {
      expect(screen.getByText('Enero')).toBeInTheDocument();
      expect(screen.getByText('Febrero')).toBeInTheDocument();
    });

    // Verify that the fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('/api/transactions');
  });

  it('should handle API errors gracefully', async () => {
    // Mock a failed fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    // Render the component
    render(<Monthlycard />);

    // Check if loading state is shown initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the error to be handled
    await waitFor(() => {
      // The loading state should be gone, but no cards should be rendered
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
}); 