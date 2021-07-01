/* eslint-disable camelcase */
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
import { useLocation, useHistory } from 'react-router-dom';
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

let initial = -2;

export default function Home(props) {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const [chiefComplaint, setChiefComplaint] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [tmpdiagnosis, setDiagnosis] = useState('');
  const [opinions, setOpinions] = useState('');
  // todo initialize these 4 IDs(maybe using get method),
  // const tmpCaseID = location.state.Case_id;
  const {
    Patient_id: tmpPatientID,
    Doctor_id: tmpDoctorID,
    Patient_gender: patientGender,
    Patient_age: patientAge,
    Patient_name: patientName,
    Department: tmpDepartment,
  } = props.creation;

  const { setCreation, setRecord } = props;
  const [helperText1, setHelper1] = useState('');
  const [helperText2, setHelper2] = useState('');
  const [helperText3, setHelper3] = useState('');
  const [helperText4, setHelper4] = useState('');
  const [InputError1, setInputError1] = useState(true);
  const [InputError2, setInputError2] = useState(true);
  const [InputError3, setInputError3] = useState(true);
  const [InputError4, setInputError4] = useState(true);

  useEffect(async () => {
    if (initial <= 0) {
      initial += 1;
      setDiagnosis('');
      setMedicalHistory('');
      setChiefComplaint('');
      setOpinions('');
    } else {
      initial = -2;
    }
  }, [initial]);

  const handleComplaintInput = event => {
    const text = event.target.value;
    if (text === '') {
      setHelper1('不能为空值');
      setInputError1(true);
    } else {
      setHelper1('');
      setInputError1(false);
    }
    setChiefComplaint(text);
  };

  const handleMedicalHistoryInput = event => {
    const text = event.target.value;
    if (text === '') {
      setHelper2('不能为空值');
      setInputError2(true);
    } else {
      setHelper2('');
      setInputError2(false);
    }
    setMedicalHistory(text);
  };

  const handleDiagnosisInput = event => {
    const text = event.target.value;
    if (text === '') {
      setHelper3('不能为空值');
      setInputError3(true);
    } else {
      setHelper3('');
      setInputError3(false);
    }
    setDiagnosis(text);
  };

  const handleOpinionsInput = event => {
    const text = event.target.value;
    if (text === '') {
      setHelper4('不能为空值');
      setInputError4(true);
    } else {
      setHelper4('');
      setInputError4(false);
    }
    setOpinions(text);
  };

  const HandleSaveClick = async () => {
    const response = await fetch(`/api/patient/${tmpPatientID}/case`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complaint: chiefComplaint,
        department: tmpDepartment,
        diagnosis: tmpdiagnosis,
        doctorID: tmpDoctorID,
        history: medicalHistory,
        patientID: tmpPatientID,
        prescriptions: [{ Advice: '111' }],
        treatment: opinions,
      }),
    });

    console.log(response);
    const message = await response.json();
    if (response.ok) {
      console.log(`The server says case creating is succcessful`);
      console.log(message);
    } else {
      console.log(`Fail to create the case`);
      console.log(message);
    }

    const tmpcaseID = message.data;

    console.log(tmpcaseID);

    const newRecord = {
      Case_id: tmpcaseID,
      Patient_age: patientAge,
      Patient_gender: patientGender,
      Patient_name: patientName,
      Patient_id: tmpPatientID,
      Department: tmpDepartment,
      Doctor_id: tmpDoctorID,
    };

    setRecord(newRecord);
    setCreation(null);
  };

  const HandleGoback = () => {
    setCreation(null);
  };

  return (
    <Container component="main" className={classes.verticalContainer}>
      <CssBaseline />
      <Grid container direction="column" justify="center" alignItems="center">
        <Container className={classes.headerContainer}>
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
                  defaultValue="男"
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
                  defaultValue="18"
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
                  value={chiefComplaint}
                  helperText={helperText1}
                  error={InputError1}
                  onChange={handleComplaintInput}
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
                  value={medicalHistory}
                  helperText={helperText2}
                  error={InputError2}
                  onChange={handleMedicalHistoryInput}
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
                  value={tmpdiagnosis}
                  helperText={helperText3}
                  error={InputError3}
                  onChange={handleDiagnosisInput}
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
                  value={opinions}
                  error={InputError4}
                  helperText={helperText4}
                  onChange={handleOpinionsInput}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container className={classes.save}>
          <Button variant="outlined" color="primary" onClick={HandleSaveClick}>
            <CheckIcon color="primary" size="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">创建</Typography>
            </Container>
          </Button>
        </Container>
      </Grid>
    </Container>
  );
}
