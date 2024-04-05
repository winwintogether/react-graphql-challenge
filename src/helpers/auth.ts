export const isLoggedIn = () => {
  return (
    !!localStorage.getItem("userId") && !!localStorage.getItem("authToken")
  );
};
