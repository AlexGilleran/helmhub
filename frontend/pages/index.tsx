import React from "react";

import Wrapper from "../src/components/universal/wrapper";
import { Row, Col, media } from "../src/components/grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function Index(props) {
  return (
    <Wrapper>
      <Row xsTop={true} xsCenter={true}>
        <Col xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h1">
                Top Charts
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
}
