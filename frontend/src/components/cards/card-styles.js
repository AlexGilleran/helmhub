import styled from "styled-components";

export function addMargin(component) {
  return styled(component)`
    margin: 0.5em 0;

    &:first-child {
      margin-top: 0;
    }
  `;
}
