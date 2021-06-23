import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, useLocation } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

import Chat from '../chat/Chat';
import Browse from '../case/Browse';
import Header from '../components/Header';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  full: {
    display: 'flex',
    height: '100%',
    width: '50%',
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    border: 5,
    borderRadius: 30,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <Header isRoot style={{}} />
      <div className={classes.content}>
        <Chat className={classes.full} />
        <Browse className={classes.full} />
      </div>
    </div>
  );
}
