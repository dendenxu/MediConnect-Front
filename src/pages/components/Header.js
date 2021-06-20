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
import React from 'react';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

export default function Header(props) {
  const { header } = useStyles();

  const history = useHistory();

  const { text, isRoot } = props;

  const HeaderText = (
    <WhiteTextTypography variant="h6">{text}</WhiteTextTypography>
  );

  return (
    <AppBar position="sticky" className={header}>
      <Toolbar>
        {isRoot ? (
          <>
            <Button>
              <WhiteTextTypography>首页</WhiteTextTypography>
            </Button>
            <Button
              onClick={() => {
                history.push('/departments');
              }}
            >
              <WhiteTextTypography>科室</WhiteTextTypography>
            </Button>
            <Button
              onClick={() => {
                history.push('/reglist');
              }}
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
              size="small"
              edge="start"
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
          <IconButton
            onClick={() => {
              history.push('/signin');
            }}
            size="small"
            edge="start"
            style={{
              color: '#FFFFFF',
            }}
          >
            <AccountCircleIcon fontSize="medium" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
