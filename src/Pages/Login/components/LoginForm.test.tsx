import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import Login from "./LoginForm";
import { LOGIN_MUTATION } from "../../../graphql/mutations/login";

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        identifier: process.env.REACT_APP_TEST_USERNAME,
        password: process.env.REACT_APP_TEST_PWD,
      },
    },
    result: {
      data: {
        login: {
          jwt: "token",
          user: {
            id: "2",
          },
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        identifier: process.env.REACT_APP_TEST_USERNAME,
        password: "password",
      },
    },
    error: new Error("An error occurred"),
  },
];

describe("Login Form Component", () => {
  it("allows the user to login successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: process.env.REACT_APP_TEST_USERNAME },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: process.env.REACT_APP_TEST_PWD },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(localStorage.getItem("authToken")).toBe("token");
    });
  });

  it("displays an error message when login fails", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: process.env.REACT_APP_TEST_USERNAME },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(
        screen.getByText(/error logging in. please try again./i)
      ).toBeInTheDocument();
    });
  });
});
