import { makeAutoObservable } from 'mobx';

import { nowStr } from '@src/utils/date_utils';

import { IDataInvoiceBL, IUserSettings } from '@src/store/types';

import { SettingsStore } from '@src/store/SettingsStore';
import { LogisticsDailyPlanApiService } from '@src/service/LogisticsDailyPlanService';
import { ILogisticsDailyPlanDto } from '@src/service/types';
import { DataApiService } from '@src/service/DataApiService';

class CCreateRunsTableStore {
  // список Run
  private _list: ILogisticsDailyPlanDto[] = [];
  // список Invoice
  private _invoices: IDataInvoiceBL[] = [];
  // Флаг состояния формирования списка Run
  private _isPendingList = false;
  // Флаг состояния выполнения действий с Run
  private _isPendingActions = false;
  // Стор с настройками пользователя
  private _settingsStore: SettingsStore | undefined;
  private _userSettings: IUserSettings | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.settingsStore = new SettingsStore('table_2_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('CreateRunsTable Store init...');
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

  get invoices(): IDataInvoiceBL[] {
    return this._invoices;
  }

  set invoices(value: IDataInvoiceBL[]) {
    this._invoices = value;
  }

  get list(): ILogisticsDailyPlanDto[] {
    return this._list;
  }

  private set list(value: ILogisticsDailyPlanDto[]) {
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

  public updateRunLocally(invoiceId: string, cars: number[]) {
    this.list = this.list.map(l => l.invoice_id == invoiceId ? { ...l, cars } : l);
  }

  public async updateRun(invoiceId: string, cars: number[]): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const date = this.settingsStore?.dateStr ?? nowStr();
      const isSuccess = await LogisticsDailyPlanApiService.update({
        invoice_id: invoiceId,
        date_departure: date,
        cars,
      });
      this.updateRunLocally(invoiceId, cars);

      return isSuccess !== undefined;
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
      const date = this.settingsStore?.dateStr ?? nowStr();
      this.list = await LogisticsDailyPlanApiService.getList(date);
      this.invoices = await DataApiService.getInvoices({ day: date }) || [];
    } finally {
      this.isPendingList = false;
    }
  }

  // #endregion
}

export const CreateRunsTableStore = new CCreateRunsTableStore();
