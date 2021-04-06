import ApolloProvider from "./ApolloProvider";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

require("dotenv").config({ path: "../../.env" });

ReactDOM.render(<ApolloProvider />, document.getElementById("root"));
