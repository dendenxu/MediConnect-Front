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
import { useLocation, useHistory, useParams } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
  alert: {
    width: '100%',
  },
  headerContainer: {
    margin: theme.spacing(1),
    padding: theme.spacing(2, 3),
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  headertext: {
    display: 'flex',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  pageContainer: {
    margin: theme.spacing(1, 0),
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
    borderRadius: 30,
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
  button: {
    borderRadius: 10,
    padding: theme.spacing(0.5, 1),
  },
}));

let linecount = 1;
let tempprescription = [];
let temprows = [];
let initial = -2;

export default function Home() {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [expandButton, SetExpand] = useState(false);
  const columns = [
    { field: 'name', headerName: '药品名', width: 200, editable: true },
    {
      field: 'size',
      headerName: '数量',
      width: 140,
      editable: true,
    },
    {
      field: 'qt',
      headerName: '用法',
      width: 140,
      editable: true,
    },
    {
      field: 'price',
      headerName: '价格',
      width: 130,
      editable: false,
    },
    {
      field: 'contraindication',
      headerName: '禁忌症',
      width: 140,
      editable: false,
    },
  ];

  const defaultRows = [];

  function CreatePrescriptionData(id, name, size, qt, price, contraindication) {
    return { id, name, size, qt, price, contraindication };
  }

  const [chiefComplaint, setChiefComplaint] = useState(''); //   to fill
  const [medicalHistory, setMedicalHistory] = useState(''); //   to fill
  const [diagnosis, setDiagnosis] = useState(''); // to fill
  const [opinions, setOpinions] = useState(''); //   to fill
  const [patientName, setPatientName] = useState('张三');
  const [patientGender, setPatientGender] = useState('女');
  const [patientAge, setPatientAge] = useState(18);
  const [allergicHistory, setAllergicHistory] = useState('无');

  const CaseID = params.caseID;
  const tmpPatientID = params.patientID;
  let tmpDoctorID = 0;
  console.log(CaseID);
  console.log(tmpPatientID);
  console.log(tmpDoctorID);
  let tmpDepartment = '';

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState(defaultRows);

  useEffect(async () => {
    if (initial <= 0) {
      console.log(initial);
      initial += 1;
      let tmpresponse = await fetch(
        `/api/patient/${tmpPatientID}/cases/${CaseID}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(tmpresponse);
      let tmpmessage = await tmpresponse.json();
      console.log(tmpmessage);
      tmpDoctorID = tmpmessage.data.DoctorID;
      tmpDepartment = tmpmessage.data.Department;
      // setPatientName(tmpmessage.data.PatientName);
      // setPatientGender(tmpmessage.data.Gender);
      setDiagnosis(tmpmessage.data.Diagnosis);
      setMedicalHistory(tmpmessage.data.History);
      setChiefComplaint(tmpmessage.data.Complaint);
      setOpinions(tmpmessage.data.Treatment);
      console.log(tmpmessage.data.Prescriptions);
      console.log(tmpmessage.data.Prescriptions.length);
      if (tmpmessage.data.Prescriptions.length === 0) {
        setRows(defaultRows);
      } else {
        SetExpand(true);
        const tmpPres = tmpmessage.data.Prescriptions[0];
        const tmpGL = tmpPres.Guidelines;
        for (let i = 0; i < tmpGL.length; i += 1) {
          temprows = temprows.concat([
            CreatePrescriptionData(
              i + 1,
              tmpGL[i].Medicine.Name,
              tmpGL[i].Quantity,
              tmpGL[i].Dosage,
              tmpGL[i].Medicine.Price,
              tmpGL[i].Medicine.Contraindication,
            ),
          ]);
        }
        console.log(temprows);
        setRows(temprows);
        tempprescription = [];
        temprows = [];
        linecount = tmpGL.length + 1;
      }
      tmpresponse = await fetch(`api/account/getinfobypatid/${tmpPatientID}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      tmpmessage = await tmpresponse.json();
      const actualAge =
        Number(tmpmessage.data.Birthday.substr(0, 4)) -
        Number(Date().getFullYear());
      setPatientAge(actualAge);
      setPatientGender(tmpmessage.data.Gender);
      setPatientName(tmpmessage.data.LastName + tmpmessage.data.FirstName);
      setAllergicHistory(tmpmessage.data.Allergy);
    } else {
      initial = -2;
    }
    console.log(rows);
  }, [initial]);

  const HandleGoback = async () => {
    history.push({
      pathname: '/browse_p',
    });
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      <Grid container>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.headerContainer}
        >
          <Button variant="outlined" color="primary" onClick={HandleGoback}>
            <ArrowBackIosIcon color="primary" size="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">返回</Typography>
            </Container>
          </Button>
          <Typography component="h5" className={classes.headertext}>
            日间门诊
          </Typography>
          <Typography component="h5" alignCenter className={classes.headertext}>
            {new Date().getFullYear()}/{new Date().getMonth() + 1}/
            {new Date().getDate()}
          </Typography>
          <Typography component="h5" className={classes.headertext}>
            {tmpDepartment}
          </Typography>
        </Grid>
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
        <Container spacing={1}>
          <Button color="primary" variant="outlined" disabled>
            <ContactsIcon Icon color="primary" size="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">处方</Typography>
            </Container>
          </Button>
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
