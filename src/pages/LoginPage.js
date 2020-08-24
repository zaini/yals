import React, { Component } from "react";
import { Box } from "@chakra-ui/core";
import GoogleLogin from "react-google-login";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    return (
      <Box>
        <GoogleLogin
          clientId="110139847957-18v65kpfcpt8k5pc8n8galikf65mm4v8.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />{" "}
      </Box>
    );
  }
}
