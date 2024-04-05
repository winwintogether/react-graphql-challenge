import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Login from "./Login";
import { LOGIN_MUTATION } from "../../graphql/mutations/login";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

describe("Login Component", () => {
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

    await waitFor(() => {
      expect(localStorage.getItem("userId")).toBe("2");
    });

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/account");
    });
  });
});
