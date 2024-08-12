import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { FC } from 'react';

interface IDialogProps {
  title: string;
  content: string;
  handleApply: () => void;
  handleCancel: () => void;
  isOpen: boolean;
}

export const AlertDialog: FC<IDialogProps> = (props: IDialogProps) => {
  const { content, title, handleApply, handleCancel, isOpen } = props;

  const handleClose = () => {
    handleCancel();
  };

  const handleOk = () => {
    handleApply();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleOk} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
