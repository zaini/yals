import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";
import gql from "graphql-tag";
require("dotenv").config({ path: "../../.env" });

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignUpPage = () => {
  const { register, handleSubmit, errors, setError } = useForm();

  const [registerUser, { loading }] = useMutation(REGISTER, {
    onCompleted(res) {
      if (res.registerUser.errors) {
        res.registerUser.errors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
      } else {
        window.location.replace("/account");
      }
    },
    onError(_) {
      console.log(_);
      setError("email", {
        type: "manual",
        message: _.message,
      });
    },
  });

  const onSubmit = (data) => {
    registerUser({ variables: data });
  };

  return (
    <Box mx="auto" maxW="800px">
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mt={4}>
          <Input type="email" placeholder="email" name="email" ref={register} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.username} mt={4}>
          <Input
            type="text"
            placeholder="username"
            name="username"
            ref={register}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
          <FormHelperText>
            You can set your username to anything.
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={errors.password} mt={4}>
          <Input
            type="password"
            placeholder="password"
            name="password"
            ref={register}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
          <FormHelperText>Make it a strong password.</FormHelperText>
        </FormControl>

        <Button mt={4} mb={4} type="submit" isLoading={loading}>
          Submit
        </Button>
      </form>
      <GoogleLogin
        clientId={client_id}
        buttonText="Sign up with Google"
        onSuccess={(res) => {
          onSubmit({
            email: res.profileObj.email,
            username: res.profileObj.givenName + "-GAccount",
            password: res.profileObj.googleId,
          });
        }}
        onFailure={(res) => console.log(res)}
        cookiePolicy={"single_host_origin"}
      />
    </Box>
  );
};

const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    registerUser(Email: $email, UserName: $username, Password: $password) {
      errors {
        field
        message
      }
      user {
        id
        Email
        UserName
      }
    }
  }
`;

export default SignUpPage;
