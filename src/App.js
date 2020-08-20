import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage.js";
import RedirectPage from "./pages/RedirectPage.js";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div id="page">
      <Navbar bg="white" expand="lg" id="navbar">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="logo.jpg"
            width="50"
            height="41"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/contact"} component={ContactPage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/signup"} component={SignUpPage} />
          <Route exact path={"/:short_id"} component={RedirectPage} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
