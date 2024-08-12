import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@src/theme';
import { DictStore } from '@src/store/DictStore';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import AuthStore from '@src/store/AuthStore';

interface IWrapperProps {
  children: React.ReactNode;
}

export const Wrapper: FC<IWrapperProps> = observer((props: IWrapperProps) => {
  const { children } = props;
  const { init: dictStoreInit, isLoading } = DictStore;
  const { isAuthenticated } = AuthStore;

  useEffect(() => {
    if (isAuthenticated) {
      void dictStoreInit();
    }
  }, [isAuthenticated, dictStoreInit]);

  return (
    <ThemeProvider>
      <Grid container columns={20} width="100%">
        <Grid item xs={20}>
          <PageProgressBar isLoading={isLoading}>{children}</PageProgressBar>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});
