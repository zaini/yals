// import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [list, setList] = useState(["apple", "oranges"]);

  return (
    <div>
        <Navbar bg="white" expand="lg">
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
                  <Nav.Link id="signup" href="/signUp">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        <hr></hr>
        <div>
          <form class="wrapper">
            <input type="text" id="link" placeholder="Make your links shorter"></input>
            <input type="submit" id="link"value="Convert!"></input>
          </form> 
          <div class='loader'>
            <div class='loader--dot'></div>
            <div class='loader--dot'></div>
            <div class='loader--dot'></div>
            <div class='loader--dot'></div>
            <div class='loader--dot'></div>
            <div class='loader--dot'></div>
            <div class='loader--text'></div>
          </div>
        </div>
    </div>
  );
}

export default App;
  //   <div id="main">
  //     <h1>fruits</h1>
  //     <p>fruit list</p>
  //     <ul id="fruit-list">
  //     {
  //       list.map(fruit => {
  //         return <li>{fruit}</li>
  //       })
  //     }
  //     <button onClick={()=>setList([list, "random fruit"])}>add fruit</button>
  //     </ul>
  //   </div>
  // );