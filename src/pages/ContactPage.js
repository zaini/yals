import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export default function ContactPage() {
  const { register, handleSubmit, errors, setError, reset } = useForm();
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);

  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted(res) {
      if (res.createMessage.errors) {
        res.createMessage.errors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
      } else {
        reset();
        setIsSuccessfullySent(true);
      }
    },
    onError(_) {
      setError("link", {
        type: "manual",
        message: _.message,
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    await createMessage({ variables: { ...data } });
  };

  return (
    <Box mx="auto" maxW="800px">
      <Heading>Contact</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mt={4}>
          <Input type="text" placeholder="Name" name="name" ref={register} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email} mt={4}>
          <Input type="email" placeholder="Email" name="email" ref={register} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.subject} mt={4}>
          <Input
            type="text"
            placeholder="Subject"
            name="subject"
            ref={register}
          />
          <FormErrorMessage>
            {errors.subject && errors.subject.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.message} mt={4}>
          <Textarea placeholder="Message..." name="message" ref={register} />
          <FormErrorMessage>
            {errors.message && errors.message.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} mb={4} type="submit" isLoading={loading}>
          Send
        </Button>
        <br />
        <Center>
          {isSuccessfullySent && <Text>Message successfully sent!</Text>}
        </Center>
      </form>
    </Box>
  );
}

const CREATE_MESSAGE = gql`
  mutation SendContactMessage(
    $name: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    createMessage(
      Name: $name
      Email: $email
      Subject: $subject
      Message: $message
    ) {
      errors {
        field
        message
      }
    }
  }
`;
