import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import SearchBar from '../components/SearchBar';

const useStyles = makeStyles(theme => ({
  verticalContainer: {
    padding: theme.spacing(0),
    margin: 'auto',
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: '20px',
    width: '100%',
  },

  input: {
    borderRadius: 16,
    margin: 'left',
    width: '100%',
  },
}));

let classes;

function toDisplayItem(info, index) {
  const history = useHistory();
  const handlerecord = event => {
    history.push({
      pathname: '/Record',
      state: {
        Case_id: info.case_id,
        Patient_id: info.patient_id,
        Doctor_id: info.doctor_id,
        Department: info.department,
      },
    });
  };
  return (
    <Paper className={classes.paper} key={index} onClick={handlerecord}>
      <Grid container spacing={2} display="flex">
        <Grid item xs={12} sm container>
          <Grid item xs={6} container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" color="text">
                {info.department}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                主诉：{info.complaint}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                诊断：{info.diagnosis}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">主诊医生：{info.doctor}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">{info.date}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const Wrapper = ({ children }) => children;

const data = [
  {
    case_id: 3,
    patient_id: 2,
    doctor_id: 1,
    doctor: 'foo1',
    patient: 'bar1',
    department: '太平间',
    complaint: '感觉不好',
    diagnosis: '现在好多了',
    date: '2012-12-21',
  },
  {
    case_id: 4,
    patient_id: 2,
    doctor_id: 1,
    doctor: 'foo2',
    patient: 'bar1',
    department: '太平间',
    complaint: '感觉不好',
    diagnosis: '现在好多了',
    date: '2012-12-25',
  },
];

const tmpdoctorId = 1;
const tmppatientId = 2;
const tmpdepartment = '太平间';
const tmpdate = '2021-06-06';
let tmpcaseID = 999;

export default function Browse() {
  classes = useStyles();
  const [display, setDisplay] = useState(data);
  const displayItems = display.map(toDisplayItem);
  const history = useHistory();

  const handlerecord = async () => {
    const response = await fetch(`/api/patient/${tmppatientId}/case`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complaint: ' ',
        department: tmpdepartment,
        diagnosis: ' ',
        doctorID: tmpdoctorId,
        history: ' ',
        patientID: tmppatientId,
        date: tmpdate.replace,
        prescriptions: [],
        treatment: ' ',
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

    tmpcaseID = message.data;

    console.log(tmpcaseID);

    history.push({
      pathname: '/Record',
      state: {
        Case_id: tmpcaseID,
        Patient_id: tmppatientId,
        Department: tmpdepartment,
        Doctor_id: tmpdoctorId,
      },
    });
  };

  const searchChange = event => {
    const str = event.target.value;
    setDisplay(
      data.filter(
        c =>
          c.doctor.includes(str) ||
          c.patient.includes(str) ||
          c.department.includes(str) ||
          c.complaint.includes(str) ||
          c.diagnosis.includes(str),
      ),
    );
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={classes.verticalContainer}
        spacing={1}
      >
        <Grid item>
          <div className={classes.input}>
            <SearchBar placeholder="搜索内容" onChange={searchChange} />
          </div>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.count}
          >
            总数：{display.length}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            {displayItems}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Paper className={classes.paper} onClick={handlerecord}>
              <Grid container spacing={2} display="flex">
                <Grid item xs={12} sm container>
                  <AddCircleOutlinedIcon
                    style={{ color: '#4e89ae', margin: 'auto', fontSize: 50 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
