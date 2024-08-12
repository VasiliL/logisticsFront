/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  GRID_AGGREGATION_FUNCTIONS,
  GridCellParams,
  GridCellSelectionModel,
  GridColDef,
  GridColumnResizeParams,
  GridColumnVisibilityModel,
  GridDensity,
  GridEventListener,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridRowSelectionModel,
  GridSortModel,
  GridValidRowModel,
  ruRU,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { GridEditMode } from '@mui/x-data-grid/models/gridEditRowModel';

import Snackbar from '@mui/material/Snackbar/Snackbar';
import { Alert } from '@mui/lab';
import { AlertProps } from '@mui/material';

import {
  AutocompleteEditInputCell,
} from '@src/components/DataTable/components/AutocompleteEditInputCell/AutocompleteEditInputCell';

import { GridAggregationModel } from '@mui/x-data-grid-premium/hooks/features/aggregation/gridAggregationInterfaces';

import { autosizeOptions, checkboxColumn, checkIsTheSameRow } from '@src/components/DataTable/utils/DataTableGridUtils';
import { CustomToolbar } from '@src/components/DataTable/components/CustomToolbar/CustomToolbar';

import { GridGroupingColDefOverride } from '@mui/x-data-grid-pro/models/gridGroupingColDefOverride';

import type { GridAggregationFunction } from '@mui/x-data-grid-premium/hooks/features/aggregation';

import { StyledDataGrid, useStyles } from './StyledDataGrid';

export interface ICustomToolbarButtonProps {
  text: string;
  disabled?: boolean;
  hideIcon?: boolean;
  onClick: () => void;
}

interface IDataTableGridProps {
  // table data
  columns: GridColDef[];
  rows: object[];
  isSimpleTable?: boolean;
  rowHeight?: number;
  // table user settings from local storage
  tablePageModel?: GridPaginationModel;
  tableFilterModel?: GridFilterModel;
  tableSortModel?: GridSortModel;
  tableDensityMode?: GridDensity;
  tableVisibilityModel?: GridColumnVisibilityModel;
  tableColumnsWidth?: Map<string, number>;
  tableColumnsOrder?: string[];
  saveTablePageData?: (data: GridPaginationModel) => void;
  saveTableVisibilityData?: (data: GridColumnVisibilityModel) => void;
  saveTableSortData?: (data: GridSortModel) => void;
  saveTableFilterData?: (data: GridFilterModel) => void;
  saveTableDensityMode?: (data: GridDensity) => void;
  saveTableColumnsWidth?: (data: Map<string, number>) => void;
  saveTableColumnsOrder?: (data: string[]) => void;
  // table settings
  checkboxSelection?: boolean;
  hideFooterSelectedRowCount?: boolean;
  // table editing
  editMode?: GridEditMode;
  onRowEditStopForFields?: string[];
  optionsForEditField?: Map<string, string[]>;
  // column grouping
  rowGroupingColumnMode?: 'single' | 'multiple';
  rowGroupingFields?: string[];
  notHideGroupingDuplicateColumn?: boolean;
  // aggregation
  aggregationFields?: GridAggregationModel;
  aggregationFunctions?: GridAggregationFunction;
  // events
  mutationUpdate?: (obj: any) => Promise<boolean>;
  onRowClick?: (id: string) => void;
  isLoading?: boolean;
  onChangeRowSelectionModel?: (obj: GridRowSelectionModel) => void;
  onChangeCellSelectionModel?: (obj: GridCellSelectionModel) => void;
  onCellKeyDownEvent?: (key: string) => void;
  // export
  exportFileName?: string;
  exportHeaders?: string[];
  // custom buttons
  toolbarCustomButtons?: ICustomToolbarButtonProps[];
  // styling
  cellsBackgroundColors?: Map<string, Map<string, number>>;
  onRowEditStart?: GridEventListener<'rowEditStart'>;
  onRowEditStop?: GridEventListener<'rowEditStop'>;
  onCellEditStart?: GridEventListener<'cellEditStart'>;
  groupingColDef?: GridGroupingColDefOverride;
}

export const DataTableGrid: FC<IDataTableGridProps> = (props: IDataTableGridProps) => {
  const apiRef = useGridApiRef();
  const classes = useStyles();
  const {
    rows: initialRows,
    columns: initialColumns,
    tablePageModel,
    tableFilterModel,
    tableSortModel,
    tableVisibilityModel,
    tableDensityMode,
    tableColumnsWidth,
    tableColumnsOrder,
    saveTablePageData,
    saveTableVisibilityData,
    saveTableSortData,
    saveTableFilterData,
    saveTableDensityMode,
    saveTableColumnsWidth,
    saveTableColumnsOrder,
    checkboxSelection,
    rowHeight,
    hideFooterSelectedRowCount,
    editMode,
    mutationUpdate,
    onRowClick,
    exportFileName,
    exportHeaders,
    isLoading,
    onRowEditStopForFields,
    optionsForEditField,
    rowGroupingColumnMode,
    rowGroupingFields,
    aggregationFields,
    toolbarCustomButtons,
    onChangeRowSelectionModel,
    onChangeCellSelectionModel,
    cellsBackgroundColors,
    onCellKeyDownEvent,
    isSimpleTable,
    onRowEditStart,
    onRowEditStop,
    groupingColDef,
    aggregationFunctions,
    notHideGroupingDuplicateColumn,
    onCellEditStart,
  } = props;

  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const [editModeActive, setEditModeActive] = React.useState<boolean>(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const isMutation = !checkIsTheSameRow(newRow, oldRow);
        if (mutationUpdate !== undefined && isMutation) {
          (async function() {
            try {
              if (await mutationUpdate(newRow)) {
                resolve(newRow);
              } else {
                throw new Error('Сервер вернул неуспешный результат');
              }
            } catch (error) {
              const text = `Ошибка во время обновления записи: ${error}`;
              console.error(text);
              setSnackbar({ children: text, severity: 'error' });
              reject(oldRow);
            }
          })();
        } else {
          resolve(oldRow);
        }
      }),
    [mutationUpdate],
  );

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      pagination: {
        paginationModel: tablePageModel,
      },
      filter: {
        filterModel: tableFilterModel,
      },
      sorting: {
        sortModel: tableSortModel,
      },
      columns: {
        columnVisibilityModel: tableVisibilityModel,
        orderedFields: tableColumnsOrder,
      },
      rowGrouping: {
        model: rowGroupingFields,
      },
      aggregation: {
        model: aggregationFields,
      },
    },
  });

  const columns = useMemo(() => {
    return [
      checkboxColumn(apiRef),
      ...initialColumns.map(col => {
        // устанавливаем сохраненные юзером ширины колонок
        col.width = tableColumnsWidth?.get(col.field);
        if (tableColumnsWidth?.has(col.field)) {
          col.flex = undefined;
        }

        if (col.type !== 'singleSelect') {
          return col;
        }

        return {
          ...col,
          type: undefined,
          renderEditCell: params => {
            if (optionsForEditField === undefined) {
              return;
            }

            const options = optionsForEditField?.get(params.field);
            if (options !== undefined) {
              return (
                <AutocompleteEditInputCell
                  params={params}
                  value={params.formattedValue}
                  options={options}
                  freeSolo={false}
                  multiple={false}
                  apiRef={apiRef}
                />
              );
            }
          },
        };
      }),
    ];
  }, [apiRef, initialColumns, optionsForEditField, tableColumnsWidth]);

  useEffect(() => {
    apiRef.current.subscribeEvent('columnHeaderDragEnd', () => {
      saveTableColumnsOrder && saveTableColumnsOrder(apiRef.current.getAllColumns().map(col => col.field));
    });
  }, [apiRef, saveTableColumnsOrder]);

  useEffect(() => {
    tablePageModel && apiRef.current.setPaginationModel(tablePageModel);
  }, [apiRef, tablePageModel]);

  useEffect(() => {
    tableFilterModel && apiRef.current.setFilterModel(tableFilterModel);
  }, [apiRef, tableFilterModel]);

  useEffect(() => {
    tableSortModel && apiRef.current.setSortModel(tableSortModel);
  }, [apiRef, tableSortModel]);

  useEffect(() => {
    tableVisibilityModel && apiRef.current.setColumnVisibilityModel(tableVisibilityModel);
  }, [apiRef, tableVisibilityModel]);

  useEffect(() => {
    // для исключения дубликатов скрываем колонки, по которым организована группировка
    if (!notHideGroupingDuplicateColumn) {
      const columnsToHide = initialColumns.filter(col => col.groupable).map(col => col.field);

      columnsToHide.forEach(col => {
        if (tableVisibilityModel) {
          tableVisibilityModel[col] = false;
        }
      });
    }
  }, [columns, notHideGroupingDuplicateColumn, initialColumns, tableVisibilityModel]);

  useEffect(() => {
    const handleRowClick: GridEventListener<'rowClick'> = params => {
      if (onRowClick !== undefined) {
        onRowClick(params.row.id);
      }
    };

    // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
    return apiRef.current.subscribeEvent('rowClick', handleRowClick);
  }, [apiRef, onRowClick]);

  const onColumnWidthChange = (params: GridColumnResizeParams) => {
    tableColumnsWidth?.set(params.colDef.field, params.width);
    saveTableColumnsWidth && tableColumnsWidth && saveTableColumnsWidth(tableColumnsWidth);
  };

  useEffect(() => {
    const handleEvent: GridEventListener<'cellKeyDown'> = (params, event) => {
      if (event.code == 'Enter') {
        setEditModeActive(!editModeActive);
      } else if (event.code == 'Escape') {
        setEditModeActive(false);
      }
    };

    apiRef.current.subscribeEvent('cellDoubleClick', handleEvent);
    apiRef.current.subscribeEvent('cellKeyDown', handleEvent);
  }, [apiRef, editModeActive]);

  const getCellClassName = useCallback(
    (params: GridCellParams<any, GridValidRowModel, GridValidRowModel>) => {
      if (!cellsBackgroundColors) {
        return '';
      }

      const fields = cellsBackgroundColors?.get(params.id.toString());
      if (fields) {
        const value = fields.get(params.field);
        if (value === 1) {
          return 'hot';
        } else if (value === 2) {
          return 'cold';
        }
      }

      return '';
    },
    [cellsBackgroundColors],
  );

  const handleCellKeyDown = useCallback(
    (params, event) => {
      if (onCellKeyDownEvent) {
        onCellKeyDownEvent(event.key);
      }
    },
    [onCellKeyDownEvent],
  );

  const toolbarSlot = isSimpleTable
    ? undefined
    : props => (
      <CustomToolbar
        {...props}
        toolbarCustomButtons={toolbarCustomButtons}
        isLoading={isLoading}
        exportHeaders={exportHeaders}
        exportFileName={exportFileName}
      />
    );

  const slots = {
    toolbar: toolbarSlot,
  };

  return (
    <>
      <StyledDataGrid
        groupingColDef={groupingColDef}
        onCellKeyDown={handleCellKeyDown}
        apiRef={apiRef}
        rows={initialRows}
        columns={columns}
        initialState={initialState}
        getCellClassName={getCellClassName}
        density={tableDensityMode ?? 'standard'}
        onStateChange={v =>
          v.density &&
          tableDensityMode !== v.density.value &&
          saveTableDensityMode &&
          saveTableDensityMode(v.density.value)
        }
        aggregationFunctions={aggregationFunctions ? {
          ...GRID_AGGREGATION_FUNCTIONS,
          custom: aggregationFunctions,
        } : { ...GRID_AGGREGATION_FUNCTIONS }}
        autoHeight
        // clipboardCopyCellDelimiter={','}
        // unstable_splitClipboardPastedText={(text) => text.split('\n').map((row) => row.split(','))}
        unstable_headerFilters={!isSimpleTable}
        autosizeOptions={autosizeOptions}
        disableColumnResize={false}
        hideFooter={isSimpleTable}
        onColumnWidthChange={onColumnWidthChange}
        onPaginationModelChange={saveTablePageData}
        onFilterModelChange={saveTableFilterData}
        onSortModelChange={saveTableSortData}
        onColumnVisibilityModelChange={saveTableVisibilityData}
        rowHeight={rowHeight}
        hideFooterSelectedRowCount={isSimpleTable ?? hideFooterSelectedRowCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        getRowClassName={params => {
          return params.indexRelativeToCurrentPage % 2 === 0 ? 'super-app-theme' : 'super-app-theme-even';
        }}
        slots={slots}
        columnHeaderHeight={34}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={isSimpleTable ?? checkboxSelection}
        checkboxSelectionVisibleOnly={true}
        pagination={!isSimpleTable}
        unstable_ignoreValueFormatterDuringExport={true}
        unstable_cellSelection={true}
        disableColumnSelector={false}
        className={classes.grid}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        editMode={editModeActive ? editMode : undefined}
        processRowUpdate={processRowUpdate}
        rowGroupingColumnMode={rowGroupingColumnMode}
        defaultGroupingExpansionDepth={1}
        onRowDoubleClick={() => {
        }}
        onCellEditStart={onCellEditStart}
        onRowEditStart={onRowEditStart}
        // isCellEditable={() => editModeActive}
        onRowEditStop={(params, event, details) => {
          if (params.field && onRowEditStopForFields?.includes(params.field) && params.reason === 'enterKeyDown') {
            event.defaultMuiPrevented = true;
          }

          if (onRowEditStop) {
            onRowEditStop(params, event, details);
          }
        }}
        unstable_onCellSelectionModelChange={(newModel: GridCellSelectionModel) => {
          setEditModeActive(false);
          onChangeCellSelectionModel && onChangeCellSelectionModel(newModel);
        }}
        onRowSelectionModelChange={newModel => {
          onChangeRowSelectionModel && onChangeRowSelectionModel(newModel);
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
