import React from "react";
import classNames from "classnames";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonText: (props) => {
    return {
      color: props.cool ? "darkpurple" : "white",
      // This is computed property for object
      [theme.breakpoints.up("sm")]: {
        color: props.cool ? "white" : "black",
      },
    };
  },

  buttonBackground: (props) => {
    return {
      background: props.cool
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    };
  },
}));

function CoolButton(props) {
  const classes = useStyles(props);
  return (
    <Button
      fullWidth
      className={classNames(classes.buttonText, classes.buttonBackground)}
    >
      Cool
    </Button>
  );
}

export default CoolButton;
