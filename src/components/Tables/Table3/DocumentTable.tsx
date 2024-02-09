/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { DictStore } from '@src/store/DictStore';
import { observer } from 'mobx-react-lite';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { GridColDef } from '@mui/x-data-grid';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import { DocumentTableFilter } from '@src/components/Tables/Table3/components/RunTableFilter/DocumentTableFilter';
import { DocumentTableStore } from '@src/components/Tables/Table3/store/DocumentTableStore';
import { toStr } from '@src/utils/date_utils';

export const DocumentTable: FC = observer(() => {
  const { entries, isPendingList, init, isPendingActions, userSettings, reloadDocuments, updateRun } =
    DocumentTableStore;
  const { isLoading, carIdMap, driverIdMap } = DictStore;
  const [visibilityModel, setVisibilityModel] = useState(userSettings.tableVisibilityModel);

  useEffect(() => {
    init();
  }, [init]);

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'run_id',
        headerName: 'ИД рейса',
        description: 'ИД рейса',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'client',
        headerName: 'Клиент',
        description: 'Клиент',
        flex: 2,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'route',
        headerName: 'Маршрут',
        description: 'Маршрут',
        flex: 3,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'cargo',
        headerName: 'Груз',
        description: 'Груз',
        flex: 2,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'weight',
        headerName: 'Вес',
        description: 'Вес',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'car',
        headerName: 'Машина',
        description: 'Машина',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'driver',
        headerName: 'Водитель',
        description: 'Водитель',
        flex: 2,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'date_arrival',
        headerName: 'Дата погрузки',
        description: 'Дата погрузки',
        flex: 1,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: 'date_departure',
        headerName: 'Дата выгрузки',
        description: 'Дата выгрузки',
        flex: 1,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: false,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: 'waybill',
        headerName: 'Номер ПЛ',
        description: 'Номер ПЛ',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'invoice_document',
        headerName: 'Номер ТН',
        description: 'Номер ТН',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'reg_number',
        headerName: 'Номер реестра',
        description: 'Номер реестра',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'reg_date',
        headerName: 'Дата реестра',
        description: 'Дата реестра',
        flex: 1,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: 'acc_number',
        headerName: 'Номер УПД',
        description: 'Номер УПД',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'acc_date',
        headerName: 'Дата УПД',
        description: 'Дата УПД',
        flex: 1,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
    ];

    return cols;
  }, []);

  const columnShortModeModel = {
    route: false,
    cargo: false,
    driver: false,
    date_arrival: false,
    waybill: false,
  };

  const rows = useMemo(() => {
    return Array.from(entries.values()).map(item => ({
      id: item.id,
      run_id: item.id,
      car: carIdMap.get(item.car) || 'Номер машины не найден',
      driver: driverIdMap.get(item.driver) || 'ФИО водителя не найдены',
      waybill: item.waybill,
      invoice_document: item.invoice_document,
      date_departure: item.date_departure,
      date_arrival: item.date_arrival,
      reg_number: item.reg_number,
      reg_date: item.reg_date,
      acc_number: item.acc_number,
      acc_date: item.acc_date,
      client: item.client,
      cargo: item.cargo,
      route: item.route,
      weight: item.weight,
    }));
  }, [carIdMap, driverIdMap, entries]);

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const rowId = obj.run_id;
    const reg_number = obj.reg_number;
    const acc_number = obj.acc_number;
    let reg_date = obj.reg_date !== null ? toStr(obj.reg_date) : obj.reg_date;
    let acc_date = obj.acc_date !== null ? toStr(obj.acc_date) : obj.acc_date;
    const waybill = obj.waybill;
    const invoice_document = obj.invoice_document;

    reg_date = reg_date === 'Invalid date' ? null : reg_date;
    acc_date = acc_date === 'Invalid date' ? null : acc_date;

    if (rowId === undefined) return false;
    const entry = entries.get(rowId);
    if (entry === undefined) return false;

    return await updateRun({ ...entry, reg_number, reg_date, acc_number, acc_date, waybill, invoice_document });
  };

  const handleChangeMode = (mode: boolean): void => {
    const model = mode ? {} : columnShortModeModel;
    userSettings.saveFilterMode(mode);
    userSettings.saveTableVisibilityData(model);
    setVisibilityModel(model);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Typography variant="h4">Внесение информации о выставлении рейса заказчику</Typography>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <DocumentTableFilter
        date={userSettings.filterDate}
        label={'Выбрать дату'}
        onReloadBtnClick={reloadDocuments}
        onDateChanged={userSettings.saveFilterDate}
        initialMode={userSettings.filterMode}
        handleChangeMode={handleChangeMode}
      />
      <PageProgressBar isLoading={isLoading || isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          editMode={'row'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          disableRowSelectionOnClick={true}
          rowHeight={30}
          disableColumnSelector={false}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={visibilityModel}
          tableDensityMode={userSettings.tableDensityMode}
          saveTablePageData={userSettings.saveTablePageData}
          saveTableVisibilityData={userSettings.saveTableVisibilityData}
          saveTableSortData={userSettings.saveTableSortData}
          saveTableFilterData={userSettings.saveTableFilterData}
          saveTableDensityMode={userSettings.saveTableDensityMode}
          mutationUpdate={handleUpdate}
          exportFileName={'Внесение информации о выставлении рейса заказчику'}
          isLoading={isLoading || isPendingList}
        />
      </PageProgressBar>
    </>
  );
});
