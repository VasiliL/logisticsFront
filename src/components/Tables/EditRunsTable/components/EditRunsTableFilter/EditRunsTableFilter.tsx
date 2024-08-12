import React, { FC } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';

interface IDocumentTableFilterProps {
  date: DateRange<Dayjs>;
  onDateChanged: (range: DateRange<Dayjs>) => void;
  onCopyBtnClick: () => void;
  copyBtnDisabled: boolean;
}

export const EditRunsTableFilter: FC<IDocumentTableFilterProps> = (props: IDocumentTableFilterProps) => {
  const { date, copyBtnDisabled, onCopyBtnClick, onDateChanged } = props;

  return (
    <Box sx={{ display: 'flex', marginLeft: '5px', marginBottom: '15px', gap: '8px' }}>
      <RangeDatePicker date={date} onDateChanged={onDateChanged} />
      <Button variant="outlined" onClick={onCopyBtnClick} disabled={copyBtnDisabled}>
        Дублировать строку
      </Button>
    </Box>
  );
};
