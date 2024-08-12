import { action, computed, makeAutoObservable } from 'mobx';

export class ThemeStore {
  private _theme_prefix: string = 'ThemeStore';
  private _theme: 'light' | 'dark' = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';

  constructor(settings_prefix: string) {
    console.log('Theme Store init...');
    this.theme_prefix = settings_prefix;
    makeAutoObservable(
      this,
      {
        theme_prefix: computed,
        theme: computed,
        changeTheme: action,
      },
      { autoBind: true },
    );
  }

  get theme_prefix(): string {
    return this._theme_prefix;
  }

  set theme_prefix(value: string) {
    this._theme_prefix = value;
  }

  get theme(): 'light' | 'dark' {
    return this._theme;
  }

  set theme(value: 'light' | 'dark') {
    this._theme = value;
  }

  changeTheme = () => {
    if (this.theme === 'light') {
      this.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      this.theme = 'light';
      localStorage.setItem('theme', 'light');
    }
  };
}

export const themeStore = new ThemeStore('ThemeStore');
