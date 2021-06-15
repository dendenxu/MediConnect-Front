import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },
  header: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '90px',
    width: '100%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    marginLeft: '28px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  body: {
    padding: '10px 25px auto 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  content: {},
}));

export default function DepartmentInfo() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.title}>挂号详情</Box>
      </Box>
      <Box className={classes.body}>
        <Box className={classes.content}>
          <Box>科室介绍</Box>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Box>
    </Box>
  );
}
