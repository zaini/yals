import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import RedirectPage from "./pages/RedirectPage.js";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Navbar from "./components/Navbar";
require("dotenv").config({ path: "../../.env" });

const App = () => {
  const {
    data: user_data,
    loading: user_loading,
    error: user_error,
  } = useQuery(GET_USER);

  let user_id;
  if (user_data && user_data.me !== null) {
    user_id = user_data.me.id;
  }

  return (
    <Box mt={4} mx="auto" maxW="1200px" p="15px">
      <Navbar />
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
};
export default App;

const GET_USER = gql`
  query {
    me {
      id
      UserName
      Created_At
    }
  }
`;
