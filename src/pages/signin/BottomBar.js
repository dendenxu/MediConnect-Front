import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export default function BottomBar(props) {
  const { className, spaceOut = false } = props;
  return (
    <Grid container spacing={2} className={className}>
      <Grid item xs={spaceOut}>
        <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
          帮助
        </Link>
      </Grid>
      <Grid item>
        <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
          使用条款
        </Link>
      </Grid>
      <Grid item>
        <Link color="textSecondary" href="neon-cubes.xyz" variant="caption">
          隐私协议
        </Link>
      </Grid>
    </Grid>
  );
}
