import React from "react";
import { Box, Divider, IconButton, Input } from "@chakra-ui/react";
import QRAndCopy from "./QRAndCopy";
import EditLinkBox from "./EditLinkBox";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const domain = process.env.REACT_APP_DOMAIN;

const LinkBox = ({ link }) => {
  const [deleteLink, { loading: delete_loading }] = useMutation(DELETE_LINK, {
    onCompleted(res) {
      console.log("Successfully deleted link");
    },
    onError(_) {
      console.log(_);
    },
  });

  const onDelete = (id) => {
    deleteLink({ variables: { id } });
  };

  return (
    <Box m="1" p="4" border="2px" borderColor="grey" borderRadius="md">
      <Box>
        <b>Destination:</b> <Input value={link.Base_URL} isReadOnly={true} />
      </Box>
      <Box>
        <b>Created:</b>{" "}
        <Input
          value={new Date(parseInt(link.Created_At)).toUTCString()}
          isReadOnly={true}
        />
      </Box>
      <Box>
        <b>Expires:</b>{" "}
        {link.Expires_At === null
          ? "Never"
          : new Date(parseInt(link.Expires_At)).toUTCString()}
      </Box>
      <Divider />
      <Box>
        <QRAndCopy link={domain + "/" + link.Short_URL}></QRAndCopy>
      </Box>

      <Box textAlign="center">
        <EditLinkBox link={link} />
        <IconButton
          m={2}
          icon={<DeleteIcon />}
          onClick={() => onDelete(link.id)}
        />
      </Box>
      <Box fontSize={10} textAlign="center">
        Link ID: {link.id}
      </Box>
    </Box>
  );
};

export default LinkBox;

const DELETE_LINK = gql`
  mutation DeleteLink($id: String!) {
    deleteLink(ID: $id) {
      id
    }
  }
`;
