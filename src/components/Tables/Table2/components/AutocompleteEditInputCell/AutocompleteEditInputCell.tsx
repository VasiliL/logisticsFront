/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-pro';
import React, { useCallback } from 'react';

interface AutocompleteEditInputCellProps {
  params: GridRenderEditCellParams,
  options: string[],
  value?: string;
  freeSolo?: boolean,
  multiple?: boolean,
  getOptionLabel?: (option: any) => string
}

export function AutocompleteEditInputCell(props: AutocompleteEditInputCellProps) {
  const { params, value, options, freeSolo, getOptionLabel, multiple } = props;
  const apiRef = useGridApiContext();

  const handleChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: any) => {
    event.stopPropagation();
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue });
  }, [apiRef, params.id, params.field]);

  const getValue = useCallback(() => {
    if (value) {
      return value;
    }

    if (multiple) {
      return [];
    }

    return null;
  }, [multiple, value]);

  return (
    <Autocomplete
      value={getValue()}
      onChange={handleChange}
      onInputChange={(event, value) => (freeSolo && !multiple && event) && handleChange(event, value)}
      fullWidth
      multiple={multiple}
      options={options ?? []}
      freeSolo={freeSolo}
      autoHighlight
      noOptionsText={'Номер машины не найден'}
      getOptionLabel={getOptionLabel}
      renderInput={(inputParams) => <TextField {...inputParams} error={params.error} />}
    />
  );
}
