import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import ColorizeIcon from "material-ui/svg-icons/image/colorize";
import ColorLensIcon from "material-ui/svg-icons/image/color-lens";

const ButtonDock = styled.div`
  display: inline-block;
  position: absolute;
  top: 5px;
  bottom: 0px;
  right: ${props => (props.roomForExpander ? "42px" : "12px")};
`;

const FlexCard = styled(Card)`
  & > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const FlexCardText = styled(CardText)`flex: 1;`;

export default class ButtonCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onButtonClick = op => event => {
    event.stopPropagation();
    event.preventDefault();

    op(event);
  };

  render() {
    return (
      <FlexCard
        expandable={this.props.expandable}
        onExpandChange={this.props.onExpandChange}
        className={this.props.className}
        initiallyExpanded={this.props.defaultExpanded}
      >
        <CardHeader
          title={this.props.title}
          subtitle={this.props.color}
          avatar={this.props.avatar}
          actAsExpander={this.props.expandable}
          showExpandableButton={this.props.expandable}
        >
          <ButtonDock roomForExpander={this.props.expandable}>
            <For each="button" of={this.props.buttons} index="index">
              <IconButton
                key={index}
                disabled={!button.onClick && !button.href}
                onClick={
                  button.onClick
                    ? this.onButtonClick(button.onClick)
                    : undefined
                }
                href={button.href}
                target={button.target}
                style={{ verticalAlign: "inherit" }}
                tooltip={button.tooltip}
              >
                {button.icon}
              </IconButton>
            </For>
          </ButtonDock>
        </CardHeader>
        <FlexCardText
          expandable={this.props.expandable}
          style={{ paddingTop: 0 }}
        >
          {this.props.children}
        </FlexCardText>
      </FlexCard>
    );
  }
}
