import React from "react";

import Router from "next/router";

import { auth } from "../../config/base";
import { isServer } from "../../util/flags";

export default function OuterAuthHoc(
  Wrapped,
  LoadingComponent,
  LoggedOutComponent,
  allowAnon = false
) {
  return class AuthHoc extends React.PureComponent {
    unmounted = false;

    constructor(props) {
      super(props);
      this.state = {
        user: null,
        loggedOut: false,
        forceAnonLogin: false
      };
    }

    static getInitialProps(ctx) {
      if (Wrapped.getInitialProps) {
        return Wrapped.getInitialProps(ctx);
      } else {
        return {};
      }
    }

    componentDidMount() {
      this.unsubscribe = auth.onAuthStateChanged(user => {
        if (!this.unmounted) {
          if (user) {
            if (!allowAnon && user.isAnonymous) {
              this.setState({ forceAnonLogin: true, user: null });
            } else {
              this.setState({ user });
            }
          } else if (allowAnon) {
            firebase
              .auth()
              .signInAnonymously()
              .catch(err => {
                console.error(err);
              });
          } else if (!!LoggedOutComponent) {
            this.setState({
              loggedOut: true
            });
          } else if (!isServer) {
            Router.push("/login");
          }
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <Choose>
          <When condition={this.state.user}>
            <Wrapped {...this.props} user={this.state.user} />
          </When>
          <When condition={this.state.forceAnonLogin} />
          <When condition={this.state.loggedOut}>
            <LoggedOutComponent {...this.props} />
          </When>
          <When condition={LoadingComponent}>
            <LoadingComponent {...this.props.loadingComponentProps} />
          </When>
          <Otherwise>Loading...</Otherwise>
        </Choose>
      );
    }
  };
}
