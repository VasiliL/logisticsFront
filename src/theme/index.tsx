/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = (props: IThemeProviderProps) => {
  const { children } = props;
  const memoizedValue: any = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const theme = createTheme(memoizedValue);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
