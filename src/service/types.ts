export interface IDictApiService {
  getDictCars(): Promise<IDictCarDto[]>;

  getDictDrivers(): Promise<IDictDriverDto[]>;
}

export interface IDataApiService {
  getInvoices(dto: IDayRqDto): Promise<IDataInvoiceDto[]>;
}

export interface IDayRqDto {
  day: string;
}

export interface IDaysRqDto {
  start_day: string;
  end_day: string;
}

export interface IDictCarDto {
  id: number;
  description: string;
  plate_number: string;
  owner: string;
  vin: string;
  year: number;
  engine_hp: number;
  weight_capacity: number;
  volume: number;
  weight_own: number;
  car_type: string;
}

export interface IDictDriverDto {
  id: number;
  fio: string;
  code: string;
  position: string;
  inn: string;
  snils: string;
}

export interface IDataInvoiceDto {
  id: number;
  client: string;
  route: string;
  cargo: string;
  weight: number;
  price: number;
  departure_date: string;
  arrival_date: string;
}
