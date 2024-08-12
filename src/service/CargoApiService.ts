import { Action } from '@src/store/action';

import { ICargoApiService, ICargoStockBalance } from './types';

class CCargoApiService implements ICargoApiService {
  private readonly HOST_URL = '/api/v2/cargo';

  private GetStockedAction = new Action<unknown, ICargoStockBalance[]>();

  async getStocked(): Promise<ICargoStockBalance[]> {
    const result = await this.GetStockedAction.callAction(`${this.HOST_URL}/get_stocked`, 'GET');

    return result as ICargoStockBalance[];
  }
}

export const CargoApiService: ICargoApiService = new CCargoApiService();
