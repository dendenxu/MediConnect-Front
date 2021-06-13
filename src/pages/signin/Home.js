import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { Radio } from '@material-ui/core';
// import { render } from '@testing-library/react';
// import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const useStyles = makeStyles(theme => ({
  // TODO: fix these ugly naming...
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '600px',
  },
  paper: {
    marginTop: -theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    borderRadius: 30,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    width: '90%',
    marginTop: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3.5, 0, 10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcome: {
    margin: theme.spacing(1, 0, 1),
    color: theme.palette.secondary.main,
  },
  checkboxInput: {
    padding: theme.spacing(0),
    margin: theme.spacing(1, 0, -0.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
    height: '100%',
  },

  input: {
    '& div': {
      borderRadius: 16,
    },
    // '& input': {
    //   margin: theme.spacing(1),
    // },
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    // width: "100%"
    marginTop: theme.spacing(-0.5),
    padding: 0,
  },
  nextButton: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: '10px',
    border: 0,
    color: 'white',
    padding: '30 30px',
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  avatarButton: {
    borderRadius: '14px',
    textTransform: 'none',
    marginBottom: theme.spacing(1),
    padding: '2px 6px',
  },
  smallAvatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  centeredText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // ! special operation for Josefin Sans
    transform: 'translate(0px,1.5px)',
  },
  icon: {
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(3),
  },
  labelRoot: {
    // fontSize: '0.8rem',
    // padding: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.35)',
    // transform: 'translate(0px,1.5px)',
  },
  labelFocused: {
    // fontSize: '1rem',
    // color: "rgba(0, 0, 0, 0.35)",
  },
  copyright: {
    marginTop: theme.spacing(3),
  },
  copyrightText: {
    // fontWeight: 300,
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} justify="center" className={classes.copyright}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.copyrightText}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/dendenxu">
          dendenxu
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Grid>
  );
}

const BottomBar = props => {
  const { name } = props;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs>
          <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
            {/* {name === '' ? '帮助' : `Got: ${name}`} */}
            帮助
          </Link>
        </Grid>
        <Grid item>
          <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
            使用条款
          </Link>
        </Grid>
        <Grid item>
          <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
            隐私协议
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
const AvatarBar = props => {
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
      <Typography
        className={classes.centeredText}
        variant="caption"
        style={{
          fontWeight: 500,
        }}
      >
        {email}
      </Typography>
    </Button>
  );
};
export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [afterEmailCheck, setAfterEmailCheck] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [validFormEmail, setValidFormEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);

  // note that this is a full-width space
  // material ui seems to ignore the half-width one
  let inputBoxHelpterText = '　'; // some white spaces to take up the width

  if (afterEmailCheck) {
    if (passwordInvalid) {
      inputBoxHelpterText = '您输入的密码不正确';
    }
  } else if (emailFormInvalid) {
    inputBoxHelpterText = '您输入的邮箱格式不正确';
  } else if (emailInvalid) {
    inputBoxHelpterText = '您输入的邮箱不在数据库中';
  }

  const handleClick = async () => {
    const checkEmailWithServer = async () => {
      const response = await fetch(`/user?email=${validFormEmail}`, {
        method: 'get',
      });
      console.log(response);
      const message = await response.json();

      if (response.ok) {
        console.log(`The server says your email is OK:`);
        console.log(message);
        setValidEmail(validFormEmail);
        setInputContent('');
        setAfterEmailCheck(true);
      } else {
        setEmailInvalid(true);
        console.log(`Your email doesn't exist, check again my boy:`);
        console.log(message);
      }
    };

    const checkPasswordWithServer = async () => {
      const response = await fetch('/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: validEmail,
          password: inputContent,
        }),
      });

      console.log(response);
      const message = await response.json();

      if (response.ok) {
        console.log(`The server says your password is OK:`);
        console.log(message);
        history.push('/chat');
      } else {
        setPasswordInvalid(true);
        console.log(message);
      }
    };

    try {
      if (!afterEmailCheck) {
        if (!validFormEmail) {
          console.log('Wrong email format, refusing to login');
        } else {
          await checkEmailWithServer();
        }
      } else {
        await checkPasswordWithServer();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };

  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);
    setEmailInvalid(false);

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const invalid = !re.test(text) && text.length !== 0;
    setEmailFormInvalid(invalid);
    console.log(`Getting new email text: ${text}`);
    console.log(`Setting email form invalid: ${invalid}`);
    setValidFormEmail(invalid ? '' : text);
  };
  const handleAvatarClick = () => {
    const newVal = !avatarClicked;
    setAvatarClicked(newVal);
    console.log(`clicked: ${newVal}`);
    console.log('Avatar Clicked!');
  };

  const handleSignup = event => {
    history.push('/user/signup');
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      <CssBaseline />
      <Container className={classes.paper}>
        <Icon className={classes.icon} />

        <Box className={classes.borderedContainer}>
          <Typography component="h1" variant="h5" className={classes.welcome}>
            {afterEmailCheck ? '欢迎' : '登录'}
          </Typography>
          {afterEmailCheck ? (
            <AvatarBar
              email={validEmail}
              avatarSrc="https://avatars.githubusercontent.com/u/43734697?v=4"
              handleAvatarClick={handleAvatarClick}
            />
          ) : (
            <Typography
              component="h1"
              variant="body2"
              className={classes.welcome}
            >
              使用您的 MediConnect 账号
            </Typography>
          )}

          <Container className={classes.checkboxInput}>
            <TextField
              error={
                afterEmailCheck
                  ? passwordInvalid
                  : emailInvalid || emailFormInvalid
              }
              className={classes.input}
              variant="outlined"
              size="medium"
              id="username"
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              label={
                // <Typography className={classes.centeredText}> // {
                !afterEmailCheck ? '输入您的电子邮件地址' : '输入您的登录密码'
              }
              // </Typography>
              // }
              helperText={inputBoxHelpterText}
              name="username"
              autoFocus
              autoComplete={afterEmailCheck ? 'current-password' : 'email'}
              fullWidth
              value={inputContent}
              onChange={handleInputChange}
              type={afterEmailCheck && !showPassword ? 'password' : ''}
            />

            {afterEmailCheck ? (
              <Container className={classes.checkboxContainer}>
                <FormControlLabel
                  control={
                    <Checkbox value="remember" color="secondary" size="small" />
                  }
                  label={
                    <Typography
                      className={classes.centeredText}
                      variant="caption"
                      style={{
                        marginLeft: -5,
                      }}
                    >
                      显示密码
                    </Typography>
                  }
                  checked={showPassword}
                  onChange={handleCheckBoxChange}
                  style={{
                    marginRight: 0,
                  }}
                />
              </Container>
            ) : (
              <div />
            )}
          </Container>

          <Container className={classes.submit}>
            <Link
              onClick={handleSignup}
              variant="caption"
              className={classes.centeredText}
            >
              创建新账号
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
          <BottomBar name={inputContent} />
        </Box>

        <Copyright />
      </Container>
    </Container>
  );
}
