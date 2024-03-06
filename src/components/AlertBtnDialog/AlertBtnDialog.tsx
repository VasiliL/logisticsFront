import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { FC } from 'react';

interface IDialogProps {
  title: string;
  content: string;
  btnTitle: string;
  handleApply: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const AlertBtnDialog: FC<IDialogProps> = (props: IDialogProps) => {
  const { content, title, btnTitle, handleApply, disabled, style } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    handleClose();
    handleApply();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} disabled={disabled} style={style}>
        {btnTitle}
      </Button>
      <Dialog
        open={open}
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
    </>
  );
};
