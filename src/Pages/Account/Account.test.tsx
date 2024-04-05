import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { USER_QUERY } from "../../graphql/queries/getProfile";
import { isLoggedIn } from "../../helpers/auth";
import Account from "./Account";

jest.mock("../../helpers/auth");

describe("Account", () => {
  const mockedIsLoggedIn = isLoggedIn as jest.MockedFunction<typeof isLoggedIn>;

  const mocks = [
    {
      request: {
        query: USER_QUERY,
        variables: {
          id: "1234",
        },
      },
      result: {
        data: {
          user: {
            id: "1234",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
          },
        },
      },
    },
  ];

  beforeEach(() => {
    localStorage.setItem("userId", "1234");
    localStorage.setItem("authToken", "abc123");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should render the Account page correctly when the user is logged in", async () => {
    mockedIsLoggedIn.mockReturnValue(true);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Account />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("My Profile")).toBeInTheDocument();
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should redirect to the login page when the user is not logged in", async () => {
    mockedIsLoggedIn.mockReturnValue(false);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Account />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should display a spinner while loading", () => {
    mockedIsLoggedIn.mockReturnValue(true);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Account />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
