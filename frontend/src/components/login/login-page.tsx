import React from "react";

import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

import { Row, Col, media } from "../grid";
import LoginComponent from "./login";
import Wrapper from "../universal/wrapper";

const DescriptionCol = styled(Col)`
  text-align: center;
`;
const AlternativeButton = styled(RaisedButton)`
  margin-top: 1em;
`;

const Footer = styled.p`
  font-size: 0.8em;
`;

export default class Login extends React.Component {
  onSignIn() {
    Router.push("/");
  }

  render() {
    return (
      <Wrapper>
        <Row xsTop={true} xsCenter={true}>
          <DescriptionCol xs={12} sm={12} md={6}>
            <h1>{this.props.title}</h1>
            {this.props.explanation}
            <LoginComponent onSignIn={this.onSignIn.bind(this)} />
            <Link href={this.props.alternativeRoute} passHref={true}>
              <AlternativeButton
                secondary={true}
                label={this.props.alternativeCaption}
              />
            </Link>
            <Footer>
              <Link href="/privacy" passHref={true}>
                <a>Privacy Policy</a>
              </Link>
            </Footer>
          </DescriptionCol>
        </Row>
      </Wrapper>
    );
  }
}
