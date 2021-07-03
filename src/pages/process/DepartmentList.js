/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { List, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Header from '../components/Header';
import theme from '../../theme/theme';
import DepartmentItem from '../components/DepartmentItem';

let myDeps = [];

class DepartmentList extends React.Component {
  componentDidMount() {
    fetch(`/api/departments`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState((myDeps = data.data));
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header text="科室一览" />
        <List>
          {myDeps.map(data => (
            <DepartmentItem key={data.id} data={data} />
          ))}
        </List>
      </ThemeProvider>
    );
  }
}

export default DepartmentList;
