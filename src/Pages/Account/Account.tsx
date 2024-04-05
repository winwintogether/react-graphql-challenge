import { useQuery } from "@apollo/client";
import { Button, Spinner, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import consulting from "../../assets/consulting.jpg";
import AccountDetailsCard from "../../components/AccountDetailsCard";
import { USER_QUERY } from "../../graphql/queries/getProfile";
import PageWrapper from "../../components/layouts/PageWrapper";
import { isLoggedIn } from "../../helpers/auth";

const Account = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const { loading, data } = useQuery(USER_QUERY, {
    variables: { id: userId },
    skip: !isLoggedIn(),
  });

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  if (loading)
    return (
      <Flex color="white" className="page" align="center" justify="center">
        <Spinner data-testid="spinner" color="teal.300" size="xl" />
      </Flex>
    );

  return (
    <PageWrapper
      background={consulting}
      contentWrapperProps={{
        justify: "space-between",
        w: { base: "100%", md: "60%" },
        flex: {
          base: "unset",
          lg: "1",
        },
        mx: "auto",
        px: {
          base: 3,
          sm: 5,
          md: 8,
          lg: 10,
        },
      }}
      requireAuth
    >
      <AccountDetailsCard user={data?.user} />

      <Button
        width="100%"
        colorScheme="red"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="14px"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </PageWrapper>
  );
};

export default Account;
