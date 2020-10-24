import React from "react";
import { Box, Divider, IconButton } from "@chakra-ui/core";
import QRAndCopy from "./QRAndCopy";
import EditLinkBox from "./EditLinkBox";

const domain = process.env.REACT_APP_DOMAIN;

export default function LinkBox({
  link: e,
  handleSubmit,
  onSubmit,
  deleteLink,
  register,
}) {
  return (
    <Box m="1" p="4" border="2px" borderColor="grey" borderRadius="md">
      <Box>
        <b>Destination:</b> {e.Base_URL}
      </Box>
      <Box>
        <b>Created:</b> {new Date(parseInt(e.Created_At)).toUTCString()}
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
        <IconButton m={2} icon="delete" onClick={() => deleteLink(e.id)} />
      </Box>
      <Box fontSize={10} textAlign="center">
        Link ID: {e.id}
      </Box>
    </Box>
  );
}
