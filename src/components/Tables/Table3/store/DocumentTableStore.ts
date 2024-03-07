import { computed, makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IRunBL } from '@src/components/Tables/Table2/store/types';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '../../Table2/service/RunApiService';

import { IDocumentBL } from './types';

class CDocumentTableStore {
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
    makeAutoObservable(this, { entries: computed }, { autoBind: true });
    this.settingsStore = new SettingsStore('table_3_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('Document Table Store init...');
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
    return this._userSettings || ({} as IUserSettings);
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

  // список данных для клеток таблицы в виде run_id -> run
  get entries() {
    const map = new Map<number, IDocumentBL>();
    this.list?.forEach(item => {

      const info = {
        id: item.id,
        car_id: item.car_id,
        driver_id: item.driver_id,
        weight: item.weight,
        waybill: item.waybill,
        invoice_id: item.invoice_id,
        invoice_document: item.invoice_document,
        date_departure: item.date_departure,
        date_arrival: item.date_arrival,
        reg_number: item.reg_number,
        reg_date: item.reg_date,
        acc_number: item.acc_number,
        acc_date: item.acc_date,
        client: item.client,
        cargo: item.cargo,
        route: item.route,
      } as IDocumentBL;
      map.set(item.id, info);
    });

    return map;
  }

  public async updateRun(dto: IRunBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const found = this.list.find(item => item.id === dto.id);
      if (!found) throw new Error('Непредвиденная ошибка сервиса');

      const result = await RunApiService.updateRun({
        ...found,
        acc_date: dto.acc_date,
        reg_date: dto.reg_date,
        acc_number: dto.acc_number,
        reg_number: dto.reg_number,
        waybill: dto.waybill,
        invoice_document: dto.invoice_document,
        weight: dto.weight,
        driver_id: dto.driver_id,
        car_id: dto.car_id,
      });
      if (result) {
        this.list = [...this.list.filter(item => item.id !== dto.id), {
          ...found,
          acc_date: dto.acc_date,
          acc_number: dto.acc_number,
          reg_date: dto.reg_date,
          reg_number: dto.reg_number,
        }];
      }

      return result;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async createRun(dto: IRunBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const id = await RunApiService.createRun(dto);
      if (id) {
        dto.id = id;
        this.list = [ ...this.list, dto ];
      }

      return id !== undefined;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async deleteRun(id: number): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await RunApiService.deleteRun(id);
      if (result) {
        this.list = this.list.filter(item => item.id !== id);
      }

      return result;
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
      const dateStartStr = this.settingsStore?.dateStartStr || nowStr();
      const dateEndStr = this.settingsStore?.dateEndStr || nowStr();

      this.list = await RunApiService.getListRuns({ start_day: dateStartStr, end_day: dateEndStr });
    } finally {
      this.isPendingList = false;
    }
  }

  // #endregion
}

export const DocumentTableStore = new CDocumentTableStore();
