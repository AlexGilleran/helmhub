import React from "react";

import { auth } from "../../config/base";
import fetch from "isomorphic-fetch";

const withAuthFetch = Wrapped =>
  class WithAuthFetch extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        token: null,
        user: null
      };
    }

    componentWillMount() {
      this.unsubscribe = auth.onAuthStateChanged(user => {
        if (!this.unmounted) {
          this.setState({ user });
        }
      });
    }

    componentWillUnmount() {
      this.unmounted = true;
      this.unsubscribe();
    }

    authFetch(...args) {
      if (!this.state.user) {
        const error = "Attempted to make authorized call without logging in";
        console.error(error);
        throw new Error(error);
      }

      return this.state.user
        .getToken()
        .then(token => {
          const config = args[1] || {};
          config.headers = config.headers || {};
          config.headers["Authorization"] = "Bearer " + token;
          args[1] = config;

          return fetch(...args);
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          user={this.state.user}
          authFetch={this.authFetch.bind(this)}
        />
      );
    }
  };

export default withAuthFetch;
