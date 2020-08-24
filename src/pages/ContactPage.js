import React, { Component } from "react";
import { Box } from "@chakra-ui/core";

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Box>
        <div id= "contact-form">
          <div>
            <input type = "text" id = "name" placeholder = "Name" ></input>
          </div>
          <div>
            <input type = "email" id = "email" placeholder = "Email" ></input>
          </div>
          <div>
            <input type = "text" id = "subject" placeholder = "Subject" ></input>
          </div>
          <div>
            <textarea rows = "4" id = "message" placeholder = "Message" ></textarea>
          </div>
          <button type = "submit" > Submit </button>
        </div>
        <script src="../form/form-model.js"></script>
        <script src="../form/form-controller.js"></script>
      </Box>
    );
  }
}