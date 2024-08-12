import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '@src/service/RunApiService';
import { ICreateDocument, IRunDto } from '@src/service/types';
import { DocumentApiService } from '@src/service/DocumentApiService';

class CTransportDataTableStore {
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
    this.settingsStore = new SettingsStore('table_4_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('TransportData Table Store init...');
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

  // список данных для клеток таблицы в виде run_id -> run
  // get entries() {
  //   // const map = new Map<number, IDocumentBL>();
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
  //       client_weight_arrival: item.client_weight_arrival,
  //       client_weight: item.client_weight,
  //       reg_date: item.reg_date,
  //       acc_date: item.acc_date,
  //     } as IDocumentBL;
  //     map.set(item.item_id ?? 0, info);
  //   });
  //
  //   return map;
  // }

  public async createDocuments(dtos: ICreateDocument[]): Promise<boolean> {
    try {
      this.isPendingActions = true;

      return await DocumentApiService.createMultipleDocument(dtos);
    } finally {
      this.isPendingActions = false;
    }
  }

  public async updateRun(dtos: IRunDto[]): Promise<boolean> {
    try {
      this.isPendingActions = true;
      // const preparedDtos = dtos.map((dto: IRunDto) => {
      //   const found = this.list.find(item => item.item_id === dto.item_id);
      //   if (!found) throw new Error('Непредвиденная ошибка сервиса');
      //
      //   return {
      //     ...found,
      //     invoice: {
      //       ...found.invoice,
      //       waybill: dto.waybill,
      //     },
      //     // waybill: dto.waybill, todo
      //     client_weight: dto.client_weight,
      //     client_weight_arrival: dto.client_weight_arrival,
      //     date_arrival: dto.date_arrival,
      //     date_departure: dto.date_departure,
      //     invoice_document: dto.invoice_document,
      //   };
      // });

      return await RunApiService.updateMultipleRun(dtos);
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

export const TransportDataTableStore = new CTransportDataTableStore();
