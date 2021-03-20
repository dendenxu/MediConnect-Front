import { createMuiTheme } from "@material-ui/core";
import { blue, purple, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: "Josefin Sans",
  },
});

export default theme;
