import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1em;
  border: 1px solid #aaa;
  background: #111;
  color: #fff;
	font-family: monospace;
	line-height: 1.3em;
`;

function Code(props) {
  return <Root className={props.className}>{props.children}</Root>;
}

const StyledLineP = styled.p`
  margin: 0;
  padding: 0;
`;

const Prompt = styled.span`
  user-select: none;
`;

function Line(props) {
  return (
    <StyledLineP>
      <Prompt>$> </Prompt>{props.children}
    </StyledLineP>
  );
}

export { Code, Line };
