/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ReactComponent as Icon } from '../../assets/images/icon.svg';
import BottomBar from '../components/BottomBar';
import Copyright from '../components/Copyright';
import AvatarBar from '../components/AvatarBar';

const useStyles = makeStyles(theme => {
  const gridPadding = theme.spacing(0.5, 2.5);
  const smallGridPadding = theme.spacing(0.5, 1.5);
  const threeFraction = '30%';
  const twoFraction = '45%';
  const containerStyle = {
    margin: theme.spacing(0),
    padding: gridPadding,
    [theme.breakpoints.down('xs')]: {
      padding: smallGridPadding,
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return {
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
    icon: {
      width: '100%',
      height: '100%',
      marginBottom: theme.spacing(3),
    },
    welcome: {
      margin: theme.spacing(1, 0, 1),
      color: theme.palette.secondary.main,
      justifyContent: 'center',
    },
    notice: {
      margin: theme.spacing(1, 0, 1),
      color: theme.palette.error.main,
      justifyContent: 'center',
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

    idCodeContainer: containerStyle,
    idCodeInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },

    idCodeInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    passwordContainer: containerStyle,

    passwordInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: twoFraction,
      height: '100%',
    },

    passwordInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    passwordConfirmInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: twoFraction,
      height: '100%',
    },

    passwordConfirmInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    checkboxContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: theme.spacing(0),
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(2),
      padding: gridPadding,
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },

    centeredText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // ! special operation for Josefin Sans
      transform: 'translate(0px,1.5px)',
    },
    jumpContainer: {
      margin: theme.spacing(0, 0, 2),
      padding: gridPadding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    jumpToSignIn: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translate(0px,1.5px)',
    },
    nextButton: {
      borderRadius: '10px',
      border: 0,
      color: 'white',
      padding: '30 30px',
    },

    copyright: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
    },
    buttomBar: {},
    loadingProgress: {
      // color: '#27CD86',
      // position: 'relative',
      // top: "50%",
      // left: "50%",
      zIndex: 1,
    },
  };
});

function EditPass(props) {
  const { width } = props;
  const classes = useStyles();
  const history = useHistory();
  if (!props.location.state) {
    return <h1>Invalid Access</h1>;
  }
  const {
    email,
    firstName: firstname,
    lastName: lastname,
    password: passwd,
    type,
    gender,
    birthday: birthDate,
    registering,
    modifying,
  } = props.location.state;
  let birthday = '2000-01-01';
  if (registering) {
    const birthdayYear = birthDate.getFullYear().toString();
    let birthdayMonth = (birthDate.getMonth() + 1).toString();
    if (birthDate.getMonth() + 1 < 10)
      birthdayMonth = '0'.toString() + birthdayMonth;
    let birthdayDate = birthDate.getDate().toString();
    if (birthDate.getDate() < 10) birthdayDate = '0'.toString() + birthdayDate;
    birthday =
      birthdayYear +
      '-'.toString() +
      birthdayMonth +
      '-'.toString() +
      birthdayDate;
  }

  const [avatarClicked, setAvatarClicked] = useState(false);
  const [identifyCode, setIdentifyCode] = useState('');
  const [identifyCodeInvalid, setIdentifyCodeInvalid] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [afterEmailCheck, setAfterEmailCheck] = useState(modifying || false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwdEdited, setPasswdEdited] = useState(false);

  const textFieldSize = isWidthDown('xs', width) ? 'small' : 'medium';
  const defaultHelperTextPlaceHolder = isWidthDown('xs', width) ? '' : '　';
  let identifyCodeHelperText = defaultHelperTextPlaceHolder;
  let passwordHelperText = defaultHelperTextPlaceHolder;
  let passwordConfirmHelperText = defaultHelperTextPlaceHolder;

  const passwordConfirmed =
    (password !== passwordConfirm && !modifying) ||
    (modifying && passwordConfirmInvalid);

  if (identifyCodeInvalid) {
    identifyCodeHelperText = '验证码错误';
  }
  if (passwordInvalid) {
    passwordHelperText = modifying ? '密码错误' : '密码应有至少8个字符';
  }
  if (passwordConfirmed) {
    passwordConfirmHelperText = modifying
      ? '密码应有至少8个字符'
      : '两次输入密码不一致';
  }

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

  const handleAvatarClick = () => {
    const newVal = !avatarClicked;
    setAvatarClicked(newVal);
    console.log(`clicked: ${newVal}`);
    console.log('Avatar Clicked!');
  };
  const handleIdentifyCodeInput = event => {
    const text = event.target.value;
    setIdentifyCode(text);
  };
  const handlePasswordInput = event => {
    const text = event.target.value;
    setPassword(text);
    setPasswordInvalid(false);
    setPasswordConfirmInvalid(false);
  };
  const handlePasswordConfirm = event => {
    const text = event.target.value;
    setPasswordConfirm(text);
    setPasswordInvalid(false);
    setPasswordConfirmInvalid(false);
  };
  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };

  const handleLogin = event => {
    history.push('/signin');
  };

  const registerUser = async () => {
    const content = {
      email,
      type,
      firstname,
      lastname,
      passwd,
      gender,
      birthday,
    };
    const response = await fetch('/api/account/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    console.log(response);

    if (response.ok) {
      console.log('Successfully registered the user for activation');
      setAfterEmailCheck(true);
      setIdentifyCodeInvalid(false);
      // history.push('/signin?registered');
    }
  };

  const handleEmailCheckClick = async () => {
    const checkIdentifyCodeWithServer = async () => {
      const response = await fetch('/api/account/checkauthcode', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, authcode: identifyCode }),
      });

      console.log(response);

      if (response.ok) {
        if (registering) {
          await registerUser();
        } else {
          setAfterEmailCheck(true);
          setIdentifyCodeInvalid(false);
        }
      } else {
        setAfterEmailCheck(false);
        setIdentifyCodeInvalid(true);
        console.log('Identified Code Error!');
      }
    };

    setLoadingData(true);
    try {
      if (!afterEmailCheck) {
        await checkIdentifyCodeWithServer();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleEditPassClick = async () => {
    const editPasswordWithServer = async () => {
      let payload = {};

      let api = '/api/account/resetpasswd';

      if (modifying) {
        payload = {
          email,
          passwd: password,
          newpasswd: passwordConfirm,
        };
        api = '/api/account/modifypasswd';
      } else {
        payload = {
          email,
          authcode: identifyCode,
          newpasswd: password,
        };
        api = '/api/account/resetpasswd';
      }

      const response = await fetch(api, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log({ email, authcode: identifyCode, passwd: password });
      console.log(response);

      if (response.ok) {
        setPasswdEdited(true);
      } else {
        setPasswdEdited(false);
        console.log('Edit Password Failed, maybe server problem!');
      }
    };

    setLoadingData(true);
    try {
      if (modifying && passwordConfirm.length < 8) {
        setPasswordConfirmInvalid(true);
      }

      if (password.length < 8) {
        setPasswordInvalid(true);
        console.log('Password is InValid.');
      } else if (passwordConfirmed) {
        console.log('两次输入密码不一致');
      } else {
        setPasswordInvalid(false);
        setPasswordConfirmInvalid(false);
        console.log('All checked out.');
        await editPasswordWithServer(); // todo
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      <Container className={classes.paper}>
        <Icon className={classes.icon} />
        <Box style={{ height: '100%', width: '100%', position: 'relative' }}>
          {loadingData && (
            <Box
              position="absolute"
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                paddingTop: '10%',
              }}
            >
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
              {modifying ? '修改密码' : registering ? '验证账户' : '忘记密码'}
            </Typography>
            <AvatarBar
              email={email}
              avatarSrc="https://avatars.githubusercontent.com/u/43734697?v=4"
              handleAvatarClick={handleAvatarClick}
              avatarButtonClass={classes.avatarButton}
              avatarIconClass={classes.smallAvatar}
              avatarSourceClass={classes.centeredText}
            />

            {passwdEdited || (afterEmailCheck && registering) ? (
              <Typography
                component="h2"
                variant="body2"
                className={classes.welcome}
              >
                {registering
                  ? '验证通过，请使用您的账号登录邮箱'
                  : '密码修改成功，请跳转登陆界面重新登录'}
              </Typography>
            ) : (
              <Typography
                component="h2"
                variant="body2"
                className={!afterEmailCheck ? classes.notice : classes.welcome}
              >
                {!afterEmailCheck
                  ? '一封验证身份的邮件已发至您的邮箱，请查收'
                  : '验证通过，请为您的账号设置新的密码'}
              </Typography>
            )}
            {!passwdEdited && !(afterEmailCheck && registering) && (
              <Box>
                {!afterEmailCheck && (
                  <Container className={classes.idCodeContainer}>
                    <Container className={classes.idCodeInputBox}>
                      <TextField
                        error={identifyCodeInvalid}
                        className={classes.idCodeInput}
                        variant="outlined"
                        size={textFieldSize}
                        id="identify_code"
                        label="验证码"
                        helperText={identifyCodeHelperText}
                        name="identify_code"
                        autoFocus
                        value={identifyCode}
                        onChange={handleIdentifyCodeInput}
                        {...textFieldClassProps}
                      />
                    </Container>
                  </Container>
                )}
                {afterEmailCheck && (
                  <Container>
                    <Container className={classes.passwordContainer}>
                      <Container className={classes.passwordInputBox}>
                        <TextField
                          error={passwordInvalid}
                          className={classes.passwordInput}
                          variant="outlined"
                          size={textFieldSize}
                          id="user_password"
                          label={modifying ? '旧密码' : '密码'}
                          helperText={passwordHelperText}
                          name="user_password"
                          autoFocus
                          value={password}
                          onChange={handlePasswordInput}
                          {...textFieldClassProps}
                          type={!showPassword ? 'password' : ''}
                        />
                      </Container>
                      <Container className={classes.passwordConfirmInputBox}>
                        <TextField
                          error={passwordConfirmed}
                          className={classes.passwordConfirmInput}
                          variant="outlined"
                          size={textFieldSize}
                          id="user_password_confirm"
                          label={modifying ? '新密码' : '确认密码'}
                          helperText={passwordConfirmHelperText}
                          name="user_password_confirm"
                          autoFocus
                          value={passwordConfirm}
                          onChange={handlePasswordConfirm}
                          {...textFieldClassProps}
                          type={!showPassword ? 'password' : ''}
                        />
                      </Container>
                    </Container>
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
                  </Container>
                )}
              </Box>
            )}

            <Container className={classes.jumpContainer}>
              <Link
                onClick={handleLogin}
                variant="caption"
                className={classes.jumpToSignIn}
              >
                登录现有账号
              </Link>
              {!passwdEdited && !(afterEmailCheck && registering) && (
                <Button
                  className={classes.nextButton}
                  type="jumpContainer"
                  variant="contained"
                  color="primary"
                  onClick={
                    !afterEmailCheck
                      ? handleEmailCheckClick
                      : handleEditPassClick
                  }
                >
                  下一步
                </Button>
              )}
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

export default withWidth()(EditPass);
