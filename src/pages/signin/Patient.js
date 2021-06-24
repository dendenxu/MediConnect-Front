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

export default function Patient() {
  const classes = useStyles();
  const history = useHistory();
  const [name,setName]= useState('default value');
  const [email, setEmail] = useState('default value');
  const [taboo, setTaboo] = useState('default value');
  const [allergies, setAllergies] = useState('default value');
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
    // （待完成）跳过验证界面直接进入修改密码的界面
    history.push({
      pathname: '/editpass',
    });
  };
  const handleSaveInfoButtonClick = event => {
    // （待完成）保存禁忌史和过敏史的数据
    const text1 = event.taboo.value;
    setTaboo(text1);
    const text2 = event.allergies.value;
    setAllergies(text2);
  };
  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);
    console.log(`Getting new text: ${text}`);
  };

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
      <Box className={classes.center} p={1}>
        <Box display='flex' width='33%'>
          <Typography>禁忌史：</Typography>
          <TextField defaultValue={taboo} onChange={handleInputChange}/>
        </Box>
        <Box display='flex' width='33%'>
          <Typography>过敏史：</Typography>
          <TextField defaultValue={allergies} onChange={handleInputChange} id='taboo'/>
        </Box>
        <Box display='flex' width='33%'>
          <Button variant="contained" color="primary" onClick={handleSaveInfoButtonClick} id='allergies'>保存</Button>
        </Box>
      </Box>
    </Container>
  )
}