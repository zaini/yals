import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
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

  const { register, handleSubmit, errors, setError } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await registerUser(data);
    console.log(response);
    if (response.data?.registerUser.errors !== null) {
      response.data.registerUser.errors.forEach(({ field, message }) => {
        console.log(field, message);
        setError(field, { type: "manual", message });
      });
    } else {
      console.log("Success");
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

        <Button mt={4} mb={4} type="submit">
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
