import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import Popover from '@material-ui/core/Popover';
import Picker from 'emoji-picker-react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ReactComponent as EmojiIcon } from '../../assets/images/emoji.svg';
import { ReactComponent as PicIcon } from '../../assets/images/picture.svg';

const useStyles = makeStyles(theme => ({
  MessagePaddingContainer: {
    padding: theme.spacing(1, 2),
  },
  NoPaddingContainer: {
    padding: theme.spacing(0, 0),
  },
  grid: {
    alignItems: 'center',
  },
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
    // width: '100%',
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
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },
  icon: {
    width: '50%',
    height: '50%',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    padding: theme.spacing(0),
    border: 1,
  },
  topbar: {
    padding: theme.spacing(1),
    border: 1,
    // backgroundColor: 'rgba(230,229,230,.5)',
    backgroundColor: theme.palette.primary.main,
  },
  MessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
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
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: '80%',
    backgroundColor: '#F1F0F3',
    fontSize: '90%',
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
    maxWidth: '80%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '90%',
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
    // background: 'rgba(bd,bd,bd,.5)',
    background: theme.palette.primary.main,
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
    if (event.key === 'Enter') sendMessage(event);
    console.log(`Sending a new message.`);
  };

  return (
    <Container style={{ padding: '0' }}>
      <TextField
        className={classes.textarea}
        id="standard-multiline-flexible"
        multiline
        rowsMax={4}
        // defaultValue="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleMessageSend}
      />
    </Container>
  );
}

function TopBar({ DoctorName }) {
  const classes = useStyles();

  const handleEndClick = event => {
    // closeChat(CurrentDoctorID, CurrentUserID);
  };

  return (
    <Container className={classes.topbar}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Button
          //  onClick={}
          >
            <ArrowBackIosIcon style={{ color: 'white' }} />
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.namepaper} variant="outlined" square>
            {DoctorName}
          </Paper>
        </Grid>
      </Grid>
      <Divider />
    </Container>
  );
}

function ToolBar({ CurrentUserID, setMessages }) {
  const classes = useStyles();
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const handlePopoverOpen2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);

  const handlePicClick = event => {};

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setAnchorEl2(null);
    setMessages(msgs => [
      ...msgs,
      {
        sender: CurrentUserID,
        content: emojiObject.emoji,
        time: moment().format('HH:mm'),
      },
    ]);
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={6}>
        <Button
          onClick={handlePopoverOpen2}
          className={classes.NoPaddingContainer}
        >
          <EmojiIcon />
        </Button>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open2}
          anchorEl={anchorEl2}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose2}
          disableRestoreFocus
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Popover>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handlePicClick} className={classes.NoPaddingContainer}>
          <PicIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

function Message({ message: { sender, content, time }, CurrentUserID }) {
  const classes = useStyles();
  let isSentByCurrentUser = false;
  if (sender === CurrentUserID) {
    isSentByCurrentUser = true;
  }

  return (
    <Container
      style={{
        padding: '0',
      }}
    >
      <Container
        style={{
          padding: '0',
        }}
      >
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

function Messages({ messages, CurrentUserID }) {
  const classes = useStyles();
  // let messagesA = Array.from(messages);
  const messagesA = messages.map(message => (
    <Container
      key={messages.findIndex(obj => obj === message)}
      className={classes.MessagePaddingContainer}
    >
      <Message message={message} CurrentUserID={CurrentUserID} />
    </Container>
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
  const [socket, setSocket] = useState(null);
  const [CurrentUserID, setCurrentUserID] = useState(1983);
  const [DoctorName, setDoctorName] = useState('内科王医生');
  const [CurrentDoctorID, setCurrentDoctorID] = useState(111);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 111, content: '医生发的第一条消息', time: '12:20' },
    { sender: 1983, content: '张三发的第一条消息', time: '12:30' },
    { sender: 1983, content: '张三发的第二条消息', time: '12:33' },
    { sender: 111, content: '医生发的第二条消息', time: '12:34' },
    { sender: 111, content: '医生发的第三条消息', time: '12:35' },
  ]);

  useEffect(() => {
    setSocket(new WebSocket(`/api/patient/${CurrentUserID}/chat`));
  }, [CurrentUserID]);

  console.log(socket);

  const sendMessage = event => {
    event.preventDefault();

    console.log('sending msg: ', message);
    if (message) {
      const json = {
        Type: 1,
        SenderID: CurrentUserID,
        ReceiverID: CurrentDoctorID,
        Content: message,
        Time: moment().format('HH:mm'),
      };
      if (!socket) {
        console.warn('Socket closed???');
        return;
      }
      socket.send(JSON.stringify(json));

      setMessage('');

      setMessages(msgs => [
        ...msgs,
        {
          sender: CurrentUserID,
          content: message,
          time: moment().format('HH:mm'),
        },
      ]);
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      console.log('Successfully Connected');
      const localMessages = JSON.parse(localStorage.getItem('messages'));
    };

    socket.onmessage = msg => {
      console.log('Backend testing, receive message: ', msg);
      const dataFromServer = JSON.parse(msg.data);
      switch (dataFromServer.Type) {
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
              content: `通过链接打开你的病历：${dataFromServer.Url}`,
              time: dataFromServer.Time,
            },
          ]);
          break;
        case 9:
          setMessages(msg3 => [
            ...msg3,
            {
              sender: dataFromServer.DoctorID,
              content: `通过链接打开你的处方：${dataFromServer.Url}`,
              time: dataFromServer.Time,
            },
          ]);
          break;
        case 11:
          break;
        default:
          break;
      }
      localStorage.setItem('messages', JSON.stringify(messages));
      // localStorage.setItem('Patients', JSON.stringify(Patients));
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
    };

    socket.onerror = error => {
      console.log('Socket Error: ', error);
    };
  }, [socket]);

  return (
    <Container style={{ alignItems: 'center' }}>
      <TopBar DoctorName={DoctorName} />
      <Messages messages={messages} CurrentUserID={CurrentUserID} />
      {/* <Divider className={classes.divider} variant="middle" /> */}
      <Grid container className={classes.grid}>
        <Grid item xs={9}>
          <InputBox
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Grid>
        <Grid item xs={3}>
          <ToolBar CurrentUserID={CurrentUserID} setMessages={setMessages} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPatient;
