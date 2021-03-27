import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import QRAndCopy from "../components/QRAndCopy";
import { useMutation } from "@apollo/react-hooks";
require("dotenv").config({ path: "../../.env" });

const domain = process.env.REACT_APP_DOMAIN;

const UnloggedHomePage = () => {
  const [shortLink, setShortLink] = useState(undefined);
  const { register, handleSubmit, errors, setError } = useForm();

  const [createLink, { loading }] = useMutation(CREATE_LINK, {
    onCompleted(res) {
      setShortLink(res.createLink.Short_URL);
    },
    onError(_) {
      setError("link", {
        type: "manual",
        message: _.message,
      });
    },
  });

  const onSubmit = ({ link }) => {
    createLink({ variables: { Base_URL: link } });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.link} mt={4}>
          <Input
            type="text"
            placeholder="Make your links shorter"
            name="link"
            ref={register({
              required: "You must enter a link for it to be shortened",
            })}
          />
          <FormErrorMessage>
            {errors.link && errors.link.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} mb={4} type="submit" isLoading={loading}>
          Convert!
        </Button>
      </form>

      {shortLink && <QRAndCopy link={domain + "/" + shortLink} />}
    </Box>
  );
};

export default UnloggedHomePage;

const CREATE_LINK = gql`
  mutation createNewLink($Base_URL: String!) {
    createLink(Base_URL: $Base_URL) {
      id
      Created_At
      Short_URL
      Base_URL
    }
  }
`;
