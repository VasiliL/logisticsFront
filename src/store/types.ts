import { IDictCarDto, IDictDriverDto, IDataInvoiceDto } from '@src/service/types';
import {
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { DateRange } from 'mui-daterange-picker';

export interface IDictCarBL extends IDictCarDto {}

export interface IDictDriverBL extends IDictDriverDto {}

export interface IDataInvoiceBL extends IDataInvoiceDto {}

export interface IUserSettings {
  tablePageModel: GridPaginationModel;
  tableFilterModel: GridFilterModel;
  tableSortModel: GridSortModel;
  tableVisibilityModel: GridColumnVisibilityModel;
  tableDensityMode: GridDensity;
  filterDateRange: DateRange;
  filterDate: Date;
  filterMode: boolean;

  saveTablePageData: (value: GridPaginationModel) => void;
  saveTableVisibilityData: (value: GridColumnVisibilityModel) => void;
  saveTableSortData: (value: GridSortModel) => void;
  saveTableFilterData: (value: GridFilterModel) => void;
  saveTableDensityMode: (value: GridDensity) => void;
  saveFilterDateRange: (value: DateRange) => void;
  saveFilterDate: (value: Date) => void;
  saveFilterMode: (value: boolean) => void;

  dateStart: Date;
  dateEnd: Date;
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
export const FILTER_MODE_DATA_NAME = (prefix: string) => `${prefix}filter_mode`;
