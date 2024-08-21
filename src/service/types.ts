export interface IDictApiService {
  getDictCars(): Promise<IDictCarDto[]>;

  getDictDrivers(): Promise<IDictDriverDto[]>;
}

export interface IDataApiService {
  getInvoices(dto: IDayRqDto): Promise<IDataInvoiceDto[]>;
}

export interface IRunApiService {
  getListRuns(dto: IDaysRqDto): Promise<IRunDto[]>;

  createRun(dto: ICreateRunDto): Promise<IRunDto>;

  createByInvoiceRun(dto: ICreateByInvoiceRunDto): Promise<number>;

  updateRun(dto: IRunDto): Promise<boolean>;

  updateMultipleRun(dto: IRunDto[]): Promise<IRunDto[]>;

  deleteRun(id: string): Promise<boolean>;
}

export interface IDocumentApiService {
  createDocument(dto: ICreateDocument): Promise<boolean>;

  createMultipleDocument(dto: ICreateDocument[]): Promise<boolean>;
}

export interface ICargoApiService {
  getStocked(): Promise<ICargoStockBalance[]>;
}

export interface ICargoDocumentApiService {
  getList(dto: ICargoDocumentRqDto): Promise<ICargoDocumentRsDto[]>;
}

export interface ICounterpartyApiService {
  getList(): Promise<ICounterpartyDto[]>;

  getById(id: string): Promise<ICounterpartyDto>;
}

export interface ILogisticsDailyPlanApiService {
  getList(date: string): Promise<ILogisticsDailyPlanDto[]>;

  update(dto: ILogisticsDailyPlanDto): Promise<boolean>;
}

export interface IUserEventLogApiService {
  getUserEventLogs(dto: IDaysRqDto): Promise<IUserEventLogDto[]>;
}

export interface IAuthApiService {
  login(dto: ILoginRqDto): Promise<ILoginRsDto>;

  refresh(dto: IRefreshRqDto): Promise<IRefreshRsDto>;

  logout(): Promise<string>;
}

// Расширенная модель рейса для отражения информации из базы данных
export interface IRunDto {
  item_id: string; // ИД рейса
  weight: number; // Вес груза на погрузке
  date_departure: string; // Дата погрузки
  date_arrival: string; // Дата выгрузки
  car_id: number; // ИД машины
  driver_id: number; // ИД водителя
  weight_arrival: number; // Вес груза на выгрузке
  client_weight: number; // Вес груза по данным клиента на выгрузке
  client_weight_arrival: number; // Вес груза по данным клиента на выгрузке
  weight_color: number; // служебное поле для закрашивания ячейки с весом груза
  weight_arrival_color: number; // служебное поле для закрашивания ячейки с весом груза
  run_status: string; // статус рейса, ограничен перечислением RunStatus
  comment: string; // комментарий к рейсу (например, комментарий водителя в случае отказа от рейса)
  car_description: string; // наименование машины, при создании рейса данные берутся из таблицы cars и замораживаются в рейсе
  car_owner: string; // собственник машины, при создании рейса данные берутся из таблицы cars и замораживаются в рейсе
  car_plate_number: string; // номер авто
  driver_fio: string; // ФИО водителя, при создании рейса данные берутся из таблицы drivers и замораживаются в рейсе
  driver_company: string; // компания-наниматель водителя, при создании рейса данные берутся из таблицы drivers и замораживаются в рейсе
  trailer_id: number; // ИД прицепа, при создании рейса данные берутся из таблицы cars и замораживаются в рейсе
  trailer_description: string; // Наименование прицепа, при создании рейса данные берутся из таблицы cars и замораживаются в рейсе
  carrier_price: string; // ставка наемного перевозчика за тонну перевезенного груза
  cars_group: string; // колонна, к которой относится автомобиль, при создании рейса данные берутся из таблицы cars и замораживаются в рейсе
  // invoice_id: number;
  // reg_date: string;
  // acc_date: string;
  // client: string;
  // route: string;
  // cargo: string;
  // waybill: string;
  // invoice_document: string;
  invoice: IDataInvoiceDto; // Заявка заказчика, является ссылкой на другую схему и таблицу, см. InvoiceSchema
  documents: IDocument[]; // Список документов, привязанных к рейсу. Является ссылкой на другую схему и таблицу, см. DocumentSchema
}

export interface ICreateRunDto {
  invoice_id: string,
  car_id: number,
  weight: number,
  weight_arrival: number,
  date_arrival: string,
  date_departure: string,
  run_status: string | null,
  comment: string | null,
  driver_id: number,
  client_weight: number,
  client_weight_arrival: number,
  weight_color: number,
  weight_arrival_color: number,
  car_plate_number: string;
}

export interface ICreateByInvoiceRunDto {
  invoice_id: string,
  date_departure: string,
  cars: number[],
}

export interface ILogisticsDailyPlanDto {
  invoice_id: string,
  date_departure: string,
  cars: number[],
}

// Модель заявки Заказчика для отражения информации из базы данных
export interface IDataInvoiceDto {
  item_id: string; // ИД груза
  order_num: string; // Номер заявки из 1С
  order_date: string; // Дата заявки из 1С
  order_version: number; // Версия заявки
  departure_point: string; // Пункт погрузки
  arrival_point: string; // Пункт выгрузки
  route_time: string; // Время прохождения маршрута
  shipper: string; // Отправитель
  consignee: string; // Получатель
  arrival_date: string; // Дата окончания действия заявки
  shipper_contact_person: string; // Контактное лицо отправителя
  consignee_contact_person: string; // Контактное лицо получателя
  client: string; // Заказчик перевозки
  client_contract: string; // Договор Заказчика
  route: string; // Маршрут
  route_id: number; // Ид маршрута
  cargo: string; // Груз
  cargo_id: number; // ИД груза
  weight: number; // Вес груза к перевозке
  price: string; // Стоимость перевозки 1 тонны
  price_sum: string; // Стоимость перевозки по заявке
  volume: string; // Объем груза к перевозке
  departure_date: string; // Дата начала действия заявки
  distance: string; // Расстояние по маршруту
  actual: boolean; // флаг актуальности заявки
  supplier: string; // Поставщик по заявке
  cargo_price: string; // Стоимость закупки груза
  comment: string; // Комментарий
  // weight_arrival: number;
}

// Модель документа для отражения информации из базы данных
export interface IDocument {
  item_id: string | null; // ИД документа
  name: string; // Название документа
  doc_date: string; // Дата документа
  comment: string | null; // Комментарий к документу
  run_id: string; // ИД рейса, к которому привязан документ
  doc_type_obj: IDocumentType | null; // Тип документа. Является ссылкой на другую схему и таблицу, см. DocumentType
  doc_type: number; // Тип документа. Является ссылкой на другую схему и таблицу, см. DocumentType
}

// Модель документа для отражения информации из базы данных
export interface IUpdateDocument {
  item_id: string | null; // ИД документа
  name: string; // Название документа
  doc_date: string; // Дата документа
  doc_type: number; // Тип документа. Является ссылкой на другую схему и таблицу, см. DocumentType
}

export interface ICargoStockBalance {
  item_id: string;
  cargo_name: string;
  cargo_group: string;
  balance: string;
}

export interface ICounterpartyDto {
  item_id: string;
  company_name: string;
  inn: string;
  kpp: string;
  contract: string;
}

// [
//   {
//     "item_id": 1,
//     "document_type": "Путевой лист"
//   },
//   {
//     "item_id": 2,
//     "document_type": "ТН"
//   },
//   {
//     "item_id": 3,
//     "document_type": "ТТН"
//   },
//   {
//     "item_id": 4,
//     "document_type": "Реестр Заказчику"
//   },
//   {
//     "item_id": 6,
//     "document_type": "Реестр Перевозчика"
//   },
//   {
//     "item_id": 7,
//     "document_type": "УПД Заказчику"
//   },
//   {
//     "item_id": 8,
//     "document_type": "УПД Поставщика"
//   },
//   {
//     "item_id": 9,
//     "document_type": "УПД Перевозчика"
//   },
//   {
//     "item_id": 10,
//     "document_type": "Сертификат на продукцию"
//   }
// ]

export interface ICreateDocument {
  name: string; // Название документа
  doc_date: string; // Дата документа
  comment?: string; // Комментарий к документу
  run_id: string; // ИД рейса, к которому привязан документ
  doc_type: number; // Тип документа. Является ссылкой на другую схему и таблицу, см. DocumentType
}

// Модель типа документа для отражения информации из базы данных
export interface IDocumentType {
  item_id: string | null; // ИД типа документа
  document_type: string; // Наименование типа документа
}

export interface IDayRqDto {
  day: string;
}

export interface ICargoDocumentRqDto {
  date_from: string;
  date_to: string;
}

export interface ICargoDocumentRsDto {
  item_id: string;
  name: string;
  doc_date: string;
  transaction_type: string;
  quantity: string;
  created_at: string;
  counterparty_id: string;
  cargo: ICargoStockBalance;
}

export interface IDaysRqDto {
  start_day: string;
  end_day: string;
}

export interface IDictCarDto {
  item_id: number;
  description: string;
  plate_number: string;
  car_model: string;
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

export interface ILoginRqDto {
  username: string;
  password: string;
}

export interface ILoginRsDto {
  access_token: string;
  refresh_token: string;
}

export interface IRefreshRqDto {
  token: string;
}

export interface IRefreshRsDto {
  access_token: string;
}

export interface IUserEventLogDto {
  id: number;
  user_id: string;
  message: string;
  datetime: string;
}
