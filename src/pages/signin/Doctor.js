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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
  formControl: {
    minWidth: 100,
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
  const [department, setDepartment] = useState('');
  const [dpID,setdpID]= useState('')
  const getInfo = async () => {
    const response = await fetch('/api/account/getinfo');
    const body = await response.json();
    console.log(response);

    if (response.ok) {
      console.log(body);
      setName(`${body.data.lastname}${body.data.firstname}`);
      setEmail(body.data.email);
      setDepartment(body.data.department)
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

  const handleSaveInfoButtonClick = async () => {
    const UpdateDeparment = async () => {
      const response = await fetch('/api/account/setdoctor', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentid:dpID
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log(`Update your department successfully:`);
        setDepartment(department);
      } else {
        console.log('invalid department!');
      }
    };
    try {
      await UpdateDeparment();
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = event => {
    const text = event.target.value;
    setIntr(text);
    console.log(`Getting new text: ${text}`);
  };
  const handleDepartmentChange = event => {
    const dp = event.target.value
    console.log(dp);
    setDepartment(dp);
    setdpID(dp)
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
        <Box display="flex" width="33.5%">
          <Typography>个人介绍:</Typography>
        </Box>
        <Box display="flex" width="33%">
          <Typography>科室选择</Typography>
        </Box>
      </Box>
      <Box
        className={classes.start}
        p={1}
        borderColor="primary.main"
        borderBottom={5}
      >
        <Box display="flex" width="33.5%">
          <TextField
            value={introduction}
            onChange={handleInputChange}
            id="introduction"
          />
        </Box>
        <Box display="flex" width="33%">
          <FormControl className={classes.formControl}>
            <Select
              value={department}
              onChange={handleDepartmentChange}
              id="DepartmentSelect"
              name="DepartmentSelect"
            >
              <MenuItem value={0}>眼科</MenuItem>
              <MenuItem value={1}>骨科</MenuItem>
              <MenuItem value={2}>呼吸内科</MenuItem>
              <MenuItem value={3}>妇产科</MenuItem>
              <MenuItem value={4}>肿瘤内科</MenuItem>
              <MenuItem value={5}>心胸外科</MenuItem>
              <MenuItem value={6}>耳鼻喉科</MenuItem>
              <MenuItem value={7}>急诊科</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" width="33%">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveInfoButtonClick}
          >
            保存
          </Button>
        </Box>
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
