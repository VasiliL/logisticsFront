import React, { PropsWithChildren } from 'react';
import Grid from '@mui/material/Grid';
import { MainLayout } from '@src/layouts/main/MainLayout';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS as locale } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AuthenticatedLayout: React.FC<PropsWithChildren> = observer(() => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <MainLayout>
        <Grid container columns={20} width="100%">
          <Grid item xs={20}>
            <Outlet />
          </Grid>
        </Grid>
      </MainLayout>
    </LocalizationProvider>
  );
});

export default AuthenticatedLayout;
