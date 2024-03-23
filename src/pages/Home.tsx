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
        {/*<Link to={'places'} key={'places'}>*/}
        {/*  <p>Расстановка водителей на машины</p>*/}
        {/*</Link>*/}
        <Link to={'runs'} key={'runs'}>
          <p>Расстановка машин на маршруты</p>
        </Link>
        <Link to={'documents'} key={'documents'}>
          <p>Внесение информации о выставлении рейса заказчику</p>
        </Link>
      </ListItemText>
    </Container>
  );
};
