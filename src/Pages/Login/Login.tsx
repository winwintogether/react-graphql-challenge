import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Flex,
  Heading, Center, Image
} from "@chakra-ui/react";
import background from '../../assets/laptop.png';

export const LOGIN_MUTATION = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
      }
    }
  }
`;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await login({
          variables: {
            identifier: values.email,
            password: values.password,
          },
        });
        localStorage.setItem("authToken", data.login.jwt);
        localStorage.setItem("userId", data.login.user.id);
        setError("");
        setLoading(false);
        history.push("/account");
      } catch (err) {
        setLoading(false);
        setError("Error logging in. Please try again.");
      }
    },
  });

  return (
    <Flex bg='blue.500' className="page" color='white'>
      <Center w='70%' bg='blue.500'>
        <Image
          objectFit='cover'
          h="100%"
          src={background}
          alt='background'
        />
      </Center>
      <Flex flex="1" justify="center" direction="column" p={10}>
        <Heading mb={10}>GraphQl Challenge</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={!!(formik.touched.email && formik.errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!(formik.touched.password && formik.errors.password)} mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          {error && (
            <Text color="red.500" mt={4}>{error}</Text>
          )}
          <Button mt={4} width='100%' disabled={loading} colorScheme="teal" type="submit">
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
