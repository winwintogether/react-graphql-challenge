import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Login, { LOGIN_MUTATION } from './Login';

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: { identifier: 'test@freshcells.de', password: 'KTKwXm2grV4wHzW' },
    },
    result: {
      data: {
        login: {
          jwt: 'token',
          user: {
            id: "2"
          }
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: { identifier: 'test@freshcells.de', password: 'password' },
    },
    error: new Error('An error occurred'),
  },
];

describe('Login Component', () => {
  it('allows the user to login successfully', async () => {
    const { getByLabelText, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@freshcells.de' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'KTKwXm2grV4wHzW' } });
    fireEvent.click(getByText(/login/i));

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('token');
    });
  });

  it('displays an error message when login fails', async () => {
    const { getByLabelText, getByText } = render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@freshcells.de' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(getByText(/login/i));

    await waitFor(() => {
      expect(getByText(/error logging in. please try again./i)).toBeInTheDocument();
    });
  });
});
