import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
  buttontext: {
    margin: theme.spacing(0.5, 0, 0),
    padding: theme.spacing(0, 0.5),
  },
  titletext: {
    color: theme.palette.primary.main,
    margin: theme.spacing(1),
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
  addIcon: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
}));
let linecount = 1;
export default function Home() {
  const location = useLocation();
  const classes = useStyles();
  const [expandButton, SetExpand] = useState(false);
  const columns = [
    { field: 'name', headerName: '药品名', width: 320, editable: false },
    {
      field: 'size',
      headerName: '数量',
      width: 220,
      editable: false,
    },
    {
      field: 'qt',
      headerName: '用法',
      width: 220,
      editable: false,
    },
  ];

  const defaultRows = [];

  function CreatePrescriptionData(id, name, size, qt) {
    return { id, name, size, qt };
  }

  const [chiefComplaint, setChiefComplaint] = useState(''); //   to fill
  const [medicalHistory, setMedicalHistory] = useState(''); //   to fill
  const [diagnosis, setDiagnosis] = useState(''); // to fill
  const [opinions, setOpinions] = useState(''); //   to fill
  const [patientName, setPatientName] = useState('张三');
  const [patientGender, setPatientGender] = useState('女');
  const [patientAge, setPatientAge] = useState(18);
  const [allergicHistory, setAllergicHistory] = useState('无');

  const CaseID = location.state.Case_id;
  const tmpPatientID = location.state.Patient_id;
  const tmpDoctorID = location.state.Doctor_id;
  console.log(CaseID);
  console.log(tmpPatientID);
  console.log(tmpDoctorID);
  const tmpDepartment = location.state.Department;

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState(defaultRows);

  useEffect(async () => {
    const tmpresponse = await fetch(
      `/api/patient/${tmpPatientID}/cases/${CaseID}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(tmpresponse);
    const tmpmessage = await tmpresponse.json();
    setPatientName(tmpmessage.data.PatientName);
    setPatientGender(tmpmessage.data.Gender);
    setDiagnosis(tmpmessage.data.Diagnosis);
    setMedicalHistory(tmpmessage.data.History);
    setChiefComplaint(tmpmessage.data.Complaint);
    setOpinions(tmpmessage.data.Treatment);
    setPatientAge(tmpmessage.data.Age);
  }, []);

  const guidelines = [];
  for (let i = 0; i < guidelines.length; i += 1) {
    const newrow = rows.concat([
      CreatePrescriptionData(
        linecount,
        guidelines[i].Medicine.Name,
        guidelines[i].Quantity,
        guidelines[i].Dosage,
      ),
    ]);
    linecount += 1;
    setRows(newrow);
    console.log(rows);
  }

  // const handlePrescriptionssInput = event => {
  //     const text = event.target.value;
  //     setOpinions(text);
  //     };

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
            {tmpDepartment}
          </Typography>
        </Container>
        <Container className={classes.pageContainer}>
          <Grid container direction="row" justify="right">
            <Typography component="h2" className={classes.titletext}>
              就诊病历
            </Typography>
          </Grid>
          <Box className={classes.borderedContainer}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者姓名"
                  defaultValue="Hello World"
                  value={patientName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者性别"
                  defaultValue="Hello World"
                  value={patientGender}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="患者年龄"
                  defaultValue="Hello World"
                  value={patientAge}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-required"
                  label="过敏史"
                  value={allergicHistory}
                  defaultValue="无"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-multiline-static"
                  label="主诉"
                  multiline
                  fullWidth
                  rows={5}
                  value={chiefComplaint}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-multiline-static"
                  label="既往病史"
                  multiline
                  fullWidth
                  rows={5}
                  value={medicalHistory}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-multiline-static"
                  label="诊断"
                  multiline
                  fullWidth
                  rows={5}
                  value={diagnosis}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-multiline-static"
                  label="处理意见"
                  multiline
                  fullWidth
                  rows={5}
                  value={opinions}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Container className={classes.pageContainer}>
          <Box className={classes.borderedContainer}>
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </Box>
        </Container>
      </Grid>
    </Container>
  );
}
