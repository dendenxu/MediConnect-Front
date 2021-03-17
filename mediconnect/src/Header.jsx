import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  typo: {
    flex: 1,
  },
  toolbar: {
    padding: "0, 30px",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.typo}>
          Hello, there. I'm your header!
        </Typography>
        <ExploreIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
