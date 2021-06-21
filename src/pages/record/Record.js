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
    { field: 'name', headerName: '药品名', width: 320, editable: true },
    {
      field: 'size',
      headerName: '数量',
      width: 220,
      editable: true,
    },
    {
      field: 'qt',
      headerName: '用法',
      width: 220,
      editable: true,
    },
  ];

  const defaultRows = [];

  let defaultPrescription = [];

  // function createData(id,name,size,qt,course,type,price) {
  //   return { id,name,size,qt,course,type,price };
  // }
  // // todo

  function CreatePrescriptionData(id, name, size, qt) {
    return { id, name, size, qt };
  }

  const [chiefComplaint, setChiefComplaint] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [opinions, setOpinions] = useState('');
  const [allprescriptions, setPrescriptions] = useState(defaultPrescription);
  // todo initialize these 4 IDs(maybe using get method),
  const CaseID = location.state.Case_id;
  const tmpPatientID = location.state.Patient_id;
  const tmpDoctorID = location.state.Doctor_id;
  const [patientName, setPatientName] = useState('张三');
  const [patientGender, setPatientGender] = useState('女');
  const [patientAge, setPatientAge] = useState(18);

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
    setPrescriptions(tmpmessage.data.Prescriptions);
  }, []);

  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      if (field === 'name') {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const newname = data.value.toString();
        const response = fetch(`/api/medicine?q=${newname}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const message = response.json();
        const mediId = message.data.ID;
        if (response.ok) {
          console.log(`succeed in finding the medicine`);
          console.log(message);
        } else {
          console.log(`fail to find the medicine`);
          console.log(message);
        }

        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, name: newname };
          }
          return row;
        });
        setRows(updatedRows);

        const updatedPres = allprescriptions.map(allprescription => {
          if (allprescription.linecount === id) {
            return { ...allprescription, medicine_id: mediId };
          }
          return allprescription;
        });
        setPrescriptions(updatedPres);
      }
      if (field === 'size') {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const newsize = data.value.toString();
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, size: newsize };
          }
          return row;
        });
        setRows(updatedRows);

        const updatedPres = allprescriptions.map(allprescription => {
          if (allprescription.linecount === id) {
            return { ...allprescription, quantity: newsize };
          }
          return allprescription;
        });
        setPrescriptions(updatedPres);
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
          if (allprescription.linecount === id) {
            return { ...allprescription, qt: newqt };
          }
          return allprescription;
        });
        setPrescriptions(updatedPres);
      }
    },
    [rows],
  );

  const handleComplaintInput = event => {
    const text = event.target.value;
    setChiefComplaint(text);
  };

  const handleMedicalHistoryInput = event => {
    const text = event.target.value;
    setMedicalHistory(text);
  };
  const handleDiagnosisInput = event => {
    const text = event.target.value;
    setDiagnosis(text);
  };
  const handleOpinionsInput = event => {
    const text = event.target.value;
    setOpinions(text);
  };

  // const handlePrescriptionssInput = event => {
  //     const text = event.target.value;
  //     setOpinions(text);
  //     };

  const HandleOnAddLine = async () => {
    const response = await fetch(
      `/api/patient/${tmpPatientID}/case/${CaseID}/prescription`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          case_id: CaseID,
          advice: ' ',
          guidelines: [],
        }),
      },
    );
    console.log(response);
    const message = await response.json();
    const desID = message.data;
    if (response.ok) {
      console.log(`The server says creating new prescription is succcessful`);
      console.log(message);
    } else {
      console.log(`Fail to create new prescription`);
      console.log(message);
    }
    const newrow = rows.concat([
      CreatePrescriptionData(
        linecount,
        '请输入药品名',
        '请输入数量',
        '请输入用法',
      ),
    ]);
    const tempdes = [
      {
        lineno: linecount,
        id: desID,
        case_id: CaseID,
        Advice: '1',
        medicine_id: -1,
        dosage: ' ',
        quantity: ' ',
      },
    ];
    const newdefaultdescription = defaultPrescription.concat(tempdes);
    defaultPrescription = newdefaultdescription;
    linecount += 1;
    setRows(newrow);
    console.log(rows);
    console.log(defaultPrescription);
  };

  const HandleSaveClick = async () => {
    console.log(linecount);
    for (let i = 0; i < linecount - 1; i += 1) {
      const PresID = allprescriptions[i].id;
      const response = fetch(
        `/api/patient/${tmpPatientID}/case/${CaseID}/prescription/${PresID}`,
        {
          // todo
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: PresID,
            CaseID,
            Advice: '1',
            Guidelines: [
              {
                ID: 2,
                MedicineID: allprescriptions[i].medicine_id,
                PrescriptionID: allprescriptions[i].ID,
                Dosage: allprescriptions[i].qt,
                Quantity: allprescriptions[i].size,
              },
            ],
          }),
        },
      );
      const message = response.json();
      if (response.ok) {
        console.log(`The server says creating new prescription is succcessful`);
        console.log(message);
      } else {
        console.log(`Fail to create new prescription`);
        console.log(message);
      }
    }

    let response = await fetch(`/api/patient/${tmpPatientID}/case`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let message = await response.json();
    const beforecase = await message.data;
    if (response.ok) {
      console.log(`The server says creating new prescription is succcessful`);
      console.log(message);
    } else {
      console.log(`Fail to create new prescription`);
      console.log(message);
    }
    beforecase.Complaint = chiefComplaint;
    beforecase.Diagnosis = diagnosis;
    beforecase.Treatment = opinions;
    beforecase.History = medicalHistory;

    response = await fetch(`/api/patient/${tmpPatientID}/case/${CaseID}`, {
      // todo
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: CaseID,
        PatientID: tmpPatientID,
        DoctorID: tmpDoctorID,
        Department: tmpDepartment,
        Complaint: chiefComplaint,
        Diagnosis: diagnosis,
        Treatment: opinions,
        History: medicalHistory,
        Prescriptions: allprescriptions,
      }),
    });

    console.log(response);
    message = response.json();
    if (response.ok) {
      console.log(`The server says saving is succcessful`);
      console.log(message);
    } else {
      console.log(`Fail to save the case`);
      console.log(message);
    }
  };

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
                  value={diagnosis}
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
                  onChange={handleOpinionsInput}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container spacing={1} expandButton>
          {expandButton ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                SetExpand(false);
              }}
            >
              <CloseIcon color="primary" size="small" />
              <Container className={classes.buttontext}>
                <Typography component="h4">处方</Typography>
              </Container>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                SetExpand(true);
              }}
            >
              <AddIcon color="primary" size="small" />
              <Container className={classes.buttontext}>
                <Typography component="h4">处方</Typography>
              </Container>
            </Button>
          )}
        </Container>
        {expandButton ? (
          <Container className={classes.pageContainer}>
            <Box className={classes.borderedContainer}>
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  editRowsModel={editRowsModel}
                  onEditCellChange={handleEditCellChangeCommitted}
                />
                <Container className={classes.addIcon}>
                  <Fab size="small" color="primary" aria-label="add">
                    <AddIcon onClick={HandleOnAddLine} />
                  </Fab>
                </Container>

                {/*
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>药品名</TableCell>
                        <TableCell>规格</TableCell>
                        <TableCell>剂量</TableCell>
                        <TableCell>疗程</TableCell>
                        <TableCell>类别</TableCell>
                        <TableCell align="right">价格</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.qt}</TableCell>
                        <TableCell>{row.course}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
*/}
              </div>
            </Box>
          </Container>
        ) : (
          <div />
        )}
        <Container className={classes.save}>
          <Button variant="outlined" color="primary" onClick={HandleSaveClick}>
            <CheckIcon color="primary" size="small" />
            <Container className={classes.buttontext}>
              <Typography component="h4">保存</Typography>
            </Container>
          </Button>
        </Container>
      </Grid>
    </Container>
  );
}
