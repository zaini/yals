import React from "react";
import { Box, Divider, IconButton, Input } from "@chakra-ui/react";
import QRAndCopy from "./QRAndCopy";
import EditLinkBox from "./EditLinkBox";
import { DeleteIcon } from "@chakra-ui/icons";

const domain = process.env.REACT_APP_DOMAIN;

const LinkBox = ({ link: e, handleSubmit, onSubmit, deleteLink, register }) => {
  return (
    <Box m="1" p="4" border="2px" borderColor="grey" borderRadius="md">
      <Box>
        <b>Destination:</b> <Input value={e.Base_URL} isReadOnly={true} />
      </Box>
      <Box>
        <b>Created:</b>{" "}
        <Input
          value={new Date(parseInt(e.Created_At)).toUTCString()}
          isReadOnly={true}
        />
      </Box>
      <Box>
        <b>Expires:</b>{" "}
        {e.Expires_At === null
          ? "Never"
          : new Date(parseInt(e.Expires_At)).toUTCString()}
      </Box>
      <Divider />
      <Box>
        <QRAndCopy link={domain + "/" + e.Short_URL}></QRAndCopy>
      </Box>

      <Box textAlign="center">
        <EditLinkBox
          link={e}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />
        <IconButton
          m={2}
          icon={<DeleteIcon />}
          onClick={() => deleteLink(e.id)}
        />
      </Box>
      <Box fontSize={10} textAlign="center">
        Link ID: {e.id}
      </Box>
    </Box>
  );
};

export default LinkBox;
