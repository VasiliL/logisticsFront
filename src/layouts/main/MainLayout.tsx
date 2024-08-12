import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { Nav } from './Nav';
import { Main } from './Main';
import { Header } from './Header';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: IDashboardLayoutProps) => {
  const { children } = props;
  const [openNav, setOpenNav] = useState(true);

  return (
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <CssBaseline />

      <Header onOpenNav={() => setOpenNav(!openNav)} />

      <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

      <Main>{children}</Main>
    </Box>
  );
};
