import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
const { createApolloFetch } = require("apollo-fetch");

const domain = "azaini.me/";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: "",
      short_link: undefined,
    };
  }

  shorten() {
    console.log(this.state.link);

    fetch({
      query: `mutation{
        createLink(Base_URL: "${this.state.link}"){
          Short_URL
        }
      }`,
    }).then((res) => {
      console.log(res)
      if (res) {
        this.setState({ short_link: res.data.createLink.Short_URL });
      } else {
        console.log("Did not find a link");
      }
    });
  }

  render() {
    return (
      <Container id="homepage">
        <input
          id="link"
          placeholder="Make your links shorter"
          value={this.state.link}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.shorten();
            }
          }}
          onChange={(e) => {
            this.setState({ link: e.target.value });
          }}
        ></input>
        <br />

        <Button id="submit-button" onClick={() => this.shorten()}>
          Convert!
        </Button>
        <br />

        <Container id="result">
          {this.state.short_link != undefined ? domain + this.state.short_link : ""}
        </Container>
      </Container>
    );
  }
}
