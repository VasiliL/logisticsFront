import { Action } from '@src/store/action';

import { ILogisticsDailyPlanApiService, ILogisticsDailyPlanDto } from '@src/service/types';

class CLogisticsDailyPlanApiService implements ILogisticsDailyPlanApiService {
  private readonly HOST_URL = '/api/v2/logistics_daily_plan';

  private GetListAction = new Action<string, ILogisticsDailyPlanDto[]>({ isInterrupted: true });
  private UpdateAction = new Action<ILogisticsDailyPlanDto, boolean>();

  /**
   * Получить список записей Runs
   */
  async getList(date: string): Promise<ILogisticsDailyPlanDto[]> {
    const result = await this.GetListAction.callAction(`${this.HOST_URL}/?plan_date=${date}`, 'GET');
    // console.debug(result);
    if (result === true || !result) {
      return [];
    }

    return result as ILogisticsDailyPlanDto[];
  }

  /**
   * Обновить данные Run
   */
  async update(dto: ILogisticsDailyPlanDto): Promise<boolean> {
    const result = await this.UpdateAction.callAction(`${this.HOST_URL}/`, 'PATCH', dto);
    // console.debug(result);

    return result as boolean;
  }
}

export const LogisticsDailyPlanApiService: ILogisticsDailyPlanApiService = new CLogisticsDailyPlanApiService();
