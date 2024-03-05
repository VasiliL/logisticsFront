import React, { FC, useState } from 'react';
import { DateRange } from 'mui-daterange-picker';
import Button from '@mui/material/Button';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';

interface IPlaceTableFilterProps {
  startDate?: Date;
  endDate?: Date;
  onReloadBtnClick: () => void;
  onDateChanged: (range: DateRange) => void;
  onFileUpload?: (file: File) => void;
}

export const PlaceTableFilter: FC<IPlaceTableFilterProps> = (props: IPlaceTableFilterProps) => {
  const { startDate, endDate, onReloadBtnClick, onDateChanged } = props;
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const onEventBtnClick = () => {
    setBtnDisabled(true);
    onReloadBtnClick();
  };

  const onChange = (range: DateRange) => {
    onDateChanged(range);
    setBtnDisabled(false);
  };


  return (
    <RangeDatePicker onDateChanged={onChange} startDate={startDate} endDate={endDate}>
      <Button variant="outlined" onClick={onEventBtnClick} disabled={btnDisabled}>
        Перестроить таблицу
      </Button>
    </RangeDatePicker>
  );
};
