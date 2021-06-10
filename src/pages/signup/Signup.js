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
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const useStyles = makeStyles(theme => ({
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '700px',
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
    padding: theme.spacing(0),
    margin: theme.spacing(2, 0, 0, 4.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  secondNameInputBox: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
    height: '100%',
  },

  // 姓
  secondNameInput: {
    '& div': {
      borderRadius: 16,
    },
  },

  firstNameInputBox: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 5, 0, 5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
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
    margin: theme.spacing(0, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
    height: '100%',
  },

  accountTypeInput: {},

  emailInputBox: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '92.5%',
    height: '100%',
  },

  emailInput: {
    '& div': {
      borderRadius: 16,
    },
  },

  passwordContainer: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0, 2.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  },

  passwordInputBox: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 9.5, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },

  passwordInput: {
    '& div': {
      borderRadius: 16,
    },
  },

  passwordConfirmInputBox: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
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
    margin: theme.spacing(2, 0, 10),
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
    marginLeft: theme.spacing(17.5),
  },
  copyrightText: {},
}));

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

export default function home() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAccountTypeClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountTypeClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;
  const options = ['患者', '医生'];

  const [afterEmailCheck, setAfterEmailCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);
  const [noSecondName, setNoSecondName] = useState(false);
  const [noFirstName, setNoFirstName] = useState(false);
  const [passwordNotEqual, setPassWordNotEqual] = useState(false);
  const [noAccountType, setNoAccountType] = useState(false);

  // note that this is a full-width space
  // material ui seems to ignore the half-width one
  let secondNameHelperText = '　';
  let firstNameHelperText = '　';
  let accountTypeHelperText = '　';
  let emailBoxHelperText = '　'; // some white spaces to take up the width
  let passwordHelperText = '　';
  let passwordConfirmHelperText = '　';

  if (afterEmailCheck) {
    if (passwordInvalid) {
      passwordHelperText = '您输入的密码格式不正确';
    } else if (emailFormInvalid) {
      emailBoxHelperText = '请输入有效的邮箱地址';
    } else if (emailInvalid) {
      emailBoxHelperText = '您输入的邮箱已注册';
    }
  }
  if (noSecondName) {
    secondNameHelperText = '请填写姓氏';
  }
  if (noFirstName) {
    firstNameHelperText = '请填写名字';
  }
  if (noAccountType) {
    accountTypeHelperText = '请选择账户类型';
  }

  if (passwordNotEqual) {
    passwordConfirmHelperText = '确认密码不一致';
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

      if (response.ok) {
        console.log(`The server says your email is OK:`);
        console.log(message);
        setInputContent('');
        setAfterEmailCheck(true);
      } else {
        setEmailInvalid(true);
        console.log(`Your email doesn't exist, check again my boy:`);
        console.log(message);
      }
    };

    try {
      await throwableHandle();
    } catch (err) {
      console.log(err);
    }
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
    if (!afterEmailCheck) {
      setValidEmail(text);
    }
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
            <Container className={classes.secondNameInputBox}>
              <TextField
                className={classes.secondNameInput}
                variant="outlined"
                size="medium"
                id="user_second_name"
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                label="姓氏"
                helperText={secondNameHelperText}
                name="user_second_name"
                autoFocus
                fullWidth
                value={inputContent}
              />
            </Container>

            <Container className={classes.firstNameInputBox}>
              <TextField
                className={classes.firstNameInput}
                variant="outlined"
                size="medium"
                id="user_first_name"
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                label="名字"
                helperText={firstNameHelperText}
                name="user_first_name"
                autoFocus
                fullWidth
                value={inputContent}
              />
            </Container>

            <Container className={classes.accountTypeInputBox}>
              <TextField
                className={classes.accountTypeInput}
                variant="outlined"
                size="medium"
                id="user_account_type"
                InputLabelProps={{
                  classes: {
                    labelRoot: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                label="账户类型"
                helperText={accountTypeHelperText}
                name="user_account_typen"
                autoFocus
                fullWidth
                value={inputContent}
              />
            </Container>
            <IconButton
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
              onClose={handleAccountTypeClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 2,
                  width: '20ch',
                },
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option}
                  selected={option === '患者'}
                  onClick={handleAccountTypeClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Container>

          <Container className={classes.emailInputBox}>
            <TextField
              error={
                afterEmailCheck
                  ? passwordInvalid
                  : emailInvalid || emailFormInvalid
              }
              className={classes.emailInput}
              variant="outlined"
              size="medium"
              id="username"
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              label="邮箱账号"
              helperText={emailBoxHelperText}
              name="username"
              autoFocus
              fullWidth
              value={inputContent}
            />
          </Container>

          <container className={classes.passwordContainer}>
            <Container className={classes.passwordInputBox}>
              <TextField
                className={classes.passwordInput}
                variant="outlined"
                size="medium"
                id="user_password"
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                label="密码"
                helperText={passwordHelperText}
                name="user_password"
                autoFocus
                fullWidth
                value={inputContent}
              />
            </Container>

            <Container className={classes.passwordConfirmInputBox}>
              <TextField
                className={classes.passwordConfirmInput}
                variant="outlined"
                size="medium"
                id="user_password_confirm"
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                label="确认密码"
                helperText={passwordConfirmHelperText}
                name="user_password_confirm"
                autoFocus
                fullWidth
                value={inputContent}
              />
            </Container>
          </container>

          <Container className={classes.jumpContainer}>
            <Link href="/" variant="caption" className={classes.jumpToSignIn}>
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
