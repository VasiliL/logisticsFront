import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import ContentPasteOutlined from '@mui/icons-material/ContentPasteOutlined';
import AppRegistration from '@mui/icons-material/AppRegistration';

export const ConfigNavigation = (role: string) => {
  return role === 'Admin' ? [...userPages, ...adminPages] : userPages;
};

const adminPages = [
  {
    title: 'Журнал событий',
    path: '/user_event_log',
    icon: <AppRegistration />,
  },
];

const userPages = [
  {
    title: 'Логисты',
    icon: <GroupIcon />,
    children: [
      {
        title: 'Расстановка машин на маршруты',
        path: '/create_runs',
      },
      {
        title: 'Внесение информации о выставлении рейса заказчику',
        path: '/edit_runs',
      },
    ],
  },
  {
    title: 'Расчетный отдел',
    icon: <ContentPasteOutlined />,
    children: [
      {
        title: 'Внесение транспортных данных',
        path: '/transport_data',
      },
      {
        title: 'Выставление документов заказчику',
        path: '/client_documents',
      },
    ],
  },
];
