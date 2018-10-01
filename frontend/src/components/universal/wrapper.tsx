import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import Head from "next/head";

import { media } from "../../components/grid";
import { colors } from "../../variables";
import Nav from "../nav/nav";
import ThemeProvider from "../theme-provider";
import routerEvents from "../../util/router-events";
import env from "../../config/environment";

const isDev = env !== "prod";

const Root = styled.div``;

export default class Wrapper extends React.Component {
  componentWillMount() {
    if (typeof window !== "undefined") {
      const ua = isDev ? "UA-000000-01" : "UA-96743066-4";
      ReactGA.initialize(ua, {
        debug: isDev
      });

      ReactGA.pageview(window.location.pathname);
    }

    routerEvents.addEventListener("routeChangeStart", this.onRouteChangeStart);
  }

  componentWillUnmount() {
    routerEvents.removeEventListener(
      "routeChangeStart",
      this.onRouteChangeStart
    );
  }

  onRouteChangeStart = url => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }, 200);
  };

  render() {
    const props = this.props;

    return (
      <ThemeProvider>
        <React.Fragment>
          <Head>
            <If condition={!isDev}>
              <script key={1} src="/static/hotjar.js" />
            </If>
          </Head>
          <Root className={this.props.className}>
            <Nav backgroundColor={colors.primary} fluid={true} />
            {props.children}
          </Root>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
