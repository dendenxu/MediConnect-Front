import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default function Loading(props) {
  const { loadingData } = props;

  return (
    <>
      {loadingData && (
        <Box
          position="absolute"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            paddingTop: '10%',
          }}
        >
          <CircularProgress
            size={68}
            style={{
              zIndex: 1,
            }}
          />
        </Box>
      )}
      {loadingData && (
        <Box
          style={{ height: '100%', width: '100%', position: 'absolute' }}
          position="absolute"
          top={0}
          left={0}
          zIndex="tooltip"
        />
      )}
    </>
  );
}
