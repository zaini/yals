import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { createClient, Provider } from "urql";
require("dotenv").config({ path: "../../.env" });

const client = createClient({
  url: `/graphql`,
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
