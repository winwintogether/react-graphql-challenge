import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageWrapper, { PageWrapperProps } from ".";
import { isLoggedIn } from "../../../helpers/auth";

jest.mock("../../../helpers/auth");

describe("PageWrapper", () => {
  const mockedIsLoggedIn = isLoggedIn as jest.MockedFunction<typeof isLoggedIn>;

  const defaultProps: PageWrapperProps = {
    background: "test-background.jpg",
    children: <div>Test Content</div>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<PageWrapper {...defaultProps} />);

    expect(screen.getByTestId("page-wrapper")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByAltText("background")).toBeInTheDocument();
  });

  it("should render the title if provided", () => {
    render(<PageWrapper {...defaultProps} title="Test Page" />);

    expect(screen.getByRole("heading")).toHaveTextContent("Test Page");
  });

  it("should redirect to the login page if requireAuth is true and the user is not logged in", async () => {
    mockedIsLoggedIn.mockReturnValue(false);

    render(
      <MemoryRouter>
        <PageWrapper {...defaultProps} requireAuth />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should not redirect if requireAuth is true and the user is logged in", () => {
    mockedIsLoggedIn.mockReturnValue(true);

    render(
      <MemoryRouter>
        <PageWrapper {...defaultProps} requireAuth />
      </MemoryRouter>
    );

    expect(screen.getByTestId("page-wrapper")).toBeInTheDocument();
  });
});
