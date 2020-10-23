import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import GoogleLogin from "react-google-login";
require("dotenv").config({ path: "../../.env" });

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LOGIN_MUTATION = `mutation Login($email: String!, $password: String!){
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
}`;

export default function SignUpPage() {
  const [res, loginUser] = useMutation(LOGIN_MUTATION);

  const { register, handleSubmit, errors, setError } = useForm();
  const onSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.data?.login.errors !== null) {
      response.data.login.errors.forEach(({ field, message }) => {
        setError(field, { type: "manual", message });
      });
    } else {
      window.location.replace("/account");
    }
  };

  return (
    <Box mt={8} mx="auto" maxW="800px">
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

        <Button mt={4} mb={4} type="submit">
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
      />{" "}
    </Box>
  );
}
