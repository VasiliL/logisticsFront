import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@src/theme';
import { MainLayout } from '@src/layouts/main/MainLayout';
import { DictStore } from '@src/store/DictStore';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';

interface IWrapperProps {
  children: React.ReactNode;
}

export const Wrapper: FC<IWrapperProps> = observer((props: IWrapperProps) => {
  const { children } = props;
  const { init: dictStoreInit, isLoading } = DictStore;

  useEffect(() => {
    dictStoreInit();
  }, [dictStoreInit]);

  return (
    <ThemeProvider>
      <MainLayout>
        <Grid container columns={20} width="100%">
          <Grid item xs={20}>
            <PageProgressBar isLoading={isLoading}>{children}</PageProgressBar>
          </Grid>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  );
});
