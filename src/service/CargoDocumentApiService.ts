import { Action } from '@src/store/action';

import { ICargoDocumentApiService, ICargoDocumentRqDto, ICargoDocumentRsDto } from './types';

class CCargoDocumentApiService implements ICargoDocumentApiService {
  private readonly HOST_URL = '/api/v2/cargo_document';

  private GetListAction = new Action<ICargoDocumentRqDto, ICargoDocumentRsDto[]>();

  async getList(dto: ICargoDocumentRqDto): Promise<ICargoDocumentRsDto[]> {
    const result = await this.GetListAction.callAction(`${this.HOST_URL}/get_dated?date_from=${dto.date_from}&date_to=${dto.date_to}`, 'GET');

    if (result === true || !result) {
      return [];
    }

    return result as ICargoDocumentRsDto[];
  }
}

export const CargoDocumentApiService: ICargoDocumentApiService = new CCargoDocumentApiService();
