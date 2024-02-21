import React, { FC, useState } from 'react';
import { DateRange } from 'mui-daterange-picker';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { RangeDatePicker } from '@src/components/RangeDatePicker/RangeDatePicker';

interface IPlaceTableFilterProps {
  startDate?: Date;
  endDate?: Date;
  onReloadBtnClick: () => void;
  onDateChanged: (range: DateRange) => void;
  onFileUpload?: (file: File) => void;
}

export const PlaceTableFilter: FC<IPlaceTableFilterProps> = (props: IPlaceTableFilterProps) => {
  const { startDate, endDate, onReloadBtnClick, onDateChanged, onFileUpload } = props;
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const onEventBtnClick = () => {
    setBtnDisabled(true);
    onReloadBtnClick();
  };

  const onChange = (range: DateRange) => {
    onDateChanged(range);
    setBtnDisabled(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file); // Call the provided onFileUpload function with the selected file
    }
  };


  return (
    <RangeDatePicker onDateChanged={onChange} startDate={startDate} endDate={endDate}>
      <Button variant="outlined" onClick={onEventBtnClick} disabled={btnDisabled}>
        Перестроить таблицу
      </Button>
      {/* File Upload Button */}
      <label htmlFor="file-upload">
        <input
          accept="*/xlsx"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Загрузить Excel
        </Button>
      </label>
    </RangeDatePicker>
  );
};
