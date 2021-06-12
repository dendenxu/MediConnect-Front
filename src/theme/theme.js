import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: 'rgb(71, 145, 219)',
      dark: 'rgb(17, 82, 147)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
      light: 'rgb(227, 51, 113)',
      dark: 'rgb(154, 0, 54)',
      contrastText: '#fff',
    },
    error: {
      main: '#ed6663',
    },
    warning: {
      main: '#ffa372',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: ['Josefin Sans', 'PingFang SC', 'sans-serif'].join(', '),
  },
});

export default theme;
