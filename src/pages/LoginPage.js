import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";
import gql from "graphql-tag";
require("dotenv").config();

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const { register, handleSubmit, errors, setError } = useForm();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(res) {
      if (res.login.errors) {
        res.login.errors.forEach(({ field, message }) => {
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
    login({ variables: data });
  };

  return (
    <Box>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mt={4}>
          <Input type="email" placeholder="email" name="email" ref={register} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
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
        </FormControl>

        <Button mt={4} mb={4} type="submit" isLoading={loading}>
          Submit
        </Button>
      </form>
      <GoogleLogin
        clientId={client_id}
        buttonText="Login with Google"
        onSuccess={(res) => {
          onSubmit({
            email: res.profileObj.email,
            password: res.profileObj.googleId,
          });
        }}
        onFailure={(res) => console.log(res)}
        cookiePolicy={"single_host_origin"}
      />
    </Box>
  );
};

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(Email: $email, Password: $password) {
      errors {
        field
        message
      }
      user {
        UserName
        Created_At
        Email
        id
      }
    }
  }
`;

export default LoginPage;
