/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import { themeStore } from '@src/store/ThemeStore';

import { darkPalette } from './dark-palette';
import { lightPalette } from './light-palette';
import { lightOverrides } from './light-overrides';
import { darkOverrides } from './dark-overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = observer((props: IThemeProviderProps) => {
  const { children } = props;
  const lightMemoizedValue: any = useMemo(
    () => ({
      palette: lightPalette(),
      typography,
      customShadows: customShadows(),
    }),
    [],
  );

  const darkMemoizedValue: any = useMemo(
    () => ({
      palette: darkPalette(),
      typography,
      customShadows: customShadows(),
    }),
    [],
  );

  const lightTheme = createTheme(lightMemoizedValue);
  const darkTheme = createTheme(darkMemoizedValue);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  lightTheme.components = lightOverrides(lightTheme);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  darkTheme.components = darkOverrides(darkTheme);

  return (
    <MUIThemeProvider theme={themeStore.theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
});
