import {
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { getFirstMonthDay } from '@src/utils/date_utils';
import { DateRange } from 'mui-daterange-picker';

// table
export const DEFAULT_TABLE_PAGINATION_MODEL: GridPaginationModel = {
  page: 0,
  pageSize: 20,
};
export const DEFAULT_TABLE_FILTER_MODEL: GridFilterModel = { items: [] };
export const DEFAULT_TABLE_SORT_MODEL: GridSortModel = [];
export const DEFAULT_TABLE_VISIBILITY_MODEL: GridColumnVisibilityModel = {};
export const DEFAULT_TABLE_DENSITY_MODE: GridDensity = 'standard';
// filtering
export const DEFAULT_DATE_START = getFirstMonthDay();
export const DEFAULT_DATE_END = new Date();
export const DEFAULT_FILTER_DATE_RANGE: DateRange = { startDate: DEFAULT_DATE_START, endDate: DEFAULT_DATE_END };
export const DEFAULT_FILTER_DATE = new Date();
export const DEFAULT_FILTER_MODE = true;
