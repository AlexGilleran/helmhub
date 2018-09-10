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
  margin-bottom: 2em;

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
                        foregroundColor="#FFF"
                        contents={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 77.864" enable-background="new 0 0 100 77.864" xml:space="preserve"><path fill="#010101" d="M93.209,62.333l0.537-0.187l0.369-1.257c0,0-13.978,5.978-43.634,5.978
												c-29.677,0-45.819-11.977-45.819-11.977l0.444,1.999c0,0,0.725,0.909,5,3.274c0.629,1.632,1.353,3.072,2.164,4.354
												c7.167,1.903,21.235,4.354,39.749,4.354C69.714,68.871,87.043,64.241,93.209,62.333z"></path><path fill="#010101" d="M52.018,69.775c-19.864,0-33.399-2.812-39.471-4.352c2.537,4.165,5.628,6.978,7.352,8.444
												c2.444,1.905,6.35,3.981,7.625,3.981c2.888,0.091,58.147-0.263,58.147-0.263l2.632-4.628l4.184-9.531
												C85.767,65.423,69.067,69.775,52.018,69.775z"></path><path fill="#010101" d="M21.992,55.262c0,0-0.907-29.934,22.048-55.262c11.422,13.978,21.586,24.511,21.586,24.511l0.537,35.658
												L21.992,55.262z"></path><path fill="#010101" d="M58.739,3.185h-1.093L57.37,14.608c0.721,0.906,1.276,1.46,1.908,2.278L58.739,3.185z"></path><path fill="#010101" d="M17.712,54.354L0.198,52.541c0,0-2.536-16.699,10.533-29.305c4.815,7.536,6.534,10.701,6.534,10.701
												L17.712,54.354z"></path><path fill="#010101" d="M14.271,22.418h-0.278l-0.093,4.889c0.185,0.185,0.278,0.37,0.371,0.554V22.418z"></path><path fill="#010101" d="M59.811,60.333l-3.259-0.351v5.975c1.095,0,2.259-0.09,3.352-0.181L59.811,60.333z"></path><path fill="#010101" d="M35.855,61.147h-9.607v1.908c2.906,0.835,6.165,1.462,9.607,1.999V61.147z"></path><path fill="#010101" d="M14.64,54.632l-1.091-0.093v4.258c0.351,0.181,0.722,0.369,1.091,0.463V54.632z"></path><path fill="#010101" d="M69.251,60.164c0,0-1.812-29.137,9.351-44.28c10.35,7.884,18.956,14.792,18.956,14.792L100,56.167
												L69.251,60.164z"></path><path fill="#010101" d="M86.671,58.702l-1.369,0.187l-0.534,3.997c0.534-0.09,0.999-0.184,1.462-0.276L86.671,58.702z"></path><path fill="#010101" d="M91.21,16.975h-0.372l-0.906,6.979c0.184,0.093,0.279,0.186,0.463,0.28L91.21,16.975z"></path></svg>`}
                      />
                      <LogoTitle foregroundColor={this.props.foregroundColor}>
                        HelmHub
                      </LogoTitle>
                    </LogoLink>
                  </Link>

                  {this.props.children}
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
