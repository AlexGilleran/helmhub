import React from "react";

import LoginPage from "../../components/login/login-page";

export default class Register extends React.Component {
  render() {
    return (
      <LoginPage
        title="Register"
        explanation="Choose how you want to sign in to NicheTester:"
        alternativeRoute="/login"
        alternativeCaption="Already got an account?"
      />
    );
  }
}
