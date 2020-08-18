import React, { useState, Component } from "react";
import { Button, Container } from "react-bootstrap";
const { createApolloFetch } = require("apollo-fetch");

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: "",
    };
  }

  shorten() {
    console.log(this.state.link);

    fetch({
      query: `{
            link_by_base_url(Base_URL: "${this.state.link}"){
              id
              Short_URL
              Base_URL
            }
          }`,
    }).then((res) => {
      console.log(res.data.link_by_base_url[0]);
    });
  }

  render() {
    return (
      <Container id="homepage">
        <input
          id="link"
          placeholder="Make your links shorter"
          value={this.state.link}
          onKeyDown={(e) => {if(e.key === 'Enter'){this.shorten()}}}
          onChange={(e) => {
            this.setState({ link: e.target.value });
          }}
        ></input>
        <br />
        <Button id="submit-button" onClick={() => this.shorten()}>
          Convert!
        </Button>
      </Container>
    );
  }
}
