/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { ReactComponent as Icon } from '../../assets/images/Icon.svg';

const useStyles = makeStyles((theme) => ({
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    borderRadius: 30,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    width: '90%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(5.5, 0, 5.5),
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
  },

  input: {
    // borderRadius: 12,
    // "& input": {
    //   borderRadius: 12,
    // },
    '& div': {
      borderRadius: 12,
    },
    // "& fieldset": {
    //   borderRadius: 12,
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
    marginBottom: theme.spacing(2),
    padding: '-0px 5px',
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
}));

function Copyright() {
  return (
    <Typography variant="caption" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/dendenxu">
        dendenxu
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const BottomBar = (props) => {
  const { name } = props;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs>
          <Link color="textSecondary" href="#" variant="caption">
            {name === '' ? '帮助' : `Got: ${name}`}
          </Link>
        </Grid>
        <Grid item>
          <Link color="textSecondary" href="#" variant="caption">
            使用条款
          </Link>
        </Grid>
        <Grid item>
          <Link color="textSecondary" href="#" variant="caption">
            隐私协议
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
      <Typography className={classes.centeredText} variant="caption">
        {email}
      </Typography>
    </Button>
  );
};
export default function Home() {
  const classes = useStyles();
  const [emailCheck, setEmailCheck] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState('');

  const history = useHistory();

  const handleClick = (event) => {
    const newVal = !clicked;
    setClicked(newVal);
    console.log(`clicked: ${newVal}`);
    console.log(
      `Getting new email: ${name}, enter 3180105504@zju.edu.cn to get a preview`,
    );
    console.log(event);
    if (name === '3180105504@zju.edu.cn') {
      console.log('Setting emailCheck to true');
      setEmailCheck(true);
    }
    // const username = document.getElementById("username").value;
    // console.log({ username: username });
    // let history = createBrowserHistory();
    // if (username == 123456) {
    // history.push("/SignIn");
    // history.go();
    // }
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
    console.log('Avatar Clicked!');
  };
  const handleSignUpClick = () => {
    const location = {
      pathname: '/result',
      state: {
        // 页面跳转要传递的数据，如下

        data1: {
          doc: '子沐',
          name,
          dep: '推拿房',
          year: 1999,
          mon: 1,
          day: 1,
          tim: 0,
        },
      },
    };
    history.push(location);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Container className={classes.paper}>
        <Icon className={classes.icon} />

        <Box className={classes.borderedContainer}>
          <Typography component="h1" variant="h5" className={classes.welcome}>
            {emailCheck ? '欢迎' : '登录'}
          </Typography>
          {emailCheck ? (
            <AvatarBar
              email="3180105504@zju.edu.cn"
              avatarSrc="https://courses.zju.edu.cn/api/uploads/2232880/modified-image"
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
              className={classes.input}
              variant="outlined"
              size="small"
              id="username"
              label="邮箱账号"
              name="username"
              autoFocus
              fullWidth
              value={name}
              onChange={handleNameChange}
            />

            {emailCheck ? (
              <Container className={classes.checkboxContainer}>
                <FormControlLabel
                  control={
                    <Checkbox value="remember" color="secondary" size="small" />
                  }
                  label={(
                    <Typography
                      className={classes.centeredText}
                      variant="caption"
                      style={{
                        marginLeft: -5,
                      }}
                    >
                      显示密码
                    </Typography>
                  )}
                  checked={selected}
                  onChange={handleChange}
                  style={{
                    marginRight: 0,
                  }}
                />
              </Container>
            ) : (
              <Container />
            )}
          </Container>

          <Container className={classes.submit}>
            <Link
              variant="caption"
              className={classes.centeredText}
              onClick={handleSignUpClick}
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
          <BottomBar name={name} />
        </Box>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </Container>
  );
}
