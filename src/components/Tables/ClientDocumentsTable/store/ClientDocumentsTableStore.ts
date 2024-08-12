import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '@src/service/RunApiService';

import {
  ICargoDocumentRsDto,
  ICargoStockBalance,
  ICounterpartyDto,
  ICreateDocument,
  IRunDto,
} from '@src/service/types';

import { DocumentApiService } from '@src/service/DocumentApiService';
import { CargoApiService } from '@src/service/CargoApiService';
import { CounterpartyApiService } from '@src/service/CounterpartyApiService';
import { CargoDocumentApiService } from '@src/service/CargoDocumentApiService';

import { IRunBL } from './types';

class CClientDocumentsTableStore {
  // список Run
  private _list: IRunBL[] = [];
  private _counterpartyList: ICounterpartyDto[] = [];
  private _cargoList: ICargoStockBalance[] = [];
  private _cargoDocumentsList: ICargoDocumentRsDto[] = [];
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
    console.log('ClientDocuments Table Store init...');
    await this.loadListRuns();
    await this.loadStockCargo();
    await this.loadCounterpartyList();
    await this.loadDocumentsCargo();
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

  get cargoList(): ICargoStockBalance[] {
    return this._cargoList;
  }

  set cargoList(value: ICargoStockBalance[]) {
    this._cargoList = value;
  }

  get counterpartyList(): ICounterpartyDto[] {
    return this._counterpartyList;
  }

  set counterpartyList(value: ICounterpartyDto[]) {
    this._counterpartyList = value;
  }

  get cargoDocumentsList(): ICargoDocumentRsDto[] {
    return this._cargoDocumentsList;
  }

  set cargoDocumentsList(value: ICargoDocumentRsDto[]) {
    this._cargoDocumentsList = value;
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

  public getCargoById(cargo_id: number | string): ICargoStockBalance | undefined {
    return this.cargoList.find(cargo => cargo.item_id == cargo_id);
  }

  public getCounterpartyById(id: string): ICounterpartyDto[] {
    return this.counterpartyList.filter(counterparty => counterparty.item_id === id) || [];
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

  // список грузов в виде run_id -> cargo
  // get cargoList() {
  //   const map = new Map<string, string>();
  //   if (this.list) {
  //     this.list?.forEach(item => {
  //       map.set(item.item_id?.toString() ?? '0', item?.invoice.cargo ?? '');
  //     });
  //   }
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

  public async updateRun(dtos: IRunBL[]): Promise<boolean> {
    try {
      this.isPendingActions = true;
      // const preparedDtos = dtos.map((dto: IRunBL) => {
      //   const found = this.list.find(item => item.item_id === dto.item_id);
      //   if (!found) throw new Error('Непредвиденная ошибка сервиса');
      //
      //   return {
      //     ...found,
      //     waybill: dto.waybill,
      //     // waybill: dto.waybill, todo
      //     client_weight: dto.client_weight,
      //     client_weight_arrival: dto.client_weight_arrival,
      //     reg_date: dto.reg_date,
      //     acc_date: dto.acc_date,
      //     invoice_document: dto.invoice_document,
      //   };
      // });

      const result = await RunApiService.updateMultipleRun(dtos);

      return result;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async reloadDocuments(): Promise<void> {
    await this.loadListRuns();
  }

  private async loadCounterpartyList(): Promise<void> {
    try {
      this.isPendingList = true;

      this.counterpartyList = await CounterpartyApiService.getList();
    } finally {
      this.isPendingList = false;
    }
  }

  private async loadStockCargo(): Promise<void> {
    try {
      this.isPendingList = true;

      this.cargoList = await CargoApiService.getStocked();
    } finally {
      this.isPendingList = false;
    }
  }

  private async loadDocumentsCargo(): Promise<void> {
    try {
      this.isPendingList = true;
      const dateStartStr = this.settingsStore?.dateStartStr ?? nowStr();
      const dateEndStr = this.settingsStore?.dateEndStr ?? nowStr();

      this.cargoDocumentsList = await CargoDocumentApiService.getList({ date_from: dateStartStr, date_to: dateEndStr });
    } finally {
      this.isPendingList = false;
    }
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

export const ClientDocumentsTableStore = new CClientDocumentsTableStore();
