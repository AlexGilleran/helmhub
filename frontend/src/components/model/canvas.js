import React from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  cursor: not-allowed;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const SplitCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CellWrapper = styled.div`
  border: 1px solid #000;
  background: ${props => (props.complete ? "#ddf39e" : "#FFF")};
  margin: 0.1em;
  padding: 0.5em;
  vertical-align: top;
  flex: 1;
  min-width: 10em;
  min-height: 7em;
  opacity: ${props => (props.shadow ? 0.2 : 1)};
`;

const Heading = styled.h3`
  margin: 0;
`;

function Cell({ content = {}, styling = {}, heading, className }) {
  return (
    <CellWrapper
      className={className}
      shadow={styling.shadow}
      complete={styling.complete}
    >
      <Heading>
        {heading} {styling.complete && "✔️"}
      </Heading>
      <p>{content.text}</p>
    </CellWrapper>
  );
}

const BottomRowCell = styled(Cell)`
  width: 50%;
`;

export default function Canvas({ model = {}, styling = {} }) {
  return (
    <Root>
      <Row>
        <Cell
          heading="Problem"
          content={model.problem}
          styling={styling.problem}
        />
        <SplitCol>
          <Cell
            heading="Solution"
            content={model.solution}
            styling={styling.solution}
          />
          <Cell
            heading="Metrics"
            content={model.metrics}
            styling={styling.metrics}
          />
        </SplitCol>
        <Cell
          heading="Value Proposition"
          content={model.valueProp}
          styling={styling.valueProp}
        />
        <SplitCol>
          <Cell
            heading="Advantage"
            content={model.advantage}
            styling={styling.advantage}
          />
          <Cell
            heading="Channels"
            content={model.channels}
            styling={styling.channels}
          />
        </SplitCol>
        <Cell
          heading="Customers"
          content={model.customers}
          styling={styling.customers}
        />
      </Row>
      <Row>
        <BottomRowCell
          heading="Cost Structure"
          content={model.costStructure}
          styling={styling.costStructure}
        />
        <BottomRowCell
          heading="Revenue Streams"
          content={model.revenueStreams}
          styling={styling.revenueStreams}
        />
      </Row>
    </Root>
  );
}
