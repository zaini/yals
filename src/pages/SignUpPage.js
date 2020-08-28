import React from "react";
import { Box, Button, Input } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import GoogleLogin from "react-google-login";

const REGISTER_MUTATION = `mutation Register($email: String!, $username: String!, $password: String!){
  registerUser(Email: $email, UserName: $username, Password: $password){
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
}`;

export default function SignUpPage() {
  const [res, registerUser] = useMutation(REGISTER_MUTATION);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    registerUser(data);
  };

  return (
    <Box mt={8} mx="auto" maxW="800px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="email" name="email" ref={register} />
        <Input
          type="text"
          placeholder="username"
          name="username"
          ref={register}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <Button mt={4} type="submit">
          Submit
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
