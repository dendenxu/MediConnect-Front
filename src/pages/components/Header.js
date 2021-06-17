import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

export default function Header(props) {
  const { header } = useStyles();

  const { text } = props;

  const HeaderText = (
    <WhiteTextTypography variant="h4" component="h1">
      {text}
    </WhiteTextTypography>
  );

  return (
    <header>
      <AppBar position="sticky" className={header}>
        <Toolbar>{HeaderText}</Toolbar>
      </AppBar>
    </header>
  );
}
