import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { SimpleBalanceListTable } from '@src/components/Tables/SimpleBalanceListTable/SimpleBalanceListTable';

export interface IAlertTableDialogContent {
  title: string;
}

interface IAlertTableDialogProps extends IAlertTableDialogContent {
  handleCancel: () => void;
  isOpen: boolean;
}

export const AlertTableDialog: FC<IAlertTableDialogProps> = (props: IAlertTableDialogProps) => {
  const { title, handleCancel, isOpen } = props;

  const handleClose = () => {
    handleCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableRestoreFocus={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <SimpleBalanceListTable />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ОТМЕНА</Button>
      </DialogActions>
    </Dialog>
  );
};
