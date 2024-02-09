/* eslint-disable @typescript-eslint/no-explicit-any */
import { darken, lighten, styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import React, { forwardRef } from 'react';

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

export const useStyles: any = makeStyles({
  grid: {
    // display: 'flex',
    // flexDirection: 'column-reverse',
  },
});

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  borderRadius: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  '& .MuiCheckbox-root svg': {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
    borderRadius: 0,
  },
  '& .MuiCheckbox-root svg path': {
    display: 'none',
  },
  '& .super-app-theme': {
    backgroundColor: getBackgroundColor(theme.palette.grey['200'], theme.palette.grey['300']),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.grey['300'], theme.palette.grey['400']),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.grey['400'], theme.palette.grey['500']),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.grey['500'], theme.palette.grey['600']),
      },
    },
  },
  ['& .super-app-theme-even']: {
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.grey['300'], theme.palette.grey['400']),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.grey['400'], theme.palette.grey['500']),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.grey['500'], theme.palette.grey['600']),
      },
    },
  },
  '& .super-app-theme-blocked': {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));
