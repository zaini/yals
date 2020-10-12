import React from "react";
import { Box, Heading, Divider, Grid, IconButton } from "@chakra-ui/core";
import {
  Button,
  Input,
  Select,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useQuery, useMutation } from "urql";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import QRAndCopy from "../components/QRAndCopy";

const domain = process.env.REACT_APP_DOMAIN;

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

export default function SignUpPage() {
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
    console.log("deleting " + id);
    let res = await deleteLinkMutation({ id: id });
    console.log(res);
  };

  const { register, handleSubmit, errors, setError } = useForm();

  const [edit_res, editLinkMutation] = useMutation(EDIT_LINK_MUTATION);

  const onSubmit = async (data) => {
    console.log(data);
    let res = await editLinkMutation({
      id: data.id,
      new_expiry: data.expiry_time,
    });
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
        <Grid templateColumns="repeat(4, 1fr)">
          {links_data.my_links.map((e, i) => {
            return (
              <Box
                m="1"
                p="4"
                border="2px"
                textAlign="center"
                borderColor="grey"
                borderRadius="md"
              >
                <Box>Destination: {e.Base_URL}</Box>
                <Box>
                  {e.Created_At} -{" "}
                  {e.Expires_At === null ? "Never" : e.Expires_At}
                </Box>

                <Box>
                  <QRAndCopy link={domain + e.Short_URL}></QRAndCopy>
                </Box>

                <Box>
                  <Popup
                    trigger={<IconButton m={2} icon="edit" />}
                    modal
                    nested
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl isReadOnly={true} mt={4}>
                        <InputLeftAddon children="ID" />
                        <Input
                          ref={register}
                          type="text"
                          name="id"
                          defaultValue={e.id}
                        />
                      </FormControl>

                      <FormControl isReadOnly={true} mt={4}>
                        <InputLeftAddon children="Destination" />
                        <Input
                          ref={register}
                          type="text"
                          name="link"
                          defaultValue={e.Base_URL}
                        />
                      </FormControl>

                      <FormControl isReadOnly={true} mt={4}>
                        <InputLeftAddon children="Short Link" />
                        <Input
                          ref={register}
                          type="text"
                          name="shortlink"
                          defaultValue={domain + e.Short_URL}
                        />
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
                          <option value={7 * 24 * 60 * 60 * 1000}>
                            1 week
                          </option>
                          <option value={30 * 24 * 60 * 60 * 1000}>
                            1 month
                          </option>
                          <option value={365 * 24 * 60 * 60 * 1000}>
                            1 year
                          </option>
                        </Select>
                      </InputGroup>

                      <Button mt={4} mb={4} type="submit">
                        Confirm Edit
                      </Button>
                    </form>
                  </Popup>
                  <IconButton
                    m={2}
                    icon="delete"
                    onClick={() => deleteLink(e.id)}
                  />
                </Box>
                <Box fontSize={10}>Link ID: {e.id}</Box>
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  }
}
