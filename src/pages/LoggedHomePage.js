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
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "urql";

const domain = "azaini.me/";

const CHECK_LINK_QUERY = `query($Short_URL: String!) {
  link_by_short_url(Short_URL: $Short_URL) {
    id
    Base_URL
  }
}`;

const LoggedHomePage = () => {
  const [short_link, setShort_Link] = useState(undefined);
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const [{ data: result, fetching, error }, reexecuteQuery] = useQuery(
    CHECK_LINK_QUERY
  );

  const onSubmit = async (data) => {
    console.log(`Form data:`);
    console.log(data);
    reexecuteQuery({ Short_URL: data.short_id });
  };

  return (
    <Box id="homepage" w="50%" margin="auto">
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

        <FormControl isInvalid={errors.short_id} mt={4}>
          <InputGroup>
            <InputLeftAddon children={domain} />
            <Input
              type="text"
              placeholder="Custom short ID"
              name="short_id"
              ref={register({ required: "You must enter an ID" })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.short_id && errors.short_id.message}
          </FormErrorMessage>
        </FormControl>

        <InputGroup mt={4}>
          <InputLeftAddon children="Link Expiration" />
          <Select
            name="expiry_time"
            ref={register}
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
