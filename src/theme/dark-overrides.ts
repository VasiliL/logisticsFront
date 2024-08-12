import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export function darkOverrides(theme) {
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
    MuiButton: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.light,
          borderColor: theme.palette.primary.light,
          '&:hover': {
            color: alpha(theme.palette.primary.light, 0.7),
            borderColor: alpha(theme.palette.primary.light, 0.7),
          },
          '&.Mui-disabled': {
            border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
            color: theme.palette.text.disabled,
            backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.8),
            },
          },
        },
        contained: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.8),
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
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.5), // Optional: Change color on hover
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: theme.palette.primary.light, // Color when focused
            color: theme.palette.primary.light,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ['&.Mui-focused']: {
            color: theme.palette.primary.light, // Color when focused
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        paper: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: theme.palette.primary.light,
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            '&:hover': {
              color: alpha(theme.palette.primary.main, 0.5),
            },
          },
          '& .MuiInput-root': {
            color: theme.palette.primary.main,
            // marginTop: 0
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.primary.main,
            fontSize: '0.9rem',
          },
          '& .MuiInputBase-root.MuiInput-root::before': {
            content: '""',
            display: 'block',
            borderBottom: `1px solid ${theme.palette.primary.main}`, // Example background color
          },
        },
        columnHeaders: {
          minHeight: '86px !important',
          borderRadius: '5px',
        },
        columnHeader: {
          backgroundColor: '#415C80',
          color: theme.palette.primary.light,
          border: 'none !important',
          minHeight: '43px',
          '& .MuiInput-input': {
            marginBottom: '6px',
            colorScheme: 'dark',
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
          '& .MuiInputAdornment-root': {
            marginBottom: '13px',
            '& .MuiIconButton-root': {
              margin: '12px 0 0 0',
              padding: 0,
            },
          },
          '& .MuiDataGrid-menuIcon': {
            '& .MuiIconButton-root': {
              margin: 'auto 0 6px 0',
            },
          },
        },
        columnsPanelRow: {
          color: theme.palette.primary.main,
        },
        menuList: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiTypography-root': {
            color: theme.palette.primary.main,
          },
        },
        cell: {
          maxHeight: '40px',
          minHeight: '40px',
          border: 'none !important',
          justifyContent: 'start',
        },
        toolbarContainer: {
          '& .MuiBadge-badge': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
          },
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
            color: theme.palette.primary.light,
          },
        },
        footerCell: {
          color: theme.palette.primary.light,
        },
        columnHeadersInner: {
          minHeight: '86px',
        },
        panel: {
          '& .MuiButton-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiNativeSelect-select': {
            option: {
              backgroundColor: `${theme.palette.primary.light} !important`,
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.primary.main,
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
          '& .MuiPickersLayout-shortcuts': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
            boxShadow: 'none',
          },
          '& .MuiPickersLayout-contentWrapper': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiList-root': {
            boxShadow: 'none',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
            '&:hover': {
              color: alpha(theme.palette.primary.main, 0.5),
            },
          },
          '& .MuiPickersDay-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiDayCalendar-weekDayLabel': {
            color: theme.palette.primary.main,
          },
          '& .MuiButtonBase-root': {
            color: theme.palette.primary.main,
          },
          '& .Mui-selected': {
            color: theme.palette.common.white,
            backgroundColor: '#B3BDCA',
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
          color: `${theme.palette.primary.main} !important`,
          svg: theme.palette.primary.main,
          fontWeight: 400,
          backgroundColor: theme.palette.primary.light,
          borderRadius: 0,
          boxShadow: '5px 4px 15px 0px #00000040',

          '& .MuiFormControl-root': {
            '& .MuiInputLabel-root': {
              color: theme.palette.primary.main,
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiSvgIcon-root': {
            right: '-3px',
          },
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
          backgroundColor: `${theme.palette.primary.main} !important`,
          color: `${theme.palette.primary.light} !important`,
          backgroundImage: 'none',
          minWidth: '20em',
          MuiList: {
            styleOverrides: {
              root: {
                color: theme.palette.primary.main,
                svg: theme.palette.primary.main,
                fontWeight: 400,
                backgroundColor: theme.palette.primary.light,
                borderRadius: 0,
                boxShadow: '5px 4px 15px 0px #00000040',

                '& .MuiSvgIcon-root': {
                  right: '-3px',
                },
              },
            },
          },
          '& .MuiOutlinedInput-root': {
            borderColor: theme.palette.primary.light,
            legend: {
              color: 'white',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.primary.darker, // Background color on hover
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
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
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
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
          },
        },
        root: {
          '& .MuiTablePagination-selectLabel': {
            color: theme.palette.primary.light,
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
          },
          '& .MuiTablePagination-displayedRows': {
            color: theme.palette.primary.light,
          },
          '& .MuiTablePagination-select': {
            color: theme.palette.primary.light,
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          '& .MuiToggleButtonGroup-grouped': {
            color: theme.palette.primary.light,
          },

          '& .Mui-selected': {
            color: `${theme.palette.primary.lighter} !important`,
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: `${theme.palette.primary.light} !important`,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,

            '& .MuiDialogContent-root': {
              '& .MuiTypography-root': {
                color: theme.palette.primary.main,
              },
            },
            '& .MuiInput-root': {
                color: theme.palette.primary.main,
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
