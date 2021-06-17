import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  header: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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

export default function MediSearch(props) {
  const { onSubmit, onChange } = props;

  let { label, placeholder } = props;
  let { inputContent, setInputContent } = props;

  const { style } = props;

  const classes = useStyles();
  const theme = useTheme();

  console.log(
    `inputContent: ${inputContent}, setInputContent: ${setInputContent}`,
  );

  if (label === undefined) {
    label = placeholder;
  } else if (placeholder === undefined) {
    placeholder = label;
  }

  if (inputContent === undefined) {
    console.log('No input content specified, using new ones');
    [inputContent, setInputContent] = useState('');
  }

  const [focused, setFocused] = useState(false);
  const iconColor = focused ? theme.palette.primary.main : 'rgba(0,0,0,0.54)';
  console.log(iconColor);

  return (
    <Box className={classes.header} style={style}>
      <TextField
        id="search-box"
        className={classes.input}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        autoFocus
        value={inputContent}
        onChange={e => {
          setInputContent(e.target.value);
          onChange(e);
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
                // type="submit"
                onClick={onSubmit}
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
  );
}
