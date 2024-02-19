import React from 'react';

import { SxProps } from '@mui/system/styleFunctionSx';

import Box from '@mui/material/Box';

import { useResponsive } from '@src/hooks/useResponsive';

import { HEADER, NAV } from './ConfigLayout';

const SPACING = 8;

interface IMainProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export const Main = (props: IMainProps) => {
  const { children, sx, ...other } = props;

  const lgUp = useResponsive('up', 'lg', undefined);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};
