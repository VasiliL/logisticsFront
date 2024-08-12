import {
  DEFAULT_GRID_AUTOSIZE_OPTIONS,
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { getFirstMonthDay } from '@src/utils/date_utils';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';

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
export const DEFAULT_FILTER_DATE_RANGE: DateRange<Dayjs> = [dayjs(getFirstMonthDay()), dayjs()];
export const DEFAULT_FILTER_DATE = new Date();
// additional
export const DEFAULT_VIEW_MODE = true;
export const DEFAULT_COLUMNS_WIDTH = new Map<string, number>();
export const DEFAULT_COLUMNS_ORDER = undefined;
export const DEFAULT_EXPAND_COLUMNS_MODE = DEFAULT_GRID_AUTOSIZE_OPTIONS.expand;
