import { Action } from '@src/store/action';

import { ICounterpartyApiService, ICounterpartyDto } from './types';

class CCounterpartyApiService implements ICounterpartyApiService {
  private readonly HOST_URL = '/api/v2/counterparty';

  private GetListAction = new Action<unknown, ICounterpartyDto[]>();
  private GetByIdAction = new Action<unknown, ICounterpartyDto>();

  async getList(): Promise<ICounterpartyDto[]> {
    const result = await this.GetListAction.callAction(`${this.HOST_URL}/get_all`, 'GET');

    return result as ICounterpartyDto[];
  }

  async getById(id: string): Promise<ICounterpartyDto> {
    const result = await this.GetByIdAction.callAction(`${this.HOST_URL}/${id}`, 'GET');

    return result as ICounterpartyDto;
  }
}

export const CounterpartyApiService: ICounterpartyApiService = new CCounterpartyApiService();
