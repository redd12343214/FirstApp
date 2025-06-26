import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Mock global fetch before each test
beforeEach(() => {
  global.fetch = vi.fn();
});

// Reset mocks after each test
afterEach(() => {
  vi.resetAllMocks();
});

test('renders notes from backend', async () => {
  // Mock GET /notes response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ id: 1, content: 'Test Note from Backend' }],
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Test Note from Backend/i)).toBeInTheDocument();
  });
});

test('creates a new note', async () => {
  // Mock first fetch for GET /notes (returns empty)
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  // Mock second fetch for POST /notes
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 2, content: 'New Note' }),
  });

  render(<App />);

  // Fill input field
  const input = screen.getByPlaceholderText(/new note/i);
  input.value = 'New Note';

  // Click button
  const button = screen.getByText(/add note/i);
  button.click();

  await waitFor(() => {
    expect(screen.getByText(/New Note/i)).toBeInTheDocument();
  });
});

test('renders notes header', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
  
    render(<App />);
    await waitFor(() => {
        expect(screen.getByText(/notes/i)).toBeInTheDocument();
    });
});  