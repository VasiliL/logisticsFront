import { computed, makeAutoObservable } from 'mobx';
import {
  GridColumnVisibilityModel,
  GridDensity,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';

import { DateRange } from 'mui-daterange-picker';
import { toStr } from '@src/utils/date_utils';

import {
  FILTER_DATE_DATA_NAME,
  FILTER_DATE_RANGE_DATA_NAME,
  FILTER_MODE_DATA_NAME,
  IUserSettings,
  TABLE_DENSITY_DATA_NAME,
  TABLE_FILTER_DATA_NAME,
  TABLE_PAGE_DATA_NAME,
  TABLE_SORT_DATA_NAME,
  TABLE_VISIBILITY_DATA_NAME,
} from '@src/store/types';
import {
  DEFAULT_DATE_END,
  DEFAULT_DATE_START,
  DEFAULT_FILTER_DATE,
  DEFAULT_FILTER_DATE_RANGE,
  DEFAULT_FILTER_MODE,
  DEFAULT_TABLE_DENSITY_MODE,
  DEFAULT_TABLE_FILTER_MODEL,
  DEFAULT_TABLE_PAGINATION_MODEL,
  DEFAULT_TABLE_SORT_MODEL,
  DEFAULT_TABLE_VISIBILITY_MODEL,
} from '@src/store/constants';

export class SettingsStore {
  // пагинация и настройка отображения таблицы
  private _tablePageModel: GridPaginationModel = DEFAULT_TABLE_PAGINATION_MODEL;
  private _tableFilterModel: GridFilterModel = DEFAULT_TABLE_FILTER_MODEL;
  private _tableSortModel: GridSortModel = DEFAULT_TABLE_SORT_MODEL;
  private _tableVisibilityModel: GridColumnVisibilityModel = DEFAULT_TABLE_VISIBILITY_MODEL;
  private _tableDensityMode: GridDensity = DEFAULT_TABLE_DENSITY_MODE;
  // настройки выбранного временного периода
  private _filterDateRange: DateRange = DEFAULT_FILTER_DATE_RANGE;
  private _filterDate: Date = DEFAULT_FILTER_DATE;
  private _dateStart: Date = DEFAULT_DATE_START;
  private _dateEnd: Date = DEFAULT_DATE_END;
  // дополнительные настройки таблицы
  private _filterMode: boolean = true;
  // префикс, с которым сохраняются настройки
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
    this.initUserTableSettings();
  }

  // #region getter/setter

  get tableVisibilityModel(): GridColumnVisibilityModel {
    return this._tableVisibilityModel;
  }

  set tableVisibilityModel(value: GridColumnVisibilityModel) {
    this.saveTableVisibilityData(value);
    this._tableVisibilityModel = value;
  }

  get tableSortModel(): GridSortModel {
    return this._tableSortModel;
  }

  set tableSortModel(value: GridSortModel) {
    this.saveTableSortData(value);
    this._tableSortModel = value;
  }

  get tableFilterModel(): GridFilterModel {
    return this._tableFilterModel;
  }

  set tableFilterModel(value: GridFilterModel) {
    this.saveTableFilterData(value);
    this._tableFilterModel = value;
  }

  get tablePageModel(): GridPaginationModel {
    return this._tablePageModel;
  }

  set tablePageModel(value: GridPaginationModel) {
    this.saveTablePageData(value);
    this._tablePageModel = value;
  }

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  set filterDateRange(value: DateRange) {
    this.saveFilterDateRange(value);
    this.dateStart = value.startDate || this.dateStart;
    this.dateEnd = value.endDate || this.dateEnd;
    this._filterDateRange = value;
  }

  get filterMode(): boolean {
    return this._filterMode;
  }

  set filterMode(value: boolean) {
    this.saveFilterMode(value);
    this._filterMode = value;
  }

  get tableDensityMode(): GridDensity {
    return this._tableDensityMode;
  }

  set tableDensityMode(value: GridDensity) {
    this.saveTableDensityMode(value);
    this._tableDensityMode = value;
  }

  get dateEnd(): Date {
    return new Date(this._dateEnd);
  }

  set dateEnd(value: Date) {
    this._dateEnd = value;
  }

  get dateStart(): Date {
    return new Date(this._dateStart);
  }

  set dateStart(value: Date) {
    this._dateStart = value;
  }

  get filterDate(): Date {
    return this._filterDate;
  }

  set filterDate(value: Date) {
    this.saveFilterDate(value);
    this._filterDate = value;
  }

  get settings_prefix(): string {
    return this._settings_prefix;
  }

  set settings_prefix(value: string) {
    this._settings_prefix = value;
  }

  // #endregion

  // #region mui data grid settings

  get dateStartStr(): string {
    return toStr(this.dateStart);
  }

  get dateEndStr(): string {
    return toStr(this.dateEnd);
  }

  get dateStr(): string {
    return toStr(this.filterDate);
  }

  get currentSettings() {
    return {
      tablePageModel: this.tablePageModel,
      tableSortModel: this.tableSortModel,
      tableFilterModel: this.tableFilterModel,
      tableVisibilityModel: this.tableVisibilityModel,
      tableDensityMode: this.tableDensityMode,
      filterDateRange: this.filterDateRange,
      filterDate: this.filterDate,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      filterMode: this.filterMode,
      saveTablePageData: value => (this.tablePageModel = value),
      saveTableSortData: value => (this.tableSortModel = value),
      saveTableFilterData: value => (this.tableFilterModel = value),
      saveTableVisibilityData: value => (this.tableVisibilityModel = value),
      saveTableDensityMode: value => (this.tableDensityMode = value),
      saveFilterDateRange: value => (this.filterDateRange = value),
      saveFilterDate: value => (this.filterDate = value),
      saveFilterMode: value => (this.filterMode = value),
    } as IUserSettings;
  }

  private initUserTableSettings = () => {
    this.tablePageModel = this.getTablePageData();
    this.tableFilterModel = this.getTableFilterData();
    this.tableSortModel = this.getTableSortData();
    this.tableVisibilityModel = this.getTableVisibilityData();
    this.filterDateRange = this.getFilterDateRange();
    this.filterDate = this.getFilterDate();
    this.filterMode = this.getFilterMode();
    this.tableDensityMode = this.getTableDensityMode();
  };

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

  private saveFilterDateRange = (data: DateRange): void => {
    this.set(this.getParamName(FILTER_DATE_RANGE_DATA_NAME), data);
  };

  private saveFilterDate = (data: Date): void => {
    this.set(this.getParamName(FILTER_DATE_DATA_NAME), data);
  };

  private saveFilterMode = (data: boolean): void => {
    this.set(this.getParamName(FILTER_MODE_DATA_NAME), data);
  };

  private saveTableDensityMode = (data: GridDensity): void => {
    this.set(this.getParamName(TABLE_DENSITY_DATA_NAME), data);
  };

  private getTablePageData = (): GridPaginationModel => {
    return this.get(this.getParamName(TABLE_PAGE_DATA_NAME)) || DEFAULT_TABLE_PAGINATION_MODEL;
  };

  private getTableFilterData = (): GridFilterModel => {
    return this.get(this.getParamName(TABLE_FILTER_DATA_NAME)) || DEFAULT_TABLE_FILTER_MODEL;
  };

  private getTableSortData = (): GridSortModel => {
    return this.get(this.getParamName(TABLE_SORT_DATA_NAME)) || DEFAULT_TABLE_SORT_MODEL;
  };

  private getTableVisibilityData = (): GridColumnVisibilityModel => {
    return this.get(this.getParamName(TABLE_VISIBILITY_DATA_NAME)) || DEFAULT_TABLE_VISIBILITY_MODEL;
  };

  private getFilterDateRange = (): DateRange => {
    return this.get(this.getParamName(FILTER_DATE_RANGE_DATA_NAME)) || DEFAULT_FILTER_DATE_RANGE;
  };

  private getFilterDate = (): Date => {
    return this.get(this.getParamName(FILTER_DATE_DATA_NAME)) || DEFAULT_FILTER_DATE;
  };

  private getFilterMode = (): boolean => {
    const res = this.get(this.getParamName(FILTER_MODE_DATA_NAME));

    return res === undefined ? DEFAULT_FILTER_MODE : res;
  };

  private getTableDensityMode = (): GridDensity => {
    const res = this.get(this.getParamName(TABLE_DENSITY_DATA_NAME));

    return res === undefined ? DEFAULT_TABLE_DENSITY_MODE : res;
  };

  private getParamName = (name: (name: string) => string) => {
    return name(this.settings_prefix);
  };

  private get = (name: string) => {
    const saved = localStorage.getItem(name);

    return saved !== undefined && saved !== null && saved !== 'undefined' ? JSON.parse(saved) : undefined;
  };

  private set = (name: string, data: object | string | boolean) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  // #endregion
}
