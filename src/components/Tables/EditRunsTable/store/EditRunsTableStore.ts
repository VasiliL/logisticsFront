import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '@src/service/RunApiService';

import { ICreateRunDto, IRunDto } from '@src/service/types';

class CEditRunsTableStore {
  // список Run
  private _list: IRunDto[] = [];
  // Флаг состояния формирования списка Run
  private _isPendingList = false;
  // Флаг состояния выполнения действий с Run
  private _isPendingActions = false;
  // Стор с настройками пользователя
  private _settingsStore: SettingsStore | undefined;
  private _userSettings: IUserSettings | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.settingsStore = new SettingsStore('table_3_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('EditRunsTable Table Store init...');
    await this.loadListRuns();
  }

  // #region getter/setter

  get settingsStore(): SettingsStore | undefined {
    return this._settingsStore;
  }

  set settingsStore(value: SettingsStore | undefined) {
    this._settingsStore = value;
  }

  get userSettings(): IUserSettings {
    return this._userSettings ?? ({} as IUserSettings);
  }

  set userSettings(value: IUserSettings | undefined) {
    this._userSettings = value;
  }

  get list(): IRunDto[] {
    return this._list;
  }

  private set list(value: IRunDto[]) {
    this._list = value;
  }

  get isPendingList(): boolean {
    return this._isPendingList;
  }

  private set isPendingList(value: boolean) {
    this._isPendingList = value;
  }

  get isPendingActions(): boolean {
    return this._isPendingActions;
  }

  private set isPendingActions(value: boolean) {
    this._isPendingActions = value;
  }

  // #endregion

  // #region business logic (BL)

  public getRunById(id: number | string): IRunDto | undefined {
    return this.list.find(run => run.item_id == id);
  }

  public async updateRun(dto: IRunDto): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await RunApiService.updateMultipleRun([dto]);

      return result !== undefined;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async createRun(entry: IRunDto): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const dto = {
        invoice_id: entry.invoice?.item_id || null,
        car_id: entry.car_id,
        weight: entry.weight,
        weight_arrival: entry.weight_arrival,
        date_arrival: entry.date_arrival,
        date_departure: entry.date_departure,
        driver_id: entry.driver_id,
        client_weight: 0,
        weight_color: 0,
        weight_arrival_color: 0,
        client_weight_arrival: 0,
        run_status: null,
        comment: null,
        car_plate_number: entry.car_plate_number,
      } as ICreateRunDto;
      const created = await RunApiService.createRun(dto);
      if (created) {
        this.list = [...(this.list ? this.list : []), { ...entry, item_id: created.item_id }];
      }

      return created !== undefined;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async reloadDocuments(): Promise<void> {
    await this.loadListRuns();
  }

  private async loadListRuns(): Promise<void> {
    try {
      this.isPendingList = true;
      const dateStartStr = this.settingsStore?.dateStartStr ?? nowStr();
      const dateEndStr = this.settingsStore?.dateEndStr ?? nowStr();

      this.list = await RunApiService.getListRuns({ start_day: dateStartStr, end_day: dateEndStr });
    } finally {
      this.isPendingList = false;
    }
  }

  // #endregion
}

export const EditRunsTableStore = new CEditRunsTableStore();
