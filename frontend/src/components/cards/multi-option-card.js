import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import ColorizeIcon from "material-ui/svg-icons/image/colorize";
import ColorLensIcon from "material-ui/svg-icons/image/color-lens";

import { colors } from "../../variables";

const ButtonDock = styled.div`
  display: inline-block;
  padding: 12px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
`;

export default class MultiOptionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.defaultMode || 0,
      expanded: this.props.defaultExpanded
    };
  }

  onModeButtonClick(newMode, event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState(state => {
      return {
        expanded: !state.expanded || newMode !== state.mode,
        mode: newMode
      };
    });
  }

  handleExpandChange(expanded) {
    this.setState({ expanded, mode: this.props.defaultMode });
  }

  onFinished() {
    this.handleExpandChange(false);
  }

  setOption = index => {
    this.setState({
      mode: index
    });
  };

  render() {
    const { mode } = this.state;
    const expanded =
      this.props.expandable === false ? true : this.state.expanded;

    return (
      <Card
        className={this.props.className}
        expanded={expanded}
        expandable={this.props.expandable}
        onExpandChange={this.handleExpandChange.bind(this)}
      >
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          avatar={this.props.avatar}
          actAsExpander={true}
        >
          <ButtonDock>
            <For each="button" of={this.props.buttons} index="index">
              <IconButton
                key={index}
                onClick={this.onModeButtonClick.bind(this, index)}
                tooltip={button.tooltip}
                tooltipPosition="bottom-left"
              >
                {React.cloneElement(button.icon, {
                  color:
                    expanded && mode === index
                      ? colors.primary
                      : "rgba(0, 0, 0, 0.870588)"
                })}
              </IconButton>
            </For>
          </ButtonDock>
        </CardHeader>
        <CardText expandable={true} style={{ padding: 0 }}>
          {this.props.children}

          {React.cloneElement(this.props.buttons[this.state.mode].component, {
            onFinished: this.onFinished.bind(this),
            setOption: this.setOption
          })}
        </CardText>
      </Card>
    );
  }
}
