import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

const MESSAGE_MUTATION = `mutation SendContactMessage($name: String!, $email: String!, $subject: String!, $message: String!){
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
}`;

export default function ContactPage() {
  const [res, sendMessage] = useMutation(MESSAGE_MUTATION);
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);
  const { register, handleSubmit, errors, setError, reset } = useForm();
  const onSubmit = async (data) => {
    const response = await sendMessage(data);
    if (response.data?.createMessage.errors !== null) {
      response.data.createMessage.errors.forEach(({ field, message }) => {
        setError(field, { type: "manual", message });
      });
    } else {
      reset();
      setIsSuccessfullySent(true);
    }
  };

  return (
    <Box>
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

        <Button mt={4} mb={4} type="submit">
          Send
        </Button>
        <br />
        {isSuccessfullySent ? "Message successfully send!" : null}
      </form>
    </Box>
  );
}
