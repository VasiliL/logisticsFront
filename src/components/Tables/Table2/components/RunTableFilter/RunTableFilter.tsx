import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SingleDatePicker } from '@src/components/SingleDatePicker/SingleDatePicker';
import { AlertDialog } from '@src/components/AlertDialog/AlertDialog';

interface IRunTableFilterProps {
  date?: Date | string;
  label: string;
  onReloadBtnClick: () => void;
  onDeleteBtnClick: () => void;
  deleteBtnDisabled?: boolean;
  onDateChanged: (date: Date) => void;
}

export const RunTableFilter: FC<IRunTableFilterProps> = (props: IRunTableFilterProps) => {
  const { date, label, onDateChanged, onReloadBtnClick, onDeleteBtnClick, deleteBtnDisabled } = props;
  const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true);

  const onEventBtnClick = () => {
    setBtnDisabled(true);
    onReloadBtnClick();
  };

  const onChange = (date: Date) => {
    onDateChanged(date);
    setBtnDisabled(false);
  };

  return (
    <Box style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
      <SingleDatePicker label={label} date={date} onDateChanged={onChange} />
      <Button
        variant="outlined"
        onClick={onEventBtnClick}
        disabled={btnDisabled}
        style={{ marginLeft: 10, height: 38 }}
      >
        Перестроить таблицу
      </Button>
      <AlertDialog
        btnTitle={'Удалить запись'}
        title={'Удаление записи'}
        content={'Вы уверены, что хотите удалить данную запись?'}
        handleApply={onDeleteBtnClick}
        disabled={deleteBtnDisabled}
        style={{ marginLeft: 10, height: 38 }}
      />
    </Box>
  );
};
