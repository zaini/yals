import React from "react";
import { Box, Heading, Divider, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import LinkBox from "../components/LinkBox";
import gql from "graphql-tag";

const AccountPage = () => {
  const {
    data: user_data,
    loading: user_loading,
    error: user_error,
  } = useQuery(GET_USER);

  const {
    data: links_data,
    loading: links_loading,
    error: links_error,
  } = useQuery(GET_LINKS);

  if (user_loading || links_loading) {
    return <Heading textAlign="center">Loading your account...</Heading>;
  } else if (user_error || links_error) {
    return (
      <Heading textAlign="center">Error loading your account... bruh</Heading>
    );
  } else {
    return (
      <Box mt={8} mx="auto" maxW="1200px">
        <Heading>Account</Heading>
        <b>ID:</b> {user_data.me.id}
        <Divider />
        <b>Username:</b> {user_data.me.UserName}
        <Divider />
        <b>Created:</b>{" "}
        {new Date(parseInt(user_data.me.Created_At)).toUTCString()}
        <Divider />
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
          {links_data.my_links.map((e, i) => {
            return <LinkBox key={i} link={e} />;
          })}
        </Grid>
      </Box>
    );
  }
};

export default AccountPage;

const GET_USER = gql`
  query {
    me {
      id
      UserName
      Created_At
    }
  }
`;

const GET_LINKS = gql`
  query {
    my_links {
      id
      Base_URL
      Short_URL
      Created_At
      Expires_At
    }
  }
`;
