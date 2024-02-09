import React, { useState } from 'react';

import Box from '@mui/material/Box';

import { Nav } from './Nav';
import { Main } from './Main';
import { Header } from './Header';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: IDashboardLayoutProps) => {
  const { children } = props;
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
};
