import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

function Loader({ open }) {
  return (
    <Backdrop open={open} style={{ zIndex: 9999, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
