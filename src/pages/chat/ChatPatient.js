import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  socket,
  hello,
  closeChat,
  requireMedicalRecord,
  requirePrescription,
  requireQuestions,
} from './api';

const useStyles = makeStyles(theme => ({
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    borderRadius: 30,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    height: '100%',
    maxWidth: '600px',

    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100vh',
    // maxWidth: '600px',
  },
  textarea: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(1),
    lineHeight: 3,
    border: 2,
    borderRadius: 15,
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
    padding: theme.spacing(0),
    width: '100%',
    height: '78vh',
    // backgroundColor:theme.palette.text.secondary,
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
        rows={1}
        // defaultValue="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleMessageSend}
      />
    </Container>
  );
}

// function PatientList({
//   Patients,
//   setCurrentDoctorID,
//   setDoctorName,
//   setSelectedIndex,
//   selectedIndex,
//   setIsEmpty,
// }) {
//   const classes = useStyles();

//   const handleListItemClick = (event, index, PatientID, DoctorName) => {
//     setIsEmpty(false);
//     setSelectedIndex(index);
//     setCurrentDoctorID(PatientID);
//     setDoctorName(DoctorName);
//   };

//   console.log('Patients:', Patients);

//   const patientsA = Patients.map(Patient => (
//     <ListItem
//       key={Patients.findIndex(obj => obj.PatientID === Patient.PatientID)}
//       button
//       selected={
//         selectedIndex ===
//         Patients.findIndex(obj => obj.PatientID === Patient.PatientID)
//       }
//       onClick={event =>
//         handleListItemClick(
//           event,
//           Patients.findIndex(obj => obj.PatientID === Patient.PatientID),
//           Patient.PatientID,
//           Patient.DoctorName,
//         )
//       }
//     >
//       {/* <Badge badgeContent={4} color="primary"> */}
//       <ListItemText primary={Patient.DoctorName} />
//       {/* </Badge> */}
//     </ListItem>
//   ));

//   console.log('PatientsA:', patientsA);

//   return (
//     <Container className={classes.list}>
//       <List component="nav" aria-label="Patient List">
//         {patientsA}
//       </List>
//     </Container>
//   );
// }

function TopBar({ DoctorName }) {
  const classes = useStyles();

  const handleEndClick = event => {
    // closeChat(CurrentDoctorID, CurrentUserID);
  };

  return (
    <Container className={classes.topbar}>
      <Grid container spacing={10}>
        <Grid item>
          <Button
          //  onClick={}
          >
            <ArrowBackIosIcon />
          </Button>
        </Grid>
        <Grid item xs={3} spacing={0}>
          <Paper className={classes.namepaper} variant="outlined" square>
            {DoctorName}
          </Paper>
        </Grid>
      </Grid>
      <Divider />
    </Container>
  );
}

// function ToolBar({ CurrentDoctorID, CurrentUserID }) {
//   const classes = useStyles();

//   const handleIconClick = event => {};
//   const handlePicClick = event => {};
//   const handleQuesClick = event => {
//     requireQuestions(CurrentUserID);
//   };
//   const handleMedClick = event => {
//     requirePrescription(CurrentDoctorID);
//   };
//   const handleRecClick = event => {
//     requireMedicalRecord(CurrentDoctorID);
//   };
//   const fileInputEl = useRef(null);

//   const handlePhoto = async event => {
//     const files = [...event.target.files];
//     if (files.length === 0) return;
//     const result = await Promise.all(
//       files.map(file => {
//         let url = null;
//         if (window.createObjectURL !== undefined) {
//           url = window.createObjectURL(file);
//         } else if (window.URL !== undefined) {
//           url = window.URL.createObjectURL(file);
//         } else if (window.webkitURL !== undefined) {
//           url = window.webkitURL.createObjectURL(file);
//         }
//         return url;
//       }),
//     );
//     console.log(result);
//   };

//   return (
//     <Container className={classes.toolbar}>
//       <Grid container spacing={1}>
//         <Grid item xs={1}>
//           <Button onClick={handleIconClick}>
//             <EmojiIcon className={classes.icon} />
//           </Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button onClick={() => fileInputEl.current.click()}>
//             <input
//               ref={fileInputEl}
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={event => handlePhoto(event)}
//             />
//             <PictureIcon className={classes.icon} />
//           </Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button onClick={handleQuesClick}>
//             <QuestionsIcon className={classes.icon} />
//           </Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button onClick={handleMedClick}>
//             <MedicineIcon className={classes.icon} />
//           </Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button onClick={handleRecClick}>
//             <RecordIcon className={classes.icon} />
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

function Message({ message: { sender, content, time }, CurrentUserID }) {
  const classes = useStyles();
  let isSentByCurrentUser = false;
  if (sender === CurrentUserID) {
    isSentByCurrentUser = true;
  }

  return (
    <Container
      style={{
        padding: 0,
      }}
    >
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

function Messages({ messages, CurrentUserID }) {
  const classes = useStyles();
  // let messagesA = Array.from(messages);
  const messagesA = messages.map(message => (
    <container key={message.time}>
      <Message message={message} CurrentUserID={CurrentUserID} />
    </container>
  ));

  console.log('messages:', messages);

  return (
    <ScrollToBottom className={classes.MessageContainer}>
      {messagesA}
    </ScrollToBottom>
  );
}

function ChatPatient() {
  const classes = useStyles();
  const [CurrentUserID, setCurrentUserID] = useState(1983);
  const [DoctorName, setDoctorName] = useState('Flaze');
  // const [Patients, setPatients] = useState([
  //   { PatientID: 1983, DoctorName: 'Alice' },
  //   { PatientID: 1985, DoctorName: 'Judy' },
  // ]);
  const [CurrentDoctorID, setCurrentDoctorID] = useState(111);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
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
  ]);
  // const [messages, setMessages] = useState(
  //   Map({
  //     1983: [
  //       { sender: 111, content: 'hhhh', time: '23:33' },
  //       { sender: 1983, content: 'oooooo', time: '12:33' },
  //       {
  //         sender: 'Alice',
  //         content: 'Hi! I have some trouble with my head. It aches a lot.',
  //         time: '12:33',
  //       },
  //       {
  //         sender: 'flora',
  //         content: 'Then, Where exactly the aching is?',
  //         time: '23:33',
  //       },
  //     ],
  //     1985: [
  //       { sender: 'flora', content: 'react is cool', time: '23:33' },
  //       { sender: 'Judy', content: 'so is Redux', time: '12:33' },
  //     ],
  //   }),
  // );
  // const [Questions, setQuestions] = useState(['Q1', 'Q2']);
  // const [IsEmpty, setIsEmpty] = useState(true);
  // const [selectedIndex, setSelectedIndex] = useState();

  const sendMessage = event => {
    event.preventDefault();

    console.log('sending msg: ', message);
    if (message) {
      const json = {
        Type: 1,
        SenderID: CurrentUserID,
        ReceiverID: CurrentDoctorID,
        Content: message,
        Time: '12:20',
      };
      console.log('json from msgFromClient:', json);
      socket.send(JSON.stringify(json));

      setMessage('');

      // setMessages(msgs =>
      //   msgs.update(CurrentDoctorID.toString(), msg => [
      //     ...msg,
      //     { sender: CurrentUserID, content: message, time: '12:12' },
      //   ]),
      // );
      setMessages(msgs => [
        ...msgs,
        { sender: CurrentUserID, content: message, time: '12:12' },
      ]);
    }
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log('Successfully Connected');
      // hello('Doctor', CurrentUserID);
      const localMessages = JSON.parse(localStorage.getItem('messages'));
      // const localPatients = JSON.parse(localStorage.getItem('Patients'));
      console.log('localMessages:', localMessages);
      // console.log('localPatients:', localPatients);
      // setMessages(msgs => Map(localMessages));
      // setPatients(pas => localPatients);
      // console.log('Patiens after local:', Patients);
    };

    socket.onmessage = msg => {
      console.log('Backend testing, receive message: ', msg);
      const dataFromServer = JSON.parse(msg.data);
      // const patientID = JSON.stringify(dataFromServer.PatientID);
      // console.log('patientID:', patientID);
      console.log(dataFromServer);
      // console.log(dataFromServer.PatientID.toString());
      switch (dataFromServer.Type) {
        // case 6:
        //   // const pID = dataFromServer.PatientID.toString()
        //   // console.log("pID",pID)
        //   // console.log("NewPatient")
        //   setPatients(pats => [
        //     ...pats,
        //     {
        //       PatientID: dataFromServer.DoctorID,
        //       DoctorName: dataFromServer.DoctorName,
        //     },
        //   ]);
        //   setMessages(msgs => msgs.set(dataFromServer.DoctorID.toString(), []));
        //   break;

        case 7:
          setMessages(msg1 => [
            ...msg1,
            {
              sender: dataFromServer.SenderID,
              content: dataFromServer.Content,
              time: dataFromServer.Time,
            },
          ]);
          break;
        case 8:
          setMessages(msg2 => [
            ...msg2,
            {
              sender: dataFromServer.DoctorID,
              content: dataFromServer.Url,
              time: dataFromServer.Time,
            },
          ]);
          break;
        case 9:
          setMessages(msg3 => [
            ...msg3,
            {
              sender: dataFromServer.DoctorID,
              content: dataFromServer.Url,
              time: dataFromServer.Time,
            },
          ]);
          break;
        // case 10:
        //   setQuestions(ques => [...ques, dataFromServer.Questions]);
        //   break;
        case 11:
          break;
        default:
          break;
      }
      console.log('Store messages:', messages);
      localStorage.setItem('messages', JSON.stringify(messages));
      // localStorage.setItem('Patients', JSON.stringify(Patients));
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
        {/* <Grid container item xs={3} spacing={3}>
          <PatientList
            Patients={Patients}
            setCurrentDoctorID={setCurrentDoctorID}
            setDoctorName={setDoctorName}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            setIsEmpty={setIsEmpty}
          />
        </Grid> */}
        <Grid container item xs spacing={3}>
          <TopBar DoctorName={DoctorName} />
          <Messages messages={messages} CurrentUserID={CurrentUserID} />
          <Divider flexItem />
          {/* <ToolBar
            CurrentDoctorID={CurrentDoctorID}
            CurrentUserID={CurrentUserID}
          /> */}
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

export default ChatPatient;
