import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import UnloggedHomePage from "./UnloggedHomePage";
import LoggedHomePage from "./LoggedHomePage";

const HomePage = ({ user_id }) => {
  return (
    <Box mx="auto" maxW="800px" p="10px">
      <Heading>Shorten your links with yals</Heading>
      {user_id ? <LoggedHomePage user_id={user_id} /> : <UnloggedHomePage />}
    </Box>
  );
};

export default HomePage;
