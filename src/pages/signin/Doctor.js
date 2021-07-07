import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';
import Patient from './Patient';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
  start: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  list: {
    width: '100%',
    maxheigh: '30vh',
  },
}));

export default function Doctor() {
  const classes = useStyles();
  const history = useHistory();
  const [myName, setName] = useState('default value');
  const [myEmail, setEmail] = useState('default value');
  const [introduction, setIntr] = useState('default value');
  const [inputContent, setInputContent] = useState('1');
  const [index, setIndex] = useState();
  // const getInfo = () => {
  //   setName('testname');
  //   setEmail('123456@zju.edu.cn');
  // };

  const getInfo = async () => {
    const response = await fetch('/api/account/getinfo');
    const body = await response.json();
    console.log(response);

    if (response.ok) {
      console.log(body);
      setName(`${body.data.lastname}${body.data.firstname}`);
      setEmail(body.data.email);
      setIntr(body.data.department);
    }
  };

  useEffect(getInfo, []);

  const handleEditPWDButtonClick = event => {
    history.push({
      pathname: '/editpass',
      state: {
        email: myEmail,
        homepage: true,
        modifying: true,
      },
    });
  };
  const handleSaveInfoButtonClick = event => {
    const text = event.target.value;
    setIntr(text);
  };
  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);
    console.log(`Getting new text: ${text}`);
  };

  return (
    <Container component="main" className={classes.page} onClick={getInfo}>
      <CssBaseline />
      <Box className={classes.start} bgcolor="#87CEFA" p={1}>
        <Box>
          <Icon />
        </Box>
        <Box>
          <PersonOutlineIcon />
        </Box>
        <Box>
          <Typography>个人资料</Typography>
        </Box>
      </Box>
      <Box
        className={classes.start}
        p={1}
        color="primary.main"
        borderBottom={5}
      >
        <Typography>基本信息</Typography>
      </Box>
      <Box
        className={classes.center}
        p={1}
        borderBottom={5}
        borderColor="primary.main"
        onLoad={getInfo}
      >
        <Box display="flex" width="33%">
          <Typography>姓名：{myName}</Typography>
        </Box>
        <Box display="flex" width="33%">
          <Typography>邮箱：{myEmail}</Typography>
        </Box>
        <Box display="flex" width="33%">
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditPWDButtonClick}
          >
            修改密码
          </Button>
        </Box>
      </Box>
      <Box className={classes.start} p={1}>
        <Box>
          <Typography>个人介绍:</Typography>
        </Box>
      </Box>
      <Box
        className={classes.start}
        p={1}
        borderColor="primary.main"
        borderBottom={5}
      >
        <TextField
          value={introduction}
          onChange={handleInputChange}
          id="introduction"
        />
      </Box>
      <Box
        className={classes.start}
        p={1}
        Color="primary.main"
        borderBottom={5}
      >
        <Box width="33%">
          <Typography>病人病历</Typography>
        </Box>
        <Box>
          <ListItem button className={classes.list} key={index}>
            <ListItemText primary="patienName:" />
            <ListItemText primary="allergy" />
          </ListItem>
        </Box>
      </Box>
    </Container>
  );
}
