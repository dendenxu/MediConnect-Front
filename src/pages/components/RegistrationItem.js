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
    disabled: {
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

  const buttonStyle = ['primary', 'secondary', 'disabled'];
  const buttonText = ['已提交', '进行中', '已结束'];

  return (
    <div>
      <ListItem button component={Link} to={data.path} flexDirection="row">
        <ListItemText
          primary={<Typography className={primaryText}>{data.dep}</Typography>}
          secondary={
            <Typography className={secondaryText}>{data.date}</Typography>
          }
        />
        <ThemeProvider theme={registrationTheme}>
          <span style={{ cursor: 'not-allowed' }}>
            <Button variant="outlined" color={buttonStyle[data.id]}>
              {buttonText[data.id]}
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
