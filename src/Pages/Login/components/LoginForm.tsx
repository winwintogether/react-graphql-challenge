import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { LOGIN_MUTATION } from "../../../graphql/mutations/login";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        history.push("/account");
      } catch (err) {
        setError("Error logging in. Please try again!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={!!(formik.touched.email && formik.errors.email)}>
        <FormLabel htmlFor="email" fontWeight="bold" fontSize="14.5px">
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          borderRadius={0}
          h="42px"
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!(formik.touched.password && formik.errors.password)}
        mt={4}
      >
        <FormLabel htmlFor="password" fontWeight="bold" fontSize="14.5px">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password")}
            borderRadius={0}
            h="42px"
          />
          <InputRightElement width="72px">
            <Button
              h="30px"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      {error && (
        <Text color="red.500" mt={4} fontWeight="bold" textAlign="center">
          {error}
        </Text>
      )}
      <Button
        mt={4}
        width="100%"
        disabled={loading}
        isLoading={loading}
        loadingText="Submitting..."
        colorScheme="teal"
        type="submit"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="14px"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
