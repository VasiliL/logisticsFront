import moment from 'moment';
import { Dayjs } from 'dayjs';

require('twix');

export const DATE_FORMAT = 'YYYY-MM-DD';

export const getFirstMonthDay = (): Date => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const toStr = (date: Dayjs | Date | string | null): string => {
  if (date === null) {
    return nowStr();
  } else if (typeof date === 'string' || date instanceof Date) {
    return moment(date).format(DATE_FORMAT);
  }

  return moment(date.toDate()).format(DATE_FORMAT);
};

export const nowStr = (): string => {
  return moment(new Date()).format(DATE_FORMAT);
};
