import { createMuiTheme } from "@material-ui/core/styles";

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

export default theme;