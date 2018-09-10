import React from "react";
import Link from "next/link";
import styled from "styled-components";
import classNames from "classnames";

import { Row, Col, Container, ContainerFluid, media } from "../grid";
import routerEvents from "../../util/router-events";
import SvgIcon from "../common/svg-icon";

const heightXs = "3em";

const Root = styled.div`
  height: ${heightXs};

  ${media.sm`
		height: 4.5em;
	`};
`;

const NavBar = styled.nav`
  width: 100%;
  position: fixed;
  background: ${props => props.color};
  min-height: ${heightXs};
  z-index: 2;

  ${media.sm`
		min-height: 4.5em;
	`};
`;

const Logo = styled(SvgIcon)`
  margin-top: 5px;

  max-height: 3em;
  min-height: 2em;
  min-width: 2em;

  svg {
    max-height: 3em;
    min-height: 2em;
    min-width: 2em;
  }
`;

const LogoLink = styled.a`
  margin: 0;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
`;

const LogoTitle = styled.h1`
  margin-left: 0.5em;
  color: #fff;
  font-size: 1.5em;
  color: ${props => props.foregroundColor};
`;

const NavCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 0.5em;

  ${media.sm`
		flex-direction: row;
		align-items: center;
		padding: 0 1em;
	`};
`;

const NavListBase = styled.ul`
  list-style: none;
  margin: 0;
  margin-top: 0.5em;
  margin-left: -0.5em;
  padding: 0;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-bottom: 0.5em;

  ${media.sm`
		flex-direction: row;
		width: inherit;
		margin-top: 0;
		padding-bottom: 0;
		display: flex;
	`};
`;

const NavList = styled(NavListBase)`
  display: ${props => (props.open ? "flex" : "none")};

  ${media.sm`
		display: flex;
	`};
`;

const NavItem = styled.li`
  display: block;
  width: 100%;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${props => props.color || "#FFF"};
  font-size: 1em;
  display: block;
  padding: 1em;
  margin-top: 4px;
  white-space: nowrap;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${heightXs};

  ${media.sm`
		height: 4.5em;
	`};
`;

const Hamburger = styled.button`
  margin: 0;
  padding: 10px;
  border-radius: 4px;
  margin-right: 0.5em;
  padding-top: 7px;

  background: none;
  border: 0;
  display: block;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${media.sm`
		display: none;
	`};
`;

const IconBar = styled.span`
  display: block;
  width: 22px;
  border-radius: 1px;
  border: 1px solid ${props => props.color || "#FFF"};
  background-color: ${props => props.color || "#FFF"};
  margin-top: 5px;
`;

export default class Nav extends React.Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false
    };

    this.onRouteChangeStart = url => {
      this.setState({
        menuOpen: false
      });
    };

    routerEvents.addEventListener("routeChangeStart", this.onRouteChangeStart);
  }

  componentWillUnmount() {
    routerEvents.removeEventListener(
      "routeChangeStart",
      this.onRouteChangeStart
    );
  }

  onHamburgerClick() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  render() {
    const logo = this.props.logo || {};
    const ContainerComponent = this.props.fluid ? ContainerFluid : Container;
    const baseUrl = this.props.preview ? "/preview" : "/";
    const extraSlash = this.props.preview ? "/" : "";
    const pages = (Object.values(this.props.pages || {}) || []).filter(
      page => page && page.includeInNav
    );

    return (
      <Root>
        <NavBar color={this.props.backgroundColor}>
          <ContainerComponent>
            <Row>
              <NavCol xs={12}>
                <TopRow>
                  <Link prefetch href={`${baseUrl}?page=product`} as={baseUrl}>
                    <LogoLink href={"/" + baseUrl}>
                      <Logo
                        foregroundColor={this.props.foregroundColor}
                        {...logo}
                      />
                      <LogoTitle foregroundColor={this.props.foregroundColor}>
                        {logo.showText ? this.props.title : ""}
                      </LogoTitle>
                    </LogoLink>
                  </Link>

                  {this.props.children}

                  <If condition={pages && pages.length > 1}>
                    <Hamburger onClick={this.onHamburgerClick.bind(this)}>
                      <IconBar color={this.props.foregroundColor} />
                      <IconBar color={this.props.foregroundColor} />
                      <IconBar color={this.props.foregroundColor} />
                    </Hamburger>
                  </If>
                </TopRow>

                <If
                  condition={
                    (pages && pages.length > 1) ||
                    (this.props.extraLinks && this.props.extraLinks.length > 0)
                  }
                >
                  <NavList open={this.state.menuOpen}>
                    <For each="page" of={pages}>
                      <NavItem key={page.path}>
                        <Link
                          prefetch
                          href={`${baseUrl}?page=${page.id}`}
                          as={baseUrl + extraSlash + page.path}
                        >
                          <NavLink
                            href={baseUrl + extraSlash + page.path}
                            color={this.props.foregroundColor}
                          >
                            {page.title}
                          </NavLink>
                        </Link>
                      </NavItem>
                    </For>

                    <For each="extraLink" of={this.props.extraLinks || []}>
                      <NavItem key={extraLink.url}>
                        <NavLink
                          href={extraLink.url}
                          color={this.props.foregroundColor}
                        >
                          {extraLink.linkCaption}
                        </NavLink>
                      </NavItem>
                    </For>
                  </NavList>
                </If>
              </NavCol>
            </Row>
          </ContainerComponent>
        </NavBar>
      </Root>
    );
  }
}
