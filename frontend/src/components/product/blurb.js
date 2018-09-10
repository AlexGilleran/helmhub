import React from "react";
import styled from "styled-components";

import base from "../../config/base";
import Step from "../../components/pages/step";
import SingleValueTextCard from "../../components/cards/single-value-text-card";
import BlurbPara from "../../common/components/viewer/blurb-para.js";

const StyledPreview = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const StyledBlurbPara = styled(BlurbPara)`
  background: #fff;
  margin-bottom: 1em;
`;

class Preview extends React.Component {
  state = {};

  componentDidMount() {
    this.binding = base.bindToState(this.props.firebasePath, {
      context: this,
      state: "content",
      onFailure: err => {
        console.error(err);
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.binding);
  }

  render() {
    return (
      <StyledPreview>
        <h3>Preview:</h3>
        <If condition={this.state.content}>
          <StyledBlurbPara content={this.state.content} />
        </If>
        <h3>Examples:</h3>
        {this.props.examples}
      </StyledPreview>
    );
  }
}

function Blurb(props) {
  return (
    <Step
      route={props.route}
      preview={() => (
        <Preview firebasePath={props.firebasePath} examples={props.examples} />
      )}
    >
      {props.introduction}
      <SingleValueTextCard
        rows={1}
        title="Heading"
        finalSegment="heading"
        firebasePath={props.firebasePath}
      />
      <SingleValueTextCard
        rows={3}
        style={{ marginTop: "1em" }}
        title="Paragraph"
        hintText={props.paraHintText}
        firebasePath={props.firebasePath}
      />
    </Step>
  );
}

export default Blurb;
