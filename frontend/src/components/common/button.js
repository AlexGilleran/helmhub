import React from "react";
import Link from "next/link";
import CircularProgress from "material-ui/CircularProgress";
import styled from "styled-components";
import ReactGA from "react-ga";

const ButtonOuterWrapper = styled.div`
  position: relative;
`;

const buttonStyle = element => styled(element)`
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  display: inline-block;
  background-color: ${props => props.backgroundColor};
  border-radius: 5px;
  font-weight: 600;
  box-shadow: 0 2px 2px 0 rgba(33, 102, 213, 0.14),
    0 3px 1px -2px rgba(33, 102, 213, 0.2), 0 1px 5px 0 rgba(33, 102, 213, 0.12);
  will-change: box-shadow, transform;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9em;
  font-family: Roboto, sans-serif;
  border: none;
  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: 0 14px 26px -12px rgba(33, 102, 213, 0.42),
      0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(33, 102, 213, 0.2);
  }
`;

const ResetButton = buttonStyle("button");
const ResetHyperlink = buttonStyle("a");

const ButtonInnerWrapper = styled.div`
  visibility: ${props => (props.hide ? "hidden" : "visible")};
  padding: 1.2em 2.4em;
`;

function ButtonInner(props) {
  return (
    <ButtonOuterWrapper>
      <If condition={props.loading}>
        <CircularProgress
          style={{
            position: "absolute",
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
      </If>
      <ButtonInnerWrapper hide={props.loading}>
        {props.children}
      </ButtonInnerWrapper>
    </ButtonOuterWrapper>
  );
}

const onExternalLinkClick = href => event => {
  ReactGA.event({
    category: "click",
    action: "external-link",
    label: href
  });
};

export default props => {
  return (
    <div>
      <Choose>
        <When condition={props.href && props.as}>
          <Link prefetch as={props.as} href={props.href}>
            <ResetHyperlink
              href={props.as}
              backgroundColor={props.backgroundColor}
            >
              <ButtonInner {...props} />
            </ResetHyperlink>
          </Link>
        </When>
        <When condition={props.href}>
          <ResetHyperlink
            href={props.href}
            backgroundColor={props.backgroundColor}
            onClick={onExternalLinkClick}
          >
            <ButtonInner {...props} />
          </ResetHyperlink>
        </When>
        <Otherwise>
          <ResetButton
            onClick={props.onClick}
            backgroundColor={props.backgroundColor}
          >
            <ButtonInner {...props} />
          </ResetButton>
        </Otherwise>
      </Choose>
    </div>
  );
};
