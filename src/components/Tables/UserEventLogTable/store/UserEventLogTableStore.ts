import { makeAutoObservable } from 'mobx';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { UserEventLogApiService } from '@src/service/UserEventLogApiService';

import { nowStr } from '@src/utils/date_utils';

import { IUserEventLogBL } from './types';

class CUserEventLogTableStore {
  // список Run
  private _list: IUserEventLogBL[] = [];
  // Флаг состояния формирования списка UserEventLog
  private _isPendingList = false;
  // Стор с настройками пользователя
  private _settingsStore: SettingsStore | undefined;
  private _userSettings: IUserSettings | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.settingsStore = new SettingsStore('table_event_log_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('UserEventLog Table Store init...');
    await this.loadList();
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

  get list(): IUserEventLogBL[] {
    return this._list;
  }

  private set list(value: IUserEventLogBL[]) {
    this._list = value;
  }

  get isPendingList(): boolean {
    return this._isPendingList;
  }

  private set isPendingList(value: boolean) {
    this._isPendingList = value;
  }

  // #endregion

  // #region business logic (BL)

  public async reloadList(): Promise<void> {
    await this.loadList();
  }

  private async loadList(): Promise<void> {
    try {
      this.isPendingList = true;
      const dateStartStr = this.settingsStore?.dateStartStr ?? nowStr();
      const dateEndStr = this.settingsStore?.dateEndStr ?? nowStr();

      this.list =
        (await UserEventLogApiService.getUserEventLogs({ start_day: dateStartStr, end_day: dateEndStr })) ?? [];
    } finally {
      this.isPendingList = false;
    }
  }

  // #endregion
}

export const UserEventLogTableStore = new CUserEventLogTableStore();
