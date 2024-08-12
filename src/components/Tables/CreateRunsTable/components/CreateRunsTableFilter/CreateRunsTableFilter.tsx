import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { SingleDatePicker } from '@src/components/SingleDatePicker/SingleDatePicker';
import { Checkbox, FormControlLabel } from '@mui/material';

interface ICreateRunsTableFilterProps {
  date?: Date | string;
  label: string;
  onDateChanged: (date: Date) => void;
  checked: boolean;
  onCheck: (showBusyCars: boolean) => void;
}

export const CreateRunsTableFilter: FC<ICreateRunsTableFilterProps> = (props: ICreateRunsTableFilterProps) => {
  const { date, label, onDateChanged, checked, onCheck } = props;

  return (
    <Box sx={{ display: 'flex', marginLeft: '5px', marginBottom: '15px', gap: '8px' }}>
      <SingleDatePicker label={label} date={date} onDateChanged={onDateChanged} />
      <FormControlLabel
        sx={{ border: '1px solid', borderRadius: '4px', marginLeft: '5px', paddingRight: '10px', height: '40px' }}
        label="Не показывать уже задействованные машины"
        control={
          <Checkbox
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCheck(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
    </Box>
  );
};
