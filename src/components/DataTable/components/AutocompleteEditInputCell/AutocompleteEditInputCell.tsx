/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid-premium';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';
import { visuallyHidden } from '@mui/utils';

interface AutocompleteEditInputCellProps {
  params: GridRenderEditCellParams;
  options: string[];
  value?: string;
  freeSolo?: boolean;
  multiple?: boolean;
  getOptionLabel?: (option: any) => string;
  emptyOption?: string;
  apiRef: React.MutableRefObject<GridApiCommunity>;
}

export const AutocompleteEditInputCell: React.FC<Readonly<AutocompleteEditInputCellProps>> = props => {
  const { params, apiRef, emptyOption, value, options, freeSolo, getOptionLabel, multiple } = props;
  const ref = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    if (params.hasFocus) {
      if (ref !== null) {
        ref.current?.querySelector<HTMLInputElement>('input')?.focus();
      }
    }
  }, [params]);

  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      // setOpen(false);
      // setHidden(true);
      apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue });
    },
    [apiRef, params.id, params.field],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !open) {
        setOpen(false);
        setHidden(true);
        apiRef.current.stopRowEditMode({ id: params.id, field: params.field });
      }
    },
    [apiRef, params, open],
  );

  const getValue = useMemo(() => {
    if (value) {
      return typeof params.value === 'string' && value !== params.value ? params.value : value;
    }

    if (multiple) {
      return [];
    }

    return params.value === emptyOption ? '' : params.value;
  }, [emptyOption, multiple, params.value, value]);

  return (
    <Autocomplete
      ref={ref}
      value={getValue}
      onChange={handleChange}
      onInputChange={(event, value) => freeSolo && !multiple && event && handleChange(event, value)}
      hidden={hidden}
      onKeyDown={handleKeyDown}
      fullWidth
      multiple={multiple}
      options={options ?? []}
      freeSolo={freeSolo}
      autoHighlight
      // autoFocus
      // selectOnFocus
      openOnFocus
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      disableClearable
      noOptionsText={'Значение не найдено'}
      getOptionLabel={getOptionLabel}
      sx={{
        '& .MuiAutocomplete-hasPopupIcon': {
          paddingTop: 0, paddingBottom: 0,
        },
        '& .MuiAutocomplete-hasClearIcon': {
          paddingTop: 0, paddingBottom: 0,
        },
        '& .MuiAutocomplete-inputRoot': {
          paddingTop: 0, paddingBottom: 0,
        },
        '.MuiInputBase-input': {
          paddingTop: '0px !important', paddingBottom: '0px !important',
        },
      }}
      renderInput={inputParams =>
        <TextField {...inputParams} error={params.error} label={getValue} InputLabelProps={{ sx: visuallyHidden }} />}
    />
  );
};
