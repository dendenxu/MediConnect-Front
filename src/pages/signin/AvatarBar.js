import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function AvatarBar(props) {
  const {
    email,
    avatarSrc,
    handleAvatarClick,
    avatarButtonClass,
    avatarSourceClass,
    avatarIconClass,
  } = props;
  return (
    <Button
      variant="outlined"
      size="small"
      className={avatarButtonClass}
      startIcon={<Avatar src={avatarSrc} className={avatarIconClass} />}
      onClick={handleAvatarClick}
    >
      <Typography
        className={avatarSourceClass}
        variant="caption"
        style={{
          fontWeight: 500,
        }}
      >
        {email}
      </Typography>
    </Button>
  );
}
