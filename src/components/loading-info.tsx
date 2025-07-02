import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import '../styles/loading-info.scss';

const LoadingInfo = () => (
  <Box className="loading-container">
    <CircularProgress className="circular-progress" />
  </Box>
);

export default LoadingInfo;
