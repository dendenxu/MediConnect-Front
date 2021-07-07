import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

export default function MileStone(props) {
  const { data } = props;
  return (
    <ListItem>
      <Checkbox
        checked={data.checked}
        // onChange={handleChange}
        style={{ color: '#ffffff' }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <ListItemText
        primary={
          <Typography style={{ color: '#FFFFFF', overflowX: 'hidden' }}>
            {data.activity}
          </Typography>
        }
      />
      <IconButton aria-label="delete" style={{ color: '#ffffff' }}>
        <DeleteOutline />
      </IconButton>
    </ListItem>
  );
}
