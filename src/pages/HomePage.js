import React, { Component, useState } from "react";
import { Box, Button, Input, Icon } from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from "qrcode.react";

const domain = "azaini.me/";
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      short_link: undefined,
      copied: false,
    };
  }

  shorten() {
    fetch({
      query: `{link_by_base_url(Base_URL: "${this.state.link}"){
        Short_URL
      }
    }`,
    }).then((res) => {
      console.log(res.data.link_by_base_url);
      if (res.data.link_by_base_url[0]) {
        console.log("Found existing link");
        this.setState({ short_link: res.data.link_by_base_url[0].Short_URL });
      } else {
        console.log("Did not find an existing link. Creating new one.");
        fetch({
          query: `mutation{
            createLink(Base_URL: "${this.state.link}"){
              Short_URL
            }
          }`,
        }).then((res) => {
          if (res) {
            this.setState({ short_link: res.data.createLink.Short_URL });
          } else {
            console.log("Did not create a link successfully");
          }
        });
      }
    });
  }

  render() {
    return (
      <Box id="homepage">
        <Input
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
        ></Input>
        <br />

        <Button id="submit-button" onClick={() => this.shorten()}>
          Convert!
        </Button>
        <br />

        <Box id="result">
          {this.state.short_link !== undefined
            ? [
              domain + this.state.short_link,
              <CopyToClipboard id="copyButton" text={domain + this.state.short_link} onCopy={() => this.setState({ copied: true })}>
                <button>
                  {this.state.copied ? <Icon name="check" /> : <Icon name="copy" />}
                </button>
              </CopyToClipboard>,
              <QRCode value={domain + this.state.short_link} />,
            ]
            : null}
        </Box>
      </Box>
    );
  }
}
