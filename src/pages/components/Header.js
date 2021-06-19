import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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

  const { text } = props;

  const HeaderText = (
    <WhiteTextTypography variant="h6">{text}</WhiteTextTypography>
  );

  return (
    <AppBar position="sticky" className={header}>
      <Toolbar>
        <IconButton
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
      </Toolbar>
    </AppBar>
  );
}
