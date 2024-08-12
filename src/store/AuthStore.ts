import { makeAutoObservable } from 'mobx';
import { AuthApiService } from '@src/service/AuthApiService';
import { ILoginRqDto } from '@src/service/types';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }

  login = async (dto: ILoginRqDto) => {
    try {
      const response = await AuthApiService.login(dto);

      if (!response) {
        throw new Error();
      }

      localStorage.setItem('username', dto.username);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('refresh', response.refresh_token);
      localStorage.setItem('role', 'Admin');
    } catch (e) {
      console.log(e);
    }
  };

  refresh = async () => {
    const token = localStorage.getItem('refresh');
    if (token) {
      const response = await AuthApiService.refresh({ token });
      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
      }
    }
  };

  logout = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    localStorage.setItem('refresh', '');
    localStorage.setItem('role', '');
  };
}

const authStore = new AuthStore();
export default authStore;
