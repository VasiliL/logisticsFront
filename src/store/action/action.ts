import { action, computed, observable, transaction } from 'mobx';

import { IActionOptions } from './types';

export class Action<T = unknown, R = unknown> {
  @observable isPending = false;
  @observable error: string = undefined as never;
  @observable status: number | null = null;
  showErrors: boolean;
  isInterrupted: boolean;
  abortController: AbortController | null = null;

  constructor(options?: IActionOptions) {
    this.showErrors = options?.showErrors ?? true;
    this.isInterrupted = options?.isInterrupted ?? false;
  }

  @action setPending(state: boolean): void {
    this.isPending = state;
  }

  @action setStatus(status: number | null): void {
    this.status = status;
  }

  @action resetStatus(): void {
    this.status = null;
  }

  @action setError(error: string): void {
    this.error = error;
  }

  @action resetErrors(): void {
    this.error = undefined as never;
  }

  @action setAbortController(controller: AbortController): void {
    this.abortController = controller;
  }

  @computed get getError(): string {
    return this.error;
  }

  async callAction(
    actionUrl: string,
    method: RequestInit['method'] = 'POST',
    payload?: T,
    isFormData: boolean = false,
  ): Promise<void | boolean | R> {
    this.abortController?.abort();
    const currentAbortController = new AbortController();

    transaction(() => {
      if (this.isInterrupted) this.setAbortController(currentAbortController);
      this.setPending(true);
      this.resetErrors();
      this.resetStatus();
    });

    let body: BodyInit | null = null;
    const headers: Record<string, string> = {
      Accept: 'application/json', // Specify JSON as acceptable media type
    };

    // Check if token exists in localStorage
    const token = localStorage.getItem('token') ?? '';
    if (token.toString() !== 'null' || token.toString() !== 'undefined' || !token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (payload) {
      if (isFormData) {
        const formData = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        body = formData;
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        body = JSON.stringify(payload);
        headers['Content-Type'] = 'application/json';
      }
    }

    try {
      const response = await fetch(actionUrl, {
        method,
        body,
        headers,
        signal: currentAbortController.signal,
      });
      const { status } = response;
      this.setStatus(status);

      if (status === 401) {
        console.log('need to relogin');
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        localStorage.setItem('role', '');
      }

      if (response.ok) {
        try {
          return await response.json();
        } catch {
          return true;
        }
      }

      const error = await response.json();
      console.error(error);

      this.setStatus(status);
    } catch (error) {
      this.setError(error as string);
    } finally {
      const isSameCall = this.isInterrupted && this.abortController === currentAbortController;

      if (isSameCall ?? !this.isInterrupted) this.setPending(false);
    }
  }
}
