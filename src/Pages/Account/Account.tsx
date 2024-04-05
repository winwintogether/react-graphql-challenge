import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Text,
  Button,
  VStack,
  Spinner,
  Flex,
  Center,
  Image,
  Heading,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import consulting from "../../assets/consulting.jpg";

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;


const Account = () => {
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const { loading, data } = useQuery(USER_QUERY, {
    variables: { id: userId },
  });

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };


  if (loading) return (
    <Flex color='white' className="page" align="center" justify="center">
      <Spinner data-testid="spinner" color="blue.500" size="xl" />
    </Flex>
  );

  return (
    <Flex bg='blue.500' className="page" justify="center">
      <Center w='70%' bg='blue.500'>
        <Image
          objectFit='cover'
          h="100%"
          src={consulting}
          alt='background'
        />
      </Center>
      <Flex flex="1" color="white" justify="space-between" direction="column" p={10}>
          <VStack spacing={4} height="100%">
            <Heading fontSize="xl">Account Details</Heading>
            <Text>First Name: {data?.user?.firstName}</Text>
            <Text>Last Name: {data?.user?.lastName}</Text>
          </VStack>
          <Button width='100%' colorScheme="red" onClick={handleLogout}>Logout</Button>
      </Flex>
    </Flex>
  );
};

export default Account;
