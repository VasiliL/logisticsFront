import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo } from 'react';
import { UserEventLogTableStore } from '@src/components/Tables/UserEventLogTable/store/UserEventLogTableStore';
import { GridColDef } from '@mui/x-data-grid-premium';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import { UserEventLogDataTableFilter } from '@src/components/Tables/UserEventLogTable/UserEventLogDataTableFilter/UserEventLogDataTableFilter';

export const UserEventLogTable: FC = observer(() => {
  const { init, list, isPendingList, userSettings, reloadList } = UserEventLogTableStore;

  useEffect(() => {
    void init();
  }, [init]);

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'id',
        headerName: 'ИД',
        description: 'ИД',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'left',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'user',
        headerName: 'Пользователь',
        description: 'Пользователь',
        flex: 2,
        minWidth: 100,
        type: 'string',
        align: 'left',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'message',
        headerName: 'Событие',
        description: 'Событие',
        flex: 10,
        minWidth: 100,
        type: 'string',
        align: 'left',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'datetime',
        headerName: 'Дата',
        description: 'Дата',
        flex: 2,
        minWidth: 100,
        type: 'dateTime',
        align: 'left',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
    ];

    return cols;
  }, []);

  const rows = useMemo(() => {
    return list.map(item => ({
      id: item.id,
      user: item.user_id,
      message: item.message,
      datetime: item.datetime,
    }));
  }, [list]);

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4">Журнал событий</Typography>
          <Typography variant="subtitle2">Список действий пользователей</Typography>
        </Box>
        <ProgressBar isLoading={isPendingList} />
      </Stack>
      <UserEventLogDataTableFilter
        date={userSettings.filterDateRange}
        onDateChanged={range => {
          userSettings.saveFilterDateRange(range);
          void reloadList();
        }}
      />
      <PageProgressBar isLoading={isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          editMode={'cell'}
          checkboxSelection={false}
          hideFooterSelectedRowCount={true}
          rowHeight={30}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={
            userSettings.tableSortModel ? userSettings.tableSortModel : [{ field: 'datetime', sort: 'desc' }]
          }
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
          exportFileName={'Журнал событий'}
          isLoading={isPendingList}
        />
      </PageProgressBar>
    </>
  );
});
