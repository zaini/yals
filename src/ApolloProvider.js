import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  connectToDevTools: true,
  cache: new InMemoryCache(),
});

const appExport = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <CSSReset />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default appExport;
