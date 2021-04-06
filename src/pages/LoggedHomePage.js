import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormErrorMessage,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { FaDice } from "react-icons/fa";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import QRAndCopy from "../components/QRAndCopy";
import { useMutation } from "@apollo/react-hooks";
import { nanoid } from "nanoid";
require("dotenv").config({ path: "../../.env" });

const domain = process.env.REACT_APP_DOMAIN;

const LoggedHomePage = ({ user_id }) => {
  const [shortLink, setShortLink] = useState(undefined);
  const [shortId, setShortId] = useState("");
  const { register, handleSubmit, errors, setError } = useForm();

  const [createLink, { loading }] = useMutation(CREATE_LINK, {
    onCompleted(res) {
      if (res.createLink.errors) {
        res.createLink.errors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
      } else {
        setShortLink(res.createLink.link.Short_URL);
      }
    },
    onError(_) {
      setError("link", {
        type: "manual",
        message: _.message,
      });
    },
  });

  const onSubmit = (data) => {
    createLink({
      variables: {
        Short_ID: data.short_id,
        Base_URL: data.link,
        Expires_At: data.expiry_time,
        Created_By: user_id,
      },
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.link} mt={4}>
          <Input
            type="text"
            placeholder="Link to shorten..."
            name="link"
            ref={register({
              required: "You must enter a link for it to be shortened",
            })}
          />
          <FormErrorMessage>
            {errors.link && errors.link.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.short_id} mt={4}>
          <InputGroup>
            <InputLeftAddon children={domain} />
            <Input
              type="text"
              value={shortId}
              onChange={(e) => setShortId(e.value)}
              placeholder="Custom short ID"
              name="short_id"
              ref={register({ required: "You must enter an ID" })}
            />
            <InputRightAddon
              children={
                <IconButton
                  icon={<FaDice />}
                  onClick={() => setShortId(nanoid(7))}
                />
              }
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.short_id && errors.short_id.message}
          </FormErrorMessage>
        </FormControl>

        <InputGroup mt={4}>
          <InputLeftAddon children="Link Expiration" />
          <Select name="expiry_time" ref={register} defaultValue={-1}>
            <option value={-1}>Never</option>
            <option value={10 * 60 * 1000}>10 minutes</option>
            <option value={60 * 60 * 1000}>1 hour</option>
            <option value={24 * 60 * 60 * 1000}>1 day</option>
            <option value={7 * 24 * 60 * 60 * 1000}>1 week</option>
            <option value={30 * 24 * 60 * 60 * 1000}>1 month</option>
            <option value={365 * 24 * 60 * 60 * 1000}>1 year</option>
          </Select>
        </InputGroup>

        <Button mt={4} mb={4} type="submit" isLoading={loading}>
          Convert!
        </Button>
      </form>

      {shortLink && <QRAndCopy link={domain + "/" + shortLink} />}
    </Box>
  );
};

export default LoggedHomePage;

const CREATE_LINK = gql`
  mutation createNewLink(
    $Short_ID: String!
    $Base_URL: String!
    $Expires_At: String!
    $Created_By: String!
  ) {
    createLink(
      Short_ID: $Short_ID
      Base_URL: $Base_URL
      Expires_At: $Expires_At
      Created_By: $Created_By
    ) {
      errors {
        field
        message
      }
      link {
        id
        Created_At
        Short_URL
        Base_URL
      }
    }
  }
`;
