import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";

import normalize from "../src/styles/normalize";
import fonts from "../src/styles/fonts";
import globalStyles from "../src/styles/global-styles";
import getPageContext from "../src/get-page-context";

injectGlobal`
	${normalize}
	${fonts}
	${globalStyles}
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const pageContext = getPageContext();
    const sheet = new ServerStyleSheet();
    const page = renderPage(Component => props =>
      sheet.collectStyles(
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          <Component pageContext={pageContext} {...props} />
        </JssProvider>
      )
    );
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
      styleTags
    };
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
          <meta
            name="theme-color"
            content={this.props.pageContext.theme.palette.primary.main}
          />
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
