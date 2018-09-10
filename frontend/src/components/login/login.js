import React from "react";
import styled from "styled-components";

import base, { firebase, auth } from "../../config/base";
import { isServer } from "../../common/util/flags";

let authUi = null;
if (!isServer) {
  const firebaseui = require("firebaseui");
  authUi = new firebaseui.auth.AuthUI(auth);
}

const css = require("raw-loader!firebaseui/dist/firebaseui.css");
const Root = styled.div`
  ${css};
`;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;
    var uiConfig = {
      callbacks: {
        signInSuccess: function(user) {
          if (self.props.onSignIn) {
            self.props.onSignIn(user);
          }
          return false;
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    authUi && authUi.start("#firebaseui-auth", uiConfig);
  }

  render() {
    return (
      <Root>
        <div id="firebaseui-auth" />
      </Root>
    );
  }
}
