import React, { useState } from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactComponent as IconHead } from '../../assets/images/icon.svg';
import BottomBar from '../components/BottomBar';
import Copyright from '../components/Copyright';
import AvatarBar from '../components/AvatarBar';

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
    position: 'relative',
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
  copyright: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  copyrightText: {
    // fontWeight: 300,
  },
  buttomBar: {},
  textFieldInput: {
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  helperText: {
    fontSize: '0.75rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6rem',
    },
  },
  loadingProgress: {
    // color: '#27CD86',
    position: 'relative',
    // top: "50%",
    // left: "50%",
    zIndex: 1,
  },
}));

async function checkSigninStatus() {
  // const [signedIn, setSignedIn] = useState(false);
  const response = await fetch('/check_signed_in');
  console.log(response);
  const message = await response.json();

  if (response.ok) {
    console.log(message);
    console.log('User is signed in, redirecting');
    return true;
  }
  return false;
}

function Signin(props) {
  const { width } = props;

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [afterEmailCheck, setAfterEmailCheck] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [validFormEmail, setValidFormEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);

  // const textFieldSize = isWidthDown('xs', width) ? 'small' : 'medium';
  const textFieldSize = 'medium';
  const [loadingData, setLoadingData] = useState(false);

  const textFieldClassProps = {
    InputProps: {
      classes: {
        root: classes.textFieldInput,
      },
    },
    InputLabelProps: {
      classes: {
        root: classes.textFieldInput,
        // focused: {},
      },
    },
    FormHelperTextProps: {
      classes: {
        root: classes.helperText,
      },
    },
  };

  // note that this is a full-width space
  // material ui seems to ignore the half-width one
  // const defaultHelperTextPlaceHolder = isWidthDown('xs', width) ? '' : '　';
  const defaultHelperTextPlaceHolder = '　';
  let inputBoxHelpterText = defaultHelperTextPlaceHolder; // some white spaces to take up the width

  // if (location.error) {
  //   setPasswordInvalid(true);
  // }

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
      const response = await fetch(`/api/account/checkemail`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: validFormEmail,
        }),
      });
      console.log(response);

      // const body = await response.json();
      // console.log(body);

      // if (body.data && body.data.emailok) {
      if (response.ok) {
        console.log(`The server says your email is OK:`);
        setValidEmail(validFormEmail);
        setInputContent('');
        setAfterEmailCheck(true);
      } else {
        setEmailInvalid(true);
        console.log(`Your email doesn't exist, check again my boy:`);
      }
    };

    const checkPasswordWithServer = async () => {
      const payload = {
        email: validEmail,
        passwd: inputContent,
      };
      // const formData = new URLSearchParams(payload).toString();

      const response = await fetch('/api/account/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setPasswordInvalid(false);

        // TODO: store token to local storage

        const body = await response.json();
        console.log(body);
        const { token } = body.data; // trusting the server
        localStorage.setItem('token', token);

        history.push({
          pathname: '/search',
          state: { email: validEmail },
        });
        return true;
      } 
        setPasswordInvalid(true);
        return false;
      
    };

    setLoadingData(true);
    try {
      if (!afterEmailCheck) {
        if (!validFormEmail) {
          console.log('Wrong email format, refusing to login');
        } else {
          await checkEmailWithServer();
        }
      } else {
        const ok = await checkPasswordWithServer();
        console.log('Password is OK, returning');
        if (ok) {
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingData(false);
  };

  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };

  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);

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
    history.push('/signup');
  };

  const handleEditPass = event => {
    history.push({
      pathname: '/editpass',
      state: { email: validEmail },
    });
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      <CssBaseline />
      <Container className={classes.paper}>
        <IconHead className={classes.icon} />

        <Box style={{ height: '100%', width: '100%', position: 'relative' }}>
          {loadingData && (
            <Box position="absolute" top="5%" left="44%">
              <CircularProgress size={68} className={classes.loadingProgress} />
            </Box>
          )}
          {loadingData && (
            <Box
              style={{ height: '100%', width: '100%', position: 'absolute' }}
              position="absolute"
              top={0}
              left={0}
              zIndex="tooltip"
            />
          )}

          <Container
            className={classes.borderedContainer}
            style={{ filter: loadingData ? 'blur(5px)' : 'blur(0)' }}
            position="absolute"
            top={0}
          >
            <Typography component="h1" variant="h5" className={classes.welcome}>
              {afterEmailCheck ? '欢迎' : '登录'}
            </Typography>
            {afterEmailCheck ? (
              <AvatarBar
                email={validEmail}
                avatarSrc="https://avatars.githubusercontent.com/u/43734697?v=4"
                handleAvatarClick={handleAvatarClick}
                avatarButtonClass={classes.avatarButton}
                avatarIconClass={classes.smallAvatar}
                avatarSourceClass={classes.centeredText}
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
                size={textFieldSize}
                id="username_input_field"
                {...textFieldClassProps}
                label={
                  !afterEmailCheck ? '输入您的电子邮件地址' : '输入您的登录密码'
                }
                helperText={inputBoxHelpterText}
                name="username"
                autoFocus
                autoComplete={afterEmailCheck ? 'current-password' : 'email'}
                fullWidth
                value={inputContent}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    console.log(`Getting on key down event:`);
                    console.log(e);
                    handleClick();
                  }
                }}
                onChange={handleInputChange}
                type={afterEmailCheck && !showPassword ? 'password' : ''}
              />

              {afterEmailCheck ? (
                <Container className={classes.checkboxContainer}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="secondary"
                        size="small"
                      />
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
              {afterEmailCheck ? (
                <Link
                  onClick={handleEditPass}
                  variant="caption"
                  className={classes.centeredText}
                >
                  忘记密码？
                </Link>
              ) : (
                <Link
                  onClick={handleSignup}
                  variant="caption"
                  className={classes.centeredText}
                >
                  创建新账号
                </Link>
              )}
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
              <BottomBar className={classes.buttomBar} spaceOut />
            </Container>
          </Container>
        </Box>
        <Copyright className={classes.copyright} />
      </Container>
    </Container>
  );
}

export default withWidth()(Signin);
