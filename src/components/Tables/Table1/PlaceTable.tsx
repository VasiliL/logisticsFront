/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { PlaceTableStore } from '@src/components/Tables/Table1/store/PlaceTableStore';
import { DictStore } from '@src/store/DictStore';
import { observer } from 'mobx-react-lite';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import { GridColDef } from '@mui/x-data-grid';
import { PlaceTableFilter } from '@src/components/Tables/Table1/components/PlaceTableFilter/PlaceTableFilter';
import InputFileUpload from '@src/components/UploadButtons/UploadButtons';

export const PlaceTable: FC = observer(() => {
  const {
    entries,
    isPendingList,
    init,
    deletePlace,
    updatePlace,
    createPlace,
    isPendingActions,
    reloadPlaces,
    dates,
    userSettings,
  } = PlaceTableStore;
  const { isLoading, cars, driverIdList, driverFioMap } = DictStore;

  useEffect(() => {
    init();
  }, [init]);

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'car',
        headerName: 'Номер машины',
        description: 'Номер машины',
        flex: 1,
        minWidth: 200,
        type: 'string',
        align: 'left',
        sortable: true,
        editable: false,
        filterable: true
      },
    ];

    const dateCols: GridColDef[] =
      dates?.map(date => {
        return {
          field: date,
          headerName: date,
          description: `Дата ${date}`,
          flex: 1,
          minWidth: 200,
          type: 'singleSelect',
          align: 'center',
          sortable: true,
          editable: true,
          filterable: true,
          valueOptions: ({ row }) => {
            if (!row) {
              // The row is not available when filtering this column
              return driverIdList;
            }

            return driverIdList;
          },
        };
      }) || [];

    return cols.concat(dateCols);
  }, [dates, driverIdList]);

  const rows = useMemo(() => {
    return (
      cars?.map(car => {
        const row = {};
        row['id'] = car.id;
        row['car'] = car.description;
        dates?.map(date => {
          row[date] = entries.get(car.id)?.get(date)?.fio || '';
        });

        return row;
      }) || []
    );
  }, [cars, dates, entries]);

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const car_id = obj.id;
    const carEntries = entries.get(car_id);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const fio = obj[date];
      const entry = carEntries?.get(date);
      const driver_id = driverFioMap.get(fio) || 0;

      if (!!entry && entry?.fio !== fio && fio === '') {
        return await deletePlace(entry.id);
      } else if (!!entry && entry?.driver_id !== driver_id) {
        return await updatePlace({ ...entry, driver_id, fio });
      } else if (!entry && fio !== '') {
        const plate_number = obj.car;
        if (driver_id === undefined) throw new Error('Непредвиденная ошибка сервиса: driver_id == undefined');

        return await createPlace({ date_place:date, car_id, driver_id, fio, plate_number, id: 0 });
      }
    }

    throw new Error('Непредвиденная ошибка сервиса: Не найдены записи для обновления');
  };

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Typography variant="h4">Расстановка водителей на машины</Typography>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={5}>
        <PlaceTableFilter
          startDate={userSettings.dateStart}
          endDate={userSettings.dateEnd}
          onReloadBtnClick={reloadPlaces}
          onDateChanged={userSettings.saveFilterDateRange}
        />
        <InputFileUpload />
      </Stack>
      <PageProgressBar isLoading={isLoading || isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          editMode={'row'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          rowHeight={30}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={userSettings.tableVisibilityModel}
          tableDensityMode={userSettings.tableDensityMode}
          saveTablePageData={userSettings.saveTablePageData}
          saveTableVisibilityData={userSettings.saveTableVisibilityData}
          saveTableSortData={userSettings.saveTableSortData}
          saveTableFilterData={userSettings.saveTableFilterData}
          saveTableDensityMode={userSettings.saveTableDensityMode}
          mutationUpdate={handleUpdate}
        />
      </PageProgressBar>
    </>
  );
});
