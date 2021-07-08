/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */

import {
  Box,
  Button,
  Divider,
  ThemeProvider,
  createMuiTheme,
  Link,
} from '@material-ui/core';
import React from 'react';

import { useHistory } from 'react-router-dom';
import { ReactComponent as FailIcon } from '../../assets/images/fail.svg';
import { ReactComponent as SuccessIcon } from '../../assets/images/success.svg';
import Header from '../components/Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4e89ae',
    },
    secondary: {
      main: '#43658b',
    },
    error: {
      main: '#ed6663',
    },
    warning: {
      main: '#ffa372',
    },
    info: {
      main: '#878DA4',
    },
    // for text
    text_primary: {
      main: '#0f1c49',
    },
    text_plain: {
      main: '#878DA4',
    },
    success: {
      main: '#ffffff',
    },
  },
});

export default function RegResult(props) {
  const history = useHistory();

  if (props.location.state !== undefined) {
    if (props.location.state.data.dep !== undefined) {
      return (
        <ThemeProvider theme={theme}>
          <Header text="挂号结果" />

          <Box
            display="flex"
            flexDirection="column"
            height={window.innerHeight}
            bgcolor="primary"
          >
            <Box marginX="auto" marginTop="3vh" marginBottom="1vh">
              <SuccessIcon
                width={Math.min(window.innerWidth, window.innerHeight) / 3}
              />
            </Box>
            <Box
              marginX="auto"
              fontWeight="bold"
              fontSize={window.innerHeight / 30}
              color="secondary.main"
            >
              挂号成功
            </Box>
            <Box marginX="3vh" marginY="4vh">
              <Box display="flex" flexDirection="row">
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="secondary.main"
                  width={window.innerWidth / 4}
                  height={window.innerHeight / 20}
                >
                  科室：
                </Box>
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="info.main"
                >
                  {props.location.state.data.dep}
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="secondary.main"
                  width={window.innerWidth / 4}
                  height={window.innerHeight / 20}
                >
                  医生：
                </Box>
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="info.main"
                >
                  {props.location.state.data.doc}
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="secondary.main"
                  width={window.innerWidth / 4}
                  height={window.innerHeight / 20}
                >
                  患者：
                </Box>
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="info.main"
                >
                  {props.location.state.data.name}
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="secondary.main"
                  width={window.innerWidth / 4}
                  height={window.innerHeight / 20}
                >
                  时间段：
                </Box>
                <Box
                  fontWeight="bold"
                  fontSize={window.innerHeight / 40}
                  color="info.main"
                >
                  {props.location.state.data.year}年
                  {props.location.state.data.mon}月
                  {props.location.state.data.day}日
                  {props.location.state.data.tim === 'morning'
                    ? '上午'
                    : '下午'}
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column-reverse"
              height={window.innerHeight / 3}
            >
              <Box
                marginX="auto"
                marginY="1.5vh"
                marginBottom="3vh"
                width={window.innerWidth / 2.5}
                height={window.innerHeight / 25}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  height={window.innerHeight / 25}
                >
                  <Link to="/search">确认</Link>
                </Button>
              </Box>
              <Box
                fontWeight="bold"
                fontSize={window.innerHeight / 45}
                color="info.main"
                marginX="auto"
                marginBottom="1vh"
                marginTop="1vh"
              >
                温馨提醒：请确保当天能够收到消息，防止过号哦~
              </Box>
              <Divider />
            </Box>
          </Box>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          height={window.innerHeight}
          bgcolor="primary"
        >
          <Header text="挂号结果" />

          <Box marginX="auto" marginTop="3vh" marginBottom="1vh">
            <FailIcon
              width={Math.min(window.innerWidth, window.innerHeight) / 3}
            />
          </Box>
          <Box
            marginX="auto"
            marginBottom="2vh"
            fontWeight="bold"
            fontSize={window.innerHeight / 30}
            color="secondary.main"
          >
            挂号失败
          </Box>
          <Divider />
          <Box marginX="3vh" marginY="2vh">
            <Box display="flex" flexDirection="row">
              <Box
                fontWeight="bold"
                fontSize={window.innerHeight / 40}
                color="secondary.main"
                width={window.innerWidth / 4}
                height={window.innerHeight / 20}
              >
                原因
              </Box>
            </Box>
            <Box
              fontWeight="bold"
              fontSize={window.innerHeight / 40}
              color="info.main"
            >
              {props.location.state.data.reason}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column-reverse"
            height={window.innerHeight / 2}
          >
            <Box
              marginX="auto"
              marginY="1.5vh"
              marginBottom="3vh"
              width={window.innerWidth / 2.5}
              height={window.innerHeight / 25}
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  history.push('/search');
                }}
                height={window.innerHeight / 25}
              >
                确认
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  return <div>invalid access!</div>;
}
