import React, { FC, useMemo } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DATE_FORMAT } from '@src/utils/date_utils';
import { LocalizationProvider, PickersShortcutsItem } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';

interface IRangeDatePickerProps {
  date: DateRange<Dayjs>;
  onDateChanged: (range: DateRange<Dayjs>) => void;
}

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: 'Эта неделя',
    getValue: () => {
      const today = dayjs();

      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Прошлая неделя',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');

      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Последние 7 дней',
    getValue: () => {
      const today = dayjs();

      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Текущий месяц',
    getValue: () => {
      const today = dayjs();

      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Следующий месяц',
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf('month').add(1, 'day');

      return [startOfNextMonth, startOfNextMonth.endOf('month')];
    },
  },
  { label: 'Сбросить', getValue: () => [null, null] },
];

export const RangeDatePicker: FC<IRangeDatePickerProps> = (props: IRangeDatePickerProps) => {
  const { date, onDateChanged } = props;

  const value = useMemo(() => {
    return typeof date[0] === 'string' ? ([dayjs(date[0]), dayjs(date[1])] as DateRange<Dayjs>) : date;
  }, [date]);

  return (
    <Box width={'350px'}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={'ru'}
        localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <DateRangePicker
          sx={{ marginLeft: '0px !important' }}
          slotProps={{
            textField: { size: 'small' },
            fieldSeparator: { marginLeft: '10px !important', marginRight: '-6px !important' },
            shortcuts: {
              items: shortcutsItems,
            },
            actionBar: { actions: ['cancel', 'accept'] },
          }}
          format={DATE_FORMAT}
          value={value}
          onAccept={onDateChanged}
          localeText={{ start: 'Начальная дата', end: 'Конечная дата' }}
        />
      </LocalizationProvider>
    </Box>
  );
};
