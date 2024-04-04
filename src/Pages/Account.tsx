import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Text,
  Button,
  VStack,
  Spinner,
  Flex,
  Center,
  Image
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import consulting from "../assets/consulting.jpg";

const USER_QUERY = gql`
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
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: 2 },
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };


  if (loading) return (
    <Flex color='white' className="page" align="center" justify="center">
      <Spinner color="blue.500" size="xl" />
    </Flex>
  );
  //
  // if (error)
  //   return (
  //     <Alert status="error">
  //       <AlertIcon />
  //       There was an error fetching your account details.
  //     </Alert>
  //   );
  //
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
      <Flex flex="1" color="white" justify="center" direction="column" p={10}>
          <VStack spacing={4}>
            <Text fontSize="xl">Account Details</Text>
            <Text>First Name: {data.user.firstName}</Text>
            <Text>Last Name: {data.user.lastName}</Text>
            <Button width='100%' colorScheme="red" onClick={handleLogout}>Logout</Button>
          </VStack>
      </Flex>
    </Flex>
  );
};

export default Account;
