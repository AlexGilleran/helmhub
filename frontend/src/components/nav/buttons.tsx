import React from "react";
import styled from "styled-components";
import Link from "next/link";

import authHoc from "../hoc/auth-hoc";

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

function NavButton(props) {
  return (
    <NavItem key={props.path}>
      <Link prefetch href={props.href} as={props.as}>
        <NavLink href={props.href} color="#FFFFFF">
          {props.text}
        </NavLink>
      </Link>
    </NavItem>
  );
}

function Buttons(props: any) {
  return (
    <React.Fragment>
      <NavButton href="/login" text="Login" />
      <NavButton href="/login/register" text="Sign Up" />
    </React.Fragment>
  );
}

function LoggedIn(props: any) {
  return <div>Logged In as {props.user.displayName}</div>;
}

export default authHoc(LoggedIn, () => <span />, Buttons);
