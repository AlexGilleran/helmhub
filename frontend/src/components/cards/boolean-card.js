import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Toggle from "material-ui/Toggle";

import base from "../../config/base";

export default class BooleanCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: {} };

    const pathSegments = this.props.firebasePath.split("/");
    this.finalSegment = pathSegments[pathSegments.length - 1];
    this.restOfPath = pathSegments.slice(0, -1).join("/");
  }

  componentDidMount() {
    this.binding = base.syncState(this.restOfPath, {
      context: this,
      state: "value",
      onFailure: err => {
        console.error(err);
      },
      then: () => {
        if (
          typeof this.state.value[this.finalSegment] === "undefined" &&
          typeof this.props.default !== "undefined"
        ) {
          base.post(this.restOfPath, {
            data: {
              [this.finalSegment]: this.props.invert
                ? !this.props.default
                : this.props.default
            }
          });
        }
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.binding);
  }

  onChange = (_, rawValue) => {
    const value = this.props.invert ? !rawValue : rawValue;
    this.setState({ value: { [this.finalSegment]: value } });
  };

  getValue() {
    const raw = this.state.value[this.finalSegment];
    return this.props.invert ? !raw : !!raw;
  }

  render() {
    return (
      <Card className={this.props.className} style={this.props.style}>
        <CardText>
          {this.props.children}
          <Toggle
            label={this.props.title}
            toggled={this.getValue()}
            onToggle={this.onChange}
          />
        </CardText>
      </Card>
    );
  }
}
