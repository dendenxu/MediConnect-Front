/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import {
  Box,
  Grid,
  List,
  Typography,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import theme from '../../theme/theme';
import Header from './components/Header';
import DepartmentItem from './components/DepartmentItem';

const HyperTypography = withStyles({
  root: {
    color: 'primary',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '1.5vh',
  },
})(Typography);

const deps = [
  {
    id: 1,
    dep: '感染内科',
    intro: '感染内科主治各种由于病毒引起的疾病',
    path: '/',
  },
  {
    id: 2,
    dep: '呼吸科',
    intro: '科室共有13位专家医师，为您提供专业的诊疗',
    path: '/',
  },
  {
    id: 3,
    dep: '太平间',
    intro:
      '共有4位专业抬棺黑人，遗体整容、异域风情葬礼、高科技火化一条龙服务。',
    path: '/',
  },
  {
    id: 4,
    dep: '太平间',
    intro:
      '共有4位专业抬棺黑人，遗体整容、异域风情葬礼、高科技火化一条龙服务。',
    path: '/',
  },
  {
    id: 5,
    dep: '太平间',
    intro:
      '共有4位专业抬棺黑人，遗体整容、异域风情葬礼、高科技火化一条龙服务。',
    path: '/',
  },
  {
    id: 6,
    dep: '太平间',
    intro:
      '共有4位专业抬棺黑人，遗体整容、异域风情葬礼、高科技火化一条龙服务。',
    path: '/',
  },
];

class GuideResult extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header text="推荐您就诊于" />
        <List>
          {deps.map(data => (
            <DepartmentItem key={data.id} data={data} />
          ))}
        </List>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justfy="center"
        >
          <HyperTypography>
            <Link>查看所有科室</Link>
          </HyperTypography>
        </Grid>
      </ThemeProvider>

      // <ThemeProvider theme={theme}>
      //   <Box display="flex" flexDirection="column">
      //     <Box
      //       display="flex"
      //       height={window.innerHeight / 10}
      //       width={window.innerWidth}
      //       bgcolor="primary.main"
      //     >
      //       <Box
      //         display="flex"
      //         fontSize={window.innerHeight / 30}
      //         fontWeight="bold"
      //         color="success.main"
      //         marginY="auto"
      //         marginX="3vh"
      //       >
      //         推荐您就诊于
      //       </Box>
      //     </Box>
      //     <List>
      //       {this.props.location.state.deps.map(data => (
      //         <DepItem key={data.id} data={data} />
      //       ))}
      //     </List>
      //     <Box marginX="auto" marginTop="3vh">
      //       <Link to="/Deps">查看所有科室</Link>
      //     </Box>
      //   </Box>
      // </ThemeProvider>
    );
  }
}

export default GuideResult;
