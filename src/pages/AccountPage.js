import React from "react";
import { Box, Heading, Divider, Grid, IconButton } from "@chakra-ui/core";
import { useQuery } from "urql";

const ME_QUERY = `query {
  me {
    id
    UserName
    Created_At
  }
}`;

const MY_LINKS_QUERY = `query {
  my_links {
    Base_URL
    Short_URL
    Created_At
    Expires_At
  }
}`;

export default function SignUpPage() {
  const [me_res] = useQuery({ query: ME_QUERY });
  const [my_links_res] = useQuery({ query: MY_LINKS_QUERY });
  const { data, fetching, error } = me_res;
  const {
    data: links_data,
    fetching: fetching_links,
    error: links_error,
  } = my_links_res;

  console.log(data, links_data);

  if (fetching || fetching_links) {
    return <p>fetching</p>;
  } else if (error || links_error) {
    return <p>error fetching account</p>;
  } else {
    return (
      <Box mt={8} mx="auto" maxW="1200px">
        <Heading>Account</Heading>
        ID: {data.me.id}
        <Divider />
        Username: {data.me.UserName}
        <Divider />
        Created: {data.me.Created_At}
        <Divider />
        <Grid>
          {links_data.my_links.map((e, i) => {
            return (
              <Box m="4">
                Link: {e.Base_URL} Short: {e.Short_URL} Created: {e.Created_At} Expires: {e.Expires_At} <IconButton icon="edit" /> <IconButton icon="delete" />
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  }
}
