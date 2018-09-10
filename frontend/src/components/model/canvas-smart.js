import React from "react";

import Canvas from "./canvas";
import authHoc from "../hoc/auth-hoc-page";
import base from "../../config/base";

class SmartCanvas extends React.Component {
  state = {};

  componentDidMount() {
    this.binding = base.syncState(
      `/users/${this.props.user.uid}/sites/main/model`,
      {
        context: this,
        state: "model",
        onFailure: err => {
          console.error(err);
        }
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.binding);
  }

  render() {
    return <Canvas model={this.state.model} styling={this.props.styling} />;
  }
}

export default authHoc(SmartCanvas);
