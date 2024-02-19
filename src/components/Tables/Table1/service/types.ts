export interface IPlaceApiService {
  getListPlaces(dto: IPlaceRqDto): Promise<IPlaceDto[]>;

  createPlace(dto: IPlaceDto): Promise<number>;

  updatePlace(dto: IPlaceDto): Promise<boolean>;

  deletePlace(id: number): Promise<boolean>;
}

export interface IPlaceRqDto {
  start_day: string;
  end_day: string;
}

export interface IPlaceDto {
  id: number;
  date: string;
  car_id: number;
  driver_id: number;
  plate_number: string;
  fio: string;
}
