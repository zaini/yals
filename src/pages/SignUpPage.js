import React, { Component } from "react";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { useMutation } from "urql";

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
  const [res, register] = useMutation(REGISTER_MUTATION);

  return (
    <Box mt={8} mx="auto" maxW="800px">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              type="email"
            ></InputField>
            <br />
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            ></InputField>
            <br />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            ></InputField>
            <Button mt={5} type="submit" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
