import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SingleDatePicker } from '@src/components/SingleDatePicker/SingleDatePicker';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';

interface IDocumentTableFilterProps {
  date?: Date | string;
  label: string;
  onReloadBtnClick: () => void;
  onDateChanged: (date: Date) => void;
  initialMode: boolean;
  handleChangeMode: (mode: boolean) => void;
}

export const DocumentTableFilter: FC<IDocumentTableFilterProps> = (props: IDocumentTableFilterProps) => {
  const { date, label, onDateChanged, onReloadBtnClick, initialMode, handleChangeMode } = props;
  const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true);
  const [mode, setMode] = React.useState<boolean>(initialMode);

  const onEventBtnClick = () => {
    setBtnDisabled(true);
    onReloadBtnClick();
  };

  const onChange = (date: Date) => {
    onDateChanged(date);
    setBtnDisabled(false);
  };

  const onChangeMode = () => {
    handleChangeMode(!mode);
    setMode(!mode);
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
    </Box>
  );
};
