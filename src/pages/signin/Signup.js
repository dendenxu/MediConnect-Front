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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';
import BottomBar from '../components/BottomBar';
import Copyright from '../components/Copyright';
import Loading from '../components/LoadingMask';

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
    layoutContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      maxWidth: '600px',
    },

    signUpContainer: {
      marginTop: theme.spacing(-8),
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

    accountInfoContainer: { marginTop: theme.spacing(2), ...containerStyle },

    lastNameInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: threeFraction,
      height: '100%',
    },

    // ???
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

    // ???
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

    dateInputBox: {
      marginTop: '-7%',
      display: 'flex',
      justifyContent: 'center',
      width: '64%',
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

    emailInputContainer: containerStyle,

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

    labelRoot: { color: 'rgba(0, 0, 0, 0.35)' },
    labelFocused: {},
    label: {},

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
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '90%',
    },
    copyrightText: {},

    buttomBar: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '90%',
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
  };
});

function Signup(props) {
  const { width } = props;
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;
  const accountTypeDisplay = ['??????', '??????'];
  const accountTypeStorage = ['patient', 'doctor'];

  const [anchorEl2, setAnchorEl2] = useState(null);
  const genderTypeDisplay = ['???', '???'];
  const genderTypeStorage = ['male', 'female'];

  const [showPassword, setShowPassword] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [validFormEmail, setValidFormEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);
  const [lastNameInvalid, setLastNameInvalid] = useState(false);
  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [accountTypeInvalid, setAccountTypeInvalid] = useState(false);
  const [genderTypeInvalid, setGenderTypeInvalid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState(-1);
  const [genderType, setGenderType] = useState(-1);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2000-06-24'),
  );

  const textFieldSize = isWidthDown('xs', width) ? 'small' : 'medium';
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
  const defaultHelperTextPlaceHolder = isWidthDown('xs', width) ? '' : '???';

  let lastNameHelperText = defaultHelperTextPlaceHolder;
  let firstNameHelperText = defaultHelperTextPlaceHolder;
  let accountTypeHelperText = defaultHelperTextPlaceHolder;
  let genderTypeHelperText = defaultHelperTextPlaceHolder;
  let emailBoxHelperText = defaultHelperTextPlaceHolder; // some white spaces to take up the width
  let passwordHelperText = defaultHelperTextPlaceHolder;
  let passwordConfirmHelperText = defaultHelperTextPlaceHolder;

  if (passwordInvalid) {
    passwordHelperText = '??????????????????8?????????';
  }
  if (password !== passwordConfirm) {
    passwordConfirmHelperText = '???????????????????????????';
  }
  if (emailFormInvalid) {
    // check the form first
    emailBoxHelperText = '??????????????????????????????';
  } else if (emailAlreadyTaken) {
    emailBoxHelperText = '???????????????????????????';
  }

  if (lastNameInvalid) {
    lastNameHelperText = '???????????????';
  }
  if (firstNameInvalid) {
    firstNameHelperText = '???????????????';
  }
  if (accountTypeInvalid) {
    accountTypeHelperText = '???????????????';
  }
  if (genderTypeInvalid) {
    genderTypeHelperText = '??????????????? ';
  }

  let accountTypeDisplayed = accountTypeDisplay[accountType];
  console.log(`${accountTypeDisplayed}`);
  if (accountTypeDisplayed === undefined) {
    accountTypeDisplayed = '';
  }
  let genderTypeDisplayed = genderTypeDisplay[genderType];
  console.log(`${genderTypeDisplayed}`);
  if (genderTypeDisplayed === undefined) {
    genderTypeDisplayed = '';
  }

  const handleNextClick = async () => {
    let allchecked = true;
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

      if (response.ok) {
        console.log(`The server says your email is OK:`);
        allchecked = false;
        setEmailAlreadyTaken(true);
      } else {
        console.log(`Your email doesn't exist, check again my boy`);
        console.log("But I know you're registering, so that's OK.");
        setEmailAlreadyTaken(false);
      }
    };

    const activateUser = async () => {
      const sendIdentifyCodeWithServer = async () => {
        const payload = {
          email: validFormEmail,
        };

        const response = await fetch('/api/account/sendemail', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        console.log(response);

        if (response.ok) {
          history.push('/activation', {
            email: validFormEmail,
            firstName,
            lastName,
            type: accountTypeStorage[accountType],
            gender: genderTypeStorage[genderType],
            birthday: selectedDate,
            password,
            registering: true,
          });
        } else {
          console.log('invalid access for password editting!');
        }
      };

      try {
        await sendIdentifyCodeWithServer();
      } catch (err) {
        console.log(err);
      }
    };

    setLoadingData(true);
    try {
      if (!validFormEmail) {
        console.log('Wrong email format, refusing to login');
        allchecked = false;
        setEmailFormInvalid(true);
      } else {
        await checkEmailWithServer();
      }

      if (!firstName) {
        setFirstNameInvalid(true);
        allchecked = false;
      }
      if (!lastName) {
        setLastNameInvalid(true);
        allchecked = false;
      }
      if (!(accountType in [...accountTypeDisplay.keys()])) {
        setAccountTypeInvalid(true);
        allchecked = false;
      }
      if (!(genderType in [...genderTypeDisplay.keys()])) {
        setGenderTypeInvalid(true);
        allchecked = false;
      }
      if (password.length < 8) {
        setPasswordInvalid(true);
        allchecked = false;
      }
      if (allchecked) {
        console.log('All checked out.');
        console.log(
          `Valid form email: ${validFormEmail}, input content: ${inputContent}`,
        );

        await activateUser();
      } else {
        console.log('Something is wrong.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingData(false); // ???????????????????????????????????????warning
    }
  };

  const open = Boolean(anchorEl);
  const handleAccountTypeClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = idx => event => {
    setAnchorEl(null);
    setAccountType(idx);
    setAccountTypeInvalid(false);
  };

  const open2 = Boolean(anchorEl2);
  const handleGenderTypeClick = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleGenderMenuItemClick = idx => event => {
    setAnchorEl2(null);
    setGenderType(idx);
    setGenderTypeInvalid(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
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
    setEmailAlreadyTaken(false);

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const invalid = !re.test(text) && text.length !== 0;
    setEmailFormInvalid(invalid);
    console.log(`Getting new email text: ${text}`);
    console.log(`Setting email form invalid: ${invalid}`);
    setValidFormEmail(invalid ? '' : text);
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

  const handleLogin = event => {
    history.push('/signin');
  };

  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };

  return (
    <Container component="main" className={classes.layoutContainer}>
      <Container className={classes.signUpContainer}>
        <Loading loadingData={loadingData} />
        <Box
          className={classes.borderedContainer}
          style={{ filter: loadingData ? 'blur(5px)' : 'blur(0)' }}
        >
          <Container className={classes.logoContainer}>
            <Icon className={classes.logo} />

            <Typography component="h1" variant="h5" className={classes.welcome}>
              ????????????MediConnect??????
            </Typography>
          </Container>

          <Container className={classes.accountInfoContainer}>
            <Container className={classes.lastNameInputBox}>
              <TextField
                error={lastNameInvalid}
                className={classes.lastNameInput}
                variant="outlined"
                size={textFieldSize}
                id="user_second_name"
                label="??????"
                helperText={lastNameHelperText}
                name="user_second_name"
                autoFocus
                value={lastName}
                onChange={handleLastNameInput}
                {...textFieldClassProps}
              />
            </Container>

            <Container className={classes.firstNameInputBox}>
              <TextField
                error={firstNameInvalid}
                className={classes.firstNameInput}
                variant="outlined"
                size={textFieldSize}
                id="user_first_name"
                label="??????"
                helperText={firstNameHelperText}
                name="user_first_name"
                autoFocus
                value={firstName}
                onChange={handleFirstNameInput}
                {...textFieldClassProps}
              />
            </Container>

            <Container className={classes.accountTypeInputBox}>
              <TextField
                error={accountTypeInvalid}
                className={classes.accountTypeInput}
                variant="outlined"
                size={textFieldSize}
                id="user_account_type"
                label={isWidthDown('xs', width) ? '??????' : '????????????'}
                helperText={accountTypeHelperText}
                name="user_account_typen"
                autoFocus
                value={accountTypeDisplayed}
                InputLabelProps={textFieldClassProps.InputLabelProps}
                InputProps={{
                  ...textFieldClassProps.InputProps,
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
                        {[...accountTypeDisplay.keys()].map(key => (
                          <MenuItem
                            key={key}
                            selected={key === 0}
                            onClick={handleMenuItemClick(key)}
                          >
                            {accountTypeDisplay[key]}
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
            <Container className={classes.accountTypeInputBox}>
              <TextField
                error={genderTypeInvalid} //
                className={classes.accountTypeInput}
                variant="outlined"
                size={textFieldSize}
                id="user_gender_type"
                label={isWidthDown('xs', width) ? '??????' : '????????????'}
                helperText={genderTypeHelperText}
                name="user_gender_typen"
                autoFocus
                value={genderTypeDisplayed}
                InputLabelProps={textFieldClassProps.InputLabelProps}
                InputProps={{
                  ...textFieldClassProps.InputProps,
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.accountType}
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleGenderTypeClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={open2}
                        onClose={handleGenderMenuItemClick(0)}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 2,
                            width: '20ch',
                          },
                        }}
                      >
                        {[...genderTypeDisplay.keys()].map(key => (
                          <MenuItem
                            key={key}
                            selected={key === 0}
                            onClick={handleGenderMenuItemClick(key)}
                          >
                            {genderTypeDisplay[key]}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />
            </Container>

            <Container className={classes.dateInputBox}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="????????????"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Container>
          </Container>

          <Container className={classes.emailInputContainer}>
            <Container className={classes.emailInputBox}>
              <TextField
                error={emailAlreadyTaken || emailFormInvalid}
                className={classes.emailInput}
                variant="outlined"
                size={textFieldSize}
                id="username"
                label="????????????"
                helperText={emailBoxHelperText}
                name="username"
                autoFocus
                fullWidth
                value={inputContent}
                onChange={handleEmailInput}
                {...textFieldClassProps}
              />
            </Container>
          </Container>

          <Container className={classes.passwordContainer}>
            <Container className={classes.passwordInputBox}>
              <TextField
                error={passwordInvalid}
                className={classes.passwordInput}
                variant="outlined"
                size={textFieldSize}
                id="user_password"
                label="??????"
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
                label="????????????"
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
                  ????????????
                </Typography>
              }
              checked={showPassword}
              onChange={handleCheckBoxChange}
              style={{
                marginRight: 0,
              }}
            />
          </Container>

          <Container className={classes.jumpContainer}>
            <Link
              onClick={handleLogin}
              variant="caption"
              className={classes.jumpToSignIn}
            >
              ??????????????????
            </Link>
            <Button
              className={classes.nextButton}
              type="jumpContainer"
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              ?????????
            </Button>
          </Container>
        </Box>

        <BottomBar className={classes.buttomBar} />
        <Copyright className={classes.copyright} />
      </Container>
    </Container>
  );
}

export default withWidth()(Signup);
