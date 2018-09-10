import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import styled from "styled-components";

import CloudinaryResponsiveImage from "./cloudinary-responsive-image";

const Wrapper = styled.div`
  position: relative;
  display: block;
  ${props =>
    props.fillParent &&
    `
		height: 100%;
		width: 100%;
	`} z-index: 1;
`;

const commonImageCss = `
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
height: 100%;
width: 100%;
object-fit: cover;
display: block;
transition: opacity 200ms linear;
`;

const FullImage = styled(CloudinaryResponsiveImage)`
  ${commonImageCss};
  opacity: ${props => (props.imgLoaded ? 1 : 0)};
  z-index: 1;
`;

const Placeholder = styled.img`
  ${commonImageCss};
  z-index: 0;
  filter: blur(5px);
`;

export default class PlaceholderImage extends React.Component {
  constructor() {
    super();

    this.state = {
      imgLoaded: false
    };
  }

  onLoad() {
    if (!this.state.imgLoaded) {
      this.setState({
        imgLoaded: true
      });
    }
  }

  onImageAttached(img) {
    const image = ReactDOM.findDOMNode(img);

    if (image && image.complete && !this.state.imgLoaded) {
      this.setState({
        imgLoaded: image.complete
      });
    }
  }

  render() {
    const {
      placeholder,
      fillParent,
      placeholderMime,
      imgLoaded,
      ...propsToPass
    } = this.props;

    const finalProps = {
      ...propsToPass,
      ...this.state,
      ...{
        imgLoaded: this.state.imgLoaded
      }
    };

    const placeholderProps = {
      ...propsToPass,
      ...this.state,
      ...{
        srcSet: undefined,
        src: `data:${placeholderMime};base64,${placeholder}`
      }
    };

    return (
      <Wrapper fillParent={this.props.fillParent}>
        <If condition={finalProps.src}>
          <FullImage
            ref={this.onImageAttached.bind(this)}
            {...finalProps}
            onLoad={this.onLoad.bind(this)}
          />
        </If>
        <Placeholder {...placeholderProps} />
      </Wrapper>
    );
  }
}
