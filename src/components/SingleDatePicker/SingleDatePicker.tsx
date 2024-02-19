import React, { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DATE_FORMAT } from '@src/utils/date_utils';

interface IDatePickerProps {
  date?: Date | string;
  label: string;
  onDateChanged: (date: Date) => void;
}

export const SingleDatePicker: FC<IDatePickerProps> = (props: IDatePickerProps) => {
  const { date, label, onDateChanged } = props;
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(date?.toString()));

  const onChangeDate = (value: Dayjs | null) => {
    setValue(value);
    if (value != null) {
      onDateChanged(value.toDate());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChangeDate}
        format={DATE_FORMAT}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  );
};
