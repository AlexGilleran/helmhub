import React from "react";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import styled from "styled-components";
import ReactGA from "react-ga";
import Head from "next/head";
import LinearProgress from "material-ui/LinearProgress";

import { media } from "../../components/grid";
import { colors } from "../../variables";
import Nav from "../nav/nav";
import ThemeProvider from "../theme-provider";
import routerEvents from "../../util/router-events";
import env from "../../config/environment";

const isDev = env !== "prod";

const Root = styled.div`
  display: flex;
  flex-direction: column;

  ${media.md`
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		min-height: 0;
	`};
`;

const RightDock = styled.div`
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProgressWrapper = styled.div`
  margin: 0 0 0 1em;
  width: 15vw;
  text-align: center;
  font-size: 0.8em;
  margin-top: 0.3em;
`;

const ProgressText = styled.span``;

const ProgressBar = styled(LinearProgress)``;

const SmOnly = styled.span`
  display: none;

  ${media.sm`
		display: inline;
	`};
`;

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
