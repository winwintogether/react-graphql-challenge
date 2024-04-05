import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

jest.mock('./Pages/Login/Login', () => {
  return {
    __esModule: true,
    default: () => <div>Login Component</div>,
  };
});

jest.mock('./Pages/Account/Account', () => {
  return {
    __esModule: true,
    default: () => <div>Account Component</div>,
  };
});

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: ({ children }) => <ChakraProvider><Router>{children}</Router></ChakraProvider> });
};

describe('App Routing', () => {
  test('should render Login component on root route', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText(/login component/i)).toBeInTheDocument();
  });

  test('should render Login component on /login route', () => {
    renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByText(/login component/i)).toBeInTheDocument();
  });

  test('should render Account component on /account route', () => {
    renderWithRouter(<App />, { route: '/account' });
    expect(screen.getByText(/account component/i)).toBeInTheDocument();
  });
});
