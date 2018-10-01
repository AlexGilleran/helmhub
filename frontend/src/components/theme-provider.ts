import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../styles/theme";

export default function ThemeProvider(props) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}
