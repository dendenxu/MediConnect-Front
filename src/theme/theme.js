import { createMuiTheme } from '@material-ui/core';

const captionStyle = {
  fontWeight: '300',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4e89ae',
    },
    secondary: {
      main: '#43658b',
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
    fontFamily: [
      'Josefin Sans',
      'Josefin Slab',
      'Noto Sans SC',
      'PingFang SC',
      'sans-serif',
    ].join(', '),
    caption: captionStyle,
  },
});

export default theme;
