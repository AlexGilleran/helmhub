import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { colors } from "../variables";

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary }
  },
  typography: {
    fontSize: 18
  }
});

export default function ThemeProvider(props) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}
