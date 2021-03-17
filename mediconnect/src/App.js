import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  helloThereStyle: {
    fontFamily: "Futura",
    fontStyle: "oblique",
    color: "Orange",
  },
  buttonStyles: {
    fontFamily: "PingFang SC"
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Typography
        className={classes.helloThereStyle}
        variant="h1"
        color="primary"
      >
        Hello, there.
      </Typography>

      <Button
        className={classes.buttonStyles}
        variant="outlined"
        color="primary"
      >
        下一步
      </Button>
    </div>
  );
}
