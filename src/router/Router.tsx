import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from '@src/pages/Home';
import { NotFoundPage } from '@src/pages/NotFoundPage';
import { PlaceListPage } from '@src/pages/PlaceListPage';
import { RunListPage } from '@src/pages/RunListPage';
import { DocumentListPage } from '@src/pages/DocumentListPage';

export const Router = () => (
  <Routes>
    <Route path={''} element={<Outlet />}>
      <Route index element={<Home />} />
      {/*<Route path={'places'} element={<PlaceListPage />} />*/}
      <Route path={'runs'} element={<RunListPage />} />
      <Route path={'documents'} element={<DocumentListPage />} />
    </Route>
    <Route path={'404'} element={<NotFoundPage />} />
    <Route path={'*'} element={<Navigate to="/404" replace />} />
  </Routes>
);
