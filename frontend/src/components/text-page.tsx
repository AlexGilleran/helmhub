import React from "react";

import styled from "styled-components";
import { Card, CardText } from "material-ui/Card";

import { Row, Col, media } from "../components/grid";
import Wrapper from "../components/universal/wrapper";

const StyledCardText = styled(CardText)`
  > * {
    font-size: 1.5em;
  }
`;

const ScrollyWrapper = styled(Wrapper)`
  overflow-y: auto;
`;

const Heading = styled.h1`
  text-align: center;
`;

export default function Privacy(props) {
  return (
    <ScrollyWrapper>
      <Heading>{props.title}</Heading>
      <Row xsTop={true} xsCenter={true}>
        <Col xs={12} sm={12} md={9}>
          <Card>
            <StyledCardText>{props.children}</StyledCardText>
          </Card>
        </Col>
      </Row>
    </ScrollyWrapper>
  );
}
