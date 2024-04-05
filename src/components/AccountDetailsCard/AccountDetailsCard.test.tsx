import { render, screen } from "@testing-library/react";
import AccountDetailsCard from ".";

describe("AccountDetailsCard", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  };

  it("renders user details correctly", () => {
    render(<AccountDetailsCard user={user} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("renders profile heading correctly", () => {
    render(<AccountDetailsCard user={user} />);

    expect(screen.getByText("My Profile")).toBeInTheDocument();
  });

  it("renders initials correctly", () => {
    render(<AccountDetailsCard user={user} />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
