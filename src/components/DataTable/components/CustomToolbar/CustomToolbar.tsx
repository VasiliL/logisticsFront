import React from 'react';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Props = { exportHeaders; exportFileName; isLoading; toolbarCustomButtons };

export const CustomToolbar: React.FC<Props> = props => {
  const { exportHeaders, exportFileName, isLoading, toolbarCustomButtons } = props;

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          allColumns: !exportHeaders,
          fields: exportHeaders,
          fileName: exportFileName ?? 'output',
          delimiter: ';',
          utf8WithBom: true,
          disableToolbarButton: isLoading,
          gridFilteredSortedRowIdsSelector: true,
        }}
        printOptions={{ disableToolbarButton: true }}
      />
      {toolbarCustomButtons?.map(btn => (
        <Button key={`${btn.text}-${btn.disabled}`} onClick={btn.onClick} disabled={btn.disabled}>
          {!btn.hideIcon && <AddIcon sx={{ marginLeft: '-5px', marginRight: '5px' }} />}
          {btn.text}
        </Button>
      ))}
    </GridToolbarContainer>
  );
};
