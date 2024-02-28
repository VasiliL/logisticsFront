/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { DictStore } from '@src/store/DictStore';
import { observer } from 'mobx-react-lite';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { RunTableStore } from '@src/components/Tables/Table2/store/RunTableStore';
import { GridColDef } from '@mui/x-data-grid';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import { toStr } from '@src/utils/date_utils';
import { RunTableFilter } from '@src/components/Tables/Table2/components/RunTableFilter/RunTableFilter';
import { isNumber } from '@src/utils/number_utils';
import InputFileUpload from '@src/components/UploadButtons/UploadButtons';


export const RunTable: FC = observer(() => {
  const {
    entries,
    isPendingList,
    init,
    deleteRun,
    updateRun,
    createRun,
    isPendingActions,
    reloadRuns,
    userSettings,
    invoiceList,
  } = RunTableStore;
  const { isLoading, carIdList, carIdMap, carNumberMap } = DictStore;
  const [selectedRowId, setSelectedRowId] = useState('0');

  useEffect(() => {
    init().then();
  }, [init]);

  const isDeleteBtnDisabled: boolean = useMemo(
    () => selectedRowId === '0' || !isNumber(selectedRowId),
    [selectedRowId],
  );

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'invoice_id',
        headerName: ' ',
        description: ' ',
        type: 'string',
        width: 0,
        disableColumnMenu: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'invoice',
        headerName: 'Заявка',
        description: 'Информация по заявке',
        flex: 7,
        minWidth: 100,
        type: 'string',
        align: 'left',
        sortable: false,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'car',
        headerName: 'Машина',
        description: 'Машина',
        flex: 2,
        minWidth: 200,
        type: 'singleSelect',
        align: 'center',
        sortable: false,
        editable: true,
        headerClassName: 'super-app-theme--header',
        valueOptions: ({ row }) => {
          if (!row) {
            // The row is not available when filtering this column
            return carIdList;
          }

          return carIdList;
        },
      },
      {
        field: 'weight',
        headerName: 'Вес',
        description: 'Вес',
        flex: 4,
        minWidth: 50,
        type: 'string',
        align: 'left',
        sortable: false,
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
    ];

    return cols;
  }, [carIdList]);

  const rows = useMemo(() => {
    const result: object[] = [];
    invoiceList?.forEach(invoice => {
      result.push({
        id: `invoice_${invoice.id}`,
        invoice_id: invoice.id,
        invoice: `${invoice.client} - ${invoice.cargo} - ${invoice.route}`,
        car: '',
        weight: '',
      });
      const entry = entries.get(invoice.id);
      if (entry !== undefined) {
        entry.forEach((run, index) => {
          result.push({
            id: run.id,
            invoice_id: invoice.id,
            invoice: `${index === 0 ? `вес по заявке из инвойсов: ${invoice.weight}` : ''}`,
            car: carIdMap.get(run.car) || 'Номер машины не найден',
            weight: run.weight,
          });
        });
      }

      result.push({
        id: `empty_${invoice.id}`,
        invoice_id: invoice.id,
        invoice: '',
        car: 'создать рейсы',
        weight: '',
      });
    });

    return result;
  }, [carIdMap, entries, invoiceList]);

  const handleRowClick = (id: string): void => {
    setSelectedRowId(id);
  };

  const handleRowDeleteClick = (): void => {
    deleteRun(parseInt(selectedRowId));
  };

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const rowId = obj.id?.toString();
    const invoice = obj.invoice_id || 0;
    if (rowId === undefined || invoice === undefined) return false;
    if (rowId.startsWith('invoice_')) {
      return false;
    }

    const entry = entries.get(invoice);
    const run = entry?.find(r => r.id.toString() == rowId);
    const car = carNumberMap.get(obj.car?.toString() || '') || 0;
    const weight = obj.weight?.toString() || 0;

    if (!run && rowId.startsWith('empty_')) {
      const defaultDate = toStr(userSettings.filterDate);

      return await createRun({
        invoice,
        car,
        weight,
        id: 0,
        date_arrival: defaultDate,
        date_departure: defaultDate,
        driver: 0,
        invoice_document: '',
        waybill: '',
        acc_date: defaultDate,
        acc_number: '',
        reg_date: defaultDate,
        reg_number: '',
        client: '',
        route: '',
        cargo: '',
      });
    } else if (run !== undefined) {
      return await updateRun({ ...run, car, weight });
    }

    throw new Error('Непредвиденная ошибка сервиса: Не найдены записи для обновления');
  };

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Typography variant="h4">Расстановка машин на маршруты</Typography>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <Stack direction="row" mb={5} spacing={2}>
        <RunTableFilter
          date={userSettings.filterDate}
          label={'Выбрать дату'}
          onReloadBtnClick={reloadRuns}
          onDeleteBtnClick={handleRowDeleteClick}
          deleteBtnDisabled={isDeleteBtnDisabled}
          onDateChanged={userSettings.saveFilterDate}
        />
        <InputFileUpload/>
      </Stack>
      <PageProgressBar isLoading={isLoading || isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          editMode={'row'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          rowHeight={30}
          disableColumnSelector={true}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={{ invoice_id: false }}
          tableDensityMode={userSettings.tableDensityMode}
          saveTablePageData={userSettings.saveTablePageData}
          saveTableVisibilityData={userSettings.saveTableVisibilityData}
          saveTableSortData={userSettings.saveTableSortData}
          saveTableFilterData={userSettings.saveTableFilterData}
          saveTableDensityMode={userSettings.saveTableDensityMode}
          mutationUpdate={handleUpdate}
          notUpdateRowAfterMutate={true}
          onRowClick={handleRowClick}
          exportFileName={'Расстановка машин на маршруты'}
          exportHeaders={['invoice', 'car', 'weight']}
          prefixForRowBlockedStyle={'invoice_'}
        />
      </PageProgressBar>
    </>
  );
});
