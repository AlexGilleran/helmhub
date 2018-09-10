import React from "react";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    return {};
  }

  render() {
    return <span>Hello</span>;
  }
}
