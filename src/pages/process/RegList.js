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
          <Link to="/departments">
            <IconButton color="primary" size="medium" to="/departments">
              <AddCircleOutlinedIcon fontSize="large" />
            </IconButton>
          </Link>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default RegList;
