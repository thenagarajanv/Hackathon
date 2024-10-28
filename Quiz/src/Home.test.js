// Home.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders Welcome message and Start Quiz button', () => {
  const mockNavigate = jest.fn(); // Create a mock function
  useNavigate.mockReturnValue(mockNavigate); // Mock useNavigate to return the mock function

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const welcomeMessage = screen.getByText(/Welcome to the Quiz App/i);
  expect(welcomeMessage).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: /Start Quiz/i });
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement); // Simulate button click
  expect(mockNavigate).toHaveBeenCalledWith('/quiz'); // Check if navigate was called with the correct path
});
