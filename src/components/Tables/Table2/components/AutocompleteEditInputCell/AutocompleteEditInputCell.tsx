/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid-pro';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';

interface AutocompleteEditInputCellProps {
  params: GridRenderEditCellParams,
  options: string[],
  value?: string;
  freeSolo?: boolean,
  multiple?: boolean,
  getOptionLabel?: (option: any) => string,
  emptyOption?: string;
  apiRef: React.MutableRefObject<GridApiCommunity>,
}

export function AutocompleteEditInputCell(props: AutocompleteEditInputCellProps) {
  const { params, apiRef, emptyOption, value, options, freeSolo, getOptionLabel, multiple } = props;
  const ref = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    if (params.hasFocus) {
      if (ref !== null) {
        ref.current!.querySelector<HTMLInputElement>('input')?.focus();
      }
    }
  }, [params]);

  const handleChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: any) => {
    //event.stopPropagation();
    setOpen(false);
    setHidden(true);
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue });
  }, [apiRef, params.id, params.field]);

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
      onInputChange={(event, value) => (freeSolo && !multiple && event) && handleChange(event, value)}
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
      noOptionsText={'Номер машины не найден'}
      getOptionLabel={getOptionLabel}
      renderInput={(inputParams) => <TextField {...inputParams} error={params.error} label={getValue} />}
    />
  );
}
