import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
  0: '#FFFFFF',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const primary = {
  lighter: '#94A3B6',
  light: '#E4E7EB',
  main: '#1C3D68',
  dark: '#0c2a4a',
  darker: '#94A3B64F',
  contrastText: 'rgba(0, 0, 0, 0.87)',
};

export const secondary = {
  light: '#f3e5f5',
  main: '#ce93d8',
  dark: '#ab47bc',
  contrastText: 'rgba(0, 0, 0, 0.87)',
};

export const error = {
  light: '#e57373',
  main: '#f44336',
  dark: '#d32f2f',
  contrastText: '#FFFFFF',
};

export const warning = {
  light: '#ffb74d',
  main: '#ffa726',
  dark: '#f57c00',
  contrastText: grey[800],
};

export const info = {
  light: '#AD864C',
  main: '#29b6f6',
  dark: '#AC445D',
};

export const success = {
  light: '#81c784',
  main: '#66bb6a',
  dark: '#388e3c',
  contrastText: '#FFFFFF',
};

export const text = {
  primary: '#E4E7EB',
  secondary: 'rgba(255, 255, 255, 0.7)',
  disabled: 'rgba(255, 255, 255, 0.5)',
  icon: 'rgba(255, 255, 255, 0.5)',
};

export const divider = 'rgba(255, 255, 255, 0.12)';

export const background = {
  paper: '#1C3D68',
  default: '#1C3D68',
};

export const action = {
  active: '#fff',
  hover: alpha(grey[500], 0.08),
  hoverOpacity: 0.08,
  selected: alpha(grey[500], 0.16),
  selectedOpacity: 0.16,
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  disabledOpacity: 0.38,
  focus: alpha(grey[500], 0.24),
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider,
  text,
  background,
  action,
};

// ----------------------------------------------------------------------

export function darkPalette() {
  return {
    mode: 'dark',
    ...base,
  };
}
