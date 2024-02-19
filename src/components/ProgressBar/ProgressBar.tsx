import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

interface IProgressBarProps {
  isLoading?: boolean;
}

export const ProgressBar: FC<IProgressBarProps> = (props: IProgressBarProps) => {
  const { isLoading } = props;

  return isLoading ? (
    <Box sx={{ display: 'flex', marginLeft: '40px', justifyContent: 'flex-start' }}>
      <CircularProgress />
    </Box>
  ) : (
    <></>
  );
};
