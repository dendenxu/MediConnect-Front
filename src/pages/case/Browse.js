import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
      pathname: '/record',
      state: {
        Case_id: info.ID,
        Patient_id: info.PatientID,
        Doctor_id: info.DoctorID,
        Department: info.Department,
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
                {info.Department}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                主诉：{info.Complaint}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                诊断：{info.Diagnosis}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              主诊医生：{info.DoctorName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              {info.Date.substr(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const Wrapper = ({ children }) => children;

let Data = [];
const tmpdoctorId = 1;
const tmppatientId = 2;
const tmpdepartment = '太平间';
const patientname = '肖 瑞轩';
const doctorname = '于 成笑';
const patientgender = '男';
const patientage = 18;
const tmpcaseID = 999;

export default function Browse() {
  classes = useStyles();
  const [display, setDisplay] = useState(Data);
  const history = useHistory();

  useEffect(async () => {
    const response = await fetch(`/api/patient/${tmppatientId}/cases`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const message = await response.json();

    if (response.ok) {
      console.log(`The server says case initialization is succcessful`);
      console.log(message);
    } else {
      console.log(`Fail to display the case`);
      console.log(message);
    }
    Data = message.data;
    console.log(Data);
    setDisplay(Data);
  }, []);

  const displayItems = display.map(toDisplayItem);

  const handlerecord = async () => {
    // const response = await fetch(`/api/patient/${tmppatientId}/case`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     complaint: ' ',
    //     department: tmpdepartment,
    //     diagnosis: ' ',
    //     doctorID: tmpdoctorId,
    //     history: ' ',
    //     patientID: tmppatientId,
    //     prescriptions: [],
    //     treatment: ' ',
    //   }),
    // });

    // console.log(response);
    // const message = await response.json();
    // if (response.ok) {
    //   console.log(`The server says case creating is succcessful`);
    //   console.log(message);
    // } else {
    //   console.log(`Fail to create the case`);
    //   console.log(message);
    // }

    // tmpcaseID = message.data;

    // console.log(tmpcaseID);

    history.push({
      pathname: '/create_record',
      state: {
        // Case_id: tmpcaseID,
        Patient_age: patientage,
        Patient_gender: patientgender,
        Patient_name: patientname,
        Patient_id: tmppatientId,
        Department: tmpdepartment,
        Doctor_id: tmpdoctorId,
      },
    });
  };

  const searchChange = event => {
    const str = event.target.value;
    setDisplay(
      Data.filter(
        c =>
          c.DoctorName.includes(str) ||
          c.PatientName.includes(str) ||
          c.Department.includes(str) ||
          c.Complaint.includes(str) ||
          c.Diagnosis.includes(str),
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
