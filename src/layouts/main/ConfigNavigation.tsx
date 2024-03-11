import React from 'react';
import TableViewIcon from '@mui/icons-material/TableView';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const icon = (name: string) => {
  if (name === 'table') {
    return <TableViewIcon />;
  } else if (name === 'home') {
    return <HomeIcon />;
  }

  return <PersonIcon />;
};

export const ConfigNavigation = [
  {
    title: 'Главная страница',
    path: '',
    icon: icon('home'),
  },
  {
    title: 'Расстановка водителей на машины',
    path: '/places',
    icon: icon('table'),
  },
  {
    title: 'Расстановка машин на маршруты',
    path: '/runs',
    icon: icon('table'),
  },
  {
    title: 'Внесение информации о выставлении рейса заказчику',
    path: '/documents',
    icon: icon('table'),
  },
  {
    title: 'Metabase',
    url: '/metabase',
    icon: icon('table'),
    external: true,
  },
];
