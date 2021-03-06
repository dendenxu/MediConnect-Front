import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import { Map } from 'immutable';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import Popover from '@material-ui/core/Popover';
import Picker from 'emoji-picker-react';
import ReactFileReader from 'react-file-reader';

// import { ReactComponent as MedicineIcon } from '../../assets/images/medicine.svg';

import AddBoxIcon from '@material-ui/icons/AddBox';

import {
  AdjustOutlined,
  DeleteOutline,
  FilterTiltShiftOutlined,
} from '@material-ui/icons';
import { ReactComponent as QuestionsIcon } from '../../assets/images/questions.svg';
import { ReactComponent as RecordIcon } from '../../assets/images/record.svg';
import { ReactComponent as EmojiIcon } from '../../assets/images/emoji.svg';
import { ReactComponent as PicIcon } from '../../assets/images/picture.svg';

const useStyles = makeStyles(theme => ({
  MessagePaddingdiv: {
    padding: theme.spacing(1, 2),
  },
  NoSidePaddingdiv: {
    padding: theme.spacing(1, 0),
  },
  Outlinediv: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // // border: 5,
    // // borderRadius: 30,
    // // boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
    // padding: theme.spacing(0),
    // margin: theme.spacing(0),
    // width: '100%',
    // height: '100%',
  },
  textarea: {
    // display: 'flex',
    // width: '100%',
    // padding: theme.spacing(1),
    // margin: theme.spacing(1),
    // lineHeight: 3,
    // border: 1,
    // borderRadius: 30,
    // boxShadow: '0 1px 1px 1px rgba(9, 9, 9, .3)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    minWidth: 200,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: 'rgba(230,229,230,.5)',
    selected: '#F1F0F3',
    border: 5,
    borderRadius: 25,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  listItem: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: 'white',
    border: 5,
    borderColor: 'white',
    borderRadius: 16,
    // backgroundColor: '#0001',
    color: 'white',
  },
  endButton: {
    color: 'white',
    border: 1,
    borderRadius: 10,
    padding: theme.spacing(1),
    // background: 'rgb(243,166,123)',
  },
  namepaper: {
    // border: 1,
    // padding: theme.spacing(1),
    // textAlign: 'left',
    // // fontSize:'120%',
    // backgroundColor: 'transparent',
    // color: 'white',
  },
  icon: {
    // width: '50%',
    // height: '50%',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, 0),
    border: 5,
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  topbar: {
    // padding: theme.spacing(0),
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0),
    // backgroundColor: 'rgba(230,229,230,.5)',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    // height: '8%',
    // width: '100%',
    border: 5,
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  message: {
    width: '75%',
    margin: theme.spacing(1),
    // padding: theme.spacing(2),
    // border: 5,
    // borderRadius: 16,
    // boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },
  Messagediv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    // width: '100%',
    // height: '30%',
    height: 300,
    flexGrow: '1',
    // maxHeight: '300px',
    border: 5,
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
  },

  input: {
    margin: theme.spacing(0, 0),
    padding: theme.spacing(2, 2),
    border: 5,
    borderRadius: 16,
    boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
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
    width: 'fit-content',
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
    // margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: 'fit-content',
    maxWidth: '80%',
    backgroundColor: theme.palette.primary.main,
    fontSize: '90%',
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
    // background: 'rgba(bd,bd,bd,.5)',
    background: theme.palette.primary.main,
    width: '95%',
    // padding: theme.spacing(1),
    // margin: theme.spacing(1),
  },
  badge: {
    backgroundColor: 'rgb(243,166,123)',
    // backgroundColor: theme.palette.primary.main,
  },
}));

function InputBox({ message, setMessage, sendMessage }) {
  const classes = useStyles();

  const handleMessageChange = event => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const handleMessageSend = event => {
    if (event.key === 'Enter') {
      sendMessage(event);
      console.log(`Sending a new message.`);
    }
  };

  return (
    <div className={classes.input}>
      <TextField
        className={classes.textarea}
        id="standard-multiline-flexible"
        multiline
        rows={8}
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        // defaultValue="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleMessageSend}
      />
    </div>
  );
}

function PatientList({
  Patients,
  setCurrentPatientID,
  setPatientName,
  setStatus,
  setRegID,
  setSelectedIndex,
  selectedIndex,
  setIsEmpty,
  setPatients,
  updatePatients,
}) {
  const classes = useStyles();

  const [mileStones, setMileStones] = useState([]);
  const [mileRegID, setMileRegID] = useState(-1);

  const handleListItemClick = (
    event,
    index,
    PatientID,
    PatientName,
    Status,
    regID,
  ) => {
    setIsEmpty(false);
    setSelectedIndex(index);
    setCurrentPatientID(PatientID);
    setPatientName(PatientName);
    setStatus(Status);
    setRegID(regID);
    setMileRegID(regID);

    const url = `/api/registration/${regID}`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(rdata => {
        if (rdata.status === 'ok') {
          setMileStones(rdata.data.milestone);
        }
      });

    setPatients(pats =>
      pats.map(p => {
        if (p.PatientID === PatientID)
          return {
            PatientID: p.PatientID,
            PatientName: p.PatientName,
            NewMessageCount: 0,
            Status: p.Status,
            regID: p.regID,
          };
        return p;
      }),
    );
    console.log('In handleListItemClick:', Patients);
  };

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
          Patient.Status,
          Patient.regID,
        )
      }
    >
      <Badge
        badgeContent={Patient.NewMessageCount}
        classes={{ badge: classes.badge }}
        max={99}
      >
        {Patient.Status === 'committed' && (
          <FilterTiltShiftOutlined style={{ fill: 'white' }} />
        )}
        {Patient.Status === 'accepted' && (
          <AdjustOutlined style={{ fill: 'limegreen' }} />
        )}
        <ListItemText primary={Patient.PatientName} />
      </Badge>
    </ListItem>
  ));

  const [newTodo, setNewTodo] = useState(['']);

  const handleInputTodo = e => {
    setNewTodo(e.target.value);
  };
  const handleAddTodo = () => {
    if (newTodo !== '') {
      console.log(newTodo);
      const url = `/api/milestones`;
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_id: mileRegID,
          activity: newTodo,
        }),
      })
        .then(res => res.json())
        .then(rdata => {
          console.log(rdata);
          if (rdata.status === 'ok') {
            console.log(mileStones.length);
            const tmpArr = mileStones;
            tmpArr.push({
              id: mileStones[mileStones.length - 1].id + 1,
              activity: newTodo,
              checked: false,
            });
            setMileStones(tmpArr);
            setNewTodo('');
          }
        });
    }
  };

  const handleChange = (update, index, id) => {
    const url = `/api/milestone/${id}`;
    fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checked: update,
      }),
    })
      .then(res => res.json())
      .then(rdata => {
        console.log(rdata);
        if (rdata.status === 'ok') {
          mileStones[index].checked = update;
          setMileStones([]);
          setMileStones(mileStones);
        }
      });
  };

  const handleDelete = (index, id) => {
    const url = `/api/milestone/${id}`;
    fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(rdata => {
        console.log(rdata);
        if (rdata.status === 'ok') {
          console.log('.........');
          mileStones.splice(index, 1);
          setMileStones([]);
          setMileStones(mileStones);
        }
      });
  };

  return (
    <div className={classes.list}>
      <List component="nav" aria-label="Patient List">
        {patientsA}
      </List>
      <Divider style={{ background: 'whitesmoke' }} />
      <List>
        {mileStones &&
          mileStones
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((data, index) => (
              <ListItem>
                <Checkbox
                  checked={data.checked}
                  onChange={() => {
                    handleChange(!data.checked, index, data.id);
                  }}
                  style={{ color: '#ffffff' }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <ListItemText
                  primary={
                    <Typography
                      style={{ color: '#FFFFFF', overflowX: 'hidden' }}
                    >
                      {data.activity}
                    </Typography>
                  }
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleDelete(index, data.id);
                  }}
                  style={{ color: '#ffffff' }}
                >
                  <DeleteOutline />
                </IconButton>
              </ListItem>
            ))}
      </List>
      <form
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: '10px',
          paddingLeft: '10px',
        }}
      >
        <Input
          color="secondary"
          placeholder="??????????????????"
          size="small"
          value={newTodo}
          onChange={handleInputTodo}
        />
        <IconButton
          color="secondary"
          onClick={handleAddTodo}
          aria-label="add a milestone"
        >
          <AddBoxIcon />
        </IconButton>
      </form>
    </div>
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
  regID,
  Status,
  setStatus,
  IsEmpty,
  setIsEmpty,
  setSelectedIndex,
  closeChat,
  saveLocal,
  setMessages,
  messgaes,
  updatePatients,
}) {
  const classes = useStyles();

  const handleClick = () => {
    if (Status === 'committed') {
      const url = `/api/registration/${regID}`;
      fetch(url, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'accepted',
        }),
      })
        .then(res => res.json())
        .then(rdata => {
          if (rdata.status === 'ok') {
            setStatus('accepted');
            updatePatients();
          }
        });
    } else {
      const url = `/api/registration/${regID}`;
      fetch(url, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'terminated',
          terminatedCause: '????????????',
        }),
      })
        .then(res => res.json())
        .then(rdata => {
          if (rdata.status === 'ok') {
            closeChat(CurrentPatientID);
            setSelectedIndex();

            updatePatients();
            setIsEmpty(true);
            setMessages(msgs => msgs.delete(CurrentPatientID.toString()));
            setPatientName('');
            setCurrentPatientID('');
            saveLocal();
            updatePatients();
          }
        });
    }
  };

  function renderButtonText() {
    switch (Status) {
      case 'committed':
        return '????????????';
      case 'accepted':
        return '????????????';
      default:
        return '...';
    }
  }

  function renderButtonColor() {
    switch (Status) {
      case 'committed':
        return 'rgb(243,166,123)';
      case 'accepted':
        return 'red';
      default:
        return '';
    }
  }

  return (
    <div className={classes.topbar}>
      {!IsEmpty && (
        <>
          {/* <Paper className={classes.namepaper} variant="outlined" square> */}
          {Status === 'committed' && (
            <FilterTiltShiftOutlined style={{ fill: 'white' }} />
          )}
          {Status === 'accepted' && (
            <AdjustOutlined style={{ fill: 'limegreen' }} />
          )}
          <Typography
            style={{
              color: 'white',
            }}
          >
            {PatientName}
          </Typography>
          {/* </Paper> */}
          <div
            style={{
              flexGrow: 1,
            }}
          />
        </>
      )}
      <div
        style={{
          flexGrow: 1,
        }}
      />

      <Button
        disabled={IsEmpty}
        className={classes.endButton}
        variant="contained"
        color="primary"
        style={{
          backgroundColor: renderButtonColor(),
        }}
        size="small"
        onClick={handleClick}
      >
        {renderButtonText()}
      </Button>
    </div>
  );
}

function ToolBar({
  CurrentPatientID,
  CurrentUserID,
  Questions,
  IsEmpty,
  setMessages,
  requireMedicalRecord,
  requirePrescription,
  socket,
  saveLocal,
}) {
  const classes = useStyles();

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const handlePopoverOpen1 = event => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const handlePopoverOpen2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handlePicClick = event => {};

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setAnchorEl2(null);
    const json = {
      Type: 1,
      SenderID: CurrentUserID,
      ReceiverID: CurrentPatientID,
      Content: emojiObject.emoji,
      Time: moment().format('HH:mm'),
    };
    if (socket) {
      socket.send(JSON.stringify(json));
    }
    setMessages(msgs =>
      msgs.update(CurrentPatientID.toString(), msg => [
        ...msg,
        {
          sender: CurrentUserID,
          content: emojiObject.emoji,
          time: moment().format('HH:mm'),
        },
      ]),
    );
    saveLocal();
  };

  const handleRecClick = event => {
    requireMedicalRecord(CurrentPatientID, CurrentUserID);
  };

  const handleFiles = files => {
    console.log('file: ', files.base64);
    const json = {
      Type: 1,
      SenderID: CurrentUserID,
      ReceiverID: CurrentPatientID,
      Content: files.base64,
      Time: moment().format('HH:mm'),
    };
    if (socket) {
      socket.send(JSON.stringify(json));
    }
    setMessages(msgs =>
      msgs.update(CurrentPatientID.toString(), msg => [
        ...msg,
        {
          sender: CurrentUserID,
          content: files.base64,
          time: moment().format('HH:mm'),
        },
      ]),
    );
  };

  const QuestionsA = Questions.map(Question => (
    <ListItem
      // className={classes.listItem}
      key={Questions.findIndex(obj => obj === Question)}
      button
      onClick={event => {
        setAnchorEl1(null);
        const json = {
          Type: 1,
          SenderID: CurrentUserID,
          ReceiverID: CurrentPatientID,
          Content: Question,
          Time: moment().format('HH:mm'),
        };
        if (socket) {
          socket.send(JSON.stringify(json));
        }
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
        saveLocal();
      }}
    >
      <ListItemText primary={Question} />
    </ListItem>
  ));

  return (
    <div className={classes.toolbar}>
      <IconButton disabled={IsEmpty} onClick={handlePopoverOpen2}>
        <EmojiIcon />
      </IconButton>
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

      <ReactFileReader
        disabled={IsEmpty}
        fileTypes={['.png', '.jpg', '.gif', 'jpeg']}
        base64
        multipleFiles={!1}
        handleFiles={handleFiles}
      >
        <IconButton disabled={IsEmpty}>
          <PicIcon />
        </IconButton>
      </ReactFileReader>
      <IconButton disabled={IsEmpty} onClick={handlePopoverOpen1}>
        <QuestionsIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open1}
        anchorEl={anchorEl1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose1}
        disableRestoreFocus
      >
        <List>{QuestionsA}</List>
      </Popover>
      <IconButton disabled={IsEmpty} onClick={handleRecClick}>
        <RecordIcon />
      </IconButton>
    </div>
  );
}

function Message({ message: { sender, content, time }, CurrentUserID }) {
  const classes = useStyles();
  let isSentByCurrentUser = false;
  const reg = /data./;
  if (sender === CurrentUserID) {
    isSentByCurrentUser = true;
  }

  if (reg.test(content)) {
    return (
      <div>
        <div className={classes.NoSidePaddingdiv}>
          <Typography
            variant="caption"
            className={classes.timetext}
            color="textSecondary"
          >
            {time}
          </Typography>
        </div>
        <div
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
            <img src={content} alt="src" width="100px" height="100px" />
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.NoSidePaddingdiv}>
        <Typography
          variant="caption"
          className={classes.timetext}
          color="textSecondary"
        >
          {time}
        </Typography>
      </div>
      <div
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
      </div>
    </div>
  );
}

function Messages({ messages, CurrentUserID, IsEmpty, CurrentPatientID }) {
  const classes = useStyles();
  console.log('In Messages: ', messages);
  console.log('In Messages, CurrentPatientID: ', CurrentPatientID);
  console.log('In Messages, IsEmpty: ', IsEmpty);
  const messagesA = !IsEmpty
    ? messages.get(CurrentPatientID.toString()).map(message => (
        <div
          key={messages
            .get(CurrentPatientID.toString())
            .findIndex(obj => obj === message)}
          className={classes.MessagePaddingdiv}
        >
          <Message message={message} CurrentUserID={CurrentUserID} />
        </div>
      ))
    : {};

  if (!IsEmpty)
    return (
      <ScrollToBottom className={classes.Messagediv}>
        {messagesA}
      </ScrollToBottom>
    );
  return <ScrollToBottom className={classes.Messagediv}>{}</ScrollToBottom>;
}

function Chat(props) {
  const classes = useStyles();
  const [socket, setSocket] = useState(null);
  const [CurrentUserID, setCurrentUserID] = useState(1);
  const [PatientName, setPatientName] = useState('');
  const [Status, setStatus] = useState('');
  const [Patients, setPatients] = useState([]);
  const { CurrentPatientID, setCurrentPatientID } = props;
  const [message, setMessage] = useState('');
  const [regID, setRegID] = useState();
  // const [messages, setMessages] = useState(
  //   Map({
  //     1983: [
  //       { sender: 111, content: '???????????????????????????', time: '12:20' },
  //       { sender: 1983, content: '???????????????????????????', time: '12:30' },
  //       { sender: 1983, content: '???????????????????????????', time: '12:33' },
  //       { sender: 111, content: '???????????????????????????', time: '12:34' },
  //       { sender: 111, content: '???????????????????????????', time: '12:35' },
  //       { sender: 111, content: '???????????????????????????', time: '12:36' },
  //       { sender: 111, content: '???????????????????????????', time: '12???37' },
  //       { sender: 111, content: '???????????????????????????', time: '12???38' },
  //       { sender: 111, content: '???????????????????????????', time: '12???39' },
  //       { sender: 111, content: '???????????????????????????', time: '12???40' },
  //       { sender: 111, content: '???????????????????????????', time: '12???41' },
  //       { sender: 111, content: '???????????????????????????', time: '12???42' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???43' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???44' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???45' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???46' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???47' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???48' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???49' },
  //       { sender: 1983, content: '???????????????????????????', time: '12???50' },
  //     ],
  //     1985: [
  //       { sender: 111, content: '???????????????????????????', time: '14:30' },
  //       { sender: 1985, content: '???????????????????????????', time: '14:33' },
  //       // {
  //       //   sender: 111,
  //       //   content: '?????????????????????????????????https://www.baidu.com/',
  //       //   time: '14:33',
  //       // },
  //       // {
  //       //   sender: 111,
  //       //   content: '?????????????????????????????????https://www.baidu.com/',
  //       //   time: '14:33',
  //       // },
  //     ],
  //     1987: [],
  //     222: [],
  //   }),
  // );
  const [messages, setMessages] = useState(Map({}));
  const [Questions, setQuestions] = useState([
    '???????????????????????????????????????',
    '??????????????????????????????????????????',
    '???????????????????????????????????????????????????',
    '????????????????????????????????????????????????',
  ]);
  const [IsEmpty, setIsEmpty] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();
  let interval;

  const saveLocal = () => {
    localStorage.setItem('messages', JSON.stringify(messages));
    // localStorage.setItem('Patients', JSON.stringify(Patients));
    console.log('SaveLocal: ', messages);
    console.log(
      'SaveLocal, saved? : ',
      JSON.parse(localStorage.getItem('messages')),
    );
    // console.log('SaveLocal: ', Patients);
  };

  const updatePatients = () => {
    fetch(`/api/registrations`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        // setPatients(pas => data.data);
        setPatients([]);
        console.log('data.data:', data.data);
        data.data.map(p => {
          setPatients(pas => [
            ...pas,
            {
              PatientID: p.patient_id,
              PatientName: p.patient,
              NewMessageCount: p.NewMessageCount ? p.NewMessageCount : 0,
              Status: p.status,
              regID: p.id,
            },
          ]);
          if (!messages.has(p.patient_id.toString())) {
            setMessages(msgs => msgs.set(p.patient_id.toString(), []));
          }

          return p;
        });
      });
  };

  const closeChat = patientID => {
    if (!socket) {
      return;
    }
    const json = {
      Type: 2,
      ReceiverID: patientID,
      // DoctorID: doctorID,
    };
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
    socket.send(JSON.stringify(json));
  };

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      const json = {
        Type: 1,
        SenderID: CurrentUserID,
        ReceiverID: CurrentPatientID,
        Content: message,
        Time: moment().format('HH:mm'),
      };
      if (!socket) {
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
      saveLocal();
    }
  };

  useEffect(() => {
    const localAccount = JSON.parse(localStorage.getItem('account'));
    console.log('Account: ', localAccount.ID);
    setCurrentUserID(localAccount.ID);
    const localMessages = JSON.parse(localStorage.getItem('messages'));
    console.log('Initial localMessages: ', localMessages);
    if (localMessages) {
      setMessages(msgs => Map(localMessages));
      console.log('Initial Messages: ', messages);
    }
    updatePatients();
    saveLocal();
  }, []);

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
    };

    interval = setInterval(() => {
      socket.send('ping!');
      // console.log('ping!');
    }, 30000);

    socket.onmessage = msg => {
      const dataFromServer = JSON.parse(msg.data);
      console.log('dataFromServer: ', dataFromServer);
      switch (dataFromServer.Type) {
        case 6:
          updatePatients();
          setMessages(msgs =>
            msgs.set(dataFromServer.PatientID.toString(), []),
          );
          console.log('In setPatients: ', Patients);
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
          console.log(CurrentPatientID);
          console.log(dataFromServer.SenderID);
          if (CurrentPatientID !== dataFromServer.SenderID) {
            setPatients(pats =>
              pats.map(p => {
                if (p.PatientID === dataFromServer.SenderID)
                  return {
                    PatientID: p.PatientID,
                    PatientName: p.PatientName,
                    NewMessageCount: p.NewMessageCount + 1,
                  };
                return p;
              }),
            );
          }
          console.log('In case 7:', Patients);
          break;
        case 8:
          setMessages(msgs =>
            msgs.update(dataFromServer.PatientID.toString(), msg2 => [
              ...msg2,
              {
                sender: CurrentUserID,
                content: `?????????????????????????????????${dataFromServer.Url}`,
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
                sender: CurrentUserID,
                content: `?????????????????????????????????${dataFromServer.Url}`,
                time: dataFromServer.Time,
              },
            ]),
          );
          break;
        case 10:
          setQuestions(ques => [...ques, dataFromServer.Questions]);
          break;
        case 12:
          updatePatients();
          break;
        default:
          break;
      }
      console.log(Patients);
      saveLocal();
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
    };

    socket.onerror = error => {
      console.log('Socket Error: ', error);
    };
  }, [socket, CurrentPatientID]);

  useEffect(() => {
    saveLocal();
  });

  return (
    <div {...props} className={`${classes.Outlinediv} ${props.className}`}>
      {/* <Grid
        div
        spacing={1}
        style={{
          height: '100%',
        }}
      > */}
      {/* <Grid div item xs={3} spacing={3}> */}
      <PatientList
        Patients={Patients}
        setCurrentPatientID={setCurrentPatientID}
        setPatientName={setPatientName}
        setStatus={setStatus}
        setRegID={setRegID}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
        setIsEmpty={setIsEmpty}
        setPatients={setPatients}
        updatePatients={updatePatients}
      />
      <div className={classes.message}>
        <TopBar
          Patients={Patients}
          setPatients={setPatients}
          CurrentUserID={CurrentUserID}
          CurrentPatientID={CurrentPatientID}
          setCurrentPatientID={setCurrentPatientID}
          setPatientName={setPatientName}
          PatientName={PatientName}
          Status={Status}
          setStatus={setStatus}
          regID={regID}
          IsEmpty={IsEmpty}
          setIsEmpty={setIsEmpty}
          setSelectedIndex={setSelectedIndex}
          closeChat={closeChat}
          saveLocal={saveLocal}
          setMessages={setMessages}
          messages={messages}
          updatePatients={updatePatients}
        />
        <Messages
          messages={messages}
          CurrentUserID={CurrentUserID}
          IsEmpty={IsEmpty}
          CurrentPatientID={CurrentPatientID}
        />
        <ToolBar
          CurrentPatientID={CurrentPatientID}
          CurrentUserID={CurrentUserID}
          Questions={Questions}
          IsEmpty={IsEmpty}
          setMessages={setMessages}
          requireMedicalRecord={requireMedicalRecord}
          requirePrescription={requirePrescription}
          socket={socket}
          saveLocal={saveLocal}
        />
        <InputBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
