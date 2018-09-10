import React from "react";

import Router from "next/router";

import authHoc from "./auth-hoc";
import Wrapper from "../universal/wrapper";
import { auth } from "../../config/base";
import { isServer } from "../../common/util/flags";

export default function AuthHocPage(
  Wrapped,
  LoadingComponent,
  LoggedOutComponent
) {
  return authHoc(Wrapped, LoadingComponent || Wrapper, LoggedOutComponent);
}
