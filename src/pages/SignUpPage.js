import React, { Component } from "react";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";

export default class SignUpPage extends Component {
  render() {
    return (
      <Box mt={8} mx="auto" maxW="800px">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={(value) => {
            console.log(value);
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
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              ></InputField>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              ></InputField>
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
}
