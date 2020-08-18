import React, { useState, Component } from "react";
import { Button, Container } from "react-bootstrap";
const { createApolloFetch } = require('apollo-fetch');

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: "",
    };
  }

  shorten() {
    const fetch = createApolloFetch({
        uri: 'http://localhost:4000/graphql',
      });

    console.log(this.state.link);

    fetch({
        query: `{
            link_by_base_url(Base_URL: "${this.state.link}"){
              id
              Short_URL
              Base_URL
            }
          }`
    }).then(res => {
        var x = res["data"]
        var x = x["link_by_base_url"]
        console.log(x[0].Short_URL)
        return x[0].Short_URL;
    })
  }

  render() {
    return (
      <Container id="homepage">
        <input
          id="link"
          placeholder="Make your links shorter"
          value={this.state.link}
          onChange={(e) => this.setState({ link: e.target.value })}
        ></input>
        <br />
        <Button id="submit-button" onClick={() => this.shorten()}>
          Convert!
        </Button>
      </Container>
    );
  }
}
