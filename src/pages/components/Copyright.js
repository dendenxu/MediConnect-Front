import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright(props) {
  const { className } = props;
  return (
    <Grid container spacing={2} className={className}>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/dendenxu">
            dendenxu
          </Link>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </Grid>
    </Grid>
  );
}
