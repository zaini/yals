import React, { Component } from "react";
import { Box, Heading } from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";

const fetch = createApolloFetch({
  uri: `/graphql`,
});
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
            link_by_short_url(Short_URL: "${
              this.state.short_link
            }", Expires_At: ${new Date().getTime()}){
              Base_URL
              Expires_At
            }
          }`,
    }).then((res) => {
      if (res.data.link_by_short_url) {
        let x_time = res.data.link_by_short_url.Expires_At;
        let currentDate = new Date();
        if (x_time === null || x_time > currentDate.getTime()) {
          // If link does not expire or has not expired yet
          this.setState({ link: res.data.link_by_short_url.Base_URL });
        } else {
          console.log("Link has expired.");
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
        {this.state.link !== undefined ? (
          <Heading textAlign="center">
            Redirecting to {this.state.link}...
          </Heading>
        ) : (
          <Heading textAlign="center">
            Trying to find your link... if it doesn't load, it probably doesn't
            exist or has expired
          </Heading>
        )}
      </Box>
    );
  }
}
