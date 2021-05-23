import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button, Input } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  borderedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: 5,
    borderRadius: 30,
    boxShadow: "0 0px 5px 1px rgba(33, 33, 33, .3)",
    padding: theme.spacing(3),
    width: "70%",
    height: "100%"
  },
  textarea: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(1),
    lineHeight: 3,
    border: 1,
    // borderRadius: 30,
    boxShadow: "0 1px 1px 1px rgba(9, 9, 9, .3)"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    width: "100%",
    padding: theme.spacing(1)
    // selected: theme.palette.primary.main
  },
  endButton: {
    border: 1,
    color: "white",
    padding: theme.spacing(1)
  },
  namepaper: {
    border: 1,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  icon: {
    width: "50%",
    height: "50%",
    color: theme.palette.text.secondary
  },
  toolbar: {
    padding: theme.spacing(1),
    border: 1
  },
  topbar: {
    padding: theme.spacing(1),
    border: 1
  },
  MessageContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    width: "100%"
  },
  HisMessageBox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "left",
    textAlign: "justify",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "50%",
    backgroundColor: "#F1F0F3"
  },
  MyMessageBox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "left",
    alignSelf: "flex-end",
    textAlign: "justify",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "50%",
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  timebox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1)
  },
  timetext: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // ! special operation for Josefin Sans
    transform: "translate(0px,1.5px)"
  }
}));

function InputBox() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <TextField
        className={classes.textarea}
        id="standard-multiline-flexible"
        multiline
        rows={10}
        // defaultValue="Hello World."
        // value={value}
        // onChange={handleChange}
      />
    </Container>
  );
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function PatientList() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    //这里可以加上：1.消除Badge 2.更改选中后的高亮颜色（目前不知道咋改）
  };

  return (
    <Container className={classes.list}>
      <List component="nav" aria-label="Patient List">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <Badge badgeContent={4} color="primary">
            <ListItemText primary="Patient1" />
          </Badge>
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary="Patient2" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Patient3" />
        </ListItem>
      </List>
    </Container>
  );
}

function TopBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleClick = (event) => {
    setValue(event.target.value);
  }; //改

  return (
    <Container className={classes.topbar}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.namepaper} variant="outlined" square>
            张三
          </Paper>
        </Grid>
        <Grid item>
          <Button
            className={classes.endButton}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            结束挂号
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function ToolBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleClick = (event) => {
    setValue(event.target.value);
  }; //改

  return (
    <Container className={classes.toolbar}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button onClick={handleClick}>
            <EmojiEmotionsOutlinedIcon className={classes.icon} />
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleClick}>
            <ImageOutlinedIcon className={classes.icon} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function Messages() {
  const classes = useStyles();

  return (
    <Container className={classes.MessageContainer}>
      <Typography
        variant="caption"
        className={classes.timetext}
        color="textSecondary"
      >
        16:30
      </Typography>
      <Paper className={classes.HisMessageBox} elevation={2}>
        Hello!
      </Paper>
      <Typography
        variant="caption"
        className={classes.timetext}
        color="textSecondary"
      >
        16:31
      </Typography>
      <Paper className={classes.MyMessageBox} elevation={2}>
        Hi! I'm Doctor Judy from Neurosurgery. How can I help you?
      </Paper>
    </Container>
  );
}

function Chat() {
  const classes = useStyles();

  return (
    <Container className={classes.borderedContainer}>
      <Grid container spacing={1}>
        <Grid container item xs={3} spacing={3}>
          <PatientList />
        </Grid>
        <Grid container item xs spacing={3}>
          <TopBar />
          <Messages />
          <Divider flexItem />
          <ToolBar />
          <InputBox />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
