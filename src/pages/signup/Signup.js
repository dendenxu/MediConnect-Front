import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
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
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const useStyles = makeStyles(theme => {
  const gridPadding = theme.spacing(0.5, 2.5);
  const threeFraction = '30%';
  const twoFraction = '45%';
  return {
    layoutContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      maxWidth: '600px',
    },

    signUpContainer: {
      marginTop: -theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    welcome: {
      color: theme.palette.secondary.main,
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

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },

    logoContainer: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },

    logo: {
      width: '45%',
      height: '45%',
      marginBottom: theme.spacing(2),
    },

    accountInfoContainer: {
      marginTop: theme.spacing(2),
      padding: gridPadding,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    lastNameInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: threeFraction,
      height: '100%',
    },

    // 姓
    lastNameInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    firstNameInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: threeFraction,
      height: '100%',
    },

    // 名
    firstNameInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    accountTypeInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: threeFraction,
      height: '100%',
    },

    accountTypeInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    accountType: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      marginRight: theme.spacing(-1),
    },

    emailInputContainer: {
      margin: theme.spacing(0),
      padding: gridPadding,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    emailInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      // height: '100%',
    },

    emailInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    passwordContainer: {
      margin: theme.spacing(0),
      // marginBottom: theme.spacing(2),
      padding: gridPadding,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

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

    labelRoot: { color: 'rgba(0, 0, 0, 0.35)' },
    labelFocused: {},
    label: {},

    jumpContainer: {
      margin: theme.spacing(2, 0, 4),
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
      // marginRight: theme.spacing(3),
      width: '90%',
    },
    copyrightText: {},
  };
});

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

function Copyright() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justify="flex-end"
      className={classes.copyright}
    >
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

export default function home() {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;
  const options = ['患者', '医生'];

  // const [afterEmailCheck, setAfterEmailCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);
  const [lastNameInvalid, setLastNameInvalid] = useState(false);
  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [accountTypeInvalid, setAccountTypeInvalid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState(-1);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // note that this is a full-width space
  // material ui seems to ignore the half-width one
  let lastNameHelperText = '　';
  let firstNameHelperText = '　';
  let accountTypeHelperText = '　';
  let emailBoxHelperText = '　'; // some white spaces to take up the width
  let passwordHelperText = '　';
  let passwordConfirmHelperText = '　';

  if (passwordInvalid) {
    passwordHelperText = '密码应有至少8个字符';
  }
  if (passwordInput !== passwordConfirm) {
    passwordConfirmHelperText = '两次输入密码不一致';
  }
  if (emailFormInvalid) {
    // check the form first
    emailBoxHelperText = '请输入有效的邮箱地址';
  } else if (emailInvalid) {
    emailBoxHelperText = '您输入的邮箱已注册';
  }
  if (lastNameInvalid) {
    lastNameHelperText = '请填写姓氏';
  }
  if (firstNameInvalid) {
    firstNameHelperText = '请填写名字';
  }
  if (accountTypeInvalid) {
    accountTypeHelperText = '请选择类型';
  }

  const handleNextClick = async () => {
    const throwableHandle = async () => {
      const response = await fetch('/email', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputContent,
        }),
      });
      console.log(response);
      const message = await response.json();

      let allchecked = true;
      if (response.ok) {
        console.log(`The server says your email is OK:`);
        console.log(message);
      } else {
        setEmailInvalid(true);
        console.log(`Your email doesn't exist, check again my boy:`);
        console.log(message);
        allchecked = false;
      }
      if (!firstName) {
        setFirstNameInvalid(true);
        allchecked = false;
      }
      if (!lastName) {
        setLastNameInvalid(true);
        allchecked = false;
      }
      if (!(userType in [...options.keys()])) {
        setAccountTypeInvalid(true);
        allchecked = false;
      }
      if (passwordInput.length < 8) {
        setPasswordInvalid(true);
        allchecked = false;
      }
      if (allchecked) {
        console.log('All checked out.');
      } else {
        console.log('Something is wrong.');
      }
    };

    try {
      await throwableHandle();
    } catch (err) {
      console.log(err);
    }
  };

  const open = Boolean(anchorEl);
  const handleAccountTypeClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = idx => event => {
    setAnchorEl(null);
    setUserType(idx);
    setAccountTypeInvalid(false);
  };
  const handleFirstNameInput = event => {
    const text = event.target.value;
    setFirstName(text);
    setFirstNameInvalid(false);
  };

  const handleLastNameInput = event => {
    const text = event.target.value;
    setLastName(text);
    setLastNameInvalid(false);
  };

  const handleEmailInput = event => {
    const text = event.target.value;
    setInputContent(text);
    setEmailInvalid(false);

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const invalid = !re.test(text) && text.length !== 0;
    setEmailFormInvalid(invalid);
    console.log(`Getting new email text: ${text}`);
    console.log(`Setting email form invalid: ${invalid}`);
  };

  const handlePasswordInput = event => {
    const text = event.target.value;
    setPasswordInput(text);
    setPasswordInvalid(false);
  };
  const handlePasswordConfirm = event => {
    const text = event.target.value;
    setPasswordConfirm(text);
    setPasswordInvalid(false);
  };

  const handleLogin = event => {
    history.push('/');
  };

  return (
    <Container component="main" className={classes.layoutContainer}>
      <CssBaseline />

      <Container className={classes.signUpContainer}>
        <Box className={classes.borderedContainer}>
          <Container className={classes.logoContainer}>
            <Icon className={classes.logo} />

            <Typography component="h1" variant="h5" className={classes.welcome}>
              创建您的MediConnect账号
            </Typography>
          </Container>

          <Container className={classes.accountInfoContainer}>
            <Container className={classes.lastNameInputBox}>
              <TextField
                error={lastNameInvalid}
                className={classes.lastNameInput}
                variant="outlined"
                size="medium"
                id="user_second_name"
                label="姓氏"
                helperText={lastNameHelperText}
                name="user_second_name"
                autoFocus
                value={lastName}
                onChange={handleLastNameInput}
              />
            </Container>

            <Container className={classes.firstNameInputBox}>
              <TextField
                error={firstNameInvalid}
                className={classes.firstNameInput}
                variant="outlined"
                size="medium"
                id="user_first_name"
                label="名字"
                helperText={firstNameHelperText}
                name="user_first_name"
                autoFocus
                value={firstName}
                onChange={handleFirstNameInput}
              />
            </Container>

            <Container className={classes.accountTypeInputBox}>
              <TextField
                error={accountTypeInvalid}
                className={classes.accountTypeInput}
                variant="outlined"
                size="medium"
                id="user_account_type"
                label="账户类型"
                helperText={accountTypeHelperText}
                name="user_account_typen"
                autoFocus
                value={options[userType] ?? ''}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.accountType}
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleAccountTypeClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleMenuItemClick(0)}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 2,
                            width: '20ch',
                          },
                        }}
                      >
                        {[...options.keys()].map(key => (
                          <MenuItem
                            key={key}
                            selected={key === 0}
                            onClick={handleMenuItemClick(key)}
                          >
                            {options[key]}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />
            </Container>
          </Container>

          <Container className={classes.emailInputContainer}>
            <Container className={classes.emailInputBox}>
              <TextField
                error={emailInvalid || emailFormInvalid}
                className={classes.emailInput}
                variant="outlined"
                size="medium"
                id="username"
                label="邮箱账号"
                helperText={emailBoxHelperText}
                name="username"
                autoFocus
                fullWidth
                value={inputContent}
                onChange={handleEmailInput}
              />
            </Container>
          </Container>

          <Container className={classes.passwordContainer}>
            <Container className={classes.passwordInputBox}>
              <TextField
                error={passwordInvalid}
                className={classes.passwordInput}
                variant="outlined"
                size="medium"
                id="user_password"
                label="密码"
                helperText={passwordHelperText}
                name="user_password"
                autoFocus
                value={passwordInput}
                onChange={handlePasswordInput}
              />
            </Container>

            <Container className={classes.passwordConfirmInputBox}>
              <TextField
                error={passwordInput !== passwordConfirm}
                className={classes.passwordConfirmInput}
                variant="outlined"
                size="medium"
                id="user_password_confirm"
                label="确认密码"
                helperText={passwordConfirmHelperText}
                name="user_password_confirm"
                autoFocus
                value={passwordConfirm}
                onChange={handlePasswordConfirm}
              />
            </Container>
          </Container>

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
              onClick={handleNextClick}
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
