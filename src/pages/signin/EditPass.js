import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

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
    },
    notice: {
      margin: theme.spacing(1, 0, 1),
      color: theme.palette.error.main,
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
  };
});

function EditPass(props) {
  const { width } = props;
  const classes = useStyles();
  const history = useHistory();
  if (!props.location.state) {
    return <h1>Invalid Access</h1>;
  }
  const { email } = props.location.state;

  const [avatarClicked, setAvatarClicked] = useState(false);
  const [identifyCode, setIdentifyCode] = useState('');
  const [identifyCodeInvalid, setIdentifyCodeInvalid] = useState(false);

  const [afterEmailCheck, setAfterEmailCheck] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const textFieldSize = isWidthDown('xs', width) ? 'small' : 'medium';
  const defaultHelperTextPlaceHolder = isWidthDown('xs', width) ? '' : '　';
  let identifyCodeHelperText = defaultHelperTextPlaceHolder;
  let passwordHelperText = defaultHelperTextPlaceHolder;
  let passwordConfirmHelperText = defaultHelperTextPlaceHolder;

  if (identifyCodeInvalid) {
    identifyCodeHelperText = '验证码错误'; // TODO
  }
  if (passwordInvalid) {
    passwordHelperText = '密码应有至少8个字符';
  }
  if (password !== passwordConfirm) {
    passwordConfirmHelperText = '两次输入密码不一致';
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
  };
  const handlePasswordConfirm = event => {
    const text = event.target.value;
    setPasswordConfirm(text);
    setPasswordInvalid(false);
  };
  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };

  const handleLogin = event => {
    history.push('/signin');
  };
  const handleEmailCheckClick = async () => {
    // TODO 邮箱验证码检验
    setAfterEmailCheck(true);
  };
  const handleEditPassClick = async () => {
    // TODO 修改密码
    const editPassword = async () => {};

    try {
      if (password.length < 8) {
        setPasswordInvalid(true);
        console.log('Password is InValid.');
      } else if (password !== passwordConfirm) {
        console.log('两次输入密码不一致');
      } else {
        console.log('All checked out.');
        editPassword();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      {/* <CssBaseline /> */}
      <Container className={classes.paper}>
        <Icon className={classes.icon} />
        <Container
          className={classes.borderedContainer}
          // TODO 加载的小圆圈
        >
          <Typography component="h1" variant="h5" className={classes.welcome}>
            忘记密码
          </Typography>
          <AvatarBar
            email={email}
            avatarSrc="https://avatars.githubusercontent.com/u/43734697?v=4"
            handleAvatarClick={handleAvatarClick}
            avatarButtonClass={classes.avatarButton}
            avatarIconClass={classes.smallAvatar}
            avatarSourceClass={classes.centeredText}
          />

          <Typography
            component="h2"
            variant="body2"
            className={!afterEmailCheck ? classes.notice : classes.welcome}
          >
            {!afterEmailCheck
              ? '一封验证身份的邮件已发至您的邮箱，请查收'
              : '验证通过，请为您的账号设置新的密码'}
          </Typography>

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
            <Box>
              <Container className={classes.passwordContainer}>
                <Container className={classes.passwordInputBox}>
                  <TextField
                    error={passwordInvalid}
                    className={classes.passwordInput}
                    variant="outlined"
                    size={textFieldSize}
                    id="user_password"
                    label="密码"
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
                    error={password !== passwordConfirm}
                    className={classes.passwordConfirmInput}
                    variant="outlined"
                    size={textFieldSize}
                    id="user_password_confirm"
                    label="确认密码"
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
            <Button
              className={classes.nextButton}
              type="jumpContainer"
              variant="contained"
              color="primary"
              onClick={
                !afterEmailCheck ? handleEmailCheckClick : handleEditPassClick
              }
            >
              下一步
            </Button>
          </Container>

          <Container>
            <BottomBar className={classes.buttomBar} spaceOut />
          </Container>
        </Container>

        <Copyright className={classes.copyright} />
      </Container>
    </Container>
  );
}

export default withWidth()(EditPass);
