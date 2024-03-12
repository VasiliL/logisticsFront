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

export const PlaceTable: FC = observer(() => {
  const {
    entries,
    isPendingList,
    init,
    deletePlace,
    updatePlace,
    createPlace,
    uploadNew,
    uploadExists,
    isPendingActions,
    reloadPlaces,
    dates,
    userSettings,
  } = PlaceTableStore;
  const { isLoading, cars, driverIdListMyCompany, driverFioMap } = DictStore;

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
        filterable: true,
      },
    ];

    const dateCols: GridColDef[] =
      dates?.map(date_place => {
        return {
          field: date_place,
          headerName: date_place,
          description: `Дата ${date_place}`,
          flex: 1,
          minWidth: 200,
          type: 'singleSelect',
          align: 'center',
          sortable: true,
          editable: true,
          filterable: true,
          valueFormatter: ({ value }) => {
            return value || '';
          },
        };
      }) || [];

    return cols.concat(dateCols);
  }, [dates]);

  const rows = useMemo(() => {
    return (
      cars?.filter(car => car.owner === 'РВ-ТАРИФ ООО').map(car => {
        const row = {};
        row['id'] = car.id;
        row['car'] = car.description;
        dates?.map(date_place => {
          row[date_place] = entries.get(car.id)?.get(date_place)?.fio || '';
        });

        return row;
      }) || []
    );
  }, [cars, dates, entries]);

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const car_id = obj.id;
    const carEntries = entries.get(car_id);

    for (let i = 0; i < dates.length; i++) {
      const date_place = dates[i];
      const fio = obj[date_place];
      const entry = carEntries?.get(date_place);
      const driver_id = driverFioMap.get(fio) || 0;

      if (!!entry && entry?.fio !== fio && fio === '') {
        return await deletePlace(entry.id);
      } else if (!!entry && entry?.driver_id !== driver_id) {
        return await updatePlace({ ...entry, driver_id, fio });
      } else if (!entry && fio !== '') {
        const plate_number = cars.find(car => car.description === obj.car)?.plate_number || '';
        if (driver_id === undefined) throw new Error('Непредвиденная ошибка сервиса: driver_id == undefined');

        return await createPlace({ date_place, car_id, driver_id, fio, plate_number, id: 0 });
      }
    }

    throw new Error('Непредвиденная ошибка сервиса: Не найдены записи для обновления');
  };

  //Обрабатываем загрузку файла
  const handleUploadFileNew = async (file: File): Promise<boolean> => {
    return await uploadNew(file);
  };

  const handleUploadFileExist = async (file: File): Promise<boolean> => {
    return await uploadExists(file);
  };

  const options = useMemo(() => {
    const res = new Map<string, string[]>();
    dates.forEach(date => {
      res.set(date, driverIdListMyCompany);
    });

    return res;
  }, [dates, driverIdListMyCompany]);

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Typography variant="h4">Расстановка водителей на машины</Typography>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <PlaceTableFilter
        startDate={userSettings.dateStart}
        endDate={userSettings.dateEnd}
        onReloadBtnClick={reloadPlaces}
        onDateChanged={userSettings.saveFilterDateRange}
      />
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
          optionsForEditField={options}
          mutationUpdate={handleUpdate}
          uploadFileNew={handleUploadFileNew}
          uploadFileExist={handleUploadFileExist}
        />
      </PageProgressBar>
    </>
  );
});
