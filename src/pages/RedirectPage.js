import React, { Component } from "react";
import { Box } from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";

const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default class RedirectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      short_link: this.props.match.params.short_id,
      link: undefined,
    };
  }

  redirect() {
    fetch({
      query: `{
            link_by_short_url(Short_URL: "${this.state.short_link}"){
              Base_URL
              Expires_At
            }
          }`,
    }).then((res) => {
      if (res.data.link_by_short_url) {
        let x_time = res.data.link_by_short_url.Expires_At;
        let currentDate = new Date();
        console.log(x_time, x_time > currentDate.getTime());
        if (x_time === null || x_time > currentDate.getTime()) {
          // If link does not expire or has not expired yet
          console.log("found link, redirecting");
          // this.setState({ link: res.data.link_by_short_url.Base_URL });
        }
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
      if (this.state.link.indexOf("http") !== -1) {
        window.location.replace(this.state.link);
      } else {
        window.location.replace("//" + this.state.link);
      }
    }
    return (
      <Box id="redirect">
        {this.state.link !== undefined
          ? `Redirecting to ${this.state.link}...`
          : "Trying to find your link... if it doesn't load, it proabably doesn't exist"}
      </Box>
    );
  }
}
