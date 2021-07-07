import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    // width: 'auto',
    borderRadius: '16px',
    // margin: theme.spacing(0, 2),
  },
  buttonStyle: {
    margin: 0,
    minWidth: 32,
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

export default function Header(props) {
  const classes = useStyles();

  const history = useHistory();

  const { text, isRoot } = props;

  const HeaderText = (
    <WhiteTextTypography
      style={{
        fontWeight: 500,
        fontSize: '1.1rem',
      }}
    >
      {text}
    </WhiteTextTypography>
  );

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar
          style={{
            paddingLeft: 16,
            paddingRight: 8,
          }}
        >
          {isRoot ? (
            <>
              <Button
                className={classes.buttonStyle}
                // variant="outlined"
              >
                <WhiteTextTypography>首页</WhiteTextTypography>
              </Button>
              <Button
                onClick={() => {
                  history.push('/departments');
                }}
                className={classes.buttonStyle}
                // variant="outlined"
              >
                <WhiteTextTypography>科室</WhiteTextTypography>
              </Button>
              <Button
                onClick={() => {
                  history.push('/reglist');
                }}
                className={classes.buttonStyle}
                // variant="outlined"
              >
                <WhiteTextTypography>挂号</WhiteTextTypography>
              </Button>
            </>
          ) : (
            <>
              <IconButton
                key="icon"
                onClick={() => {
                  history.goBack();
                }}
                size="medium"
                style={{
                  color: '#FFFFFF',
                }}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              {HeaderText}
            </>
          )}

          <div
            style={{
              flexGrow: 1,
            }}
          />

          {isRoot && (
            <div
              style={{
                display: 'flex',
              }}
            >
              <IconButton
                onClick={() => {
                  const account = localStorage.getItem('account');
                  // ! what is with these APIs? can we at least all use the same naming style? like camel case maybe?
                  const url =
                    account && account.Type === 'doctor'
                      ? '/doctor'
                      : '/patient';
                  history.push(url);
                }}
                style={{
                  color: '#FFFFFF',
                }}
              >
                <AccountCircleIcon fontSize="default" />
              </IconButton>
              <IconButton
                onClick={() => {
                  localStorage.removeItem('token');
                  history.push('/signin');
                }}
                style={{
                  color: '#FFFFFF',
                }}
              >
                <ExitToAppIcon fontSize="default" />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  );
}
