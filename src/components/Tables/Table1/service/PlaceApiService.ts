import { Action } from '@src/store/action';

import { IPlaceApiService, IPlaceDto, IPlaceRqDto } from './types';

class CPlaceApiService implements IPlaceApiService {
  private readonly HOST_URL = '/api/drivers_place';

  private GetPlaceListAction = new Action<IPlaceRqDto, IPlaceDto[]>({ isInterrupted: true });
  private CreatePlaceAction = new Action<IPlaceDto, number>();
  private UpdatePlaceAction = new Action<IPlaceDto, boolean>();
  private DeletePlaceAction = new Action<number, boolean>();

  /**
   * Получить список записей Places
   */
  async getListPlaces(dto: IPlaceRqDto): Promise<IPlaceDto[]> {
    const result = await this.GetPlaceListAction.callAction(
      `${this.HOST_URL}?start_day=${dto.start_day}&end_day=${dto.end_day}`,
      'GET',
    );
    console.debug(result);

    return result as IPlaceDto[];
  }

  /**
   * Создать новую запись Place
   */
  async createPlace(dto: IPlaceDto): Promise<number> {
    const result = await this.CreatePlaceAction.callAction(`${this.HOST_URL}`, 'POST', dto);
    console.debug(result);

    return result as number;
  }

  /**
   * Удалить Place по ИД
   */
  async deletePlace(id: number): Promise<boolean> {
    const result = await this.DeletePlaceAction.callAction(`${this.HOST_URL}?data=${id}`, 'DELETE');
    console.debug(result);

    return result as boolean;
  }

  /**
   * Обновить данные Place
   */
  async updatePlace(dto: IPlaceDto): Promise<boolean> {
    const result = await this.UpdatePlaceAction.callAction(`${this.HOST_URL}`, 'PUT', dto);
    console.debug(result);

    return result as boolean;
  }

  /**
   * Upload xlsx files
   */
  // async uploadFile(method: string, file: File): Promise<boolean> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   try {
  //     const response = await fetch(`${this.HOST_URL}/upload_xlsx`, {
  //       method: method,
  //       body: formData
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error('Failed to upload file');
  //     }
  //
  //     const result = await response.json();
  //     console.debug(result);
  //
  //     return true;
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //
  //     return false;
  //   }
  // }
  //
  // /**
  //  * Upload xlsx files: new
  //  */
  // async uploadNew(file: File): Promise<boolean> {
  //   return await this.uploadFile('POST', file);
  // }
  //
  // /**
  //  * Upload xlsx files: exists
  //  */
  // async uploadExists(file: File): Promise<boolean> {
  //   return await this.uploadFile('PUT', file);
  // }
}

export const PlaceApiService: IPlaceApiService = new CPlaceApiService();