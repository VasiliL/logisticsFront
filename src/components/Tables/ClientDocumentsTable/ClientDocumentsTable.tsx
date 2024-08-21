/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';
import { observer } from 'mobx-react-lite';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';
import { GridCellSelectionModel, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid-premium';
import { DataTableGrid, ICustomToolbarButtonProps } from '@src/components/DataTable/DataTableGrid';
import Box from '@mui/material/Box';
import { GridAggregationModel } from '@mui/x-data-grid-premium/hooks/features/aggregation/gridAggregationInterfaces';
import { AlertInputDialog, IAlertInputDialogContent } from '@src/components/AlertInputDialog/AlertInputDialog';
import { dateColumnType } from '@src/utils/tables/utils';
import { ClientDocumentsTableStore } from '@src/components/Tables/ClientDocumentsTable/store/ClientDocumentsTableStore';
import {
  ClientDocumentsTableFilter,
} from '@src/components/Tables/ClientDocumentsTable/components/ClientDocumentsTableFilter/ClientDocumentsTableFilter';
import { IRunDto } from '@src/service/types';
import { nowStr, toStr } from '@src/utils/date_utils';

export const ClientDocumentsTable: FC = observer(() => {
  const {
    isPendingList,
    init,
    isPendingActions,
    userSettings,
    reloadDocuments,
    updateRun,
    list,
    getRunById,
    getCargoById,
  } = ClientDocumentsTableStore;

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<IAlertInputDialogContent>();
  const [viewMode, setViewMode] = useState<boolean>(userSettings.viewMode);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>();
  const [cellSelectionModel, setCellSelectionModel] = useState<GridCellSelectionModel>();
  const [rowsForUpdate, setRowsForUpdate] = useState<object[] | undefined>(undefined);
  const [visibilityModel, setVisibilityModel] = useState(userSettings.tableVisibilityModel);

  useEffect(() => {
    void init();
  }, [init]);

  const isRowsSelected = useMemo(
    () => rowSelectionModel !== undefined && rowSelectionModel.length > 0,
    [rowSelectionModel],
  );

  const balanceBtnValue = useMemo(() => {
    if (!rowSelectionModel || rowSelectionModel.length === 0) {
      return 0;
    }

    const run = getRunById(rowSelectionModel[0]);
    if (run === undefined) {
      return 0;
    }

    return getCargoById(run.invoice.cargo_id)?.balance || 0;
  }, [getCargoById, getRunById, rowSelectionModel]);

  // const balanceBtnDisabled = useMemo(() => {
  //   return !(rowSelectionModel && new Set(rowSelectionModel.map(id =>
  //     getRunById(id.toString())?.invoice.cargo)).size === 1 && balanceBtnValue !== 0);
  // }, [rowSelectionModel, balanceBtnValue, getRunById]);

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'client',
        headerName: 'Клиент',
        description: 'Клиент',
        flex: 8,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        resizable: true,
        groupable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'cargo',
        headerName: 'Груз',
        description: 'Груз',
        flex: 8,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        resizable: true,
        groupable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'route',
        headerName: 'Маршрут',
        description: 'Маршрут',
        flex: 2,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
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
        field: 'driver',
        headerName: 'Водитель',
        description: 'Водитель',
        flex: 2,
        minWidth: 100,
        type: 'singleSelect',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueFormatter: ({ value }) => {
          return value ?? '';
        },
      },
      {
        field: 'car',
        headerName: 'Машина',
        description: 'Машина',
        flex: 1,
        minWidth: 100,
        type: 'singleSelect',
        align: 'center',
        editable: false,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'doc_type_2',
        headerName: 'Номер ТН',
        description: 'Номер ТН',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'doc_type_7',
        headerName: 'Номер УПД',
        description: 'Номер УПД',
        flex: 1,
        minWidth: 100,
        type: 'string',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'doc_type_4',
        headerName: 'Номер реестра',
        description: 'Номер реестра',
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
        headerName: 'Вес прибытия',
        description: 'Вес прибытия',
        flex: 1,
        minWidth: 100,
        type: 'number',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'weight',
        headerName: 'Вес отправления',
        description: 'Вес отправления',
        flex: 1,
        minWidth: 100,
        type: 'number',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
      },
      {
        field: 'date_departure',
        headerName: 'Дата отправления',
        description: 'Дата отправления',
        flex: 1,
        ...dateColumnType,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: 'date_arrival',
        headerName: 'Дата прибытия',
        description: 'Дата прибытия',
        flex: 1,
        ...dateColumnType,
        minWidth: 100,
        type: 'date',
        align: 'center',
        editable: true,
        resizable: true,
        headerClassName: 'super-app-theme--header',
        valueGetter: ({ value }) => value && new Date(value),
      },
    ];

    return cols;
  }, []);

  const makeRows = (list: IRunDto[]) => {
    return list?.map(item => ({
      id: item.item_id,
      run_id: item.item_id,
      car: item.car_plate_number,
      driver: item.driver_fio,
      date_departure: item.date_departure,
      date_arrival: item.date_arrival,
      client: item.invoice.client,
      cargo: item.invoice.cargo,
      doc_type_7: item.documents?.find(doc => doc.doc_type_obj?.item_id == '7' || doc.doc_type == 7)?.name,
      doc_type_2: item.documents?.find(doc => doc.doc_type_obj?.item_id == '2' || doc.doc_type == 2)?.name,
      doc_type_4: item.documents?.find(doc => doc.doc_type_obj?.item_id == '4' || doc.doc_type == 4)?.name,
      route: item.invoice.route,
      weight: item.weight ? parseFloat(item.weight?.toString() ?? 0) : null,
      weight_arrival: item.weight_arrival ? parseFloat(item.weight_arrival?.toString() ?? 0) : null,
    }));
  };

  const rows = useMemo(() => {
    return makeRows(list);
  }, [list]);

  const cellsBackgroundColors = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    list?.forEach(item => {
      if (item.item_id) {
        map.set(
          item.item_id.toString(),
          new Map([
            ['weight', item.weight_color ?? 0],
            ['weight_arrival', item.weight_arrival_color ?? 0],
          ]),
        );
      }
    });

    return map;
  }, [list]);

  const aggregationFields: GridAggregationModel = {
    weight: 'sum',
    weight_arrival: 'sum',
  };

  const handleUpdate = async (obj: any): Promise<boolean> => {
    const rowId = obj.run_id;
    const weight = obj.weight;
    const weight_arrival = obj.weight_arrival;
    const date_departure = obj.date_departure ? toStr(obj.date_departure) : obj.date_departure;
    const date_arrival = obj.date_arrival ? toStr(obj.date_departure) : obj.date_arrival;

    if (rowId === undefined) return false;
    const entry = getRunById(rowId);
    if (entry === undefined) return false;

    return await updateRun([
      {
        ...entry,
        weight,
        weight_arrival,
        date_departure,
        date_arrival,
      },
    ]);
  };

  const handleChangeMode = (): void => {
    const mode = !viewMode;
    const model = { ...visibilityModel, doc_type_4: mode, doc_type_7: !mode };
    setViewMode(mode);
    setVisibilityModel(model);
    userSettings.saveViewMode(mode);
    userSettings.saveTableVisibilityData(model);
  };

  const handleApply = useCallback(async (value: string, type: number) => {
    if (rowSelectionModel) {
      const res = [] as IRunDto[];
      rowSelectionModel.forEach((id) => {
        const run = list?.find(run => run.item_id === id);
        if (run) {
          const document = run.documents.find(doc => doc.doc_type_obj?.item_id == type.toString());

          if (document) {
            document.name = value.toString();
          } else {
            run.documents.push({
              name: value.toString(),
              doc_date: nowStr(),
              run_id: id.toString(),
              doc_type: type,
              item_id: null,
              comment: null,
              doc_type_obj: null,
            });
          }

          res.push(run);
        }
      });
      if (res && res.length > 0) {
        setRowsForUpdate(makeRows(res));
        await updateRun(res);
      }
    }
    setDialogIsOpen(false);
  }, [list, rowSelectionModel, updateRun]);

  const handleAddRegeditNumber = useCallback(() => {
    setDialogContent({
      title: 'Добавление реестра',
      label: 'Номер реестра',
      content: 'Добавить реестр для выбранных рейсов',
      handleApply: value => {
        (async () => {
          try {
            await handleApply(value, 4);
          } catch (error) {
            console.error('Error applying changes:', error);
          }
        })();
      },
    });
    setDialogIsOpen(true);
  }, [handleApply]);

  const handleAddUPDNumber = useCallback(() => {
    setDialogContent({
      title: 'Добавление УПД',
      label: 'Номер УПД',
      content: 'Добавить УПД для выбранных рейсов',
      handleApply: value => {
        (async () => {
          try {
            await handleApply(value, 7);
          } catch (error) {
            console.error('Error applying changes:', error);
          }
        })();
      },
    });
    setDialogIsOpen(true);
  }, [handleApply]);

  const onCellKeyDownEvent = useCallback(
    (key: string) => {
      if (!cellSelectionModel) {
        return;
      }

      const result: IRunDto[] = [];

      const colorMap: Record<string, number> = {
        o: 0,
        щ: 0,
        i: 1,
        ш: 1,
        p: 2,
        з: 2,
      };

      Object.entries(cellSelectionModel).forEach(([id, fields]) => {
        Object.entries(fields).forEach(([field, isSelected]) => {
          if (isSelected && (field === 'weight' || field === 'weight_arrival')) {
            const colorKey = key.toLowerCase();
            const colorValue = colorMap[colorKey];

            if (colorValue !== undefined) {
              const item = getRunById(id);
              const colorField = `${field}_color`;

              if (item && item[colorField] !== colorValue && !(item[colorField] === undefined && colorValue === 0)) {
                item[colorField] = colorValue;
                result.push(item);
              }
            }
          }
        });
      });

      if (result.length > 0) {
        void updateRun(result);
      }
    },
    [cellSelectionModel, getRunById, updateRun],
  );

  const customToolbarButtons: ICustomToolbarButtonProps[] = useMemo(() => {
    const result: ICustomToolbarButtonProps[] = [
      {
        text: 'Добавить реестр',
        onClick: handleAddRegeditNumber,
        disabled: !isRowsSelected,
      },
      {
        text: 'Добавить УПД',
        onClick: handleAddUPDNumber,
        disabled: !isRowsSelected,
      },
    ];
    if (!viewMode) {
      result.push({
        text: `Остаток на балансе - ${balanceBtnValue}`,
        onClick: () => {
        }, //handleBalanceBtnCLick,
        disabled: true, //balanceBtnDisabled,
        hideIcon: true,
      });
    }

    return result;
  }, [handleAddRegeditNumber, isRowsSelected, handleAddUPDNumber, viewMode, balanceBtnValue]);

  return (
    <>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4">Выставление документов заказчику</Typography>
          <Typography variant="subtitle2">Выставление документов</Typography>
        </Box>
        <ProgressBar isLoading={isPendingActions} />
      </Stack>
      <ClientDocumentsTableFilter
        date={userSettings.filterDateRange}
        onDateChanged={range => {
          userSettings.saveFilterDateRange(range);
          void reloadDocuments();
        }}
        viewMode={viewMode}
        onChangeViewMode={handleChangeMode}
      />
      <PageProgressBar isLoading={isPendingList}>
        <DataTableGrid
          columns={columns}
          rows={rows}
          rowsForUpdate={rowsForUpdate}
          editMode={'cell'}
          checkboxSelection={true}
          hideFooterSelectedRowCount={false}
          rowHeight={30}
          tablePageModel={userSettings.tablePageModel}
          tableFilterModel={userSettings.tableFilterModel}
          tableSortModel={userSettings.tableSortModel}
          tableVisibilityModel={visibilityModel}
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
          exportFileName={'Выставление документов заказчику'}
          isLoading={isPendingList}
          rowGroupingColumnMode={'multiple'}
          rowGroupingFields={['client', 'cargo']}
          aggregationFields={aggregationFields}
          preventEditModeFor={{ fields: ['weight', 'weight_arrival'], keys: ['KeyP', 'KeyI', 'KeyO'] }}
          toolbarCustomButtons={customToolbarButtons}
          onChangeRowSelectionModel={setRowSelectionModel}
          onChangeCellSelectionModel={setCellSelectionModel}
          cellsBackgroundColors={cellsBackgroundColors}
          onCellKeyDownEvent={onCellKeyDownEvent}
        />
      </PageProgressBar>
      <AlertInputDialog
        title={dialogContent?.title ?? ''}
        label={dialogContent?.label ?? ''}
        content={dialogContent?.content ?? ''}
        handleApply={dialogContent?.handleApply ?? (() => undefined)}
        handleCancel={() => setDialogIsOpen(false)}
        isOpen={dialogIsOpen}
        disabled={isPendingActions}
      />
      {/*<AlertTableDialog*/}
      {/*  title={'Список поставщиков'}*/}
      {/*  handleCancel={() => setDialogWithBalanceTableOpen(false)}*/}
      {/*  isOpen={dialogWithBalanceTableOpen}*/}
      {/*/>*/}
    </>
  );
});
