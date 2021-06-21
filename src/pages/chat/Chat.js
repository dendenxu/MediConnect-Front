import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { fromJS, Map } from 'immutable';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import Popover from '@material-ui/core/Popover';
import { ReactComponent as MedicineIcon } from '../../assets/images/medicine.svg';
import { ReactComponent as QuestionsIcon } from '../../assets/images/questions.svg';
import { ReactComponent as RecordIcon } from '../../assets/images/record.svg';

const useStyles = makeStyles(theme => ({
  NoSidePaddingContainer: {
    padding: theme.spacing(1, 0),
  },
  OutlineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // border: 5,
    // borderRadius: 30,
    // boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    padding: theme.spacing(3),
    margin: theme.spacing(0),
    width: '100%',
    height: '100%',
  },
  textarea: {
    display: 'flex',
    width: '100%',
    // padding: theme.spacing(1),
    margin: theme.spacing(1),
    lineHeight: 3,
    // border: 1,
    // borderRadius: 30,
    // boxShadow: '0 1px 1px 1px rgba(9, 9, 9, .3)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(230,229,230,.5)',
    selected: '#F1F0F3',
  },
  // listItem: {
  //   backgroundColor:''
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
    backgroundColor: 'transparent',
  },
  icon: {
    width: '50%',
    height: '50%',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
    border: 1,
  },
  topbar: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    border: 1,
    backgroundColor: 'rgba(230,229,230,.5)',
    height: '8%',
  },
  MessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '100%',
    height: '300px',
  },
  HisMessageBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'left',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '45%',
    backgroundColor: '#F1F0F3',
    '&::after': {
      content: `''`,
      position: 'absolute',
      left: '-16px',
      top: '5px',
      width: '0',
      height: '0',
      border: '8px solid transparent',
      borderRightColor: '#F1F0F3',
    },
  },
  MyMessageBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'left',
    alignSelf: 'flex-end',
    textAlign: 'justify',
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '45%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&::after': {
      content: `''`,
      position: 'absolute',
      right: '-16px',
      top: '5px',
      width: '0',
      height: '0',
      border: '8px solid transparent',
      borderLeftColor: theme.palette.primary.main,
    },
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
  divider: {
    background: 'rgba(bd,bd,bd,.5)',
    width: '95%',
    // padding: theme.spacing(1),
    // margin: theme.spacing(1),
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
    if (event.key === 'Enter') {
      sendMessage(event);
      console.log(`Sending a new message.`);
    }
  };

  return (
    <Container style={{ margin: '0' }}>
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
  setPatients,
}) {
  const classes = useStyles();

  const handleListItemClick = (event, index, PatientID, PatientName) => {
    setIsEmpty(false);
    setSelectedIndex(index);
    setCurrentPatientID(PatientID);
    setPatientName(PatientName);
    setPatients(pats =>
      pats.map(p => {
        if (p.PatientID === PatientID)
          return {
            PatientID: p.PatientID,
            PatientName: p.PatientName,
            NewMessageCount: 0,
          };
        return p;
      }),
    );
  };

  console.log('Patients:', Patients);

  const patientsA = Patients.map(Patient => (
    <ListItem
      divider
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
      <Badge badgeContent={Patient.NewMessageCount} color="primary">
        <ListItemText primary={Patient.PatientName} />
      </Badge>
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
  closeChat,
}) {
  const classes = useStyles();

  const handleEndClick = event => {
    closeChat(CurrentPatientID);

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
          <Grid item xs={9}>
            <Container
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
              }}
            >
              <Button
                className={classes.endButton}
                variant="contained"
                color="primary"
                onClick={handleEndClick}
              >
                结束挂号
              </Button>
            </Container>
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

function ToolBar({
  CurrentPatientID,
  CurrentUserID,
  Questions,
  setMessages,
  requireMedicalRecord,
  requirePrescription,
}) {
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
            {
              sender: CurrentUserID,
              content: Question,
              time: moment().format('HH:mm'),
            },
          ]),
        );
      }}
    >
      <ListItemText primary={Question} />
    </ListItem>
  ));

  return (
    <Container className={classes.toolbar}>
      <Grid container spacing={2}>
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
    <Container style={{ padding: '0' }}>
      <Container style={{ padding: '0' }}>
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
          padding: '0',
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
        <Container
          key={message.time}
          className={classes.NoSidePaddingContainer}
        >
          <Message message={message} CurrentUserID={CurrentUserID} />
        </Container>
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
    <ScrollToBottom className={classes.MessageContainer}>{}</ScrollToBottom>
  );
}

function Chat() {
  const classes = useStyles();
  const [socket, setSocket] = useState(null);
  const [CurrentUserID, setCurrentUserID] = useState(111);
  const [PatientName, setPatientName] = useState('');
  const [Patients, setPatients] = useState([
    { PatientID: 1983, PatientName: '张三', NewMessageCount: 1 },
    { PatientID: 1985, PatientName: '李四', NewMessageCount: 2 },
    { PatientID: 1987, PatientName: '王五', NewMessageCount: 3 },
  ]);
  const [CurrentPatientID, setCurrentPatientID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(
    Map({
      1983: [
        { sender: 111, content: '医生发的第一条消息', time: '12:20' },
        { sender: 1983, content: '张三发的第一条消息', time: '12:30' },
        { sender: 1983, content: '张三发的第二条消息', time: '12:33' },
        { sender: 111, content: '医生发的第二条消息', time: '12:34' },
        { sender: 111, content: '医生发的第三条消息', time: '12:35' },
        { sender: 111, content: '医生发的第四条消息', time: '12:36' },
        { sender: 111, content: '医生发的第五条消息', time: '12：37' },
        { sender: 111, content: '医生发的第六条消息', time: '12：38' },
        { sender: 111, content: '医生发的第七条消息', time: '12：39' },
        { sender: 111, content: '医生发的第八条消息', time: '12：40' },
        { sender: 111, content: '医生发的第九条消息', time: '12：41' },
        { sender: 111, content: '医生发的第十条消息', time: '12：42' },
        { sender: 1983, content: '张三发的第三条消息', time: '12：43' },
        { sender: 1983, content: '张三发的第四条消息', time: '12：44' },
        { sender: 1983, content: '张三发的第五条消息', time: '12：45' },
        { sender: 1983, content: '张三发的第六条消息', time: '12：46' },
        { sender: 1983, content: '张三发的第七条消息', time: '12：47' },
        { sender: 1983, content: '张三发的第八条消息', time: '12：48' },
        { sender: 1983, content: '张三发的第九条消息', time: '12：49' },
        { sender: 1983, content: '张三发的第十条消息', time: '12：50' },
      ],
      1985: [
        { sender: 111, content: '医生发的第一条消息', time: '14:30' },
        { sender: 1985, content: '李四发的第二条消息', time: '14:33' },
        {
          sender: 111,
          content: '点击链接查看你的病历：https://www.baidu.com/',
          time: '14:33',
        },
        {
          sender: 111,
          content: '点击链接查看你的处方：https://www.baidu.com/',
          time: '14:33',
        },
      ],
      1987: [],
    }),
  );
  const [Questions, setQuestions] = useState([
    '能详细描述一下你的病症吗？',
    '请问您有任何药物或食物过敏吗',
    '请问您有测过体温吗？体温是多少呢？',
    '能具体说说你昨天吃了什么东西吗？',
    '这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题这是一条很长的问题',
    '检测多条问题的问题一',
    '检测多条问题的问题二',
    '检测多条问题的问题三',
    '检测多条问题的问题四',
    '检测多条问题的问题五',
    '检测多条问题的问题六',
    '检测多条问题的问题七',
    '检测多条问题的问题八',
    '检测多条问题的问题九',
    '检测多条问题的问题十',
  ]);
  const [IsEmpty, setIsEmpty] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();

  const closeChat = patientID => {
    if (!socket) {
      return;
    }
    const json = {
      Type: 2,
      ReceiverID: patientID,
      // DoctorID: doctorID,
    };
    console.log('json from closeChat:', json);
    socket.send(JSON.stringify(json));
  };

  const requireMedicalRecord = (patientID, doctorID) => {
    if (!socket) {
      return;
    }
    const json = {
      Type: 3,
      DoctorID: doctorID,
      PatientID: patientID,
    };
    console.log('json from requireMedicalRecord:', json);
    socket.send(JSON.stringify(json));
  };

  const requirePrescription = (patientID, doctorID) => {
    if (!socket) {
      return;
    }
    const json = {
      Type: 4,
      DoctorID: doctorID,
      PatientID: patientID,
    };
    console.log('json from requirePrescription:', json);
    socket.send(JSON.stringify(json));
  };

  const sendMessage = event => {
    event.preventDefault();

    console.log('sending msg: ', message);
    if (message) {
      const json = {
        Type: 1,
        SenderID: CurrentUserID,
        ReceiverID: CurrentPatientID,
        Content: message,
        Time: moment().format('HH:mm'),
      };
      console.log('json from msgFromClient:', json);
      if (!socket) {
        console.warn('Socket closed???');
        return;
      }
      socket.send(JSON.stringify(json));

      setMessage('');

      setMessages(msgs =>
        msgs.update(CurrentPatientID.toString(), msg => [
          ...msg,
          {
            sender: CurrentUserID,
            content: message,
            time: moment().format('HH:mm'),
          },
        ]),
      );
    }
  };

  useEffect(() => {
    setSocket(new WebSocket(`/api/doctor/${CurrentUserID}/chat`));
  }, [CurrentUserID]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      console.log('Successfully Connected');
      // hello('Doctor', CurrentUserID);
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
              NewMessageCount: 0,
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
          setPatients(pats =>
            pats.map(p => {
              if (p.PatientID === dataFromServer.SenderID.toString())
                return {
                  PatientID: p.PatientID,
                  PatientName: p.PatientName,
                  NewMessageCount: p.NewMessageCount + 1,
                };
              return p;
            }),
          );
          break;
        case 8:
          setMessages(msgs =>
            msgs.update(dataFromServer.PatientID.toString(), msg2 => [
              ...msg2,
              {
                sender: dataFromServer.PatientID,
                content: `通过链接打开你的病历：${dataFromServer.Url}`,
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
                content: `通过链接打开你的处方：${dataFromServer.Url}`,
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
  }, [socket]);

  return (
    <Container className={classes.OutlineContainer}>
      <Grid container spacing={1}>
        <Grid container item xs={3} spacing={3}>
          <PatientList
            Patients={Patients}
            setCurrentPatientID={setCurrentPatientID}
            setPatientName={setPatientName}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            setIsEmpty={setIsEmpty}
            setPatients={setPatients}
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
            closeChat={closeChat}
          />
          <Messages
            messages={messages}
            CurrentUserID={CurrentUserID}
            IsEmpty={IsEmpty}
            CurrentPatientID={CurrentPatientID}
          />
          {/* <Divider className={classes.divider} /> */}
          <Divider className={classes.divider} variant="middle" />
          <ToolBar
            CurrentPatientID={CurrentPatientID}
            CurrentUserID={CurrentUserID}
            Questions={Questions}
            setMessages={setMessages}
            requireMedicalRecord={requireMedicalRecord}
            requirePrescription={requirePrescription}
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
