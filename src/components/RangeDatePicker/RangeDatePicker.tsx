import React, { FC, useMemo } from 'react';
import { DateRange, DateRangePicker } from 'mui-daterange-picker';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { toStr } from '@src/utils/date_utils';
import ru from 'date-fns/locale/ru';

interface IRangeDatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onDateChanged: (range: DateRange) => void;
  children?: React.ReactNode;
}

export const RangeDatePicker: FC<IRangeDatePickerProps> = (props: IRangeDatePickerProps) => {
  const { startDate, endDate, onDateChanged, children } = props;
  const [dateRange, setDateRange] = React.useState<DateRange>({ startDate, endDate });
  const [openPicker, setOpenPicker] = React.useState<boolean>(false);

  const onChangeDateRange = (range: DateRange) => {
    setDateRange(range);
    onDateChanged(range);
  };

  const togglePicker = () => setOpenPicker(!openPicker);

  const toggleBtn = () => setOpenPicker(!openPicker);

  const maxDate = useMemo(() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    return now;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const minDate = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() - 10);

    return now;
  }, []);

  const text = useMemo(
    () =>
      dateRange && dateRange.startDate && dateRange.endDate
        ? `${toStr(dateRange.startDate)} - ${toStr(dateRange.endDate)}`
        : 'Период не задан',
    [dateRange],
  );

  return (
    <>
      <Box style={{ marginBottom: 10 }}>
        <strong style={{ marginRight: 10 }}>{text}</strong>
        <Button variant="contained" onClick={toggleBtn} style={{ marginRight: 10 }}>
          Выбрать период
        </Button>
        {children}
      </Box>
      <div style={{ position: 'absolute' }}>
        <DateRangePicker
          open={openPicker}
          toggle={togglePicker}
          initialDateRange={dateRange}
          // minDate={minDate}
          maxDate={maxDate}
          onChange={onChangeDateRange}
          closeOnClickOutside={true}
          // definedRanges={[{
          //   label: 'Неделя',
          //   startDate: new Date(),
          //   endDate: new Date(new Date().getDate() + 7),
          // }]}
          locale={ru}
        />
      </div>
    </>
  );
};
