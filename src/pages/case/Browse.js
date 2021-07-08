import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    // padding: theme.spacing(0),
    // margin: 'auto',
    // width: '100%',
    // height: '100%',
  },
  paper: {
    padding: theme.spacing(1, 0),
    marginTop: '20px',
    width: '100%',
    flexGrow: 1,
    border: 5,
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  highlight: {
    // backgroundColor: '#4e89ae',
    // borderWidth: 10,
    borderColor: '#4e89ae',
    border: '3px solid',
    // borderRadius: 20,
    // borderColor: '#000',
    // padding: 50,
  },

  input: {
    borderRadius: 16,
    margin: 'left',
    width: '100%',
  },
}));

let classes;

function toDisplayItem(props) {
  const { info, index, record, setRecord } = props;
  const history = useHistory();
  const theme = useTheme();
  const handlerecord = event => {
    const state = {
      Case_id: info.ID,
      Patient_age: info.Age,
      Patient_name: info.PatientName,
      Patient_id: info.PatientID,
      Department: info.Department,
      Doctor_id: info.DoctorID,
    };

    setRecord(state);
  };
  return (
    <Paper
      className={
        index === 0 ? `${classes.paper} ${classes.highlight}` : classes.paper
      }
      key={index}
      onClick={handlerecord}
    >
      <Grid
        item
        xs={12}
        sm
        container
        style={{
          padding: theme.spacing(2),
        }}
      >
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
          <Typography variant="subtitle1">{info.Date.substr(0, 10)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

const Wrapper = ({ children }) => children;

let Data = [];

export default function Browse(props) {
  const {
    doctorId,
    patientId,
    department,
    patientname,
    doctorname,
    patientgender,
    patientage,
    caseID,
  } = props.state;

  const {
    record,
    setRecord,
    creation,
    setCreation,
    CurrentPatientID,
    setCurrentPatientID,
  } = props;
  classes = useStyles();
  const [display, setDisplay] = useState(Data);
  const history = useHistory();

  useEffect(async () => {
    const response = await fetch(`/api/patient/${CurrentPatientID}/cases`, {
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
      Data = message.data;
      console.log(Data);
      setDisplay(Data);
    } else {
      console.log(`Fail to display the case`);
      console.log(message);
    }
  }, [CurrentPatientID]);

  const displayItems = display.map((info, index) =>
    toDisplayItem({ info, index, record, setRecord }),
  );

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
        {...props}
        className={`${classes.verticalContainer} ${props.className}`}
        spacing={1}
      >
        <Grid item>
          <div className={classes.input}>
            <SearchBar
              placeholder="请按以下关键字方式搜索：如医生姓名/主诉/诊断/科室"
              label="搜索内容"
              onChange={searchChange}
            />
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
      </Grid>
    </Wrapper>
  );
}
