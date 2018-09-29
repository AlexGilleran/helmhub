import React from "react";

import LoginPage from "../../src/components/login/login-page";

export default class Login extends React.Component {
  render() {
    return (
      <LoginPage
        title="Sign In"
        alternativeRoute="/login/register"
        alternativeCaption="No account? Register here"
      />
    );
  }
}
