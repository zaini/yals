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
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
  MenuDivider,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "urql";
import {
  ChevronDownIcon,
  DragHandleIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
require("dotenv").config({ path: "../../.env" });

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
  const [me_res] = useQuery({ query: ME_QUERY });
  const [res, logout] = useMutation(LOGOUT_MUTATION);
  const { data, fetching } = me_res;
  let user_id;
  const { colorMode, toggleColorMode } = useColorMode();

  let body = null;
  let menu_body = null;

  if (fetching) {
  } else if (data && data.me !== null) {
    user_id = data.me.id;
    body = [
      <Link className="link" href={"/account"} key={1}>
        {data.me.UserName}
      </Link>,
      <Button
        key={2}
        onClick={() => {
          logout();
          window.location.replace("/");
        }}
        isLoading={res.fetching}
      >
        Logout
      </Button>,
    ];
    menu_body = [
      <MenuItem as="a" href={"/account"} key={1}>
        {data.me.UserName}
      </MenuItem>,
      <MenuItem
        key={2}
        onClick={() => {
          logout();
          window.location.replace("/");
        }}
      >
        Logout
      </MenuItem>,
    ];
  } else {
    body = [
      <Link className="link" href={"/login"} key={1}>
        Login
      </Link>,
      <Link className="link" href={"/signup"} key={2}>
        Sign Up
      </Link>,
    ];
    menu_body = [
      <MenuItem as="a" href={"/login"} key={3}>
        Login
      </MenuItem>,
      <MenuItem as="a" href={"/signup"} key={4}>
        Sign Up
      </MenuItem>,
    ];
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

        <Box className="navbar-links-menu">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr="15px">
              <DragHandleIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as="a" className="link" href={"/"}>
                Home
              </MenuItem>
              <MenuItem as="a" className="link" href={"/contact"}>
                Contact
              </MenuItem>
              <MenuDivider />
              {menu_body && menu_body[0]}
              {menu_body && menu_body[1]}
              <MenuDivider />
              <MenuItem>
                <Button onClick={toggleColorMode} marginRight="50px">
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box className="navbar-links">
          <Link className="link" href={"/"}>
            Home
          </Link>
          <Link className="link" href={"/contact"}>
            Contact
          </Link>
          {body}
          <Button onClick={toggleColorMode} marginRight="50px">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Flex>

      <Box mt={4} mx="auto" maxW="1200px" p="15px">
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
    </Box>
  );
}
export default App;
