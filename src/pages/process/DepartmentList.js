/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { List, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header';
import theme from '../../theme/theme';
import DepartmentItem from '../components/DepartmentItem';

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

class DepartmentList extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header text="科室一览" />
        <List>
          {deps.map(data => (
            <DepartmentItem key={data.id} data={data} />
          ))}
        </List>
      </ThemeProvider>
    );
  }
}

export default DepartmentList;
