import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage.js";
import RedirectPage from "./pages/RedirectPage.js";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import {
  Box,
  Flex,
  Text,
  Link,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/core";
import { useQuery, useMutation } from "urql";
require("dotenv").config();

const domain = process.env.REACT_APP_DOMAIN;

const ME_QUERY = `query {
  me {
    id
    UserName
  }
}`;

const LOGOUT_MUTATION = `mutation {
  logout
}`;

function App() {
  const [me_res, reexecuteQuery] = useQuery({ query: ME_QUERY });
  const [res, logout] = useMutation(LOGOUT_MUTATION);
  const { data, fetching, error } = me_res;
  let user_id;
  const { colorMode, toggleColorMode } = useColorMode();

  let body = null;

  if (fetching) {
  } else if (data && data.me !== null) {
    user_id = data.me.id;
    body = (
      <>
        <Link className="link" href={"/account"}>
          {data.me.UserName}
        </Link>
        <Button
          onClick={() => {
            logout();
            window.location.replace("/");
          }}
          isLoading={res.fetching}
        >
          Logout
        </Button>
      </>
    );
  } else {
    body = (
      <>
        <Link className="link" href={"/login"}>
          Login
        </Link>
        <Link className="link" href={"/signup"}>
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <Box>
      <Flex
        className="navbar-header"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Text p={3} pl={5} fontSize="30px">
            <b>{domain}</b>
          </Text>
        </Flex>

        <Box className="navbar-links">
          <Link className="link" href={"/"}>
            Home
          </Link>
          <Link className="link" href={"/contact"}>
            Contact
          </Link>
          {body}
          <Button onClick={toggleColorMode} marginRight="50px">
            {colorMode === "light" ? (
              <Icon name="moon" width="auto" />
            ) : (
              <Icon name="sun" />
            )}
          </Button>
        </Box>
      </Flex>

      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            component={() => <HomePage user_id={user_id} />}
          />
          <Route path={"/contact"} component={ContactPage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/signup"} component={SignUpPage} />
          <Route path={"/account"} component={AccountPage} />
          <Route exact path={"/:short_id"} component={RedirectPage} />
        </Switch>
      </Router>
    </Box>
  );
}
export default App;
