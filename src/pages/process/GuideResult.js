/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { Grid, List, Typography, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import { useLocation } from 'react-router';
import theme from '../../theme/theme';
import Header from '../components/Header';
import DepartmentItem from '../components/DepartmentItem';

const HyperTypography = withStyles({
  root: {
    color: 'primary',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '1.5vh',
  },
})(Typography);

export default function GuideResult(props) {
  const location = useLocation();
  const [dept, setDept] = useState([]);

  useEffect(async () => {
    await fetch(`/api/search/${location.state}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setDept(data.data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header text="推荐您就诊于" />
      {dept ? (
        <>
          <List>
            {dept.map(data => (
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
              <Link to="/departments">查看所有科室</Link>
            </HyperTypography>
          </Grid>
        </>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justfy="center"
        >
          <HyperTypography>
            <Link to="/departments">没有查到结果。查看所有科室？</Link>
          </HyperTypography>
        </Grid>
      )}
    </ThemeProvider>
  );
}
