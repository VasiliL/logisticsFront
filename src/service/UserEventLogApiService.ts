import { Action } from '@src/store/action';

import { IDaysRqDto, IUserEventLogApiService, IUserEventLogDto } from './types';

class CUserEventLogApiService implements IUserEventLogApiService {
  private readonly HOST_URL = '/api/user_event_logs';

  private GetUserEventLogListAction = new Action<unknown, IUserEventLogDto[]>({ isInterrupted: true });

  /**
   * Получить список действий юзеров в системе
   */
  async getUserEventLogs(dto: IDaysRqDto): Promise<IUserEventLogDto[]> {
    const result = await this.GetUserEventLogListAction.callAction(
      `${this.HOST_URL}?start_day=${dto.start_day}&end_day=${dto.end_day}`,
      'GET',
    );

    return result as IUserEventLogDto[];
  }
}

export const UserEventLogApiService: IUserEventLogApiService = new CUserEventLogApiService();
