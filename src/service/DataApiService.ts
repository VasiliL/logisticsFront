import { Action } from '@src/store/action';

import { IDataApiService, IDataInvoiceDto, IDayRqDto } from './types';

class CDataApiService implements IDataApiService {
  private readonly HOST_URL = '/api';

  private GetDictInvoicesAction = new Action<IDayRqDto, IDataInvoiceDto[]>({ isInterrupted: true });

  /**
   * Получить список Invoices
   */
  async getInvoices(dto: IDayRqDto): Promise<IDataInvoiceDto[]> {
    const result = await this.GetDictInvoicesAction.callAction(`${this.HOST_URL}/invoices?day=${dto.day}`, 'GET');

    return result as IDataInvoiceDto[];
  }
}

export const DataApiService: IDataApiService = new CDataApiService();
