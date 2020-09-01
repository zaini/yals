import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Icon,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";
import { useForm } from "react-hook-form";

const domain = "azaini.me/";
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

const LoggedHomePage = () => {
  const [short_link, setShort_Link] = useState(undefined);
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = async ({ link }) => {
    console.log(`Form Data: ${link}`);
    let response = "await shorten(link)";
    console.log("Shorten response: " + response);
    setShort_Link(response);
  };

  return (
    <Box id="homepage" w="50%" margin="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.link} mt={4}>
          <Input
            type="text"
            placeholder="Make your links shorter"
            name="link"
            ref={register}
          />
          <FormErrorMessage>
            {errors.link && errors.link.message}
          </FormErrorMessage>
        </FormControl>

        <InputGroup mt={4}>
          <InputLeftAddon children={domain} />
          <Input
            type="text"
            placeholder="Custom short ID"
            name="short_id"
            ref={register}
          />
        </InputGroup>

        <InputGroup mt={4}>
          <InputLeftAddon children="Link Expiration" />
          <Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option value={-1} selected="selected">
              Never
            </option>
            <option value={10 * 60 * 100}>10 minutes</option>
            <option value={60 * 60 * 100}>1 hour</option>
            <option value={24 * 60 * 60 * 100}>1 day</option>
            <option value={7 * 24 * 60 * 60 * 100}>1 week</option>
            <option value={30 * 24 * 60 * 60 * 100}>1 month</option>
            <option value={365 * 24 * 60 * 60 * 100}>1 year</option>
          </Select>
        </InputGroup>

        <Button mt={4} mb={4} type="submit">
          Convert!
        </Button>
      </form>

      <Box id="result">
        {short_link !== undefined
          ? [
              domain + short_link,
              <CopyToClipboard
                id="copyButton"
                text={domain + short_link}
                onCopy={() => setCopied(true)}
              >
                <button>
                  {copied ? <Icon name="check" /> : <Icon name="copy" />}
                </button>
              </CopyToClipboard>,
              <QRCode value={domain + short_link} />,
            ]
          : null}
      </Box>
    </Box>
  );
};

export default LoggedHomePage;
