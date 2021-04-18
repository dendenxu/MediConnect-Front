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
import { Radio } from "@material-ui/core";

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
      margin: theme.spacing(2, 0, 1),
    },
    input: {
      "& fieldset": {
        borderRadius: 16,
      },
      padding: theme.spacing(0, 1),
      margin: theme.spacing(0, 0, -0.5),
    },
    nextButton: {
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: "10px",
      border: 0,
      color: "white",
      padding: "30 30px",
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    avatarButton: {
      borderRadius: "14px",
      textTransform: "none",
      marginBottom: theme.spacing(2),
    },
    smallAvatar: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
    centeredText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // ! special operation for Josefin Sans
      transform: "translate(0px,1.5px)",
    },
    HelperText: {
      color: 'red',
    }
  };
});

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

const BottomBar = (props) => {
  const { name } = props;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs>
          <Link href="#" variant="body2">
            {name === "" ? "帮助" : `Got: ${name}`}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"使用条款"}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"隐私协议"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

const AvatarBar = (props) => {
  const { email, avatarSrc, handleAvatarClick } = props;
  const classes = useStyles();
  return (
      <Button
      variant="outlined"
      size="small"
      className={classes.avatarButton}
      startIcon={<Avatar src={avatarSrc} className={classes.smallAvatar} />}
      onClick={handleAvatarClick}
    >
      {email}
      </Button>   
  );
};

export default function SignIn() {
  const [match, setMatch] = useState(false);
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");
  const handleClick = () => {
    const newVal = !clicked;
    setClicked(newVal);
    console.log(`clicked: ${newVal}`);
    let password = document.getElementById('password').value;
    if (password == 123456) {
      setMatch(true);
    }
    else {
      setMatch(false);
    }
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
  const handleAvatarClick = () => {
    console.log("Avatar Clicked!");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box pb={5}><Icon /></Box>
        <Box border={1} borderRadius={16} boxShadow={3} pt={5} pb={5} px={10} justifyContent='center' borderColor="primary.main" width='30rem' height='35rem'>
        <Typography>
          <Box component="h1" fontSize="h5.fontSize" textAlign='center' letterSpacing={6}>
            欢迎
          </Box>
          </Typography>
        <Box pl={7}>
        <AvatarBar
          email="3180105504@zju.edu.cn"
          avatarSrc="https://courses.zju.edu.cn/api/uploads/2232880/modified-image"
          handleAvatarClick={handleAvatarClick}
            />
        </Box>
        <Container className={classes.input}>
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="输入您的密码"
            name="password"
            helperText={match ? "密码正确" : "您输入的密码和账户不匹配"}
            autoFocus
            value={name}
            onChange={handleNameChange}
          />
        </Container>

        <Container>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" size="small" />}
            label={
              <Typography
                className={classes.centeredText}
                variant="body2"
                style={{
                  marginLeft: -5,
                }}
              >
                显示密码
              </Typography>
            }
            checked={selected}
            onChange={handleChange}
          />
        </Container>

        <Container className={classes.submit}>
          <Link
            href="https://neon-cubes.xyz"
            variant="body2"
            className={classes.centeredText}
          >
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
          <BottomBar name={name} />
        </Box>
        <Box mt={8}><Copyright /></Box>
      </div>
    </Container>
  );
}
