import { Action } from '@src/store/action';

import { IDaysRqDto } from '@src/service/types';

import { IRunApiService, IRunDto } from './types';

class CRunApiService implements IRunApiService {
  private readonly HOST_URL = '/api/runs';

  private GetRunListAction = new Action<IDaysRqDto, IRunDto[]>({ isInterrupted: true });
  private CreateRunAction = new Action<IRunDto, number>();
  private UpdateRunAction = new Action<IRunDto, boolean>();
  private DeleteRunAction = new Action<number, boolean>();

  /**
   * Получить список записей Runs
   */
  async getListRuns(dto: IDaysRqDto): Promise<IRunDto[]> {
    const result = await this.GetRunListAction.callAction(
      `${this.HOST_URL}?start_day=${dto.start_day}&end_day=${dto.end_day}`,
      'GET',
    );
    console.debug(result);

    return result as IRunDto[];
  }

  /**
   * Создать новую запись Run
   */
  async createRun(dto: IRunDto): Promise<number> {
    const result = await this.CreateRunAction.callAction(`${this.HOST_URL}`, 'POST', dto);
    console.debug(result);

    return result as number;
  }

  /**
   * Удалить Run по ИД
   */
  async deleteRun(id: number): Promise<boolean> {
    const result = await this.DeleteRunAction.callAction(`${this.HOST_URL}?data=${id}`, 'DELETE');
    console.debug(result);

    return result as boolean;
  }

  /**
   * Обновить данные Run
   */
  async updateRun(dto: IRunDto): Promise<boolean> {
    const result = await this.UpdateRunAction.callAction(`${this.HOST_URL}`, 'PUT', dto);
    console.debug(result);

    return result as boolean;
  }
  async uploadFile(method: string, file: File): Promise<boolean> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${this.HOST_URL}/upload_xlsx`, {
        method: method,
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      console.debug(result);

      return true;
    } catch (error) {
      console.error('Upload error:', error);

      return false;
    }
  }

  /**
   * Upload xlsx files: new
   */
  async uploadNew(file: File): Promise<boolean> {
    return await this.uploadFile('POST', file);
  }

  /**
   * Upload xlsx files: exists
   */
  async uploadExists(file: File): Promise<boolean> {
    return await this.uploadFile('PUT', file);
  }
}

export const RunApiService: IRunApiService = new CRunApiService();
