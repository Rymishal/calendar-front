import React from 'react';
import { Alert, Button, Typography } from '@mui/material';
import '../styles/error-info.scss';

interface ErrorInfoProps {
    errorMessage: string;
    actionMessage: string;
    action: () => void;
}

const ErrorInfo: React.FC<ErrorInfoProps> = ({
  errorMessage,
  actionMessage,
  action,
}) => (
  <Alert
    className="error-info"
    data-testid="loaded-with-error"
    severity="error"
    action={(
      <Button color="inherit" size="small" onClick={action}>
        {actionMessage}
      </Button>
          )}
  >
    <Typography variant="body2" className="error-text">
      {errorMessage}
    </Typography>
  </Alert>
);

export default ErrorInfo;
