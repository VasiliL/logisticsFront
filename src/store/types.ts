import { IDictCarDto, IDictDriverDto, IDataInvoiceDto } from '@src/service/types';
import {
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';

export interface IDictCarBL extends IDictCarDto {}

export interface IDictDriverBL extends IDictDriverDto {}

export interface IDataInvoiceBL extends IDataInvoiceDto {}

export interface IUserSettings {
  // пагинация и настройка отображения таблицы средствами x-data-grid
  tablePageModel: GridPaginationModel;
  tableFilterModel: GridFilterModel;
  tableSortModel: GridSortModel;
  tableVisibilityModel: GridColumnVisibilityModel;
  tableDensityMode: GridDensity;
  // настройки выбранного временного периода
  filterDateRange: DateRange<Dayjs>;
  filterDate: Date;
  // дополнительные настройки отображения таблицы (для отображения двух наборов колонок в рамках одной таблицы)
  viewMode: boolean;
  // расширить колонки по ширине их содержимого
  expandColumnsMode: boolean;
  // измененные ширины колонок
  columnsWidth: Map<string, number>;
  // порядок отображения колонок
  columnsOrder: string[];

  saveTablePageData: (value: GridPaginationModel) => void;
  saveTableVisibilityData: (value: GridColumnVisibilityModel) => void;
  saveTableSortData: (value: GridSortModel) => void;
  saveTableFilterData: (value: GridFilterModel) => void;
  saveTableDensityMode: (value: GridDensity) => void;
  saveFilterDateRange: (value: DateRange<Dayjs>) => void;
  saveFilterDate: (value: Date) => void;
  saveViewMode: (value: boolean) => void;
  saveExpandColumnsMode: (value: boolean) => void;
  saveColumnsWidth: (value: Map<string, number>) => void;
  saveColumnsOrder: (value: string[]) => void;
}

// table
export const TABLE_PAGE_DATA_NAME = (prefix: string) => `${prefix}table_page_data`;
export const TABLE_FILTER_DATA_NAME = (prefix: string) => `${prefix}table_filter_data`;
export const TABLE_SORT_DATA_NAME = (prefix: string) => `${prefix}table_sort_data`;
export const TABLE_VISIBILITY_DATA_NAME = (prefix: string) => `${prefix}table_visibility_data`;
export const TABLE_DENSITY_DATA_NAME = (prefix: string) => `${prefix}table_density_data`;
// filtering
export const FILTER_DATE_RANGE_DATA_NAME = (prefix: string) => `${prefix}filter_date_range`;
export const FILTER_DATE_DATA_NAME = (prefix: string) => `${prefix}filter_date`;
export const VIEW_MODE_DATA_NAME = (prefix: string) => `${prefix}view_mode`;
// additional
export const EXPAND_COLUMNS_MODE_DATA_NAME = (prefix: string) => `${prefix}expand_columns_mode`;
export const COLUMNS_WIDTH = (prefix: string) => `${prefix}columns_width`;
export const COLUMNS_ORDER = (prefix: string) => `${prefix}columns_order`;
