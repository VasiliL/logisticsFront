import { Action } from '@src/store/action';

import { ICreateByInvoiceRunDto, ICreateRunDto, IDaysRqDto, IRunApiService, IRunDto } from '@src/service/types';

class CRunApiService implements IRunApiService {
  private readonly HOST_URL = '/api/v2/runs';

  private GetRunListAction = new Action<IDaysRqDto, IRunDto[]>({ isInterrupted: true });
  private CreateRunAction = new Action<ICreateRunDto, number>();
  private CreateByInvoiceRunAction = new Action<ICreateByInvoiceRunDto, number>();
  private UpdateRunAction = new Action<IRunDto, boolean>();
  private UpdateMultipleRunAction = new Action<IRunDto[], boolean>();
  private DeleteRunAction = new Action<number, boolean>();

  /**
   * Получить список записей Runs
   */
  async getListRuns(dto: IDaysRqDto): Promise<IRunDto[]> {
    const result = await this.GetRunListAction.callAction(
      `${this.HOST_URL}/get_dated?date_from=${dto.start_day}&date_to=${dto.end_day}`,
      'GET',
    );
    // console.debug(result);
    if (result === true || !result) {
      return [];
    }

    return result as IRunDto[];
  }

  /**
   * Создать новую запись Run
   */
  async createRun(dto: ICreateRunDto): Promise<number> {
    const result = await this.CreateRunAction.callAction(`${this.HOST_URL}/create`, 'POST', dto);
    // console.debug(result);

    return result as number;
  }

 /**
   * Создать новую запись Run
   */
  async createByInvoiceRun(dto: ICreateByInvoiceRunDto): Promise<number> {
    const result = await this.CreateByInvoiceRunAction.callAction(`${this.HOST_URL}/create_multiple_runs_by_invoice`, 'POST', dto);
    // console.debug(result);

    return result as number;
  }

  /**
   * Удалить Run по ИД
   */
  async deleteRun(id: string): Promise<boolean> {
    const result = await this.DeleteRunAction.callAction(`${this.HOST_URL}/${id}`, 'DELETE');
    // console.debug(result);

    return result as boolean;
  }

  /**
   * Обновить данные Run
   */
  async updateRun(dto: IRunDto): Promise<boolean> {
    const result = await this.UpdateRunAction.callAction(`${this.HOST_URL}`, 'PATCH', dto);
    // console.debug(result);

    return result as boolean;
  }

  /**
   * Обновить данные Run
   */
  async updateMultipleRun(dto: IRunDto[]): Promise<boolean> {
    const result = await this.UpdateMultipleRunAction.callAction(`${this.HOST_URL}/multiple_update`, 'PATCH', dto);
    // console.debug(result);

    return result as boolean;
  }
}

export const RunApiService: IRunApiService = new CRunApiService();
