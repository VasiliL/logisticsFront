import { Action } from '@src/store/action';

import { ICreateDocument, IDocumentApiService } from './types';

class CDocumentApiService implements IDocumentApiService {
  private readonly HOST_URL = '/api/v2/documents';

  private CreateAction = new Action<ICreateDocument, boolean>();
  private CreateMultipleAction = new Action<ICreateDocument[], boolean>();

  /**
   * Создание документа
   */
  async createDocument(dto: ICreateDocument): Promise<boolean> {
    const result = await this.CreateAction.callAction(`${this.HOST_URL}/create`, 'POST', dto);

    return result !== undefined;
  }

  /**
   * Создание документа
   */
  async createMultipleDocument(dto: ICreateDocument[]): Promise<boolean> {
    const result = await this.CreateMultipleAction.callAction(`${this.HOST_URL}/multiple_create`, 'POST', dto);

    return result !== undefined;
  }
}

export const DocumentApiService: IDocumentApiService = new CDocumentApiService();
