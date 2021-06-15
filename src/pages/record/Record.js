import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100 vh',
    maxWidth: '1000px',
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerContainer: {
    margin: theme.spacing(3),
    height: '60 px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headertext: {
    display: 'flex',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  pageContainer: {
    marginTop: theme.spacing(1),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titletext: {
    color: theme.palette.primary.main,
    height: '22px',
    margin: theme.spacing(0, 1, 1),
  },
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    borderRadius: 0,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    width: '90%',
    margin: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  save: {
    margin: theme.spacing(3, 4, 6),
    display: 'flex',
    flexDirection: 'row-reverse',
  },

  expandButton: {
    margin: theme.spacing(0, 1, 1),
  },
}));

export default function Record() {
  const classes = useStyles();
  const [expandButton, SetExpand] = useState(false);
  const department = '骨科';
  const columns = [
    { field: 'name', headerName: '药品名', width: 180, editable: true },
    { field: 'size', headerName: '规格', width: 130, editable: true },
    {
      field: 'qt',
      headerName: '剂量',
      width: 130,
      editable: true,
    },
    {
      field: 'course',
      headerName: '疗程',
      width: 130,
      editable: true,
    },
    {
      field: 'type',
      headerName: '类别',
      width: 130,
      editable: true,
    },
    {
      field: 'price',
      headerName: '价格',
      width: 130,
      editable: true,
    },
  ];
  // todo
  const rows = [
    {
      id: 1,
      name: '硫酸软骨素',
      size: '2ml:40g',
      qt: 'bid',
      course: '14d',
      type: '三类',
      price: '12',
    },
    {
      id: 2,
      name: '硫酸软骨素2',
      size: '2ml:40g',
      qt: 'bid',
      course: '14d',
      type: '三类',
      price: '12',
    },
  ];
  // todo
  function HandleOnSave() {}
  return (
    <Container component="main" className={classes.verticalContainer}>
      <CssBaseline />
      <Grid container direction="column" justify="center" alignItems="center">
        <Container className={classes.headerContainer}>
          <Typography component="h5" className={classes.headertext}>
            日间门诊
          </Typography>
          <Typography component="h5" alignCenter className={classes.headertext}>
            {new Date().getFullYear()}/{new Date().getMonth()}/
            {new Date().getDate()}
          </Typography>
          <Typography component="h5" className={classes.headertext}>
            {department}
          </Typography>
        </Container>
        <Container className={classes.pageContainer}>
          <Grid container direction="row" justify="right">
            <Typography component="h3" className={classes.titletext}>
              就诊病历
            </Typography>
          </Grid>
          <Box className={classes.borderedContainer}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者姓名"
                  defaultValue="翠花"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者性别"
                  defaultValue="女"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者年龄"
                  defaultValue="19"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  id="standard-required"
                  label="过敏史"
                  defaultValue="无"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="主诉"
                  multiline
                  fullWidth
                  rows={5}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="既往病史"
                  multiline
                  fullWidth
                  rows={5}
                  defaultValue=""
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="诊断"
                  multiline
                  fullWidth
                  rows={5}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="处理意见"
                  multiline
                  fullWidth
                  rows={5}
                  defaultValue=""
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container spacing={1} expandButton>
          {expandButton ? (
            <Button
              color="primary"
              size="large"
              onClick={() => {
                SetExpand(false);
              }}
            >
              X 处方
            </Button>
          ) : (
            <Button
              color="primary"
              size="large"
              onClick={() => {
                SetExpand(true);
              }}
            >
              + 处方
            </Button>
          )}
        </Container>
        {expandButton ? (
          <Container className={classes.pageContainer}>
            <Box className={classes.borderedContainer}>
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </Box>
          </Container>
        ) : (
          <Divider />
        )}
        <Container className={classes.save}>
          <Button color="primary" size="large" onClick={HandleOnSave()}>
            {' '}
            SAVE{' '}
          </Button>
        </Container>
      </Grid>
    </Container>
  );
}
