import { Action } from '@src/store/action';

import { IDictApiService, IDictCarDto, IDictDriverDto, IDataInvoiceDto, IDayRqDto } from './types';

class CDictApiService implements IDictApiService {
  private readonly HOST_URL = '/api';

  private GetDictCarsAction = new Action<unknown, IDictCarDto[]>({ isInterrupted: true });
  private GetDictDriversAction = new Action<unknown, IDictDriverDto[]>({ isInterrupted: true });
  private GetDictInvoicesAction = new Action<IDayRqDto, IDataInvoiceDto[]>({ isInterrupted: true });

  /**
   * Получить список справочников Cars
   */
  async getDictCars(): Promise<IDictCarDto[]> {
    const result = await this.GetDictCarsAction.callAction(`${this.HOST_URL}/cars`, 'GET');

    return result as IDictCarDto[];
  }

  /**
   * Получить список справочников Drivers
   */
  async getDictDrivers(): Promise<IDictDriverDto[]> {
    const result = await this.GetDictDriversAction.callAction(`${this.HOST_URL}/drivers`, 'GET');

    return result as IDictDriverDto[];
  }

  /**
   * Получить список справочников Invoices
   */
  async getDictInvoices(dto: IDayRqDto): Promise<IDataInvoiceDto[]> {
    const result = await this.GetDictInvoicesAction.callAction(`${this.HOST_URL}/invoices?day=${dto.day}`, 'GET');

    return result as IDataInvoiceDto[];
  }
}

export const DictApiService: IDictApiService = new CDictApiService();
