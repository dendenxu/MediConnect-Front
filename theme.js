import { createMuiTheme } from "@material-ui/core";
import { blue, purple, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4e89ae",
    },
    secondary: {
      main: "#43658b",
    },
    error: {
      main: "#ed6663",
    },
    warning: {
      main: "#ffa372",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: ["Josefin Sans", "PingFang SC", "sans-serif"].join(", "),
  },
});

export default theme;
