import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '@src/service/RunApiService';

import { ICargoDocumentRsDto, ICargoStockBalance, ICounterpartyDto, IRunDto } from '@src/service/types';
import { CargoApiService } from '@src/service/CargoApiService';
import { CounterpartyApiService } from '@src/service/CounterpartyApiService';
import { CargoDocumentApiService } from '@src/service/CargoDocumentApiService';

class CClientDocumentsTableStore {
  // список Run
  private _list: IRunDto[] = [];
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

  get list(): IRunDto[] {
    return this._list;
  }

  private set list(value: IRunDto[]) {
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

  public async updateRun(dtos: IRunDto[]): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await RunApiService.updateMultipleRun(dtos);

      return result !== undefined;
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
