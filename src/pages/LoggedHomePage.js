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
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { createApolloFetch } from "apollo-fetch";
import QRAndCopy from "../components/QRAndCopy";
import isUrl from "../helpers/LinkValidation";
require("dotenv").config({ path: "../../.env" });

const domain = process.env.REACT_APP_DOMAIN;
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

const LoggedHomePage = ({ user_id }) => {
  const [short_link, setShort_Link] = useState(null);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = async (data) => {
    if (!isUrl(data.link)) {
      setError("link", {
        type: "manual",
        message: "That is not a valid link",
      });
      return;
    }

    fetch({
      query: `{
        link_by_short_url(Short_URL: "${
          data.short_id
        }", Expires_At: ${new Date().getTime()}) {
          id
          Base_URL
          Expires_At
        }
      }`,
    }).then((res) => {
      let currentDate = new Date();
      if (
        res.data.link_by_short_url &&
        (res.data.link_by_short_url.Expires_At === null ||
          res.data.link_by_short_url.Expires_At > currentDate.getTime())
      ) {
        console.log("Short ID already in use");
        console.log(res.data.link_by_short_url);
        setError("short_id", {
          type: "manual",
          message: "That short ID is already in use",
        });
      } else {
        console.log("Short ID is not in use or expired. Creating link.");
        fetch({
          query: `mutation{
            createLink(
              Short_ID: "${data.short_id}"
              Base_URL: "${data.link}"
              Expires_At: ${data.expiry_time}
              Created_By: "${user_id}"
            ) {
              Base_URL
              Short_URL
            }
          }`,
        }).then((res) => {
          console.log(res.data);
          if (res.data.createLink) {
            console.log(res.data.createLink);
            setShort_Link(res.data.createLink.Short_URL);
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
            defaultValue={-1}
          >
            <option value={-1}>Never</option>
            <option value={10 * 60 * 1000}>10 minutes</option>
            <option value={60 * 60 * 1000}>1 hour</option>
            <option value={24 * 60 * 60 * 1000}>1 day</option>
            <option value={7 * 24 * 60 * 60 * 1000}>1 week</option>
            <option value={30 * 24 * 60 * 60 * 1000}>1 month</option>
            <option value={365 * 24 * 60 * 60 * 1000}>1 year</option>
          </Select>
        </InputGroup>

        <Button mt={4} mb={4} type="submit">
          Convert!
        </Button>
      </form>

      {short_link ? <QRAndCopy link={domain + "/" + short_link} /> : null}
    </Box>
  );
};

export default LoggedHomePage;
