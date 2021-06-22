import {
  createMuiTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import React from 'react';
import { Link } from 'react-router-dom';

const registrationTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#469CDF',
    },
    secondary: {
      main: '#52C41A',
    },
    default: {
      main: '#888888',
    },
  },
});

const useStyles = makeStyles(theme => ({
  primaryText: {
    color: '#0f1c49',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '1.5vh',
  },
  secondaryText: {
    fontSize: 14,
    textOverflow: 'ellipsis',
    color: '#878DA4',
    fontWeight: 'bold',
    maxWidth: '70vw',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
}));

export default function DepartmentItem(props) {
  const { primaryText, secondaryText } = useStyles();

  const { data } = props;

  const buttonStyle = ['primary', 'secondary', 'default'];
  const buttonText = ['已提交', '进行中', '已结束'];

  function statTr(str) {
    if (str === 'committed') return 0;
    if (str === 'accepted') return 1;
    return 2;
  }

  return (
    <div>
      <ListItem button to={data.path}>
        <ListItemText
          primary={
            <Typography className={primaryText}>{data.department}</Typography>
          }
          secondary={
            <Typography
              className={secondaryText}
            >{`${data.year}-${data.month}-${data.day}-${data.halfday}`}</Typography>
          }
        />
        <ThemeProvider theme={registrationTheme}>
          <span style={{ cursor: 'not-allowed' }}>
            <Button variant="outlined" color={buttonStyle[statTr(data.status)]}>
              {buttonText[statTr(data.status)]}
            </Button>
          </span>
        </ThemeProvider>
        <ArrowForwardIosSharpIcon fontSize="small" color="secondary">
          intro
        </ArrowForwardIosSharpIcon>
      </ListItem>
      <Divider variant="middle" />
    </div>
  );
}
