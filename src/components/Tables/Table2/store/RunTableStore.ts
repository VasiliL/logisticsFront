import { computed, makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { DataApiService } from '@src/service/DataApiService';

import { IDataInvoiceBL, IUserSettings } from '@src/store/types';

import { SettingsStore } from '@src/store/SettingsStore';

import { RunApiService } from '../service/RunApiService';

import { IRunBL } from './types';

class CRunTableStore {
  // список Run
  private _list: IRunBL[] = [];
  // список Invoice
  private _invoices: IDataInvoiceBL[] = [];
  // Флаг состояния формирования списка Run
  private _isPendingList = false;
  // Флаг состояния выполнения действий с Run
  private _isPendingActions = false;
  // Стор с настройками пользователя
  private _settingsStore: SettingsStore | undefined;
  private _userSettings: IUserSettings | undefined;
  // Данные для фильтрации
  private _filterDate: Date = new Date();

  constructor() {
    makeAutoObservable(this, { entries: computed, invoiceIdMap: computed, invoiceList: computed }, { autoBind: true });
    this.settingsStore = new SettingsStore('table_2_');
    this.userSettings = this.settingsStore.currentSettings;
    this.filterDate = this.settingsStore.currentSettings.filterDate;
  }

  async init(): Promise<void> {
    console.log('Run Table Store init...');
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

  get invoices(): IDataInvoiceBL[] {
    return this._invoices;
  }

  set invoices(value: IDataInvoiceBL[]) {
    this._invoices = value;
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

  get filterDate(): Date {
    return this._filterDate;
  }

  set filterDate(value: Date) {
    this._filterDate = value;
  }

  // #endregion

  // #region business logic (BL)

  // список данных для клеток таблицы в виде invoice_id -> car_id -> run
  get entries() {
    const map = new Map<number, IRunBL[]>();
    this.invoices?.forEach(invoice => {
      const itemList: IRunBL[] = [];
      this.list?.forEach(item => {
        if (item.invoice_id == invoice.id) {
          itemList.push(item);
        }
      });
      map.set(invoice.id, itemList);
    });

    return map;
  }

  // список заявок в виде id -> invoice
  get invoiceIdMap() {
    const map = new Map<number, IDataInvoiceBL>();
    this.invoices?.forEach(invoice => map.set(invoice.id, invoice));

    return map;
  }

  // список заявок
  get invoiceList() {
    return this.invoices || [];
  }

  public saveFilterDate(value: Date): void {
    this.filterDate = value;
  }

  public async createRun(dto: IRunBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const id = await RunApiService.createRun(dto);
      if (id) {
        dto.id = id;
        this.list = [...(this.list ? this.list : []), dto];
      }

      return id !== undefined;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async updateRun(dto: IRunBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await RunApiService.updateRun(dto);
      if (result) {
        this.list = this.list.map(item => item.id === dto.id ? dto : item);
      }

      return result;
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

  public async reloadRuns(): Promise<void> {
    await this.loadListRuns();
  }

  private async loadListRuns(): Promise<void> {
    try {
      this.isPendingList = true;
      const date = this.settingsStore?.dateStr || nowStr();
      this.list = await RunApiService.getListRuns({ start_day: date, end_day: date });
      this.invoices = await DataApiService.getInvoices({ day: date });
    } finally {
      this.isPendingList = false;
    }
  }

  public async uploadRunDocs(file: File): Promise<boolean> {
    try {
      this.isPendingActions = true;

      return await RunApiService.uploadRunDocs(file);
    } finally {
      this.isPendingActions = false;
    }
  }

  public async uploadClientDocs(file: File): Promise<boolean> {
    try {
      this.isPendingActions = true;

      return await RunApiService.uploadClientDocs(file);
    } finally {
      this.isPendingActions = false;
    }
  }

  // #endregion
}

export const RunTableStore = new CRunTableStore();
