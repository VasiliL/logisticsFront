import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';
import { DateRange } from 'mui-daterange-picker';
import { AlertDialog } from '@src/components/AlertDialog/AlertDialog';

interface IDocumentTableFilterProps {
  startDate?: Date;
  endDate?: Date;
  onReloadBtnClick: () => void;
  onCopyBtnClick: () => void;
  handleApplyDelete: () => void;
  onDateChanged: (range: DateRange) => void;
  initialMode: boolean;
  disableDeleteDialog: boolean;
  copyRowBtnDisabled: boolean;
  handleChangeMode: (mode: boolean) => void;
}

export const DocumentTableFilter: FC<IDocumentTableFilterProps> = (props: IDocumentTableFilterProps) => {
  const {
    startDate,
    endDate,
    disableDeleteDialog,
    handleApplyDelete,
    onDateChanged,
    onReloadBtnClick,
    initialMode,
    handleChangeMode,
    copyRowBtnDisabled,
    onCopyBtnClick,
  } = props;
  const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true);
  const [mode, setMode] = React.useState<boolean>(initialMode);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Delete' && !disableDeleteDialog) {
        setOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disableDeleteDialog]);

  const onEventBtnClick = () => {
    setBtnDisabled(true);
    onReloadBtnClick();
  };

  const onChange = (range: DateRange) => {
    onDateChanged(range);
    setBtnDisabled(false);
  };

  const onChangeMode = () => {
    handleChangeMode(!mode);
    setMode(!mode);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
    handleApplyDelete();
  };

  return (
    <RangeDatePicker onDateChanged={onChange} startDate={startDate} endDate={endDate}>
      <Button variant="outlined" onClick={onEventBtnClick} disabled={btnDisabled}>
        Перестроить таблицу
      </Button>
      <Button variant="outlined" onClick={onCopyBtnClick} disabled={copyRowBtnDisabled}>
        Дублировать строку
      </Button>
      <ToggleButtonGroup
        color="primary"
        value={mode ? 'full' : 'short'}
        exclusive
        size="small"
        onChange={onChangeMode}
        aria-label="Platform"
        style={{ marginLeft: 10 }}
      >
        <ToggleButton value="full">Расширенная</ToggleButton>
        <ToggleButton value="short">Краткая</ToggleButton>
      </ToggleButtonGroup>
      <AlertDialog
        title={'Удаление записи'}
        content={'Вы уверены, что хотите удалить данную запись?'}
        handleApply={handleOk}
        isOpen={open}
        handleCancel={handleClose}
      />
    </RangeDatePicker>
  );
};
