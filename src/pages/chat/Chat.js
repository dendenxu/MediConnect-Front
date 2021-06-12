import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { fromJS, Map } from 'immutable';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  socket,
  connect,
  hello,
  msgFromClient,
  closeChat,
  requireMedicalRecord,
  requirePrescription,
  requireQuestions,
} from './api';
import { ReactComponent as EmojiIcon } from '../../assets/images/emoji.svg';
import { ReactComponent as MedicineIcon } from '../../assets/images/medicine.svg';
import { ReactComponent as PictureIcon } from '../../assets/images/picture.svg';
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
    // selected: theme.palette.primary.main
  },
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
      Pts.filter(Patient => Patient.PatientName !== PatientName),
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

function ToolBar({ CurrentPatientID, CurrentUserID }) {
  const classes = useStyles();

  const handleIconClick = event => {};
  const handlePicClick = event => {};
  const handleQuesClick = event => {
    requireQuestions(CurrentUserID);
  };
  const handleMedClick = event => {
    requirePrescription(CurrentPatientID);
  };
  const handleRecClick = event => {
    requireMedicalRecord(CurrentPatientID);
  };
  const fileInputEl = useRef(null);

  const handlePhoto = async event => {
    const files = [...event.target.files];
    if (files.length === 0) return;
    const result = await Promise.all(
      files.map(file => {
        let url = null;
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      }),
    );
    console.log(result);
  };

  return (
    <Container className={classes.toolbar}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button onClick={handleIconClick}>
            <EmojiIcon className={classes.icon} />
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => fileInputEl.current.click()}>
            <input
              ref={fileInputEl}
              type="file"
              accept="image/*"
              hidden
              onChange={event => handlePhoto(event)}
            />
            <PictureIcon className={classes.icon} />
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleQuesClick}>
            <QuestionsIcon className={classes.icon} />
          </Button>
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
      <Typography
        variant="caption"
        className={classes.timetext}
        color="textSecondary"
      >
        {time}
      </Typography>
      <Paper
        className={
          isSentByCurrentUser ? classes.MyMessageBox : classes.HisMessageBox
        }
        elevation={2}
      >
        {content}
      </Paper>
    </Container>
  );
}

function Messages({ messages, CurrentUserID, IsEmpty, CurrentPatientID }) {
  const classes = useStyles();
  // let messagesA = Array.from(messages);
  const messagesA = !IsEmpty
    ? messages.get(CurrentPatientID).map(message => (
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
  const [CurrentUserID, setCurrentUserID] = useState('flora');
  const [PatientName, setPatientName] = useState('');
  const [Patients, setPatients] = useState([
    { PatientID: '3180101983', PatientName: 'Alice' },
    { PatientID: '3180101985', PatientName: 'Judy' },
  ]);
  const [CurrentPatientID, setCurrentPatientID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(
    Map({
      3180101983: [
        { sender: 'flora', content: 'hhhh', time: '23:33' },
        { sender: 'Alice', content: 'oooooo', time: '12:33' },
        {
          sender: 'Alice',
          content: 'Hi! I have some trouble with my head. It aches a lot.',
          time: '12:33',
        },
        {
          sender: 'flora',
          content: 'Then, Where exactly the aching is?',
          time: '23:33',
        },
      ],
      3180101985: [
        { sender: 'flora', content: 'react is cool', time: '23:33' },
        { sender: 'Judy', content: 'so is Redux', time: '12:33' },
      ],
    }),
  );
  const [Questions, setQuestions] = useState(['Q1', 'Q2']);
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
        msgs.update(CurrentPatientID, msg => [
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
      setMessages(msgs => Map(localMessages));
      setPatients(pas => localPatients);
      console.log('Patiens after local:', Patients);
    };

    socket.onmessage = msg => {
      console.log(msg);
      const dataFromServer = JSON.parse(msg.data);
      const patientID = JSON.stringify(dataFromServer.PatientID);
      console.log('patientID:', patientID);
      console.log(dataFromServer);
      console.log(dataFromServer.PatientID.toString());
      switch (dataFromServer.Type) {
        case 6:
          // const pID = dataFromServer.PatientID.toString()
          // console.log("pID",pID)
          // console.log("NewPatient")
          setPatients(pats => [
            ...pats,
            {
              PatientID: dataFromServer.PatientID,
              PatientName: dataFromServer.Name,
            },
          ]);
          setMessages(msgs => msgs.set(dataFromServer.PatientID, []));
          break;

        case 7:
          setMessages(msgs =>
            msgs.update(dataFromServer.SenderID, msg1 => [
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
            msgs.update(dataFromServer.PatientID, msg2 => [
              ...msg2,
              {
                sender: dataFromServer.SenderID,
                content: dataFromServer.URL,
                time: dataFromServer.Time,
              },
            ]),
          );
          break;
        case 9:
          setMessages(msgs =>
            msgs.update(dataFromServer.PatientID, msg3 => [
              ...msg3,
              {
                sender: dataFromServer.SenderID,
                content: dataFromServer.URL,
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