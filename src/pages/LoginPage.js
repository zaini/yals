import React from "react";
import { Box, Input, Button } from "@chakra-ui/core";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

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

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <Box mt={8} mx="auto" maxW="800px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="email" name="email" ref={register} />
        <Input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <Button mt={4} type="submit">
          Login
        </Button>
      </form>
      <GoogleLogin
        clientId="110139847957-18v65kpfcpt8k5pc8n8galikf65mm4v8.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={(res) => console.log(res)}
        onFailure={(res) => console.log(res)}
        cookiePolicy={"single_host_origin"}
      />{" "}
    </Box>
  );
}
