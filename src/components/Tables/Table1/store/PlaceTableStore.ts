import { computed, makeAutoObservable } from 'mobx';

import { getDatesRange, nowStr } from '@src/utils/date_utils';

import { DictStore } from '@src/store/DictStore';

import { IUserSettings } from '@src/store/types';
import { SettingsStore } from '@src/store/SettingsStore';

import { PlaceApiService } from '../service/PlaceApiService';

import { IPlaceBL } from './types';

class CPlaceTableStore {
  // список Place
  private _list: IPlaceBL[] = [];
  // Флаг состояния формирования списка Run
  private _isPendingList = false;
  // Флаг состояния выполнения действий с Run
  private _isPendingActions = false;
  // Стор с настройками пользователя
  private _settingsStore: SettingsStore | undefined;
  private _userSettings: IUserSettings | undefined;

  constructor() {
    makeAutoObservable(this, { entries: computed, dates: computed }, { autoBind: true });
    this.settingsStore = new SettingsStore('table_1_');
    this.userSettings = this.settingsStore.currentSettings;
  }

  async init(): Promise<void> {
    console.log('Place Table Store init...');
    await this.loadListPlaces();
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

  get list(): IPlaceBL[] {
    return this._list;
  }

  private set list(value: IPlaceBL[]) {
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

  // список данных для клеток таблицы в виде car_id -> date -> place
  get entries() {
    const map = new Map<number, Map<string, IPlaceBL>>();
    DictStore.cars?.forEach(car => {
      const itemMap = new Map<string, IPlaceBL>();
      this.list?.forEach(item => {
        if (item.car_id === car.id) {
          itemMap.set(item.date, item);
        }
      });
      map.set(car.id, itemMap);
    });

    return map;
  }

  // даты, отображаемые в шапке таблицы
  get dates() {
    const dateStartStr = this.settingsStore?.dateStart || new Date();
    const dateEndStr = this.settingsStore?.dateEnd || new Date();

    return getDatesRange(dateStartStr, dateEndStr);
  }

  public async createPlace(dto: IPlaceBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const id = await PlaceApiService.createPlace(dto);
      if (id) {
        dto.id = id;
        this.list.push(dto);
      }

      return true;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async updatePlace(dto: IPlaceBL): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await PlaceApiService.updatePlace(dto);
      if (result) {
        const found = this.list.find(item => item.id === dto.id);
        if (found) {
          found.driver_id = dto.driver_id;
        } else {
          throw new Error('Непредвиденная ошибка сервиса');
        }
      }

      return result;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async deletePlace(id: number): Promise<boolean> {
    try {
      this.isPendingActions = true;
      const result = await PlaceApiService.deletePlace(id);
      if (result) {
        this.list = this.list.filter(item => item.id !== id);
      }

      return result;
    } finally {
      this.isPendingActions = false;
    }
  }

  public async reloadPlaces(): Promise<void> {
    await this.loadListPlaces();
  }

  private async loadListPlaces(): Promise<void> {
    try {
      this.isPendingList = true;
      const dateStartStr = this.settingsStore?.dateStartStr || nowStr();
      const dateEndStr = this.settingsStore?.dateEndStr || nowStr();

      this.list = await PlaceApiService.getListPlaces({ start_day: dateStartStr, end_day: dateEndStr });
    } finally {
      this.isPendingList = false;
    }
  }

  // #endregion
}

export const PlaceTableStore = new CPlaceTableStore();
