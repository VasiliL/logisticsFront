import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { grey } from '@src/theme/light-palette';

// ----------------------------------------------------------------------

export function lightOverrides(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-shortcuts': {
            boxShadow: 'none',
          },
          '& .Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: '#B3BDCA',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.primary.lighter, // Background color on hover
          },
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Background color on hover
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
            color: theme.palette.text.disabled,
            backgroundColor: `${alpha(grey[500], 0.08)} !important`,
          },
        },
        contained: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
          },
        },

        sizeLarge: {
          minHeight: 64,
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          MuiList: {
            styleOverrides: {
              root: {},
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          fontWeight: 400,
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: 0,
          boxShadow: '5px 4px 15px 0px #00000040',

          '& .MuiFormControl-root': {
            '& .MuiInputLabel-root': {
              color: theme.palette.primary.main,
            },
          },

          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            right: '-3px',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
          '& .MuiSvgIcon-root': {
            color: '#BBC5D2',
          },
          '& .MuiDataGrid-cell': {
            color: `${theme.palette.primary.main} !important`,
          },
        },
        toolbarContainer: {
          '& .MuiButton-root': {
            color: `${theme.palette.primary.main} !important`,
          },
          '& .MuiBadge-badge': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
          },
        },
        columnHeaders: {
          minHeight: '86px !important',
          borderRadius: '5px',
        },
        columnHeader: {
          backgroundColor: theme.palette.primary.lighter,
          color: theme.palette.primary.main,
          border: 'none !important',
          minHeight: '43px',
          '& .MuiInput-input': {
            marginBottom: '6px',
          },
          '& .MuiFormLabel-root': {
            marginTop: '9px',
          },
          '& .MuiIconButton-root': {
            margin: 'auto 0 2px 0',
          },
          '& .MuiInput-root': {
            '& .MuiIconButton-root': {
              margin: 'auto 0 19px 0',
            },
          },
          '& .MuiDataGrid-menuIcon': {
            '& .MuiIconButton-root': {
              margin: 'auto 0 6px 0',
            },
          },
          '& .MuiInputAdornment-root': {
            marginBottom: '13px',
            '& .MuiIconButton-root': {
              margin: '12px 0 0 0',
              padding: 0,
            },
          },
        },
        cell: {
          maxHeight: '40px',
          minHeight: '40px',
          border: 'none !important',
          justifyContent: 'start',
        },
        cellContent: {
          paddingLeft: '4px',
        },
        withBorderColor: {
          border: 'none !important',
        },
        headerFilterRow: {
          border: 'none !important',
        },
        aggregationColumnHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          '& .MuiDataGrid-aggregationColumnHeaderLabel': {
            position: 'relative',
            bottom: '-12px',
            marginLeft: '0.5em',
          },
        },
        footerCell: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekContainer: {
          '& .Mui-selected': {
            backgroundColor: `${theme.palette.primary.lighter} !important`,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {
            backgroundColor: `${theme.palette.primary.light} !important`,
            color: theme.palette.common.white,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
          },
        },
        root: {
          '& .MuiTablePagination-selectLabel': {
            color: theme.palette.primary.main,
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiTablePagination-displayedRows': {
            color: theme.palette.primary.main,
          },
          '& .MuiTablePagination-select': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          },
        },
        paper: {
          minWidth: '20em',
          backgroundImage: 'none',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            color: theme.palette.primary.main,

            '& .MuiDialogContent-root': {
              '& .MuiTypography-root': {
                color: theme.palette.primary.main,
              },
            },
            '& .MuiFormControl-root': {
              '& .MuiFormLabel-root': {
                color: theme.palette.primary.main,
              },

              '& .MuiInput-root::before': {
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              },
            },
          },
          '& .MuiDialogActions-root': {
            '& .MuiButton-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
  };
}
