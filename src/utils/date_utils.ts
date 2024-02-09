import moment from 'moment';

require('twix');

export const DATE_FORMAT = 'YYYY-MM-DD';

export const getDatesRangeFromMonthStart = (): string[] => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  return getDatesByDatesRange(firstDay, now);
};

export const getDatesRangeFromLastMonthStart = (): string[] => {
  return getDatesByDatesRange(getFirstMonthDay(), new Date());
};

export const getDatesByStringsRange = (startDate: string, endDate: string): string[] => {
  return getDatesByDatesRange(new Date(startDate), new Date(endDate));
};

export const getDatesRange = (startDate: Date, endDate: Date): string[] => {
  return getDatesByDatesRange(startDate, endDate);
};

export const getPrevYearFirstDay = (): string => {
  const prevYear = new Date().getFullYear() - 1;

  return toStr(new Date(prevYear, 0, 1));
};

export const getCurrentYearFirstDay = (): string => {
  const currentYear = new Date().getFullYear();

  return toStr(new Date(currentYear, 0, 1));
};

export const getCurrentYearLastDay = (): string => {
  const currentYear = new Date().getFullYear();

  return toStr(new Date(currentYear, 11, 31));
};

export const getFirstMonthDay = (): Date => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const toStr = (date: Date): string => {
  return moment(date).format(DATE_FORMAT);
};

export const nowStr = (): string => {
  return moment(new Date()).format(DATE_FORMAT);
};

const getDatesByDatesRange = (startDate: Date, endDate: Date): string[] => {
  const start = moment(startDate);

  const itr = start.twix(endDate).iterate('days');
  const range: string[] = [];
  while (itr.hasNext()) {
    range.push(itr.next().format(DATE_FORMAT));
  }

  return range;
};
