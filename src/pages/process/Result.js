import {
  Box,
  Button,
  createMuiTheme,
  Divider,
  ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { ReactComponent as SuccessIcon } from '../../assets/images/Success.svg';
import { ReactComponent as FailIcon } from '../../assets/images/Fail.svg';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#09a4d8',
      main: '#09a4d8',
      dark: '#09a4d8',
      contrastText: '#09a4d8',
    },
    secondary: {
      main: '#0f1c49',
    },
    info: {
      main: '#707893',
    },
    success: {
      main: '#ffffff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class Success extends React.Component {
  componentDidMount() {
    console.log(this.props.location);
  }

  render() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.data1.dep !== undefined)
        return (
          <ThemeProvider theme={theme}>
            <Box
              display="flex"
              flexDirection="column"
              height={window.innerHeight}
              bgcolor="primary"
            >
              <Box
                display="flex"
                height={window.innerHeight / 10}
                width={window.innerWidth}
                bgcolor="#09a4d8"
              >
                <Box
                  display="flex"
                  fontSize={window.innerHeight / 30}
                  fontWeight="bold"
                  color="success.main"
                  marginY="auto"
                  marginX="3vh"
                >
                  挂号结果
                </Box>
              </Box>
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
                    {this.props.location.state.data1.dep}
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
                    {this.props.location.state.data1.doc}
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
                    {this.props.location.state.data1.name}
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
                    {this.props.location.state.data1.year}年
                    {this.props.location.state.data1.mon}月
                    {this.props.location.state.data1.day}日
                    {this.props.location.state.data1.tim === 0
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
                    fullWidth={true}
                    height={window.innerHeight / 25}
                  >
                    确认
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
      else
        return (
          <ThemeProvider theme={theme}>
            <Box
              display="flex"
              flexDirection="column"
              height={window.innerHeight}
              bgcolor="primary"
            >
              <Box
                display="flex"
                height={window.innerHeight / 10}
                width={window.innerWidth}
                bgcolor="#09a4d8"
              >
                <Box
                  display="flex"
                  fontSize={window.innerHeight / 30}
                  fontWeight="bold"
                  color="success.main"
                  marginY="auto"
                  marginX="3vh"
                >
                  挂号结果
                </Box>
              </Box>
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
                  {this.props.location.state.data1.reason}
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
                    fullWidth={true}
                    height={window.innerHeight / 25}
                  >
                    确认
                  </Button>
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        );
    } else return <div>invalid access!</div>;
  }
}

export default Success;
