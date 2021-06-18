/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { List, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header';
import theme from '../../theme/theme';
import RegistrationItem from '../components/RegistrationItem';

const regs = [
  {
    id: 0,
    dep: '感染内科',
    date: '2012年10月1日',
    status: 1,
    path: '/',
  },
  {
    id: 1,
    dep: '呼吸科',
    date: '2012年10月5日',
    status: 2,
    path: '/',
  },
  {
    id: 2,
    dep: '太平间',
    date: '2012年10月1日',
    status: 3,
    path: '/',
  },
];

class RegList extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header text="所有挂号一览" />
        <List>
          {regs.map(data => (
            <RegistrationItem key={data.id} data={data} />
          ))}
        </List>
      </ThemeProvider>
    );
  }
}

export default RegList;
