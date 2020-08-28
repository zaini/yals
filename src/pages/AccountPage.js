import React from "react";
import { Box, Heading, Divider } from "@chakra-ui/core";
import { useQuery } from "urql";

const ME_QUERY = `query {
  me {
    id
    UserName
    Created_At
  }
}`;

export default function SignUpPage() {
  const [me_res, reexecuteQuery] = useQuery({ query: ME_QUERY });
  const { data, fetching, error } = me_res;

  console.log(data);

  if (fetching) {
    return <p>fetching</p>;
  } else if (error) {
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
      </Box>
    );
  }
}
