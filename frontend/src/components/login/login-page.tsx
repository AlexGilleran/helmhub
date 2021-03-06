import React from "react";

import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { Row, Col, media } from "../grid";
import LoginComponent from "./login";
import Wrapper from "../universal/wrapper";

const DescriptionCol = styled(Col)`
  text-align: center;
`;
const AlternativeButton = styled(Button)`
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
              <AlternativeButton variant="contained" color="secondary">
                {this.props.alternativeCaption}
              </AlternativeButton>
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
