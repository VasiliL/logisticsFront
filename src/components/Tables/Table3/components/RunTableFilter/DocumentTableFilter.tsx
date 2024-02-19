import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';
import { DateRange } from 'mui-daterange-picker';

interface IDocumentTableFilterProps {
  startDate?: Date;
  endDate?: Date;
  onReloadBtnClick: () => void;
  onDateChanged: (range: DateRange) => void;
  initialMode: boolean;
  handleChangeMode: (mode: boolean) => void;
}

export const DocumentTableFilter: FC<IDocumentTableFilterProps> = (props: IDocumentTableFilterProps) => {
  const { startDate, endDate, onDateChanged, onReloadBtnClick, initialMode, handleChangeMode } = props;
  const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true);
  const [mode, setMode] = React.useState<boolean>(initialMode);

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

  return (
    <RangeDatePicker onDateChanged={onChange} startDate={startDate} endDate={endDate}>
      <Button variant="outlined" onClick={onEventBtnClick} disabled={btnDisabled}>
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
    </RangeDatePicker>
  );
};
