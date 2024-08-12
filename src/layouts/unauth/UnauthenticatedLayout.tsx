import React, { PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '@src/layouts/main/Header';
import authStore from '@src/store/AuthStore';

const UnauthenticatedLayout: React.FC<PropsWithChildren> = () => {
  const { isAuthenticated } = authStore;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header onOpenNav={() => {}} />
      <Grid container columns={20} width="100%">
        <Grid item xs={20}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default UnauthenticatedLayout;
