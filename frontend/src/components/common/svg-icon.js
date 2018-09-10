import React from "react";
import styled from "styled-components";
import fetch from "isomorphic-fetch";

import { sizesLookup } from "../grid";

const SvgSpan = styled.div`
  * {
    fill: ${props => props.foregroundColor} !important;
  }
`;

export default class SvgIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.contents) {
      return (
        <SvgSpan
          className={this.props.className}
          foregroundColor={this.props.foregroundColor}
          style={this.props.style}
          dangerouslySetInnerHTML={{ __html: this.props.contents || "" }}
        />
      );
    } else {
      const sizes = Object.keys(sizesLookup)
        .map(key => ({
          name: key,
          width: sizesLookup[key].queryWidth,
          url: this.props[`${key}Url`]
        }))
        .filter(size => size.url && size.width);

      return (
        <picture className={this.props.className} style={this.props.style}>
          <For each="size" of={sizes}>
            <source
              key={size.url}
              srcSet={size.url}
              media={size.width && `(min-width: ${size.width})`}
            />
          </For>
          <img
            className={this.props.className}
            style={this.props.style}
            src={this.props.url}
          />
        </picture>
      );
    }
  }
}
