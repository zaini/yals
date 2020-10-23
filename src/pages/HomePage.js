import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import UnloggedHomePage from "./UnloggedHomePage";
import LoggedHomePage from "./LoggedHomePage";
require("dotenv").config({ path: "../../.env" });

const HomePage = ({ user_id }) => {
  return (
    <Box id="homepage" w="50%" margin="auto">
      <Heading>Shorten your links with yals</Heading>
      {user_id ? <LoggedHomePage user_id={user_id} /> : <UnloggedHomePage />}
    </Box>
  );
};

export default HomePage;
