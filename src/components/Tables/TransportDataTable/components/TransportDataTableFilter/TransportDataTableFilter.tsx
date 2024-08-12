import React, { FC } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ITransportDataTableFilterProps {
  date: DateRange<Dayjs>;
  onDateChanged: (range: DateRange<Dayjs>) => void;
  viewMode: boolean;
  onChangeViewMode: () => void;
}

export const TransportDataTableFilter: FC<ITransportDataTableFilterProps> = (props: ITransportDataTableFilterProps) => {
  const { date, onDateChanged, viewMode, onChangeViewMode } = props;

  return (
    <Box sx={{ display: 'flex', marginLeft: '5px', marginBottom: '15px', gap: '8px' }}>
      <RangeDatePicker date={date} onDateChanged={onDateChanged} />
      <ToggleButtonGroup
        color="primary"
        value={viewMode ? 'variant1' : 'variant2'}
        exclusive
        size="small"
        onChange={onChangeViewMode}
        aria-label="Platform"
      >
        <ToggleButton value="variant1">Собственные авто</ToggleButton>
        <ToggleButton value="variant2">Привлеченные авто</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
