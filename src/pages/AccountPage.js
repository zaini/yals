import React from "react";
import { Box, Heading, Divider, Grid } from "@chakra-ui/react";
import { useQuery, useMutation } from "urql";
import { useForm } from "react-hook-form";
import LinkBox from "../components/LinkBox";

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

const EDIT_LINK_MUTATION = `mutation EditLink($id: String!, $new_expiry: String!) {
  editLink(ID: $id, New_Expiry: $new_expiry) {
    id
    Expires_At
  }
}
`;

const AccountPage = () => {
  const [me_res] = useQuery({ query: ME_QUERY });
  const [my_links_res] = useQuery({ query: MY_LINKS_QUERY });
  const { data, fetching, error } = me_res;
  const {
    data: links_data,
    fetching: fetching_links,
    error: links_error,
  } = my_links_res;

  const [delete_res, deleteLinkMutation] = useMutation(DELETE_LINK_MUTATION);

  const deleteLink = async (id) => {
    let res = await deleteLinkMutation({ id: id });
    window.location.reload(false);
  };

  const { register, handleSubmit, errors, setError } = useForm();

  const [edit_res, editLinkMutation] = useMutation(EDIT_LINK_MUTATION);

  const onSubmit = async (data) => {
    let res = await editLinkMutation({
      id: data.id,
      new_expiry: data.expiry_time,
    });
  };

  if (fetching || fetching_links) {
    return <Heading textAlign="center">Loading your account...</Heading>;
  } else if (error || links_error) {
    return (
      <Heading textAlign="center">Error loading your account... bruh</Heading>
    );
  } else {
    return (
      <Box mt={8} mx="auto" maxW="1200px">
        <Heading>Account</Heading>
        <b>ID:</b> {data.me.id}
        <Divider />
        <b>Username:</b> {data.me.UserName}
        <Divider />
        <b>Created:</b> {new Date(parseInt(data.me.Created_At)).toUTCString()}
        <Divider />
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
          {links_data.my_links.map((e, i) => {
            return (
              <LinkBox
                link={e}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                deleteLink={deleteLink}
                register={register}
              />
            );
          })}
        </Grid>
      </Box>
    );
  }
};

export default AccountPage;
