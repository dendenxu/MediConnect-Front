/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */

import { Box, Button, Grid, createMuiTheme, Divider } from '@material-ui/core';
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ReactComponent as SuccessIcon } from '../../assets/images/success.svg';

import { ReactComponent as FailIcon } from '../../assets/images/fail.svg';
import Header from '../components/Header';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#469CDF',
//       main: '#469CDF',
//       dark: '#469CDF',
//       contrastText: '#469CDF',
//     },
//     secondary: {
//       main: '#0f1c49',
//     },
//     info: {
//       main: '#878DA4',
//     },
//     success: {
//       main: '#ffffff',
//     },
//     contrastThreshold: 3,
//     tonalOffset: 0.2,
//   },
// });

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('科室', 'Deep Dark Fantasy'),
  createData('医生', 'XN'),
  createData('患者', 'PZY'),
  createData('时间段', 'Forever'),
];
//

class Success extends React.Component {
  componentDidMount() {
    console.log(this.props.location);
  }

  render() {
    return (
      <div>
        <Header text="挂号结果" />

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justfy="center"
        >
          <Box marginTop="2vh" marginBottom="2vh" />
          <SuccessIcon
            width={Math.max(window.innerWidth, window.innerHeight) / 8}
          />
          <Box
            fontWeight="bold"
            padding="3%"
            fontSize={Math.min(window.innerWidth / 10, 48)}
            color="secondary.main"
          >
            挂号成功
          </Box>

          <Box>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell
                      style={{
                        borderBottom: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      style={{ borderBottom: 'none', fontSize: '18px' }}
                      align="right"
                    >
                      {row.calories}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Box marginTop="3vh" marginBottom="3vh" marginX="3vh">
            <Divider style={{ width: '100%' }} variant="fullWidth" />
            <Box color="info.main" marginX="auto" marginTop="1vh">
              温馨提醒：请确保当天能收到消息，防止过号哦~
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            style={{ fontSize: '18px' }}
            size="large"
          >
            确认
          </Button>
        </Grid>
      </div>
    );

    // if (this.props.location.state !== undefined) {
    //   if (this.props.location.state.data1.dep !== undefined) {
    //     return (
    //       <ThemeProvider theme={theme}>
    //         <Box
    //           display="flex"
    //           flexDirection="column"
    //           height={window.innerHeight}
    //           bgcolor="primary"
    //         >
    //           <Box
    //             display="flex"
    //             height={window.innerHeight / 10}
    //             width={window.innerWidth}
    //             bgcolor="#469CDF"
    //           >
    //             <Box
    //               display="flex"
    //               fontSize={window.innerHeight / 30}
    //               fontWeight="bold"
    //               color="success.main"
    //               marginY="auto"
    //               marginX="3vh"
    //             >
    //               挂号结果
    //             </Box>
    //           </Box>
    //           <Box marginX="auto" marginTop="3vh" marginBottom="1vh">
    //             <SuccessIcon
    //               width={Math.min(window.innerWidth, window.innerHeight) / 3}
    //             />
    //           </Box>
    //           <Box
    //             marginX="auto"
    //             fontWeight="bold"
    //             fontSize={window.innerHeight / 30}
    //             color="secondary.main"
    //           >
    //             挂号成功
    //           </Box>
    //           <Box marginX="3vh" marginY="4vh">
    //             <Box display="flex" flexDirection="row">
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="secondary.main"
    //                 width={window.innerWidth / 4}
    //                 height={window.innerHeight / 20}
    //               >
    //                 科室：
    //               </Box>
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="info.main"
    //               >
    //                 {this.props.location.state.data1.dep}
    //               </Box>
    //             </Box>
    //             <Box display="flex" flexDirection="row">
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="secondary.main"
    //                 width={window.innerWidth / 4}
    //                 height={window.innerHeight / 20}
    //               >
    //                 医生：
    //               </Box>
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="info.main"
    //               >
    //                 {this.props.location.state.data1.doc}
    //               </Box>
    //             </Box>
    //             <Box display="flex" flexDirection="row">
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="secondary.main"
    //                 width={window.innerWidth / 4}
    //                 height={window.innerHeight / 20}
    //               >
    //                 患者：
    //               </Box>
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="info.main"
    //               >
    //                 {this.props.location.state.data1.name}
    //               </Box>
    //             </Box>
    //             <Box display="flex" flexDirection="row">
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="secondary.main"
    //                 width={window.innerWidth / 4}
    //                 height={window.innerHeight / 20}
    //               >
    //                 时间段：
    //               </Box>
    //               <Box
    //                 fontWeight="bold"
    //                 fontSize={window.innerHeight / 40}
    //                 color="info.main"
    //               >
    //                 {this.props.location.state.data1.year}年
    //                 {this.props.location.state.data1.mon}月
    //                 {this.props.location.state.data1.day}日
    //                 {this.props.location.state.data1.tim === 0
    //                   ? '上午'
    //                   : '下午'}
    //               </Box>
    //             </Box>
    //           </Box>
    //           <Box
    //             display="flex"
    //             flexDirection="column-reverse"
    //             height={window.innerHeight / 3}
    //           >
    //             <Box
    //               marginX="auto"
    //               marginY="1.5vh"
    //               marginBottom="3vh"
    //               width={window.innerWidth / 2.5}
    //               height={window.innerHeight / 25}
    //             >
    //               <Button
    //                 variant="outlined"
    //                 color="primary"
    //                 fullWidth
    //                 height={window.innerHeight / 25}
    //               >
    //                 确认
    //               </Button>
    //             </Box>
    //             <Box
    //               fontWeight="bold"
    //               fontSize={window.innerHeight / 45}
    //               color="info.main"
    //               marginX="auto"
    //               marginBottom="1vh"
    //               marginTop="1vh"
    //             >
    //               温馨提醒：请确保当天能够收到消息，防止过号哦~
    //             </Box>
    //             <Divider />
    //           </Box>
    //         </Box>
    //       </ThemeProvider>
    //     );
    //   }
    //   return (
    //     <ThemeProvider theme={theme}>
    //       <Box
    //         display="flex"
    //         flexDirection="column"
    //         height={window.innerHeight}
    //         bgcolor="primary"
    //       >
    //         <Box
    //           display="flex"
    //           height={window.innerHeight / 10}
    //           width={window.innerWidth}
    //           bgcolor="#09a4d8"
    //         >
    //           <Box
    //             display="flex"
    //             fontSize={window.innerHeight / 30}
    //             fontWeight="bold"
    //             color="success.main"
    //             marginY="auto"
    //             marginX="3vh"
    //           >
    //             挂号结果
    //           </Box>
    //         </Box>
    //         <Box marginX="auto" marginTop="3vh" marginBottom="1vh">
    //           <FailIcon
    //             width={Math.min(window.innerWidth, window.innerHeight) / 3}
    //           />
    //         </Box>
    //         <Box
    //           marginX="auto"
    //           marginBottom="2vh"
    //           fontWeight="bold"
    //           fontSize={window.innerHeight / 30}
    //           color="secondary.main"
    //         >
    //           挂号失败
    //         </Box>
    //         <Divider />
    //         <Box marginX="3vh" marginY="2vh">
    //           <Box display="flex" flexDirection="row">
    //             <Box
    //               fontWeight="bold"
    //               fontSize={window.innerHeight / 40}
    //               color="secondary.main"
    //               width={window.innerWidth / 4}
    //               height={window.innerHeight / 20}
    //             >
    //               原因
    //             </Box>
    //           </Box>
    //           <Box
    //             fontWeight="bold"
    //             fontSize={window.innerHeight / 40}
    //             color="info.main"
    //           >
    //             {this.props.location.state.data1.reason}
    //           </Box>
    //         </Box>
    //         <Box
    //           display="flex"
    //           flexDirection="column-reverse"
    //           height={window.innerHeight / 2}
    //         >
    //           <Box
    //             marginX="auto"
    //             marginY="1.5vh"
    //             marginBottom="3vh"
    //             width={window.innerWidth / 2.5}
    //             height={window.innerHeight / 25}
    //           >
    //             <Button
    //               variant="outlined"
    //               color="primary"
    //               fullWidth
    //               height={window.innerHeight / 25}
    //             >
    //               确认
    //             </Button>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </ThemeProvider>
    //   );
    // }
    // return <div>invalid access!</div>;
  }
}

export default Success;
