import React from "react";

import AuthHoc from "../hoc/auth-hoc-page";
import base from "../../config/base";
import withCurrentDomain from "../../components/hoc/with-current-domain";
import ThemedSpinner from "../../components/util/themed-spinner";

export default (WrappedComponent, LoadingComponent) =>
  AuthHoc(
    withCurrentDomain(
      class WithFirebaseSite extends React.Component {
        state = {};

        static async getInitialProps(...args) {
          return WrappedComponent.getInitialProps
            ? WrappedComponent.getInitialProps(...args)
            : {};
        }

        componentDidMount() {
          this.binding = base.syncState(
            `users/${this.props.user.uid}/sites/main`,
            {
              context: this,
              state: "site",
              onFailure: err => {
                console.error(err);
              }
            }
          );
        }

        componentWillUnmount() {
          base.removeBinding(this.binding);
        }

        render() {
          const firebaseToJson = require("../../common/data/firebase-to-json");
          const json =
            this.state.site &&
            firebaseToJson(this.state.site, this.props.domain);

          return json ? (
            <WrappedComponent {...this.props} firebaseData={json} />
          ) : LoadingComponent ? (
            <LoadingComponent {...this.props.loadingComponentProps} />
          ) : (
            <ThemedSpinner />
          );
        }
      }
    ),
    LoadingComponent
  );
