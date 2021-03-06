/* eslint-disable no-shadow */
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useLocation, useHistory } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

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
    margin: theme.spacing(0),
    padding: theme.spacing(0),
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
let desID;
let tempprescription = [];
let temprows = [];
let whetherpres = 0;

export default function Home(props) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [expandButton, SetExpand] = useState(false);
  const columns = [
    { field: 'name', headerName: '?????????', width: 200, editable: true },
    {
      field: 'size',
      headerName: '??????',
      width: 140,
      editable: true,
    },
    {
      field: 'qt',
      headerName: '??????',
      width: 140,
      editable: true,
    },
    {
      field: 'price',
      headerName: '??????',
      width: 130,
      editable: false,
    },
    {
      field: 'contraindication',
      headerName: '?????????',
      width: 140,
      editable: false,
    },
  ];

  let defaultRows = [];

  let defaultPrescription = [];

  function CreatePrescriptionData(id, name, size, qt, price, contraindication) {
    return { id, name, size, qt, price, contraindication };
  }
  function CreatePrescriptionDataBackEnd(
    lineno,
    id,
    guidelineId,
    CaseID,
    Advice,
    MedicineId,
    dosage,
    quantity,
  ) {
    return {
      lineno,
      id,
      guidelineId,
      CaseID,
      Advice,
      MedicineId,
      dosage,
      quantity,
    };
  }

  let allguidelines = [];

  const {
    Case_id: tmpCaseID,
    Patient_id: tmpPatientID,
    Doctor_id: tmpDoctorID,
    Department: tmpDepartment,
  } = props.record;

  const { setRecord, className } = props;
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [opinions, setOpinions] = useState('');
  const [allprescriptions, setPrescriptions] = useState(defaultPrescription);
  // todo initialize these 4 IDs(maybe using get method),
  const [patientName, setPatientName] = useState('??????');
  const [patientGender, setPatientGender] = useState('???');
  const [allergicHistory, setAllergicHistory] = useState('???');
  const [patientAge, setPatientAge] = useState(18);
  const [medlist, setmedlist] = useState([]);
  const [helperText1, setHelper1] = useState('');
  const [helperText2, setHelper2] = useState('');
  const [helperText3, setHelper3] = useState('');
  const [helperText4, setHelper4] = useState('');
  const [InputError1, setInputError1] = useState(false);
  const [InputError2, setInputError2] = useState(false);
  const [InputError3, setInputError3] = useState(false);
  const [InputError4, setInputError4] = useState(false);
  const [DataGridError, setDataGridError] = useState('');
  const [DataGridErrorOpen, setDataGridErrorOpen] = React.useState(false);
  // // console.log(tmpCaseID);
  // // console.log(tmpPatientID);
  // // console.log(tmpDoctorID);

  const [editRowsModel, setEditRowsModel] = useState({});
  const [rows, setRows] = useState(defaultRows);

  useEffect(async () => {
    // console.log(initial);
    let tmpresponse = await fetch(
      `/api/patient/${tmpPatientID}/cases/${tmpCaseID}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // // console.log(tmpresponse);
    setInputError1(false);
    setInputError2(false);
    setInputError3(false);
    setInputError4(false);
    let tmpmessage = await tmpresponse.json();
    setPatientName(tmpmessage.data.PatientName);
    setPatientGender(tmpmessage.data.Gender);
    setDiagnosis(tmpmessage.data.Diagnosis);
    setMedicalHistory(tmpmessage.data.History);
    setChiefComplaint(tmpmessage.data.Complaint);
    setOpinions(tmpmessage.data.Treatment);
    console.log(tmpmessage.data);
    // console.log(tmpmessage.data.Prescriptions.length);
    whetherpres = 1;
    SetExpand(true);
    const tmpPres = tmpmessage.data.Prescriptions[0];
    console.log(tmpPres);
    desID = tmpPres.ID;
    const tmpGL = tmpPres.Guidelines;
    for (let i = 0; i < tmpGL.length; i += 1) {
      console.log(i);
      tempprescription = tempprescription.concat([
        CreatePrescriptionDataBackEnd(
          i + 1,
          desID,
          tmpGL[i].ID,
          tmpCaseID,
          tmpPres.Advice,
          tmpGL[i].MedicineID,
          tmpGL[i].Dosage,
          tmpGL[i].Quantity,
        ),
      ]);
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
      // console.log(tempprescription);
      // console.log(temprows);
    }
    defaultRows = temprows;
    defaultPrescription = tempprescription;
    setPrescriptions(tempprescription);
    console.log(temprows);
    setRows(temprows);
    tempprescription = [];
    temprows = [];
    linecount = tmpGL.length + 1;
    console.log(linecount);
    tmpresponse = await fetch(`/api/account/getinfobypatid/${tmpPatientID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    tmpmessage = await tmpresponse.json();
    const thisYear = new Date().getFullYear();
    const birth = String(tmpmessage.data.birthday);
    const actualAge = Number(thisYear) - Number(birth.substr(0, 4));
    setPatientAge(actualAge);
    if (tmpmessage.data.gender === 'male') {
      setPatientGender('???');
    } else {
      setPatientGender('???');
    }
    setPatientName(tmpmessage.data.lastname + tmpmessage.data.firstname);
    setAllergicHistory(tmpmessage.data.allergy);
    if (tmpmessage.data.allergy === '') {
      setAllergicHistory('???');
    }
    const medname = '';
    tmpresponse = await fetch(`/api/medicine?q=${medname}}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    tmpmessage = await tmpresponse.json();
    setmedlist(tmpmessage.data);
    console.log(tmpmessage.data);
  }, []);

  const handleEditCellChangeCommitted = async ({ id, field, props }) => {
    if (field === 'name') {
      const data = props; // Fix eslint value is missing in prop-types for JS files
      let newname = data.value.toString();
      const response = await fetch(`/api/medicine?q=${newname}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const message = await response.json();
      if (response.ok) {
        console.log(`succeed in finding the medicine`);
        console.log(message);
      } else {
        console.log(`fail to find the medicine`);
        console.log(message);
      }
      if (message.data.length === 0) {
        setDataGridErrorOpen(true);
        setDataGridError('???????????????,???????????????');
        console.log(DataGridError);
      } else {
        setDataGridErrorOpen(false);
        newname = message.data[0].Name;
        const mediId = message.data[0].ID;
        const newprice = message.data[0].Price;
        const newcontraindication = message.data[0].Contraindication;
        console.log(newname);
        console.log(newprice);
        console.log(newcontraindication);
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return {
              ...row,
              name: newname,
              price: newprice,
              contraindication: newcontraindication,
            };
          }
          return row;
        });
        setRows(updatedRows);
        // console.log(mediId);
        const updatedPres = allprescriptions.map(allprescription => {
          if (allprescription.lineno === id) {
            // console.log(mediId);
            return { ...allprescription, MedicineId: mediId };
          }
          return allprescription;
        });
        setPrescriptions(updatedPres);
      }
    }
    if (field === 'size') {
      const data = props; // Fix eslint value is missing in prop-types for JS files
      console.log(data.value);
      const newsize = Number(data.value);
      console.log(Number.isNaN(newsize));
      if (Number.isNaN(newsize)) {
        setDataGridErrorOpen(true);
        setDataGridError('??????????????????');
        console.log(DataGridError);
      } else {
        setDataGridErrorOpen(false);
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, size: newsize };
          }
          return row;
        });
        setRows(updatedRows);

        const updatedPres = allprescriptions.map(allprescription => {
          if (allprescription.lineno === id) {
            return { ...allprescription, quantity: newsize };
          }
          return allprescription;
        });
        setPrescriptions(updatedPres);
      }
    }
    if (field === 'qt') {
      const data = props; // Fix eslint value is missing in prop-types for JS files
      const newqt = data.value.toString();
      const updatedRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, qt: newqt };
        }
        return row;
      });
      setRows(updatedRows);
      const updatedPres = allprescriptions.map(allprescription => {
        if (allprescription.lineno === id) {
          return { ...allprescription, dosage: newqt };
        }
        return allprescription;
      });
      setPrescriptions(updatedPres);
    }
    // console.log(rows);
  };

  const handleComplaintInput = event => {
    const text = event.target.value;
    if (text === '') {
      setHelper1('???????????????');
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
      setHelper2('???????????????');
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
      setHelper3('???????????????');
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
      setHelper4('???????????????');
      setInputError4(true);
    } else {
      setHelper4('');
      setInputError4(false);
    }
    setOpinions(text);
  };

  // const handlePrescriptionssInput = event => {
  //     const text = event.target.value;
  //     setOpinions(text);
  //     };
  const HandleOnAddPrescrption = async () => {
    SetExpand(true);
    const response = await fetch(
      `/api/patient/${tmpPatientID}/case/${tmpCaseID}/prescription`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Caseid: tmpCaseID,
          Advice: ' ',
          Guidelines: [],
        }),
      },
    );
    // // console.log(response);
    const message = await response.json();
    desID = message.data;
    // console.log(desID);
    if (response.ok) {
      // // console.log(`The server says creating new prescription is succcessful`);
      // // console.log(message);
    } else {
      // // console.log(`Fail to create new prescription`);
      // // console.log(message);
    }
  };

  const HandleOnAddLine = async () => {
    const newrow = rows.concat([
      CreatePrescriptionData(
        linecount,
        '???????????????',
        '????????????',
        '????????????',
        ' ',
        ' ',
      ),
    ]);
    const newdefaultdescription = allprescriptions.concat([
      CreatePrescriptionDataBackEnd(
        linecount,
        desID,
        0,
        tmpCaseID,
        '1',
        -1,
        ' ',
        ' ',
      ),
    ]);
    setPrescriptions(newdefaultdescription);
    linecount += 1;
    setRows(newrow);
    console.log(linecount);
    // console.log(rows);
    // console.log(allprescriptions);
  };

  const HandleSaveClick = async () => {
    console.log(linecount);
    console.log(allprescriptions[0]);
    for (let i = 0; i < linecount - 1; i += 1) {
      const tmpguideline = [
        {
          // to fill
          ID: allprescriptions[i].guidelineId,
          MedicineID: allprescriptions[i].MedicineId,
          PrescriptionID: allprescriptions[i].id,
          Dosage: allprescriptions[i].dosage,
          Quantity: Number(allprescriptions[i].quantity),
        },
      ];
      const newallguidelines = allguidelines.concat(tmpguideline);
      allguidelines = newallguidelines;
    }

    let response;
    let message;
    if (whetherpres === 1) {
      response = await fetch(
        `/api/patient/${tmpPatientID}/case/${tmpCaseID}/prescription/${desID}`,
        {
          // todo
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: desID,
            CaseID: tmpCaseID,
            Advice: '1',
            Guidelines: allguidelines,
          }),
        },
      );
      message = await response.json();
      if (response.ok) {
        console.log(`The server says creating new prescription is succcessful`);
        console.log(message);
      } else {
        console.log(`Fail to create new prescription`);
        console.log(message);
      }
    }

    response = await fetch(`/api/patient/${tmpPatientID}/cases/${tmpCaseID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    message = await response.json();
    const beforecase = message.data;
    // console.log(beforecase);
    if (response.ok) {
      // // console.log(`The server says creating new prescription is succcessful`);
      // // console.log(message);
    } else {
      // // console.log(`Fail to create new prescription`);
      // // console.log(message);
    }
    beforecase.Complaint = chiefComplaint;
    beforecase.Diagnosis = diagnosis;
    beforecase.Treatment = opinions;
    beforecase.History = medicalHistory;
    // console.log(beforecase);
    response = await fetch(`/api/patient/${tmpPatientID}/case/${tmpCaseID}`, {
      // todo
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beforecase),
    });

    // // console.log(response);
    message = await response.json();
    if (response.ok) {
      // // console.log(`The server says saving is succcessful`);
      // // console.log(message);
    } else {
      // // console.log(`Fail to save the case`);
      // // console.log(message);
    }
  };

  const HandleGoback = async () => {
    setRecord(null);
  };

  function TransitionAlerts() {
    return (
      <div className={classes.alert}>
        <Collapse in={DataGridErrorOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDataGridErrorOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {DataGridError}
          </Alert>
        </Collapse>
      </div>
    );
  }

  return (
    <Container
      component="main"
      className={`${classes.verticalContainer} ${className}`}
    >
      <Grid container>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.headerContainer}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={HandleGoback}
            className={classes.button}
          >
            <ArrowBackIosIcon color="primary" fontSize="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">??????</Typography>
            </Container>
          </Button>
          <Typography component="h5" className={classes.headertext}>
            ????????????
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
              ????????????
            </Typography>
          </Grid>
          <Box className={classes.borderedContainer}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="????????????"
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
                  label="????????????"
                  defaultValue="???"
                  value={patientGender}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="standard-read-only-input"
                  label="????????????"
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
                  label="?????????"
                  defaultValue="???"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="??????"
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
                  label="????????????"
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
                  label="??????"
                  multiline
                  fullWidth
                  rows={5}
                  value={diagnosis}
                  helperText={helperText3}
                  error={InputError3}
                  onChange={handleDiagnosisInput}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="????????????"
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
        <Container spacing={1} expandButton style={{}}>
          {expandButton ? (
            <Button
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              <ContactsIcon Icon color="primary" fontSize="small" />
              <Container className={classes.buttontext}>
                <Typography component="h4">??????</Typography>
              </Container>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              onClick={HandleOnAddPrescrption}
              className={classes.button}
            >
              <AddIcon color="primary" fontSize="small" />
              <Container className={classes.buttontext}>
                <Typography component="h4">??????</Typography>
              </Container>
            </Button>
          )}
        </Container>
        {expandButton ? (
          <Container className={classes.pageContainer}>
            <Box className={classes.borderedContainer}>
              <TransitionAlerts />
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  onEditCellChangeCommitted={handleEditCellChangeCommitted}
                />
                <Container className={classes.addIcon}>
                  <Fab size="small" color="primary" aria-label="add">
                    <AddIcon onClick={HandleOnAddLine} />
                  </Fab>
                </Container>
              </div>
            </Box>
          </Container>
        ) : (
          <div />
        )}
        <Container className={classes.save}>
          <Button
            variant="outlined"
            color="primary"
            onClick={HandleSaveClick}
            className={classes.button}
          >
            <CheckIcon color="primary" fontSize="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">??????</Typography>
            </Container>
          </Button>
        </Container>
      </Grid>
    </Container>
  );
}
