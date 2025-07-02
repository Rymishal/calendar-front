import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './loading-info.scss';

const LoadingInfo = () => (
  <Box className={styles.loadingContainer} data-testid="loading-in-progress">
    <CircularProgress size="70px" />
  </Box>
);

export default LoadingInfo;
