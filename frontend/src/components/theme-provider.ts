import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import { colors } from "../variables";

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider
      muiTheme={getMuiTheme({
        palette: {
          primary1Color: colors.primary,
          accent1Color: colors.secondary
        },
        userAgent: "all"
      })}
    >
      {children}
    </MuiThemeProvider>
  );
}
