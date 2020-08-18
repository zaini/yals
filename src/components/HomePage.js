import React, { Component } from "react";
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
      short_link: undefined,
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
      if (res.data.link_by_base_url[0] != undefined) {
        console.log(res.data.link_by_base_url[0].Short_URL);
        this.setState({ short_link: res.data.link_by_base_url[0].Short_URL });
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
          {this.state.short_link != undefined ? this.state.short_link : ""}
        </Container>

      </Container>
    );
  }
}
