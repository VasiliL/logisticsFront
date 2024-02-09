import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

interface IProgressBarProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const PageProgressBar = (props: IProgressBarProps) => {
  const { isLoading, children } = props;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', marginLeft: '40px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
