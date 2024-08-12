import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from '@src/pages/Home';
import { NotFoundPage } from '@src/pages/NotFoundPage';
import { CreateRunsTablePage } from '@src/pages/CreateRunsTablePage';
import { EditRunsTablePage } from '@src/pages/EditRunsTablePage';
import UnauthenticatedLayout from '@src/layouts/unauth/UnauthenticatedLayout';
import AuthenticatedLayout from '@src/layouts/auth/AuthenticatedLayout';
import { Login } from '@src/pages/Login';
import ProtectedRoute from '@src/layouts/auth/ProtectedRoute';
import { TransportDataTablePage } from '@src/pages/TransportDataTablePage';
import { UserEventLogPage } from '@src/pages/UserEventLogPage';
import { ClientDocumentsTablePage } from '@src/pages/ClientDocumentsTablePage';

export const Router = () => (
  <Routes>
    <Route element={<UnauthenticatedLayout />}>
      <Route path={'un-auth'} element={<Outlet />}>
        <Route path={'login'} element={<Login />} />
      </Route>
    </Route>

    <Route
      path={''}
      element={
        <ProtectedRoute>
          <AuthenticatedLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Home />} />
      <Route path={'create_runs'} element={<CreateRunsTablePage />} />
      <Route path={'edit_runs'} element={<EditRunsTablePage />} />
      <Route path={'transport_data'} element={<TransportDataTablePage />} />
      <Route path={'client_documents'} element={<ClientDocumentsTablePage />} />
      <Route path={'user_event_log'} element={<UserEventLogPage />} />
    </Route>

    <Route path={'404'} element={<NotFoundPage />} />
    <Route path={'*'} element={<Navigate to="/404" replace />} />
  </Routes>
);
