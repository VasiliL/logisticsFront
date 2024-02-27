import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  // Process the file here (e.g., uploading to a server or reading the file data)
};

export default function InputFileUpload() {
  return (
    <Stack direction="row" alignItems="center" mb={5} spacing={1}>
      <Box style={{ marginBottom: 10 }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Загрузить новые записи
          <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
        </Button>
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Загрузить изменения
          <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
        </Button>
      </Box>
    </Stack>
  );
}