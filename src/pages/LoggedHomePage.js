import React, { Component } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Icon,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const domain = "azaini.me/";
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default class LoggedHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      short_link: undefined,
      short_id: "",
      expiry_date: undefined,
      copied: false,
    };
  }

  shorten() {}

  render() {
    return (
      <Box id="homepage" w="50%" margin="auto">
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

        <Input
          placeholder="Custom Short ID"
          value={this.state.short_id}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.shorten();
            }
          }}
          onChange={(e) => {
            this.setState({ short_id: e.target.value });
          }}
        ></Input>
        <br />

        <InputGroup>
          <InputLeftAddon children="Link Expiration" />
          <Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option value={-1} selected="selected">
              Never
            </option>
            <option value={10 * 60 * 100}>10 minutes</option>
            <option value={60 * 60 * 100}>1 hour</option>
            <option value={24 * 60 * 60 * 100}>1 day</option>
            <option value={7 * 24 * 60 * 60 * 100}>1 week</option>
            <option value={30 * 24 * 60 * 60 * 100}>1 month</option>
            <option value={365 * 24 * 60 * 60 * 100}>1 year</option>
          </Select>
        </InputGroup>

        <br />

        <Button id="submit-button" onClick={() => this.shorten()}>
          Convert!
        </Button>
        <br />

        <Box id="result">
          {this.state.short_link !== undefined
            ? [
                domain + this.state.short_link,
                <CopyToClipboard
                  id="copyButton"
                  text={domain + this.state.short_link}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button>
                    {this.state.copied ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="copy" />
                    )}
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
