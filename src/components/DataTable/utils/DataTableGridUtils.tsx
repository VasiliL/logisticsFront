import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import {
  DEFAULT_GRID_AUTOSIZE_OPTIONS,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridCellCheckboxRenderer,
  GridColDef,
  GridColumnHeaderParams,
  gridFilteredSortedRowIdsSelector,
  GridHeaderCheckbox,
  GridRenderCellParams,
  GridRowModel,
  selectedIdsLookupSelector,
} from '@mui/x-data-grid-premium';
import React, { MutableRefObject } from 'react';
import { GridRenderCellParamsPremium } from '@mui/x-data-grid-premium/typeOverloads';

export const autosizeOptions = {
  includeHeaders: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeHeaders,
  includeOutliers: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeOutliers,
  outliersFactor: DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor,
};

export const checkIsTheSameRow = (newRow: GridRowModel, oldRow: GridRowModel) => {
  const obj1Keys = Object.keys(newRow);
  const obj2Keys = Object.keys(oldRow);

  return obj1Keys.length === obj2Keys.length && obj1Keys.every(key => newRow[key] === oldRow[key]);
};

export const checkboxColumn = (apiRef: MutableRefObject<GridApiPremium>): GridColDef => {
  return {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderHeader: (params) => {
      const children = gridFilteredSortedRowIdsSelector(
        apiRef.current.state,
        apiRef.current.instanceId,
      ).filter((id) => !id.toString().includes('auto-generated'));

      const selectionLookup = selectedIdsLookupSelector(
        apiRef.current.state,
        apiRef.current.instanceId,
      );

      const indeterminate =
        children?.some((child) => selectionLookup[child] === undefined) &&
        children?.some((child) => selectionLookup[child] !== undefined);

      const checked = children?.every(
        (child) => selectionLookup[child] !== undefined,
      );
      const data: GridColumnHeaderParams & {
        indeterminate?: boolean;
        checked?: boolean;
        disabled?: boolean;
        onClick?: (e: MouseEvent) => void;
      } = {
        ...params,
        onClick: (e) => {
          apiRef.current.selectRows(children, indeterminate || !checked);
          e.preventDefault();
        },
        indeterminate,
        checked,
      };

      return <GridHeaderCheckbox {...data} />;
    },
    renderCell: (params) => {
      const { rowNode } = params;

      if (rowNode.type !== 'group') {
        return <GridCellCheckboxRenderer {...params} />;
      }

      const selectionLookup = selectedIdsLookupSelector(
        apiRef.current.state,
        apiRef.current.instanceId,
      );
      const children = apiRef.current.getRowGroupChildren({
        groupId: rowNode.id,
        applyFiltering: true,
        applySorting: true,
      });

      const indeterminate =
        children?.some((child) => selectionLookup[child] === undefined) &&
        children?.some((child) => selectionLookup[child] !== undefined);

      const checked = children?.every(
        (child) => selectionLookup[child] !== undefined,
      );

      const extraData: GridRenderCellParams &
        GridRenderCellParamsPremium & {
        indeterminate?: boolean;
        checked?: boolean;
        disabled?: boolean;
        onClick?: (e: MouseEvent) => void;
      } = {
        ...params,
        disabled: false,
        onClick: (e) => {
          if (rowNode.groupingField != null) {
            if (children) {
              apiRef.current.selectRows(children, indeterminate || !checked);
            }
            e.preventDefault();
          }
        },
        indeterminate,
        checked,
      };

      return <GridCellCheckboxRenderer {...extraData} />;
    },
  };
};
