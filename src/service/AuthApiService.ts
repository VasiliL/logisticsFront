import { Action } from '@src/store/action';
import { makeAutoObservable } from 'mobx';

import { IAuthApiService, ILoginRqDto, ILoginRsDto, IRefreshRqDto, IRefreshRsDto } from './types';

class CAuthApiService implements IAuthApiService {
  private readonly HOST_URL = '/api/v2/authentication';

  constructor() {
    makeAutoObservable(this);
  }

  private LoginAction = new Action<ILoginRqDto, ILoginRsDto>();
  private RefreshAction = new Action<IRefreshRqDto, IRefreshRsDto>();
  private LogoutAction = new Action<unknown, unknown>();

  /**
   * Войти в систему
   */
  async login(dto: ILoginRqDto): Promise<ILoginRsDto> {
    try {
      const result = await this.LoginAction.callAction(`${this.HOST_URL}/login`, 'POST', dto, true);

      return result as unknown as ILoginRsDto;
    } catch (error) {
      console.log(error);

      throw new Error();
    }
  }

  async refresh(dto: IRefreshRqDto): Promise<IRefreshRsDto> {
    try {
      const result = await this.RefreshAction.callAction(`${this.HOST_URL}/refresh?token=${dto.token}`, 'POST');

      return result as unknown as IRefreshRsDto;
    } catch (error) {
      console.log(error);

      throw new Error();
    }
  }

  /**
   * Выйти из системы
   */
  async logout(): Promise<string> {
    try {
      const result = await this.LogoutAction.callAction(`${this.HOST_URL}/logout`, 'POST');

      return result as string;
    } catch (error) {
      console.log(error);

      throw new Error();
    }
  }
}

export const AuthApiService: IAuthApiService = new CAuthApiService();
