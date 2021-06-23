/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { Grid, IconButton, List, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
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

let myRegs = [];

class RegList extends React.Component {
  componentDidMount() {
    fetch(`/api/registrations`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        this.setState((myRegs = data.data));
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header text="所有挂号一览" />
        <List>
          {myRegs.map(data => (
            <RegistrationItem key={data.id} data={data} />
          ))}
        </List>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justfy="center"
        >
          <IconButton color="primary" size="medium">
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default RegList;
