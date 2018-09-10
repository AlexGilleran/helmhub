import React from "react";
import styled from "styled-components";

function genWidths() {
  let widths = [];
  for (let i = 200; i <= 2600; i += 200) {
    widths.push(i);
  }
  return widths;
}

const WIDTHS = genWidths();

const BASE_IMG_URL = "https://res.cloudinary.com/nichetester/image/upload/";
function generateBackgroundUrls(rawImage) {
  const image = rawImage.replace(BASE_IMG_URL, "");

  return WIDTHS.map(width => ({
    url: `${BASE_IMG_URL}w_${width},q_40,f_auto/${image}`,
    width
  }));
}

export default function CloudinaryResponseImage(props) {
  const backgroundUrls = props.src ? generateBackgroundUrls(props.src) : [];
  const { imgLoaded, ...filteredProps } = props;

  return (
    <img
      srcSet={backgroundUrls.map(x => `${x.url} ${x.width}w`)}
      {...filteredProps}
    />
  );
}
