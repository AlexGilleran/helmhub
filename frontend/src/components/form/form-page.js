import React from "react";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "material-ui/MenuItem";
import Link from "next/link";
import CircularProgress from "material-ui/CircularProgress";
import Router from "next/router";

import { Row, Col, ContainerFluid, media } from "../../common/components/grid";
import Wrapper from "../universal/wrapper";

const Root = styled.div`
  padding-top: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1em 0 4em 0;
  width: 100%;

  ${media.md`
  	margin: 1em 0;
	`};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export default function FormPage(props) {
  const backButton = (
    <FlatButton
      label="Back"
      disabled={!props.prev}
      onClick={props.handlePrev || (() => Router.push(props.prev))}
    />
  );
  const NextButtonInner = buttonProps => (
    <RaisedButton
      {...buttonProps}
      label={!props.nextLoading && (props.nextCaption || "Next")}
      disabled={props.disableNext || !props.next}
      primary={true}
    >
      <If condition={props.nextLoading}>
        <CircularProgress
          size={14}
          color="#FFF"
          innerStyle={{ transform: "none", transition: "none" }}
        />
      </If>
    </RaisedButton>
  );

  const nextButton = props.handleNext ? (
    <NextButtonInner onClick={props.handleNext} />
  ) : (
    <Link prefetch href={props.next || ""} passHref={true}>
      <NextButtonInner />
    </Link>
  );

  return (
    <Wrapper className={props.className} progress={props.progress}>
      <Root>
        <ContentWrapper>{props.children}</ContentWrapper>

        <Buttons>
          {backButton}
          {nextButton}
        </Buttons>
      </Root>
    </Wrapper>
  );
}
