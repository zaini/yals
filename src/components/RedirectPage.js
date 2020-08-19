import React, { Component } from "react";
import { Container } from "react-bootstrap";
const { createApolloFetch } = require("apollo-fetch");

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});

export default class RedirectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      short_link: this.props.match.params.short_id,
      link: undefined
    };
  }

  redirect() {
    fetch({
      query: `{
            link_by_short_url(Short_URL: "${this.state.short_link}"){
              id
              Short_URL
              Base_URL
            }
          }`,
    }).then((res) => {
      console.log(this.state.short_link, res);
      if (res.data.link_by_short_url[0] != undefined) {
        console.log(res.data.link_by_short_url[0].Base_URL);
        this.setState({ link: res.data.link_by_short_url[0].Base_URL });
      } else {
        console.log("Did not find a link");
      }
    });
  }

  componentDidMount() {
    this.redirect();
  }

  render() {
    if (this.state.link !== undefined) {
      window.location.replace("//" + this.state.link);
    }
    return (
      <Container id="redirect">
        {this.state.link != undefined ? this.state.link : "Tryin to find your link... if it doesn't load, it proabably doesn't exist"}
      </Container>
    );
  }
}
