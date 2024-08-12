/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, darken, lighten, styled } from '@mui/material/styles';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { makeStyles } from '@mui/styles';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import React, { forwardRef } from 'react';

// const getBackgroundColor = (color: string, mode: string) =>
//   mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

// const getHoverBackgroundColor = (color: string, mode: string) =>
//   mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

// const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
//   mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

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

export const StyledDataGrid = styled(DataGridPremium)(({ theme }) => {
  const isLightMode = theme.palette.mode === 'light';

  const commonStyles = {
    border: 0,
    borderRadius: 0,
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiFormLabel-root': {
      fontSize: 12,
      lineHeight: 1,
      marginTop: 4,
    },
    '& .MuiDataGrid-columnHeader': {
      paddingTop: 0,
    },
    '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell': {
      overflow: 'initial',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiDataGrid-toolbarContainer': {
      '& .MuiButtonBase-root': {
        height: 40,
      },
      '& .MuiButton-text': {
        borderRadius: 4,
        marginBottom: 15,
        padding: theme.spacing(1, 2, 1, 2),
        color: theme.palette.text.primary,
        fontSize: 16,
        lineHeight: '143%',
        letterSpacing: '0.17px',
      },
    },
  };

  const lightModeStyles = {
    color: 'rgba(0,0,0,.85)',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#fafafa',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: '1px solid #f0f0f0',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: '1px solid #f0f0f0',
    },
    '& .MuiDataGrid-cell': {
      color: 'rgba(0,0,0,.85)',
    },
    '& .MuiDataGrid-cell.cold': {
      backgroundColor: theme.palette.info.light,
    },
    '& .MuiDataGrid-cell.hot': {
      backgroundColor: theme.palette.info.dark,
    },
    '& .super-app-theme': {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.5),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(alpha(theme.palette.primary.light, 0.7), theme.palette.mode),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.5),
        },
      },
    },
    '& .super-app-theme-even': {
      backgroundColor: alpha('#E4E7EB', 0.2),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.5),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(alpha(theme.palette.primary.light, 0.7), theme.palette.mode),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.5),
        },
      },
    },
    '& .super-app-theme-blocked': {
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.7),
      },
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.light, 0.7),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.5),
        },
      },
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      backgroundColor: '#E4E7EB',
    },
  };

  const darkModeStyles = {
    color: 'rgba(255,255,255,0.85)',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#1d1d1d',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: '1px solid #303030',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: '1px solid #303030',
    },
    '& .MuiDataGrid-cell': {
      color: 'rgba(255,255,255,0.65)',
    },
    '& .MuiDataGrid-cell.cold': {
      backgroundColor: theme.palette.info.light,
    },
    '& .MuiDataGrid-cell.hot': {
      backgroundColor: theme.palette.info.dark,
    },
    '& .super-app-theme': {
      backgroundColor: '#94A3B60D',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.dark, 0.8),
        },
      },
    },
    '& .super-app-theme-even': {
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.dark, 0.8),
        },
      },
    },
    '& .super-app-theme-blocked': {
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.dark, 0.8),
        },
      },
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      backgroundColor: '#415C80',
    },
  };

  return {
    ...commonStyles,
    ...(isLightMode ? lightModeStyles : darkModeStyles),
  };
});
