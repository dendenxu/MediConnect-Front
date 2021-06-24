import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    flexDirection:'column',
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
}));

export default function Doctor() {
  const classes = useStyles();
  const history = useHistory();
  const [name,setName]= useState('default value');
  const [email, setEmail] = useState('default value');
  const [introduction, setIntr] = useState('default value');
  const [inputContent, setInputContent] = useState('');
  const getInfo = async() => {
    const response = await fetch('/api/account/getinfo', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    console.log(response);
    if (response.ok) {
      const body = await response.json();
      console.log(body);
      setName(body.firstName + body.lastName);
      setEmail(body.email);
    }
  }
  const handleEditPWDButtonClick = event => {
    history.push({
      pathname: '/editpass',
      state: {
        afterEmailCheck: 'true',
      }
    });
  };
  const handleSaveInfoButtonClick = event => {
    // （待完成）保存医生个人介绍到数据库
    const text = event.target.value;
    setIntr(text);
  };
  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);
    console.log(`Getting new text: ${text}`);
  };

  // （待完成）调取病人的病例并显示
  return (
    <Container component="main" className={classes.page}>
      <CssBaseline />
      <Box className={classes.start} bgcolor="#87CEFA" p={1}>
        <Box><Icon /></Box>
        <Box><PersonOutlineIcon /></Box>
        <Box><Typography>个人资料</Typography></Box>
      </Box>
      <Box className={classes.start}p={1} color="primary.main" borderBottom={5}>
        <Typography>基本信息</Typography>
      </Box>
      <Box className={classes.center} p={1} borderBottom={5} borderColor="primary.main">
        <Box display='flex' width='33%'>
          <Typography>姓名：{name}</Typography>
        </Box>
        <Box display='flex' width='33%'>
          <Typography>邮箱：{email}</Typography>
        </Box>
        <Box display='flex' width='33%'>
        <Button variant="contained" color="primary" onClick={handleEditPWDButtonClick}>修改密码</Button>
        </Box>
      </Box>
      <Box className={classes.start} p={1}>
        <Box><Typography>个人介绍:</Typography></Box>
      </Box>
      <Box className={classes.start} p={1} borderColor="primary.main" borderBottom={5}>
          <TextField value={introduction} onChange={handleInputChange} id="introduction"/>
      </Box>
      <Box className={classes.start} p={1} Color="primary.main" borderBottom={5}>
        <Box><Typography>病人病历</Typography></Box>
      </Box>
    </Container>
  )
}