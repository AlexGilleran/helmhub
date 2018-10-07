import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Wrapper from "../src/components/universal/wrapper";
import { Container, Row, Col } from "../src/components/grid";
import { Code, Line } from "../src/components/code";

const StyledCard = styled(Card as any)`
  margin-bottom: 1em;
`;

const StyledCode = styled(Code)`
  margin: 1em 0;
`;

const SignupButtonWrapper = styled.div`
  margin: 1em 0 0 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
`;

export default function Index() {
  return (
    <Wrapper>
      <Container>
        <Row xsTop={true} xsCenter={true}>
          <Col xs={12}>
            <Title>The easiest way to publish your Helm chart</Title>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <StyledCard>
              <CardContent>
                <Typography variant="body1" component="p">
                  Helmhub is a simple way of hosting your open Helm charts
                  online - like NPM, but for Helm.
                </Typography>
                <SignupButtonWrapper>
                  <Link href="/login/register">
                    <Button variant="contained" color="primary">
                      Sign Up
                    </Button>
                  </Link>
                </SignupButtonWrapper>
              </CardContent>
            </StyledCard>
            <StyledCard>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  How to Publish
                </Typography>
                <Typography variant="body1" component="p">
                  With HelmHub, making your Helm Chart available is as simple as
                  two commands:
                </Typography>

                <StyledCode>
                  <Line>
                    helm install plugin {"https://helmhub.com/plugin"}
                  </Line>
                  <Line>helm hub publish</Line>
                </StyledCode>
              </CardContent>
            </StyledCard>
            <StyledCard>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  What is Helm?
                </Typography>
                <Typography variant="body1" component="p">
                  Helm is the easiest way to define, install, and upgrade even
                  the most complex Kubernetes application. Find out more at{" "}
                  <a href="https://helm.sh/">helm.sh</a>.
                </Typography>
              </CardContent>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}
