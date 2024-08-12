import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '@src/service/RunApiService';

import { ICreateRunDto, IRunDto } from '@src/service/types';

import { IRunBL } from './types';

class CEditRunsTableStore {
  // список Run
  private _list: IRunBL[] = [];
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

  get list(): IRunBL[] {
    return this._list;
  }

  private set list(value: IRunBL[]) {
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

  // список данных для клеток таблицы в виде run_id -> run
  // get entries() {
  //   const map = new Map<number, IDocumentBL>();
  //   this.list?.forEach(item => {
  //     const info = {
  //       id: item.item_id,
  //       car_id: item.car_id,
  //       driver_id: item.driver_id,
  //       weight: item.weight,
  //       weight_arrival: item.weight_arrival,
  //       invoice_id: item.invoice_id,
  //       date_departure: item.date_departure,
  //       date_arrival: item.date_arrival,
  //       client: item.client,
  //       cargo: item.cargo,
  //       route: item.route,
  //     } as IDocumentBL;
  //     map.set(item.item_id ?? 0, info);
  //   });
  //
  //   return map;
  // }

  public async updateRun(dto: IRunBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      // const found = this.list.find(item => item.item_id === dto.item_id);
      // if (!found) throw new Error('Непредвиденная ошибка сервиса');

      const result = await RunApiService.updateMultipleRun([
        // {
        //   ...found,
        //   weight: dto.weight,
        //   weight_arrival: dto.weight_arrival,
        //   driver_id: dto.driver_id,
        //   car_id: dto.car_id,
        // },
        dto,
      ]);
      // if (result) {
      //   this.list = this.list.map(item => (item.item_id === dto.item_id ? dto : item));
      // }

      return result;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async createRun(dto: ICreateRunDto): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const id = await RunApiService.createRun(dto);
      // if (id) {
      //   dto.item_id = id;
      //   this.list = [...(this.list ? this.list : []), dto];
      // }

      return id !== undefined;
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
