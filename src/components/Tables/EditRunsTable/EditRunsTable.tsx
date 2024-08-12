/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { DictStore } from '@src/store/DictStore';
import { observer } from 'mobx-react-lite';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { GridColDef } from '@mui/x-data-grid-premium';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import {
  EditRunsTableFilter,
} from '@src/components/Tables/EditRunsTable/components/EditRunsTableFilter/EditRunsTableFilter';
import { EditRunsTableStore } from '@src/components/Tables/EditRunsTable/store/EditRunsTableStore';
import Box from '@mui/material/Box';
import { dateColumnType } from '@src/utils/tables/utils';

export const EditRunsTable: FC = observer(() => {
  const { isPendingList, init, isPendingActions, userSettings, reloadDocuments, updateRun, createRun, list, getRunById } =
    EditRunsTableStore;
  const { isLoading, driverIdList, carNumberList } =
    DictStore;
  const [selectedRowId, setSelectedRowId] = useState('0');

  useEffect(() => {
    void init();
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
        resizable: true,
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
        resizable: true,
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
        resizable: true,
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
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'weight',
        headerName: 'Вес погрузки',
        description: 'Вес погрузки',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'weight_arrival',
        headerName: 'Вес выгрузки',
        description: 'Вес выгрузки',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'car',
        headerName: 'Машина',
        description: 'Машина',
        flex: 1,
        minWidth: 100,
        type: 'singleSelect',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        // valueFormatter: ({ id }) => {
        //   if (id === undefined) return;
        //   const entry = list?.find(run => run.item_id === (id as number));
        //   if (entry === undefined) return;
        //   const car_id = entry?.car_id;
        //   const plate_number = car_id ? carIdMap.get(car_id)?.description : null;
        //
        //   return plate_number ?? '';
        // },
      },
      {
        field: 'owner',
        headerName: 'Владелец',
        description: 'Владелец',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'driver',
        headerName: 'Водитель',
        description: 'Водитель',
        flex: 2,
        minWidth: 100,
        type: 'singleSelect',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueFormatter: ({ value }) => value ?? '',
      },
      {
        field: 'date_arrival',
        headerName: 'Дата погрузки',
        description: 'Дата погрузки',
        flex: 1,
        ...dateColumnType,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: 'date_departure',
        headerName: 'Дата выгрузки',
        description: 'Дата выгрузки',
        flex: 1,
        ...dateColumnType,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
    ];

    return cols;
  }, []);

  const rows = useMemo(() => {
    return list?.map(item => ({
      id: item.item_id,
      run_id: item.item_id,
      car: item.car_plate_number,
      owner: item.car_owner,
      driver: item.driver_fio,
      date_departure: item.date_departure,
      date_arrival: item.date_arrival,
      client: item.invoice.client,
      cargo: item.invoice.cargo,
      route: item.invoice.route,
      weight: item.weight,
      weight_arrival: item.weight_arrival,
    }));
  }, [list]);

  const handleCopyRowClick = (): void => {
    //const entry = entries.get(parseInt(selectedRowId));
    const entry = list.find(r => r.item_id === selectedRowId);
    if (entry === undefined) return;

    void createRun({
      // invoice_id: entry.invoice_id,
      invoice_id: entry.invoice.item_id,
      car_id: entry.car_id,
      weight: entry.weight,
      weight_arrival: entry.weight_arrival,
      date_arrival: entry.date_arrival,
      date_departure: entry.date_departure,
      driver_id: entry.driver_id,
      client_weight: 0,
      weight_color: 0,
      weight_arrival_color: 0,
      client_weight_arrival: 0,
      run_status: null,
      comment: null,
      car_plate_number: entry.car_plate_number,
      // route: entry.invoice.route,
      // cargo: entry.invoice.cargo,
      // acc_date: null,
      // reg_date: null,
      // waybill: null,
      // invoice_document: null,
    });

    setSelectedRowId('0');
  };

  const handleRowClick = (id: string): void => {
    setSelectedRowId(id);
  };

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const rowId = obj.run_id;
    const weight = obj.weight;
    const weight_arrival = obj.weight_arrival;
    const car_plate_number = obj.car;//carDescriptionMap.get(obj.car?.toString() ?? '') ?? null;
    const driver_fio = obj.driver;
    // const driver_id = driver_fio !== undefined ? driverFioMap.get(driver_fio) ?? null : null;

    if (rowId === undefined) return false;
    const entry = getRunById(rowId);
    if (entry === undefined) return false;

    return await updateRun({
      ...entry,
      car_plate_number,
      driver_fio,
      weight,
      weight_arrival,
    });
  };

  const options = useMemo(() => {
    const res = new Map<string, string[]>();
    res.set('car', carNumberList);
    res.set('driver', driverIdList);

    return res;
  }, [carNumberList, driverIdList]);

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4">Внесение информации о выставлении рейса заказчику</Typography>
          <Typography variant="subtitle2">Изменение рейса</Typography>
        </Box>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <EditRunsTableFilter
        date={userSettings.filterDateRange}
        onDateChanged={range => {
          userSettings.saveFilterDateRange(range);
          void reloadDocuments();
        }}
        copyBtnDisabled={selectedRowId === '0'}
        onCopyBtnClick={handleCopyRowClick}
      />
      <PageProgressBar isLoading={isLoading ?? isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          editMode={'cell'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          rowHeight={30}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={userSettings.tableVisibilityModel}
          tableDensityMode={userSettings.tableDensityMode}
          tableColumnsWidth={userSettings.columnsWidth}
          tableColumnsOrder={userSettings.columnsOrder}
          saveTablePageData={userSettings.saveTablePageData}
          saveTableVisibilityData={userSettings.saveTableVisibilityData}
          saveTableSortData={userSettings.saveTableSortData}
          saveTableFilterData={userSettings.saveTableFilterData}
          saveTableDensityMode={userSettings.saveTableDensityMode}
          saveTableColumnsWidth={userSettings.saveColumnsWidth}
          saveTableColumnsOrder={userSettings.saveColumnsOrder}
          mutationUpdate={handleUpdate}
          onRowClick={handleRowClick}
          optionsForEditField={options}
          exportFileName={'Внесение информации о выставлении рейса заказчику'}
          isLoading={isLoading ?? isPendingList}
        />
      </PageProgressBar>
    </>
  );
});
