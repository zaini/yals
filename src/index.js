import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <ThemeProvider>
    <ColorModeProvider>
      <CSSReset />
      <App />
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
