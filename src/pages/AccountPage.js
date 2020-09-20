import React from "react";
import { Box, Heading, Divider, Grid, IconButton } from "@chakra-ui/core";
import { useQuery, useMutation } from "urql";

const ME_QUERY = `query {
  me {
    id
    UserName
    Created_At
  }
}`;

const MY_LINKS_QUERY = `query {
  my_links {
    id
    Base_URL
    Short_URL
    Created_At
    Expires_At
  }
}`;

const DELETE_LINK_MUTATION = `mutation DeleteLink($id: String!) {
  deleteLink(ID: $id) {
    id
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

  const [res, deleteLinkMutation] = useMutation(DELETE_LINK_MUTATION);

  const deleteLink = async (id) => {
    console.log("deleting " + id);
    let res = await deleteLinkMutation({ id: id });
    console.log(res);
  };

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
              <Box
                m="1"
                p="4"
                border="2px"
                borderColor="grey"
                borderRadius="md"
              >
                id: {e.id} Link: {e.Base_URL} Short: {e.Short_URL} Created:{" "}
                {e.Created_At} Expires: {e.Expires_At}{" "}
                <IconButton icon="edit" />{" "}
                <IconButton icon="delete" onClick={() => deleteLink(e.id)} />
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  }
}
