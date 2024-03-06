/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  GridColDef,
  GridColumnVisibilityModel,
  GridDensity,
  GridEventListener,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridSortModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  ruRU,
  useGridApiRef,
} from '@mui/x-data-grid';
import { GridEditMode } from '@mui/x-data-grid/models/gridEditRowModel';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import Snackbar from '@mui/material/Snackbar/Snackbar';
import { Alert } from '@mui/lab';
import { AlertProps, Dialog, DialogActions, DialogTitle } from '@mui/material';

import { StyledDataGrid, Transition, useStyles, VisuallyHiddenInput } from './StyledDataGrid';


interface IDataTableGridProps {
  // table data
  columns: GridColDef[];
  rows: object[];
  rowHeight?: number;
  // table settings
  tablePageModel: GridPaginationModel;
  tableFilterModel: GridFilterModel;
  tableSortModel: GridSortModel;
  tableDensityMode: GridDensity;
  tableVisibilityModel: GridColumnVisibilityModel;
  saveTablePageData: (data: GridPaginationModel) => void;
  saveTableVisibilityData: (data: GridColumnVisibilityModel) => void;
  saveTableSortData: (data: GridSortModel) => void;
  saveTableFilterData: (data: GridFilterModel) => void;
  saveTableDensityMode: (data: GridDensity) => void;
  checkboxSelection?: boolean;
  hideFooterSelectedRowCount?: boolean;
  disableColumnSelector?: boolean;
  disableRowSelectionOnClick?: boolean;
  // table editing
  editMode?: GridEditMode;
  // events
  mutationUpdate: (obj: any) => Promise<boolean>;
  onRowClick?: (id: string) => void;
  notUpdateRowAfterMutate?: boolean;
  isLoading?: boolean;
  uploadFileNew?: (file: File) => Promise<boolean>;
  uploadFileExist?: (file: File) => Promise<boolean>;
  // export
  exportFileName?: string;
  exportHeaders?: string[];
  // style
  prefixForRowBlockedStyle?: string;
}

const checkIsTheSameRow = (newRow: GridRowModel, oldRow: GridRowModel) => {
  const obj1Keys = Object.keys(newRow);
  const obj2Keys = Object.keys(oldRow);

  return obj1Keys.length === obj2Keys.length && obj1Keys.every(key => newRow[key] === oldRow[key]);
};

export const DataTableGrid: FC<IDataTableGridProps> = (props: IDataTableGridProps) => {
  const apiRef = useGridApiRef();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const classes = useStyles();
  const {
    rows: initialRows,
    columns: initialColumns,
    tablePageModel,
    tableFilterModel,
    tableSortModel,
    tableVisibilityModel,
    tableDensityMode,
    saveTablePageData,
    saveTableVisibilityData,
    saveTableSortData,
    saveTableFilterData,
    saveTableDensityMode,
    checkboxSelection,
    rowHeight,
    hideFooterSelectedRowCount,
    disableColumnSelector,
    disableRowSelectionOnClick,
    notUpdateRowAfterMutate,
    editMode,
    mutationUpdate,
    uploadFileNew,
    uploadFileExist,
    onRowClick,
    exportFileName,
    exportHeaders,
    prefixForRowBlockedStyle,
    isLoading,
  } = props;

  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileStatus, setFileStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const isMutation = !checkIsTheSameRow(newRow, oldRow);
        if (isMutation) {
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow);
        }
      }),
    [],
  );

  useEffect(() => {
    apiRef.current.setPaginationModel(tablePageModel);
  }, [apiRef, tablePageModel]);

  useEffect(() => {
    apiRef.current.setFilterModel(tableFilterModel);
  }, [apiRef, tableFilterModel]);

  useEffect(() => {
    apiRef.current.setSortModel(tableSortModel);
  }, [apiRef, tableSortModel]);

  useEffect(() => {
    apiRef.current.setColumnVisibilityModel(tableVisibilityModel);
  }, [apiRef, tableVisibilityModel]);

  useEffect(() => {
    const handleRowClick: GridEventListener<'rowClick'> = params => {
      if (onRowClick !== undefined) {
        onRowClick(params.row.id);
      }
    };

    // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
    return apiRef.current.subscribeEvent('rowClick', handleRowClick);
  }, [apiRef, onRowClick]);

  // Диалог подтверждения изменений
  const renderConfirmDialog = () => {

    const handleNo = () => {
      const { oldRow, resolve } = promiseArguments;
      resolve(oldRow);
      setPromiseArguments(null);
    };

    const handleYes = async () => {
      const { newRow, oldRow, reject, resolve } = promiseArguments;

      try {
        if (await mutationUpdate(newRow)) {
          resolve(notUpdateRowAfterMutate && oldRow.id.toString().startsWith('empty_') ? oldRow : newRow);
        } else {
          throw new Error('Сервер вернул неуспешный результат');
        }
      } catch (error) {
        const text = `Ошибка во время обновления записи: ${error}`;
        console.error(text);
        setSnackbar({ children: text, severity: 'error' });
        reject(oldRow);
      } finally {
        setPromiseArguments(null);
      }
    };

    const handleEntered = () => {
      // The `autoFocus` is not used because, if used, the same Enter that saves
      // the cell triggers "No". Instead, we manually focus the "No" button once
      // the dialog is fully open.
      // noButtonRef.current?.focus();
    };

    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const notMutation = checkIsTheSameRow(newRow, oldRow);
    if (notMutation) {
      return null;
    }

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
        TransitionComponent={Transition}
        keepMounted
        disableRestoreFocus
      >
        <DialogTitle>Обновить запись?</DialogTitle>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            Отмена
          </Button>
          <Button autoFocus onClick={handleYes}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  // Диалог подтверждения изменений

  const handleFileSelection = (event, source: string) => {
    const file = event.target.files[0];
    if (file && !isUploading) {
      try {
        setSelectedFile(file); // Save the selected file
      } finally {
        setFileStatus(source); // Save the source of the file
        setOpenFileDialog(true); // Open the dialog
      }
    }
  };

  const handleConfirmUpload = async () => {
    if (selectedFile && (uploadFileNew || uploadFileExist) && fileStatus && !isUploading) {
      setIsUploading(true);
      setOpenFileDialog(false); // Close the dialog after handling the confirmation
      try {
        if (uploadFileNew && fileStatus === 'new') {
          const uploadResult = await uploadFileNew(selectedFile);
          console.log('Upload successful:', uploadResult);
        } else if (uploadFileExist && fileStatus === 'exists') {
          const uploadResult = await uploadFileExist(selectedFile);
          console.log('Upload successful:', uploadResult);
        } else {
          throw new Error('Неизвестный источник файла');
        }
      } finally {
        setIsUploading(false); // Re-enable the button
        setSelectedFile(null);
        setFileStatus(null);
      }
    }
  };

  const AlertDialog = () => (
    <Dialog
      maxWidth="xs"
      open={openFileDialog && !isUploading}
      onClose={() => setOpenFileDialog(false)}
      TransitionComponent={Transition}
      keepMounted
      disableRestoreFocus
    >
      <DialogTitle>Загрузить данные из файла?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenFileDialog(false)}>Отмена</Button>
        <Button onClick={handleConfirmUpload} disabled={isUploading}>Да</Button>
      </DialogActions>
    </Dialog>
  );


  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            allColumns: !exportHeaders,
            fields: exportHeaders,
            fileName: exportFileName || 'output',
            delimiter: ';',
            utf8WithBom: true,
            disableToolbarButton: isLoading,
            gridFilteredSortedRowIdsSelector: true,
          }}
          printOptions={{ disableToolbarButton: true }}
          //showQuickFilter={true}
          //quickFilterProps={{ debounceMs: 250 }}
        />
        <Button component="label" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Загрузить новые записи Excel
          <VisuallyHiddenInput accept=".xlsx" type="file" onChange={(e) => handleFileSelection(e, 'new')} />
        </Button>
        <Button component="label" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Загрузить изменения Excel
          <VisuallyHiddenInput accept=".xlsx" type="file" onChange={(e) => handleFileSelection(e, 'exists')} />
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      {renderConfirmDialog()}
      <AlertDialog />
      <StyledDataGrid
        rows={initialRows}
        columns={initialColumns}
        initialState={{
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
          },
        }}
        density={tableDensityMode}
        onStateChange={v => v.density && tableDensityMode !== v.density.value && saveTableDensityMode(v.density.value)}
        autoHeight
        onPaginationModelChange={saveTablePageData}
        onFilterModelChange={saveTableFilterData}
        onSortModelChange={saveTableSortData}
        onColumnVisibilityModelChange={saveTableVisibilityData}
        apiRef={apiRef}
        rowHeight={rowHeight}
        hideFooterSelectedRowCount={hideFooterSelectedRowCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection={checkboxSelection}
        getRowClassName={params => {
          let classes = params.indexRelativeToCurrentPage % 2 === 0 ? 'super-app-theme' : 'super-app-theme-even';
          classes +=
            prefixForRowBlockedStyle && params.id.toString().startsWith(prefixForRowBlockedStyle)
              ? ' super-app-theme-blocked'
              : '';

          return classes;
        }}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          pagination: {
            labelRowsPerPage: 'Строк на странице',
          },
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            padding: 0,
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.dark',
            cursor: 'pointer',
          },
          '& .super-app-theme--header': {
            color: 'primary.darker',
            backgroundColor: 'primary.lighter',
          },
        }}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        disableColumnSelector={disableColumnSelector}
        className={classes.grid}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        editMode={editMode}
        processRowUpdate={processRowUpdate}
        isCellEditable={(params) => {
          if (prefixForRowBlockedStyle === undefined) {
            return true;
          }

          return !params.id.toString().startsWith(prefixForRowBlockedStyle);
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
