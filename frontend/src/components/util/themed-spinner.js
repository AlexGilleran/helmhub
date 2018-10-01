import CircularProgress from "@material-ui/core/CircularProgress";
import ThemeProvider from "../theme-provider";

export default function ThemedSpinner(props) {
  return (
    <ThemeProvider>
      <CircularProgress {...props} />
    </ThemeProvider>
  );
}
