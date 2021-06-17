import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function RegInfo() {
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    console.log('You clicked submit.');
  };

  return (
    <Box className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.header}>
        <TextField
          className={classes.input}
          label="智能导诊"
          placeholder="请输入您的症状"
          variant="outlined"
          type="search"
          inputProps={{ 'aria-label': 'search mediconnect' }}
        />
        <IconButton
          color="primary"
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
