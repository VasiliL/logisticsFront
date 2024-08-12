import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { FC, useState } from 'react';

export interface IAlertInputDialogContent {
  title: string;
  content: string;
  label: string;
  handleApply: (value: string) => void;
}

interface IAlertInputDialogProps extends IAlertInputDialogContent {
  handleCancel: () => void;
  isOpen: boolean;
  disabled?: boolean;
}

export const AlertInputDialog: FC<IAlertInputDialogProps> = (props: IAlertInputDialogProps) => {
  const { content, title, label, handleApply, handleCancel, isOpen, disabled } = props;
  const [value, setValue] = useState<string>('');

  const handleClose = () => {
    handleCancel();
  };

  const handleOk = () => {
    if (value !== undefined) {
      handleCancel();
      handleApply(value);
    }
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
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        <TextField
          autoFocus
          required
          value={value}
          onChange={e => setValue(e.target.value)}
          margin="dense"
          id="name"
          name={label}
          label={label}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ОТМЕНА</Button>
        <Button onClick={handleOk} disabled={disabled}>ДОБАВИТЬ</Button>
      </DialogActions>
    </Dialog>
  );
};
