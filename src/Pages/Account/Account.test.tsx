import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Account, { USER_QUERY } from './Account';
import mock = jest.mock;

const mockLocalStorage = (() => {
  let store = {} as { [key: string]: any };
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string | number) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})()

const mockUser = {
  id: '2',
  email: 'test@freshcells.de',
  firstName: 'FirstName',
  lastName: 'LastName',
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const mocks = [
  {
    request: {
      query: USER_QUERY,
      variables: { id: mockUser.id },
    },
    result: {
      data: {
        user: mockUser,
      },
    },
  },
];

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Account Component', () => {
  beforeEach(() => {
    window.localStorage.setItem('userId', mockUser.id);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('displays loading spinner while fetching data', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Account />
      </MockedProvider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays user information after fetching', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Account />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('First Name: FirstName')).toBeInTheDocument();
      expect(screen.getByText('Last Name: LastName')).toBeInTheDocument();
    });
  });

  it('navigates to login on logout', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Account />
      </MockedProvider>
    );
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/login');
    });
  });
});
