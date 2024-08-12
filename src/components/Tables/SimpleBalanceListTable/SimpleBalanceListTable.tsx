import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { DataTableGrid } from '@src/components/DataTable/DataTableGrid';
import { GridColDef } from '@mui/x-data-grid-premium';
import { ClientDocumentsTableStore } from '@src/components/Tables/ClientDocumentsTable/store/ClientDocumentsTableStore';

export const SimpleBalanceListTable: FC = observer(() => {
  const { getCounterpartyById, cargoDocumentsList } = ClientDocumentsTableStore;

  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        field: 'client',
        headerName: 'Поставщик',
        description: 'Поставщик',
        flex: 4,
        minWidth: 200,
        type: 'string',
        align: 'center',
        editable: false,
        resizable: false,
        groupable: false,
        pinnable: false,
        hideable: false,
        filterable: false,
        sortable: true,
        disableColumnMenu: true,
      },
      {
        field: 'weight',
        headerName: 'Вес',
        description: 'Вес',
        flex: 4,
        minWidth: 100,
        type: 'number',
        align: 'center',
        editable: false,
        resizable: false,
        groupable: false,
        pinnable: false,
        hideable: false,
        filterable: false,
        sortable: true,
        disableColumnMenu: true,
      },
    ];
  }, []);

  const rows = useMemo(() => {
    return cargoDocumentsList?.map(item => ({
      id: item.item_id,
      client: getCounterpartyById(item.counterparty_id),
      weight: item.quantity,
    })) || [];
  }, [cargoDocumentsList, getCounterpartyById]);

  return <DataTableGrid isSimpleTable columns={columns} rows={rows} />;
});
