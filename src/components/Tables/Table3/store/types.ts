import { IUserSettings } from '@src/store/types';
import { IRunDto } from '@src/components/Tables/Table2/service/types';
import { IDataInvoiceDto } from '@src/service/types';

export interface IDocumentBL extends IRunDto, IDataInvoiceDto {}

export interface IUserDocumentSettings extends IUserSettings {}
