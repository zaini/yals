import React from "react";
import "../App.css";
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
import {
  ChevronDownIcon,
  DragHandleIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
require("dotenv").config({ path: "../../../.env" });

const domain = process.env.REACT_APP_DOMAIN;

const Navbar = () => {
  const {
    data: user_data,
    loading: user_loading,
    error: user_error,
  } = useQuery(GET_USER);

  const [logout, { loading: logout_loading }] = useMutation(LOGOUT, {
    onCompleted(res) {
      console.log("Successfully logged out");
    },
    onError(_) {
      console.log(_);
    },
  });

  let user_id;
  const { colorMode, toggleColorMode } = useColorMode();

  let body = null;
  let menu_body = null;

  if (user_loading) {
  } else if (user_data && user_data.me !== null) {
    user_id = user_data.me.id;
    body = [
      <Link className="link" href={"/account"} key={1}>
        {user_data.me.UserName}
      </Link>,
      <Button
        key={2}
        onClick={() => {
          logout();
          window.location.replace("/");
        }}
        isLoading={logout_loading}
      >
        Logout
      </Button>,
    ];
    menu_body = [
      <MenuItem as="a" href={"/account"} key={1}>
        {user_data.me.UserName}
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
  );
};

export default Navbar;

const GET_USER = gql`
  query {
    me {
      id
      UserName
      Created_At
    }
  }
`;

const LOGOUT = gql`
  mutation {
    logout
  }
`;
