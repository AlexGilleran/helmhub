import React from "react";
import { Card } from "material-ui/Card";
import UpArrowIcon from "material-ui/svg-icons/navigation/arrow-upward";
import DownArrowIcon from "material-ui/svg-icons/navigation/arrow-downward";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import ButtonCard from "../cards/button-card";

import { Row, Col } from "../../common/components/grid";

export default function MoveableCard(props) {
  const buttons = [
    {
      icon: <DeleteIcon />,
      onClick: props.onDelete
    },
    {
      icon: <UpArrowIcon />,
      onClick: props.onUp
    },
    {
      icon: <DownArrowIcon />,
      onClick: props.onDown
    }
  ];

  return (
    <ButtonCard
      buttons={buttons}
      onExpandChange={props.onExpandChange}
      expandable={props.expandable}
      title={props.title || ""}
      subtitle={props.subtitle || ""}
      defaultExpanded={props.defaultExpanded}
    >
      {props.children}
    </ButtonCard>
  );
}
