import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { fromJS, Map } from 'immutable';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import Popover from '@material-ui/core/Popover';
import {
  socket,
  hello,
  closeChat,
  requireMedicalRecord,
  requirePrescription,
  requireQuestions,
} from './api';
import { ReactComponent as MedicineIcon } from '../../assets/images/medicine.svg';
import { ReactComponent as QuestionsIcon } from '../../assets/images/questions.svg';
import { ReactComponent as RecordIcon } from '../../assets/images/record.svg';

const useStyles = makeStyles(theme => ({
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    borderRadius: 30,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    width: '70%',
    height: '100%',
  },
  textarea: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(1),
    lineHeight: 3,
    border: 1,
    // borderRadius: 30,
    boxShadow: '0 1px 1px 1px rgba(9, 9, 9, .3)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    width: '100%',
    padding: theme.spacing(1),
    selected: '#F1F0F3',
  },
  // listItem: {
  //   // borderStyle: 'solid',
  //   borderWidth: '0.5px'
  // },
  endButton: {
    border: 1,
    color: 'white',
    padding: theme.spacing(1),
  },
  namepaper: {
    border: 1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  icon: {
    width: '50%',
    height: '50%',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    padding: theme.spacing(1),
    border: 1,
  },
  topbar: {
    padding: theme.spacing(1),
    border: 1,
  },
  MessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    width: '100%',
    height: '200px',
  },
  HisMessageBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'left',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '50%',
    backgroundColor: '#F1F0F3',
  },
  MyMessageBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'left',
    alignSelf: 'flex-end',
    textAlign: 'justify',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  timebox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  timetext: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // ! special operation for Josefin Sans
    transform: 'translate(0px,1.5px)',
  },
}));

function InputBox({ message, setMessage, sendMessage }) {
  const classes = useStyles();

  const handleMessageChange = event => {
    const newMessage = event.target.value;
    setMessage(newMessage);
    console.log(`Getting a new message: ${newMessage}`);
  };

  const handleMessageSend = event => {
    // const key = event.key;
    if (event.key === 'Enter') sendMessage(event);
    console.log(`Sending a new message.`);
  };

  return (
    <Container>
      <TextField
        className={classes.textarea}
        id="standard-multiline-flexible"
        multiline
        rows={10}
        // defaultValue="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleMessageSend}
      />
    </Container>
  );
}

function PatientList({
  Patients,
  setCurrentPatientID,
  setPatientName,
  setSelectedIndex,
  selectedIndex,
  setIsEmpty,
}) {
  const classes = useStyles();

  const handleListItemClick = (event, index, PatientID, PatientName) => {
    setIsEmpty(false);
    setSelectedIndex(index);
    setCurrentPatientID(PatientID);
    setPatientName(PatientName);
  };

  console.log('Patients:', Patients);

  const patientsA = Patients.map(Patient => (
    <ListItem
      className={classes.listItem}
      key={Patients.findIndex(obj => obj.PatientID === Patient.PatientID)}
      button
      selected={
        selectedIndex ===
        Patients.findIndex(obj => obj.PatientID === Patient.PatientID)
      }
      onClick={event =>
        handleListItemClick(
          event,
          Patients.findIndex(obj => obj.PatientID === Patient.PatientID),
          Patient.PatientID,
          Patient.PatientName,
        )
      }
    >
      {/* <Badge badgeContent={4} color="primary"> */}
      <ListItemText primary={Patient.PatientName} />
      {/* </Badge> */}
    </ListItem>
  ));

  console.log('PatientsA:', patientsA);

  return (
    <Container className={classes.list}>
      <List component="nav" aria-label="Patient List">
        {patientsA}
      </List>
    </Container>
  );
}

function TopBar({
  Patients,
  setPatients,
  CurrentUserID,
  CurrentPatientID,
  setCurrentPatientID,
  setPatientName,
  PatientName,
  IsEmpty,
  setIsEmpty,
  setSelectedIndex,
}) {
  const classes = useStyles();

  const handleEndClick = event => {
    closeChat(CurrentPatientID, CurrentUserID);

    setIsEmpty(true);
    setSelectedIndex();
    setPatients(Pts =>
      Pts.filter(Patient => Patient.PatientID !== CurrentPatientID),
    );

    setPatientName('');
    setCurrentPatientID('');

    console.log('patients:', Patients);
  };

  return (
    <Container className={classes.topbar}>
      {!IsEmpty ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.namepaper} variant="outlined" square>
              {PatientName}
            </Paper>
          </Grid>
          <Grid item>
            <Button
              className={classes.endButton}
              variant="contained"
              color="primary"
              onClick={handleEndClick}
            >
              结束挂号
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {' '}
          <Grid item xs={3}>
            <Paper className={classes.namepaper} variant="outlined" square />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

function ToolBar({ CurrentPatientID, CurrentUserID, Questions, setMessages }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState();

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleMedClick = event => {
    requirePrescription(CurrentPatientID, CurrentUserID);
  };
  const handleRecClick = event => {
    requireMedicalRecord(CurrentPatientID, CurrentUserID);
  };

  const QuestionsA = Questions.map(Question => (
    <ListItem
      className={classes.listItem}
      key={Questions.findIndex(obj => obj === Question)}
      button
      onClick={event => {
        setAnchorEl(null);
        setMessages(msgs =>
          msgs.update(CurrentPatientID.toString(), msg => [
            ...msg,
            { sender: CurrentUserID, content: Question, time: '12:12' },
          ]),
        );
      }}
    >
      <ListItemText primary={Question} />
    </ListItem>
  ));

  return (
    <Container className={classes.toolbar}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button onClick={handlePopoverOpen}>
            <QuestionsIcon />
          </Button>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <List>{QuestionsA}</List>
          </Popover>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleMedClick}>
            <MedicineIcon className={classes.icon} />
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleRecClick}>
            <RecordIcon className={classes.icon} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function Message({ message: { sender, content, time }, CurrentUserID }) {
  const classes = useStyles();
  let isSentByCurrentUser = false;
  if (sender === CurrentUserID) {
    isSentByCurrentUser = true;
  }

  return (
    <Container>
      <Container>
        <Typography
          variant="caption"
          className={classes.timetext}
          color="textSecondary"
        >
          {time}
        </Typography>
      </Container>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Paper
          className={
            isSentByCurrentUser ? classes.MyMessageBox : classes.HisMessageBox
          }
          elevation={2}
        >
          {content}
        </Paper>
      </Container>
    </Container>
  );
}

function Messages({ messages, CurrentUserID, IsEmpty, CurrentPatientID }) {
  const classes = useStyles();
  console.log('Before messageA: ', messages);
  const messagesA = !IsEmpty
    ? messages.get(CurrentPatientID.toString()).map(message => (
        <container key={message.time}>
          <Message message={message} CurrentUserID={CurrentUserID} />
        </container>
      ))
    : {};

  console.log('messages:', messages);

  if (!IsEmpty)
    return (
      <ScrollToBottom className={classes.MessageContainer}>
        {messagesA}
      </ScrollToBottom>
    );
  return (
    <ScrollToBottom className={classes.MessageContainer}>
      Please select a Patient.
    </ScrollToBottom>
  );
}

function Chat() {
  const classes = useStyles();
  // const [CurrentUserID, setCurrentUserID] = useState('flora');
  const [CurrentUserID, setCurrentUserID] = useState(111);
  const [PatientName, setPatientName] = useState('');
  const [Patients, setPatients] = useState([
    { PatientID: 1983, PatientName: 'Alice' },
    { PatientID: 1985, PatientName: 'Judy' },
    { PatientID: 1987, PatientName: 'Max' },
  ]);
  const [CurrentPatientID, setCurrentPatientID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(
    Map({
      1983: [
        { sender: 111, content: 'hhhh', time: '23:33' },
        { sender: 1983, content: 'oooooo', time: '12:33' },
        {
          sender: 1983,
          content: 'Hi! I have some trouble with my head. It aches a lot.',
          time: '12:33',
        },
        {
          sender: 111,
          content: 'Then, Where exactly the aching is?',
          time: '23:33',
        },
      ],
      1985: [
        { sender: 111, content: 'react is cool', time: '23:33' },
        { sender: 1985, content: 'so is Redux', time: '12:33' },
      ],
      1987: [
        { sender: 111, content: 'hhhh', time: '23:33' },
        { sender: 1987, content: 'oooooo', time: '12:33' },
        {
          sender: 1987,
          content: 'Hi! I have some trouble with my head. It aches a lot.',
          time: '12:33',
        },
        {
          sender: 111,
          content: 'Then, Where exactly the aching is?',
          time: '23:33',
        },
      ],
    }),
  );
  const [Questions, setQuestions] = useState([
    'Please describe some details of your aching position.',
    'Do you have any medication allergies?',
  ]);
  const [IsEmpty, setIsEmpty] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();

  const sendMessage = event => {
    event.preventDefault();

    console.log('sending msg: ', message);
    if (message) {
      const json = {
        Type: 1,
        SenderID: CurrentUserID,
        ReceiverID: CurrentPatientID,
        Content: message,
        Time: '12:20',
      };
      console.log('json from msgFromClient:', json);
      socket.send(JSON.stringify(json));

      setMessage('');

      setMessages(msgs =>
        msgs.update(CurrentPatientID.toString(), msg => [
          ...msg,
          { sender: CurrentUserID, content: message, time: '12:12' },
        ]),
      );
    }
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log('Successfully Connected');
      hello('Doctor', CurrentUserID);
      const localMessages = JSON.parse(localStorage.getItem('messages'));
      const localPatients = JSON.parse(localStorage.getItem('Patients'));
      console.log('localMessages:', localMessages);
      console.log('localPatients:', localPatients);
      console.log('Patiens after local:', Patients);
    };

    socket.onmessage = msg => {
      console.log('Backend testing: ', msg);
      const dataFromServer = JSON.parse(msg.data);
      const patientID = JSON.stringify(dataFromServer.PatientID);
      console.log('patientID:', patientID);
      console.log(dataFromServer);
      switch (dataFromServer.Type) {
        case 6:
          // const pID = dataFromServer.PatientID.toString()
          // console.log("pID",pID)
          // console.log("NewPatient")
          setPatients(pats => [
            ...pats,
            {
              PatientID: dataFromServer.PatientID,
              PatientName: dataFromServer.PatientName,
            },
          ]);
          setMessages(msgs =>
            msgs.set(dataFromServer.PatientID.toString(), []),
          );
          break;

        case 7:
          setMessages(msgs =>
            msgs.update(dataFromServer.SenderID.toString(), msg1 => [
              ...msg1,
              {
                sender: dataFromServer.SenderID,
                content: dataFromServer.Content,
                time: dataFromServer.Time,
              },
            ]),
          );
          break;
        case 8:
          setMessages(msgs =>
            msgs.update(dataFromServer.PatientID.toString(), msg2 => [
              ...msg2,
              {
                sender: dataFromServer.PatientID,
                content: dataFromServer.Url,
                time: dataFromServer.Time,
              },
            ]),
          );
          break;
        case 9:
          setMessages(msgs =>
            msgs.update(dataFromServer.PatientID.toString(), msg3 => [
              ...msg3,
              {
                sender: dataFromServer.PatientID,
                content: dataFromServer.Url,
                time: dataFromServer.Time,
              },
            ]),
          );
          break;
        case 10:
          setQuestions(ques => [...ques, dataFromServer.Questions]);
          break;
        default:
          break;
      }
      console.log('Store messages:', messages);
      localStorage.setItem('messages', JSON.stringify(messages));
      localStorage.setItem('Patients', JSON.stringify(Patients));
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
    };

    socket.onerror = error => {
      console.log('Socket Error: ', error);
    };
  });

  return (
    <Container className={classes.borderedContainer}>
      <Grid container spacing={1}>
        <Grid container item xs={3} spacing={3}>
          <PatientList
            Patients={Patients}
            setCurrentPatientID={setCurrentPatientID}
            setPatientName={setPatientName}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            setIsEmpty={setIsEmpty}
          />
        </Grid>
        <Grid container item xs spacing={3}>
          <TopBar
            Patients={Patients}
            setPatients={setPatients}
            CurrentUserID={CurrentUserID}
            CurrentPatientID={CurrentPatientID}
            setCurrentPatientID={setCurrentPatientID}
            setPatientName={setPatientName}
            PatientName={PatientName}
            IsEmpty={IsEmpty}
            setIsEmpty={setIsEmpty}
            setSelectedIndex={setSelectedIndex}
          />
          <Messages
            messages={messages}
            CurrentUserID={CurrentUserID}
            IsEmpty={IsEmpty}
            CurrentPatientID={CurrentPatientID}
          />
          <Divider flexItem />
          <ToolBar
            CurrentPatientID={CurrentPatientID}
            CurrentUserID={CurrentUserID}
            Questions={Questions}
            setMessages={setMessages}
          />
          <InputBox
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
