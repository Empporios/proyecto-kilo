import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ChefManagement from '../pages/ChefManagement';
import { createChef, getChefs } from '../services/api';

// Mock the API functions
vi.mock('../services/api', () => ({
  createChef: vi.fn(),
  getChefs: vi.fn(),
}));

describe('ChefManagement', () => {
  beforeEach(() => {
    getChefs.mockResolvedValue({ data: [] });
  });

  test('renders chef management form', async () => {
    render(<ChefManagement />);

    await waitFor(() => {
      expect(screen.getByText('Chef Management')).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Specialty')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Experience Years')).toBeInTheDocument();
    expect(screen.getByText('Create Chef')).toBeInTheDocument();
  });

  test('creates a new chef', async () => {
    createChef.mockResolvedValue({ data: { id: '1', name: 'John Doe', specialty: 'Italian', experienceYears: 5 } });
    getChefs.mockResolvedValue({ data: [{ id: '1', name: 'John Doe', specialty: 'Italian', experienceYears: 5 }] });

    render(<ChefManagement />);

    await waitFor(() => {
      expect(screen.getByText('Chef Management')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Specialty'), { target: { value: 'Italian' } });
    fireEvent.change(screen.getByPlaceholderText('Experience Years'), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Create Chef'));

    await waitFor(() => {
      expect(createChef).toHaveBeenCalledWith({
        name: 'John Doe',
        specialty: 'Italian',
        experienceYears: 5,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe - Italian (5 years)')).toBeInTheDocument();
    });
  });

  test('displays error message on failed creation', async () => {
    createChef.mockRejectedValue(new Error('Failed to create chef'));

    render(<ChefManagement />);

    await waitFor(() => {
      expect(screen.getByText('Chef Management')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Specialty'), { target: { value: 'Italian' } });
    fireEvent.change(screen.getByPlaceholderText('Experience Years'), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Create Chef'));

    await waitFor(() => {
      expect(screen.getByText('Failed to create chef')).toBeInTheDocument();
    });
  });
});