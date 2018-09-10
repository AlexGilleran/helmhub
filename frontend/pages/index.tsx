import React from "react";

import Wrapper from "../src/components/universal/wrapper";
import { Row, Col, media } from "../src/components/grid";
import { Card, CardText } from "material-ui/Card";

export default function Privacy(props) {
  return (
    <Wrapper>
      <Row xsTop={true} xsCenter={true}>
        <Col xs={12} sm={12} md={9}>
          <Card>
            <CardText>{props.children}</CardText>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
}
