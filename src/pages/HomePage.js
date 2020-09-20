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
require("dotenv").config({ path: "../../.env" });

const domain = process.env.REACT_APP_DOMAIN;
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

const HomePage = () => {
  const [short_link, setShort_Link] = useState(undefined);
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
    <Box id="homepage" w="50%" m="auto">
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

export default HomePage;
