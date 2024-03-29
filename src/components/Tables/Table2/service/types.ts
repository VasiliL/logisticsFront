import { IDaysRqDto } from '@src/service/types';

export interface IRunApiService {
  getListRuns(dto: IDaysRqDto): Promise<IRunDto[]>;

  createRun(dto: IRunDto): Promise<number>;

  updateRun(dto: IRunDto): Promise<boolean>;

  deleteRun(id: number): Promise<boolean>;

  uploadFile(method: string, file: File): Promise<boolean>;

  uploadRunDocs(file: File): Promise<boolean>;

  uploadClientDocs(file: File): Promise<boolean>;
}

export interface IRunDto {
  id: number;
  car_id: number;
  driver_id: number | null;
  invoice_id: number;
  invoice_document: string;
  waybill: string;
  weight: number;
  date_departure: string;
  date_arrival: string | null;
  reg_number: string;
  reg_date: string | null;
  acc_number: string;
  acc_date: string | null;
  client: string;
  route: string;
  cargo: string;
}
