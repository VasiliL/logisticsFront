/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { DictStore } from '@src/store/DictStore';
import { observer } from 'mobx-react-lite';
import { DataGridPremiumProps, GridColDef } from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { CreateRunsTableStore } from '@src/components/Tables/CreateRunsTable/store/CreateRunsTableStore';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import {
  CreateRunsTableFilter,
} from '@src/components/Tables/CreateRunsTable/components/CreateRunsTableFilter/CreateRunsTableFilter';
import { IDictCarBL } from '@src/store/types';
import {
  CreateRunsTableDrawer,
} from '@src/components/Tables/CreateRunsTable/components/CreateRunsTableDrawer/CreateRunsTableDrawer';
import { GridAggregationModel } from '@mui/x-data-grid-premium/hooks/features/aggregation/gridAggregationInterfaces';
import { GridAggregationFunction } from '@mui/x-data-grid-premium/hooks/features/aggregation';

type RowType = { id: number | string | null; invoice: string; car: string[] | undefined; };

export const CreateRunsTable: FC = observer(() => {
  const {
    isPendingList,
    init,
    updateRun,
    isPendingActions,
    reloadRuns,
    userSettings,
    invoices,
    list,
    updateRunLocally,
  } = CreateRunsTableStore;
  const { carIdMap } = DictStore;
  const { isLoading, carDescriptionMap, cars } = DictStore;
  const [showBusyCars, setShowBusyCars] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [carsList, setCarsList] = useState<string[]>([]);
  const [otherRunsCarList, setOtherRunsCarList] = useState<string[]>([]);
  const [currentSelectedInvoice, setCurrentSelectedInvoice] = useState<RowType>({} as RowType);
  const [totalCarsCount, setTotalCarsCount] = useState<number>(0);

  const sortedCarList = useMemo(() => {
    const seenPlateNumbers = new Set<string>();
    const toMoveToEnd: IDictCarBL[] = [];
    const remainingCars: IDictCarBL[] = [];

    for (const car of cars || []) {
      if (seenPlateNumbers.has(car.plate_number)) {
        continue;
      }

      seenPlateNumbers.add(car.plate_number);

      if (otherRunsCarList.includes(car.plate_number)) {
        toMoveToEnd.push(car);
      } else {
        remainingCars.push(car);
      }
    }

    return showBusyCars ? [...remainingCars] : [...remainingCars, ...toMoveToEnd];
  }, [cars, otherRunsCarList, showBusyCars]);

  useEffect(() => {
    void init();
  }, [init]);

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'invoice',
        headerName: 'Заявка',
        description: 'Информация по заявке',
        flex: 7,
        minWidth: 100,
        type: 'string',
        align: 'left',
        sortable: false,
        editable: false,
        resizable: true,
        groupable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'car',
        headerName: 'Машина',
        description: 'Машина',
        flex: 5,
        minWidth: 200,
        type: 'string',
        align: 'center',
        sortable: false,
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: value => (value.value ?? []).join(','),
      },
    ];

    return cols;
  }, []);

  const { rows, computedTotalCarsCount }: { rows: RowType[]; computedTotalCarsCount: number } = useMemo(() => {
    const result: RowType[] = [];

    list?.forEach(entry => {
      const invoice = invoices?.find(inv => inv.item_id === entry.invoice_id);

      const cars = [] as string[];
      entry.cars.forEach(id => {
        const res = carIdMap.get(id)?.plate_number;
        if (res) {
          cars.push(res);
        }
      });

      result.push({
        id: entry.invoice_id,
        invoice: `${invoice?.client} - ${invoice?.cargo} - ${invoice?.route}`,
        car: cars,
      });
    });

    return { rows: result, computedTotalCarsCount: totalCarsCount };
  }, [carIdMap, invoices, list, totalCarsCount]);

  useEffect(() => {
    setTotalCarsCount(computedTotalCarsCount);
  }, [computedTotalCarsCount]);

  useEffect(() => {
    if (currentSelectedInvoice) {
      const id = currentSelectedInvoice.id?.toString();
      const cars = currentSelectedInvoice.car;
      const carsIds = cars?.map(car => carDescriptionMap.get(car || '') || 0) || [];
      if (id !== undefined && carsIds !== undefined && carsIds[0] !== 0) {
        updateRunLocally(id, carsIds);
      }
    }
  }, [carDescriptionMap, currentSelectedInvoice, updateRunLocally]);

  const groupingColDef: DataGridPremiumProps['groupingColDef'] = {
    headerName: '',
    maxWidth: 1,
  };

  const aggregationFields: GridAggregationModel = {
    car: 'custom',
  };

  const carsCountAggregation: GridAggregationFunction<string, string | null> = {
    apply: (params) => {
      if (params.values.length === 0 || params.values[0] === '') {
        return 'Машин на маршруте: 0';
      }

      return `Машин на маршруте: ${params.values ? params.values?.toString()?.split(',')?.length?.toString() ?? '0' : '0'}`;
    },
    label: '',
    columnTypes: ['string'],
  };

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4">Расстановка машин на маршруты</Typography>
          <Typography variant="subtitle2">Создание рейса</Typography>
        </Box>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <CreateRunsTableFilter
        date={userSettings.filterDate}
        label={'Выбрать дату'}
        onDateChanged={date => {
          userSettings.saveFilterDate(date);
          void reloadRuns();
        }}
        checked={showBusyCars}
        onCheck={setShowBusyCars}
      />
      <PageProgressBar isLoading={isLoading ?? isPendingList}>
        <DataTableGrid
          columns={columns}
          groupingColDef={groupingColDef}
          rows={rows}
          editMode={'cell'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          rowHeight={30}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={{ __row_group_by_columns_group_invoice__: false }}
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
          exportFileName={'Расстановка машин на маршруты'}
          rowGroupingColumnMode={'multiple'}
          rowGroupingFields={['invoice']}
          exportHeaders={['invoice', 'car']}
          notHideGroupingDuplicateColumn={true}
          aggregationFields={aggregationFields}
          aggregationFunctions={carsCountAggregation}
          onCellEditStart={params => {
            const carList = params.row.car?.map(carModel => {
              const foundCar = cars.find(car => car.plate_number === carModel);

              return foundCar?.description;
            });
            setCarsList(carList);

            const otherList = rows
              .filter(row => row.id !== params.row.id && !row.id?.toString().startsWith('agg'))
              .map(row => row.car)
              .flat() as string[];

            setOtherRunsCarList(otherList);
            setCurrentSelectedInvoice(params.row);
            setOpenDrawer(true);
          }}
        />
        <CreateRunsTableDrawer
          open={openDrawer}
          setOpen={(value: boolean) => {
            setOpenDrawer(value);
            if (currentSelectedInvoice) {
              const id = currentSelectedInvoice.id?.toString();
              const cars = currentSelectedInvoice.car;
              const carsIds = cars?.map(car => carDescriptionMap.get(car || '') || 0) || [];
              if (id !== undefined && carsIds !== undefined && carsList.length !== cars?.length) {
                void updateRun(id, carsIds);
              }
            }
          }}
          carsList={carsList}
          onChangeAutoComplete={(event, value) => {
            setCurrentSelectedInvoice({ ...currentSelectedInvoice, car: value });
          }}
          options={sortedCarList?.map(car => car.description)}
          otherRunsCarList={otherRunsCarList}
        />
      </PageProgressBar>
    </>
  );
});
