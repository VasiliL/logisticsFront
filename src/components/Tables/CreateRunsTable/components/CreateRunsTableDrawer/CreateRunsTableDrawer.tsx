import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import { Autocomplete, FormControl, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  carsList: string[];
  onChangeAutoComplete: (event: React.SyntheticEvent, value: string[]) => void;
  options: string[];
  otherRunsCarList: string[];
};

export const CreateRunsTableDrawer: React.FC<Props> = observer(
  ({ open, setOpen, carsList, onChangeAutoComplete, options, otherRunsCarList }) => {
    const theme = useTheme();
    const [transitionEnd, setTransitionEnd] = useState<boolean>(false);

    const getCarListItemStyle = (option: string) => {
      const carNumber = option.split(' ')[0];
      if (otherRunsCarList.includes(carNumber)) {
        return {
          backgroundColor: theme.palette.mode === 'dark' ? '#AC445D' : '#FFAFC2',
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
        };
      }

      return {};
    };

    return (
      <Drawer anchor="right" open={open}
              onClose={() => {
                setOpen(false);
              }}
              sx={{
                width: 400,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: 400,
                  boxSizing: 'border-box',
                },
              }}
              onTransitionExited={() => setTransitionEnd(false)}
              onTransitionEnd={() => setTransitionEnd(true)}
      >
        <PageProgressBar isLoading={!transitionEnd}>
          <Box
            sx={{
              pt: 9,
            }}
          >
            <FormControl sx={{ minWidth: 400, maxWidth: 400 }}>
              <Autocomplete
                id="multiple-car"
                freeSolo
                open={open}
                multiple
                defaultValue={carsList}
                disableCloseOnSelect
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    setOpen(false);
                  }
                }}
                onChange={onChangeAutoComplete}
                noOptionsText={'Нет машин'}
                limitTags={1}
                getOptionLabel={option => option}
                options={options}
                renderTags={(value: readonly string[]) =>
                  value.map((option: string, index: number) => <Typography key={option + index}></Typography>)
                }
                renderOption={(props, option) => (
                  <li {...props} style={getCarListItemStyle(option)} key={option}>
                    {option}
                  </li>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Добавьте машину для выбранного рейса"
                    placeholder="Добавьте машину для выбранного рейса"
                    autoFocus
                  />
                )}
                slotProps={{
                  paper: {
                    sx: {
                      '& .MuiAutocomplete-listbox': {
                        scrollbarWidth: 'none',
                        '& ::-webkit-scrollbar': {
                          display: 'none',
                        },
                        maxHeight: '90vh',
                        '& .MuiAutocomplete-option': {
                          scrollbarWidth: 'none',
                          fontSize: '14px',
                        },
                        '& .MuiAutocomplete-option[aria-selected="true"]': {
                          scrollbarWidth: 'none',
                          bgcolor: '#94A3B6 !important',
                          color:
                            theme.palette.mode === 'dark'
                              ? `${theme.palette.primary.light} !important`
                              : `${theme.palette.primary.main} !important`,
                        },
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiAutocomplete-tag': {
                    display: 'none',
                  },
                  '& .MuiFormLabel-root': {
                    color:
                      theme.palette.mode === 'dark'
                        ? `${theme.palette.primary.light} !important`
                        : theme.palette.primary.main,
                  },
                  '& .MuiList-root': {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                  },
                }}
              />
            </FormControl>
          </Box>
        </PageProgressBar>
      </Drawer>
    );
  },
);
