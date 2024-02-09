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
}

export const RunApiService: IRunApiService = new CRunApiService();
