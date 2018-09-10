import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Picker from "../list/picker";

export default function PickerCard(props) {
  return (
    <Card className={props.className}>
      <CardText>
        <Picker {...props} />
      </CardText>
    </Card>
  );
}
