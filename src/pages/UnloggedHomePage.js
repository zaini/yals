import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { useForm } from "react-hook-form";
import QRAndCopy from "../components/QRAndCopy";
import isUrl from "../helpers/LinkValidation";
require("dotenv").config({ path: "../../.env" });

const domain = process.env.REACT_APP_DOMAIN;
const fetch = createApolloFetch({
  uri: `/graphql`,
});

const UnloggedHomePage = () => {
  const [short_link, setShort_Link] = useState(undefined);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = async ({ link }) => {
    let response = await shorten(link);
    setShort_Link(response);
  };

  const shorten = async (link) => {
    if (!isUrl(link)) {
      setError("link", {
        type: "manual",
        message: "That is not a valid link",
      });
      return;
    }

    return await fetch({
      query: `{link_by_base_url(Base_URL: "${link}"){
        Short_URL
      }
    }`,
    }).then((res) => {
      if (res.data.link_by_base_url[0]) {
        return res.data.link_by_base_url[0].Short_URL;
      } else {
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

        <Button mt={4} mb={4} type="submit">
          Convert!
        </Button>
      </form>

      {short_link ? <QRAndCopy link={domain + "/" + short_link} /> : null}
    </Box>
  );
};

export default UnloggedHomePage;
