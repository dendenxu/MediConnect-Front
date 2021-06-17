import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  input: {
    flex: 1,
    width: '100%',
  },
  iconButton: {
    marginRight: '-10px',
  },
  cancelButton: {
    color: 'rgba(0,0,0,0.54)',
  },
});

export default function MediSearch() {
  const classes = useStyles();
  const theme = useTheme();

  const [inputContent, setInputContent] = useState('');
  const [focused, setFocused] = useState(false);
  const iconColor = focused ? theme.palette.primary.main : 'rgba(0,0,0,0.54)';
  console.log(iconColor);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('You clicked submit.');
  };

  return (
    <Box className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.header}>
        <TextField
          id="search-box"
          className={classes.input}
          label="智能导诊"
          placeholder="请输入您的症状"
          variant="outlined"
          // type="search"

          autoFocus
          value={inputContent}
          onChange={e => {
            setInputContent(e.target.value);
          }}
          onFocus={() => {
            setFocused(true);
            console.log('Setting to focused');
          }}
          onBlur={() => {
            setFocused(false);
            console.log('Setting to blurred');
          }}
          InputProps={{
            ariaLabel: 'search mediconnect',
            endAdornment: (
              <InputAdornment position="end">
                {inputContent === '' || (
                  <IconButton
                    className={classes.cancelButton}
                    size="medium"
                    onClick={() => {
                      setInputContent('');
                      document.getElementById('search-box').focus();
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                )}

                <IconButton
                  color="primary"
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  style={{
                    color: iconColor,
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
