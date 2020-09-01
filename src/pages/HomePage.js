import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Icon,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import QRCode from "qrcode.react";

const domain = "azaini.me/";
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

const HomePage = () => {
  const [short_link, setShort_Link] = useState(undefined);
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = async ({ link }) => {
    console.log(`Form Data: ${link}`);
    let response = await shorten(link);
    console.log("Shorten response: " + response);
    setShort_Link(response);
  };

  const shorten = async (link) => {
    return await fetch({
      query: `{link_by_base_url(Base_URL: "${link}"){
        Short_URL
      }
    }`,
    }).then((res) => {
      // console.log(res.data.link_by_base_url);
      if (res.data.link_by_base_url[0]) {
        // console.log("Found existing link");
        return res.data.link_by_base_url[0].Short_URL;
      } else {
        // console.log("Did not find an existing link. Creating new one.");
        return fetch({
          query: `mutation{
            createLink(Base_URL: "${link}"){
              Short_URL
            }
          }`,
        }).then((res) => {
          if (res) {
            return res.data.createLink.Short_URL;
          } else {
            setError("link", {
              type: "manual",
              message: "Could not create a link successfully.",
            });
          }
        });
      }
    });
  };

  return (
    <Box id="homepage">
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

export default HomePage;
