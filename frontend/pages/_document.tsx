import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

import normalize from "../src/styles/normalize";
import fonts from "../src/styles/fonts";
import globalStyles from "../src/styles/global-styles";

injectGlobal`
	${normalize}
	${fonts}
	${globalStyles}
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {/* <link rel="icon" href="/static/favicon.ico" /> */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index,follow" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
