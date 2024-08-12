import { computed, makeAutoObservable } from 'mobx';
import {
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';

import { toStr } from '@src/utils/date_utils';

import {
  COLUMNS_ORDER,
  COLUMNS_WIDTH,
  EXPAND_COLUMNS_MODE_DATA_NAME,
  FILTER_DATE_DATA_NAME,
  FILTER_DATE_RANGE_DATA_NAME,
  IUserSettings,
  TABLE_DENSITY_DATA_NAME,
  TABLE_FILTER_DATA_NAME,
  TABLE_PAGE_DATA_NAME,
  TABLE_SORT_DATA_NAME,
  TABLE_VISIBILITY_DATA_NAME,
  VIEW_MODE_DATA_NAME,
} from '@src/store/types';
import {
  DEFAULT_COLUMNS_ORDER,
  DEFAULT_COLUMNS_WIDTH,
  DEFAULT_EXPAND_COLUMNS_MODE,
  DEFAULT_FILTER_DATE,
  DEFAULT_FILTER_DATE_RANGE,
  DEFAULT_TABLE_DENSITY_MODE,
  DEFAULT_TABLE_FILTER_MODEL,
  DEFAULT_TABLE_PAGINATION_MODEL,
  DEFAULT_TABLE_SORT_MODEL,
  DEFAULT_TABLE_VISIBILITY_MODEL,
  DEFAULT_VIEW_MODE,
} from '@src/store/constants';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';

export class SettingsStore {
  private _settings_prefix: string = '';

  constructor(settings_prefix: string) {
    console.log('Settings Store init...');
    this.settings_prefix = settings_prefix;
    makeAutoObservable(
      this,
      {
        currentSettings: computed,
        dateStartStr: computed,
        dateEndStr: computed,
        dateStr: computed,
      },
      { autoBind: true },
    );
  }

  // #region getter/setter

  get settings_prefix(): string {
    return this._settings_prefix;
  }

  set settings_prefix(value: string) {
    this._settings_prefix = value;
  }

  // #endregion

  // #region mui data grid settings

  get dateStartStr(): string {
    return toStr(this.getFilterDateRange()[0]);
  }

  get dateEndStr(): string {
    return toStr(this.getFilterDateRange()[1]);
  }

  get dateStr(): string {
    return toStr(this.getFilterDate());
  }

  get currentSettings() {
    return {
      tablePageModel: this.getTablePageData(),
      tableSortModel: this.getTableSortData(),
      tableFilterModel: this.getTableFilterData(),
      tableVisibilityModel: this.getTableVisibilityData(),
      tableDensityMode: this.getTableDensityMode(),
      filterDateRange: this.getFilterDateRange(),
      filterDate: this.getFilterDate(),
      rangePickerDate: this.getFilterDateRange(),
      viewMode: this.getViewMode(),
      expandColumnsMode: this.getExpandColumnsMode(),
      columnsWidth: this.getColumnsWidth(),
      columnsOrder: this.getColumnsOrder(),
      saveTablePageData: this.saveTablePageData,
      saveTableSortData: this.saveTableSortData,
      saveTableFilterData: this.saveTableFilterData,
      saveTableVisibilityData: this.saveTableVisibilityData,
      saveTableDensityMode: this.saveTableDensityMode,
      saveFilterDateRange: this.saveFilterDateRange,
      saveFilterDate: this.saveFilterDate,
      saveViewMode: this.saveViewMode,
      saveExpandColumnsMode: this.saveExpandColumnsMode,
      saveColumnsWidth: this.saveColumnWidth,
      saveColumnsOrder: this.saveColumnOrder,
    } as IUserSettings;
  }

  private saveTablePageData = (data: GridPaginationModel): void => {
    this.set(this.getParamName(TABLE_PAGE_DATA_NAME), data);
  };

  private saveTableFilterData = (data: GridFilterModel): void => {
    this.set(this.getParamName(TABLE_FILTER_DATA_NAME), data);
  };

  private saveTableSortData = (data: GridSortModel): void => {
    this.set(this.getParamName(TABLE_SORT_DATA_NAME), data);
  };

  private saveTableVisibilityData = (data: GridColumnVisibilityModel): void => {
    this.set(this.getParamName(TABLE_VISIBILITY_DATA_NAME), data);
  };

  private saveFilterDateRange = (data: DateRange<Dayjs>): void => {
    this.set(this.getParamName(FILTER_DATE_RANGE_DATA_NAME), data);
  };

  private saveFilterDate = (data: Date): void => {
    this.set(this.getParamName(FILTER_DATE_DATA_NAME), data);
  };

  private saveViewMode = (data: boolean): void => {
    this.set(this.getParamName(VIEW_MODE_DATA_NAME), data);
  };

  private saveColumnWidth = (data: Map<string, number>): void => {
    this.set(this.getParamName(COLUMNS_WIDTH), data, true);
  };

  private saveColumnOrder = (data: string[]): void => {
    this.set(this.getParamName(COLUMNS_ORDER), data);
  };

  private saveExpandColumnsMode = (data: boolean): void => {
    this.set(this.getParamName(EXPAND_COLUMNS_MODE_DATA_NAME), data);
  };

  private saveTableDensityMode = (data: GridDensity): void => {
    this.set(this.getParamName(TABLE_DENSITY_DATA_NAME), data);
  };

  private getTablePageData = (): GridPaginationModel => {
    return this.get(this.getParamName(TABLE_PAGE_DATA_NAME)) ?? DEFAULT_TABLE_PAGINATION_MODEL;
  };

  private getTableFilterData = (): GridFilterModel => {
    return this.get(this.getParamName(TABLE_FILTER_DATA_NAME)) ?? DEFAULT_TABLE_FILTER_MODEL;
  };

  private getTableSortData = (): GridSortModel => {
    return this.get(this.getParamName(TABLE_SORT_DATA_NAME)) ?? DEFAULT_TABLE_SORT_MODEL;
  };

  private getTableVisibilityData = (): GridColumnVisibilityModel => {
    return this.get(this.getParamName(TABLE_VISIBILITY_DATA_NAME)) ?? DEFAULT_TABLE_VISIBILITY_MODEL;
  };

  private getFilterDateRange = (): DateRange<Dayjs> => {
    return this.get(this.getParamName(FILTER_DATE_RANGE_DATA_NAME)) ?? DEFAULT_FILTER_DATE_RANGE;
  };

  private getFilterDate = (): Date => {
    return this.get(this.getParamName(FILTER_DATE_DATA_NAME)) ?? DEFAULT_FILTER_DATE;
  };

  private getViewMode = (): boolean => {
    const val = this.get(this.getParamName(VIEW_MODE_DATA_NAME));

    return val === undefined ? DEFAULT_VIEW_MODE : val;
  };

  private getColumnsWidth = (): Map<string, number> => {
    return this.get(this.getParamName(COLUMNS_WIDTH), true) ?? DEFAULT_COLUMNS_WIDTH;
  };

  private getColumnsOrder = (): string[] => {
    return this.get(this.getParamName(COLUMNS_ORDER)) ?? DEFAULT_COLUMNS_ORDER;
  };

  private getExpandColumnsMode = (): boolean => {
    return this.get(this.getParamName(EXPAND_COLUMNS_MODE_DATA_NAME)) ?? DEFAULT_EXPAND_COLUMNS_MODE;
  };

  private getTableDensityMode = (): GridDensity => {
    return this.get(this.getParamName(TABLE_DENSITY_DATA_NAME)) ?? DEFAULT_TABLE_DENSITY_MODE;
  };

  private getParamName = (name: (name: string) => string) => {
    return name(this.settings_prefix);
  };

  private get = (name: string, isMap = false) => {
    const saved = localStorage.getItem(name);
    if (saved === undefined || saved === null || saved === 'undefined') {
      return undefined;
    }
    const value = JSON.parse(saved);
    const isIterable = isMap && typeof value[Symbol.iterator] === 'function';

    return isIterable ? new Map(value) : value;
  };

  private set = (name: string, data: object | string | boolean | Map<string, number | string>, isMap = false) => {
    const value = JSON.stringify(isMap ? [...(data as Map<string, number | string>)] : data);
    localStorage.setItem(name, value);
  };

  // #endregion
}
