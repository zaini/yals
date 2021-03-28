import React from "react";
import {
  Container,
  Center,
  Text,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MoonLoader from "react-spinners/MoonLoader";

const RedirectPage = (props) => {
  const { data, loading, error } = useQuery(GET_LINK, {
    variables: { Short_URL: props.match.params.short_id },
  });

  let markup;

  if (loading) {
    markup = (
      <Center>
        <Stack direction="column">
          <MoonLoader />
          <Text>Loading...</Text>
        </Stack>
      </Center>
    );
  } else if (error) {
    markup = (
      <Center>
        <Stack direction="column">
          <Alert status="error">
            <AlertIcon />
            <Text>{error.message}</Text>
          </Alert>
        </Stack>
      </Center>
    );
  } else if (data) {
    const link = data.getLinkForRedirect.Base_URL;

    if (link.indexOf("http") !== -1) {
      window.location.replace(link);
    } else {
      window.location.replace("//" + link);
    }

    markup = (
      <Stack direction="column">
        <Center>
          <MoonLoader />
        </Center>
        <Container textAlign="center">
          <Text>Link found!</Text>
          <Text>Redirecting to {link} ...</Text>
        </Container>
      </Stack>
    );
  }

  return <Container id="redirect">{markup}</Container>;
};

export default RedirectPage;

const GET_LINK = gql`
  query createNewLink($Short_URL: String!) {
    getLinkForRedirect(Short_URL: $Short_URL) {
      Expires_At
      Base_URL
      Short_URL
    }
  }
`;
