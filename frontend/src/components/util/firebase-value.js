import React from "react";
import ReactMarkdown from "react-markdown";

import base from "../../config/base";

export default class FirebaseValue extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: "" };
  }

  componentDidMount() {
    this.binding = base.bindToState(this.props.firebasePath, {
      context: this,
      state: "text",
      defaultValue: "",
      onFailure: err => {
        console.error(err);
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.binding);
  }

  render() {
    return this.props.markdown ? (
      <ReactMarkdown source={this.state.text || ""} />
    ) : (
      <span>{typeof this.state.text === "string" ? this.state.text : ""}</span>
    );
  }
}
