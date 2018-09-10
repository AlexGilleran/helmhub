import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Router from "next/router";
import groupBy from "lodash/groupBy";

import authHoc from "../../components/hoc/auth-hoc";
import { auth } from "../../config/base";

function Menu(props) {
  return (
    <Drawer
      docked={false}
      openSecondary={true}
      open={props.open}
      onRequestChange={props.onRequestChange}
    >
      <List>
        <Choose>
          <When condition={props.loading}>
            <ListItem primaryText="Loading..." />
          </When>
          <When condition={props.user}>
            <ListItem
              primaryText="Sign Out"
              secondaryText={"Signed in as " + props.user.displayName}
              onClick={() => auth.signOut()}
            />
          </When>
          <Otherwise>
            <ListItem
              primaryText="Sign In"
              onClick={() => Router.push("/login")}
            />
            <ListItem
              primaryText="Register"
              onClick={() => Router.push("/login/register")}
            />
          </Otherwise>
        </Choose>

        <Divider inset={true} />
        <Subheader>Contact Us</Subheader>
        <ListItem
          primaryText="Email"
          secondaryText="contact@nichetester.com"
          onClick={() => {
            window.location.href = "mailto:mail@example.org";
          }}
        />
      </List>
    </Drawer>
  );
}

function Loading(props) {
  return <Menu {...props} loading={true} />;
}

export default authHoc(Menu, Loading, Menu);
