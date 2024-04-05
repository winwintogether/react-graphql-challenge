import { Center, Flex, Heading, Image, FlexProps } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { isLoggedIn } from "../../../helpers/auth";
import { useHistory } from "react-router-dom";

export interface PageWrapperProps {
  background: string;
  title?: string;
  contentWrapperProps?: FlexProps;
  requireAuth?: boolean;
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  background,
  title = "",
  contentWrapperProps,
  children,
  requireAuth = false,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (requireAuth && !isLoggedIn()) {
      return history.push("/");
    }
  }, [requireAuth, history]);

  return (
    <Flex
      bg="gray.50"
      className="page"
      color="BlackAlpha.900"
      data-testid="page-wrapper"
    >
      <Center
        w={{
          base: "100%",
          lg: "60%",
          xl: "70%",
        }}
        bg="gray.50"
        display={{
          base: "none",
          lg: "flex",
        }}
      >
        <Image
          objectFit="cover"
          w="100%"
          h="100%"
          src={background}
          alt="background"
        />
      </Center>
      <Flex
        flex="1"
        justify="center"
        color="BlackAlpha.900"
        direction="column"
        p={10}
        {...contentWrapperProps}
      >
        {title && (
          <Heading
            mb={10}
            textAlign={{
              base: "center",
              lg: "left",
            }}
          >
            {title}
          </Heading>
        )}

        {children}
      </Flex>
    </Flex>
  );
};

export default PageWrapper;
