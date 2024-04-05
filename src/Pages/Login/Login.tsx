import React from "react";
import background from "../../assets/laptop.png";
import PageWrapper from "../../components/layouts/PageWrapper";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
  return (
    <PageWrapper
      title="GraphQL Test Challenge"
      background={background}
      contentWrapperProps={{
        w: { base: "100%", md: "60%" },
        flex: {
          base: "unset",
          lg: "1",
        },
        mx: "auto",
      }}
    >
      <LoginForm />
    </PageWrapper>
  );
};

export default Login;
