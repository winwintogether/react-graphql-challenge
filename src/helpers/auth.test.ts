import { isLoggedIn } from "./auth";

describe("isLoggedIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns true when both userId and authToken are present in localStorage", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce("someUserId")
      .mockReturnValueOnce("someAuthToken");
    expect(isLoggedIn()).toBe(true);
  });

  it("returns false when userId is missing in localStorage", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(null)
      .mockReturnValueOnce("someAuthToken");
    expect(isLoggedIn()).toBe(false);
  });

  it("returns false when authToken is missing in localStorage", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce("someUserId")
      .mockReturnValueOnce(null);
    expect(isLoggedIn()).toBe(false);
  });

  it("returns false when both userId and authToken are missing in localStorage", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null);
    expect(isLoggedIn()).toBe(false);
  });
});
