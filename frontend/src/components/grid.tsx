import React from "react";
import classNames from "classnames";
import styled, { css } from "styled-components";
import keyBy from "lodash/keyBy";
import flattenDeep from "lodash/flattenDeep";

const sizes = [
  {
    id: "xs",
    containerWidth: "100%"
  },
  {
    id: "sm",
    containerWidth: "49rem",
    queryWidth: "48em"
  },
  {
    id: "md",
    containerWidth: "65rem",
    queryWidth: "64em"
  },
  {
    id: "lg",
    containerWidth: "76rem",
    queryWidth: "75em"
  }
];
const sizeIds = sizes.map(size => size.id);
const sizesLookup = keyBy(sizes, "id");

type MediaQueries = {
  [id: string]: (a: string[] | TemplateStringsArray) => any;
};

const media: MediaQueries = sizes.reduce((accumulator, size) => {
  accumulator[size.id] = (...args: string[]) => {
    return `@media screen and (min-width: ${size.queryWidth}) {
      ${css.call(this, args).join("")}
		}`;
  };
  return accumulator;
}, {});

function wrap(size, text) {
  if (size.queryWidth) {
    return media[size.id]([text]);
  } else {
    return text;
  }
}

const containerMediaQueries = sizes
  .map(size => {
    return wrap(size, `max-width: ${size.containerWidth};`);
  })
  .join("\n");

const col = element => styled(element)`
  ${props => {
    const relevantSizeIds = sizeIds.filter(id => props[id]);

    return relevantSizeIds
      .map(sizeId => {
        const size = sizesLookup[sizeId];
        const width = `${(props[sizeId] / 12) * 100}`;
        const maxWidth = `
				flex-basis: ${width}%;
				max-width: ${width}%;
			`;

        return wrap(size, maxWidth);
      })
      .join("\n");
  }};
`;

const baseCol = element => styled(element)`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: 0.5em;
  padding-left: 0.5em;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
`;

const baseRow = element => styled(element)`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

function property(suffix, textFn) {
  // const propNames = sizeIds.map(sizeId => sizeId + "" + suffix);
  return element => {
    return styled(element)([
      props =>
        Object.keys(props)
          .filter(propName => propName.endsWith(suffix))
          .map(propName => [props[propName], sizesLookup[propName.slice(0, 2)]])
          .map(([value, size]) => wrap(size, textFn(value)))
          .join("\n")
    ] as any);
  };
}

const offset = property(
  "Offset",
  value => `margin-left: ${(value / 12) * 100}%;`
);
const first = property("First", value => `order: ${value ? "-1" : "inherit"};`);
const last = property("Last", () => `order: 1;`);

const start = property(
  "Start",
  () => `
	justify-content: flex-start;
	// text-align: start;`
);
const center = property(
  "Center",
  () => `
	justify-content: center;
`
);
const end = property(
  "End",
  () => `
	justify-content: flex-end;
`
);

const top = property("Top", () => `align-items: flex-start;`);
const middle = property("Middle", () => `align-items: center;`);
const bottom = property("Bottom", () => `align-items: flex-end;`);

const around = property("Around", () => `justify-content: space-around;`);
const between = property("Between", () => `justify-content: space-between;`);

const colWrappers = [last, first, offset, col];
const rowWrappers = [top, middle, bottom, start, center, end, around, between];

function reducer(base, wrappers) {
  return wrappers.reduce((soFar, wrapper) => {
    return wrapper(soFar);
  }, base);
}

const baseElement = props => (
  <div className={props.className} style={props.style} id={props.id}>
    {props.children}
  </div>
);
const container = styled(baseElement)`
  margin-right: auto;
  margin-left: auto;

  ${containerMediaQueries};
`;
const elements = {
  container: container,
  "container-fluid": styled.div`
    ${media.sm`
			padding-right: 2em;
			padding-left: 2em;
		`};
  `,
  row: reducer(baseRow(baseElement), rowWrappers),
  col: reducer(baseCol(baseElement), colWrappers)
};

const gridElement = baseName => props => {
  // const Base = React.cloneElement(elements[baseName], props);
  const Base = elements[baseName];

  return <Base {...props} />;
};

const Container = gridElement("container");
const ContainerFluid = gridElement("container-fluid");
const Row = gridElement("row");
const Col = gridElement("col");

export { Container, ContainerFluid, Row, Col, media, sizesLookup };
