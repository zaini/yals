import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage.js";
import RedirectPage from "./pages/RedirectPage.js";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Box, Flex, Text, Image, Link, Button, useColorMode } from "@chakra-ui/core";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        className="navbar-header"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Image
            src="https://freight.cargo.site/t/original/i/245e7cd460861c15daaba23637d2849a9ebb7e664f16553e814b3bea47681eb9/AA_logo_transparent-bg.png"
            size={70}
          />
          <Text pl={3}>Link-Shortener</Text>
        </Flex>
        <Box className="navbar-links">
          <Link href={"/"}>Home</Link>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Sign Up</Link>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Box>
      </Flex>

      <Router>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/contact"} component={ContactPage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/signup"} component={SignUpPage} />
          <Route exact path={"/:short_id"} component={RedirectPage} />
        </Switch>
      </Router>
    </Box>
  );
}
export default App;
