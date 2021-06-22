import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
// import { Radio } from '@material-ui/core';
// import { render } from '@testing-library/react';
// import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '600px',
  },
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
}));

export default function Doctor() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputContent, setInputContent] = useState('');
  const handleTextOpen = () => {
    const newVal = !open;
    setOpen(newVal);
  };
  const handleInputChange = event => {
    const text = event.target.value;
    setInputContent(text);
  };
  return (
    <Container component="main" className={classes.page}>
      <Box className={classes.style} p={2} bgcolor="#87CEFA">
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
      <Box borderBottom={5} width="100%" p={2} color="primary.main">
        <Typography>基本信息</Typography>
      </Box>
      <Box className={classes.style} p={2}>
        <Box width="33%">姓名</Box>
        <Box width="33%">邮箱</Box>
        <Box width="33%">
          <Link href="/">修改密码</Link>
        </Box>
      </Box>
      <Box borderBottom={5} width="100%" p={2}>
        <Box color="primary.main">
          <Typography>个人介绍</Typography>
        </Box>
        <Box>
          <TextField value={inputContent} onChange={handleInputChange} />
        </Box>
      </Box>
      <Box borderBottom={5} width="100%" p={2} color="primary.main">
        <Typography>病人病例</Typography>
      </Box>
    </Container>
  );
}
