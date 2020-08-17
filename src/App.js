// import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage.js";
// import AboutPage from "./components/ContactPage";
// import SearchPage from "./components/LoginPage";
// import ContactPage from "./components/SignUpPage";

function App() {
  // const [list, setList] = useState(["apple", "oranges"]);

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
          <Route exact path={"/"} component={HomePage}/>
          {/* <Route path={"/contact"} component={ContactPage}/>
          <Route path={"/login"} component={LoginPage}/>
          <Route path={"/signup"} component={SignUpPage}/> */}
        </Router>
    </div>
  );
}
export default App;