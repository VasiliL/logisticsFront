import { computed, makeAutoObservable } from 'mobx';

import { DictApiService } from '@src/service/DictApiService';

import { IDictCarBL, IDictDriverBL } from './types';

class CDictStore {
  // Флаг состояния загрузки данных
  private _isLoading = true;
  // список справочников Cars
  private _cars: IDictCarBL[] = [];
  // список справочников Driver
  private _drivers: IDictDriverBL[] = [];

  constructor() {
    makeAutoObservable(
      this,
      {
        driverIdList: computed,
        driverFioMap: computed,
        driverIdMap: computed,
        carNumberList: computed,
        carIdMap: computed,
        carNumberMap: computed,
      },
      { autoBind: true },
    );
  }

  async init(): Promise<void> {
    console.log('Dictionary Store init...');
    await this.loadDictionaries();
  }

  // #region getter/setter

  get cars(): IDictCarBL[] {
    return this._cars;
  }

  private set cars(value: IDictCarBL[]) {
    this._cars = value;
  }

  get drivers(): IDictDriverBL[] {
    return this._drivers;
  }

  set drivers(value: IDictDriverBL[]) {
    this._drivers = value;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  // #endregion

  // #region business logic (BL)

  // список водителей, отображаемые на пересечении в таблице
  get driverIdList() {
    return [''].concat(this.drivers?.map(driver => driver.fio) || []);
  }

  // список водителей, отображаемые на пересечении в таблице, только для РВ-ТАРИФ
  get driverIdListMyCompany() {
    return [''].concat(this.drivers
      ?.filter(driver => driver.company === 'РВ-ТАРИФ ООО')
      .map(driver => driver.fio) || []);
  }

  // список машин, отображаемые на пересецении в таблице
  get carNumberList() {
    return [...new Set(this.cars?.map(car => car.plate_number) || [])];
  }

  // список машин с описанием, отображаемые на пересецении в таблице
  get carDescriptionList() {
    return [...new Set(this.cars?.map(car => car.description) || [])];
  }

  // список водителей в виде id -> fio
  get driverIdMap() {
    const map = new Map<number, string>();
    this.drivers?.forEach(driver => map.set(driver.id, driver.fio));

    return map;
  }

  // список водителей в виде fio -> id
  get driverFioMap() {
    const map = new Map<string, number>();
    this.drivers?.forEach(driver => map.set(driver.fio, driver.id));

    return map;
  }

  // список машин в виде id -> plate_number
  get carIdMap() {
    const map = new Map<number, IDictCarBL>();
    this.cars?.forEach(car => map.set(car.id, car));

    return map;
  }

  // список машин в виде plate_number -> id
  get carNumberMap() {
    const map = new Map<string, number>();
    this.cars?.forEach(car => map.set(car.plate_number, car.id));

    return map;
  }

  // список машин с описанием в виде plate_number -> id
  get carDescriptionMap() {
    const map = new Map<string, number>();
    this.cars?.forEach(car => map.set(car.description, car.id));

    return map;
  }

  private async loadDictionaries(): Promise<void> {
    try {
      this.isLoading = true;
      this.cars = await DictApiService.getDictCars();
      this.drivers = await DictApiService.getDictDrivers();
    } finally {
      this.isLoading = false;
    }
  }

  // #endregion
}

export const DictStore = new CDictStore();
