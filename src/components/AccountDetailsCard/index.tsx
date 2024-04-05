import { EmailIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

interface AccountDetailsCardProps {
  user: { [key: string]: any };
}

const AccountDetailsCard = ({ user }: AccountDetailsCardProps) => {
  const getNamesInitials = () => {
    const fName = user?.firstName;
    const lName = user?.lastName;

    return `${fName?.charAt(0)?.toUpperCase()}${lName
      ?.charAt(0)
      ?.toUpperCase()}`;
  };

  return (
    <Card>
      <CardHeader bg="teal.300" position="relative" h="90px">
        <Center
          w="90px"
          h="90px"
          bg="green.50"
          borderRadius="50%"
          shadow="md"
          position="absolute"
          left="calc(50% - 45px)"
          bottom="-20px"
          borderColor="teal.300"
          borderWidth="2px"
        >
          <Text fontWeight="bold" fontSize="32px">
            {getNamesInitials()}
          </Text>
        </Center>
      </CardHeader>
      <CardBody>
        <Heading size="sm" fontWeight="bold" textAlign="center" my={3}>
          My Profile
        </Heading>

        <VStack spacing={2}>
          <Text fontSize={13} textAlign="center">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text fontSize={13} textAlign="center">
            <EmailIcon color="teal.300" mr={2} />
            {user?.email}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AccountDetailsCard;
