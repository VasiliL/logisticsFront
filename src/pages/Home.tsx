import React, { FC } from 'react';
import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Home: FC = () => {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Главная страница</Typography>
      </Stack>
      <ListItemText>
        <Link to={'create_runs'} key={'create_runs'}>
          <Typography>Расстановка машин на маршруты</Typography>
        </Link>
        <Link to={'edit_runs'} key={'edit_runs'}>
          <Typography>Внесение информации о выставлении рейса заказчику</Typography>
        </Link>
        <Link to={'transport_data'} key={'transport_data'}>
          <Typography>Внесение транспортных данных</Typography>
        </Link>
        <Link to={'client_documents'} key={'client_documents'}>
          <Typography>Выставление документов заказчику</Typography>
        </Link>
        <Link to={'user_event_log'} key={'user_event_log'}>
          <Typography>Журнал событий</Typography>
        </Link>
      </ListItemText>
    </Container>
  );
};
