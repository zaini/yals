import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
});

ReactDOM.render(
  <Provider value={client}>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
