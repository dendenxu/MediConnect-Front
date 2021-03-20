import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { ReactComponent as Icon } from "./Icon.svg";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/dendenxu">
        dendenxu
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 20),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    welcome: {
      margin: theme.spacing(3, 0, 3),
    },
    input: {
      "& fieldset": {
        borderRadius: 20,
      },
    },
    nextButton: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: "10px",
      border: 0,
      color: "white",
      padding: "30 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  };
});

export default function SignIn() {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");
  const handleClick = () => {
    const newVal = !clicked;
    setClicked(newVal);
    console.log(`clicked: ${newVal}`);
  };
  const handleChange = (event) => {
    const sel = event.target.checked;
    setSelected(sel);
    console.log(`selected: ${sel}`);
  };
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    console.log(`Getting new name: ${newName}`);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Icon />
        <Typography component="h1" variant="h5" className={classes.welcome}>
          欢迎
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="输入您的密码"
          name="password"
          autoFocus
          className={classes.input}
          value={name}
          onChange={handleNameChange}
        />
        <Container>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="显示密码"
            checked={selected}
            onChange={handleChange}
          />
        </Container>

        <Container className={classes.submit}>
          <Link href="https://neon-cubes.xyz" variant="body2">
            {clicked ? "你点我！" : "忘记了密码?"}
          </Link>
          <Button
            className={classes.nextButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            下一步
          </Button>
        </Container>

        <Container>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {name === "" ? "忘记了密码？" : `Got: ${name}`}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"没有账号？注册一个！"}
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
