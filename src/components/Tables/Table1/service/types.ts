export interface IPlaceApiService {
  getListPlaces(dto: IPlaceRqDto): Promise<IPlaceDto[]>;

  createPlace(dto: IPlaceDto): Promise<number>;

  updatePlace(dto: IPlaceDto): Promise<boolean>;

  deletePlace(id: number): Promise<boolean>;

  uploadFile(method: string, file: File): Promise<boolean>;

  uploadNew(file: File): Promise<boolean>;

  uploadExists(file: File): Promise<boolean>;
}

export interface IPlaceRqDto {
  start_day: string;
  end_day: string;
}

export interface IPlaceDto {
  id: number;
  date_place: string;
  car_id: number;
  driver_id: number;
  plate_number: string;
  fio: string;
}
