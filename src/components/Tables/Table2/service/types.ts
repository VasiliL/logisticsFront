import { IDaysRqDto } from '@src/service/types';

export interface IRunApiService {
  getListRuns(dto: IDaysRqDto): Promise<IRunDto[]>;

  createRun(dto: IRunDto): Promise<number>;

  updateRun(dto: IRunDto): Promise<boolean>;

  deleteRun(id: number): Promise<boolean>;
}

export interface IRunDto {
  id: number;
  car: number; // car_id
  driver: number; // driver_id
  invoice: string;
  invoice_document: string;
  waybill: string;
  weight: number;
  date_departure: string;
  date_arrival: string;
  reg_number: string;
  reg_date: string;
  acc_number: string;
  acc_date: string;
  client: string;
  route: string;
  cargo: string;
}
