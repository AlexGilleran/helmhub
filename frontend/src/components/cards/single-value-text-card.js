import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import TextField from "material-ui/TextField";

import base from "../../config/base";

export default class SingleValueTextCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: { text: "" } };
  }

  finalSegment() {
    return this.props.finalSegment || "text";
  }

  componentDidMount() {
    this.binding = base.syncState(this.props.firebasePath, {
      context: this,
      state: "text",
      onFailure: err => {
        console.error(err);
      },
      then: () => {
        if (
          this.props.default &&
          (!this.state.text || !this.state.text[this.finalSegment()])
        ) {
          this.setText(this.props.default);
        }
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.binding);
  }

  onTextChange = event => {
    this.setText(event.target.value);
  };

  setText = value => {
    this.setState({ text: { [this.finalSegment()]: value } });
  };

  render() {
    return (
      <Card className={this.props.className} style={this.props.style}>
        <CardText>
          {this.props.children}
          <TextField
            floatingLabelText={this.props.title}
            hintText={this.props.hintText || ""}
            rows={this.props.rows}
            maxRows={3}
            multiLine={true}
            fullWidth={true}
            value={this.state.text[this.finalSegment()]}
            onChange={this.onTextChange}
          />
        </CardText>
      </Card>
    );
  }
}
