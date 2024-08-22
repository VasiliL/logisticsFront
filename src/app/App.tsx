import React, { useCallback, useEffect, useRef } from 'react';

import { Wrapper } from '@src/components/Wrapper/Wrapper';
import { Router } from '@src/router/Router';
import { LicenseInfo } from '@mui/x-license';
import AuthStore from '@src/store/AuthStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_URL = 'ws://testing.rwtarif.com:8000/api/v2/ws';

export default function App() {
  LicenseInfo.setLicenseKey(process.env.MUI_X_PREMIUM_LICENSE_KEY ?? '');
  const { refresh } = AuthStore;

  const intervalRef = useRef();
  const getToken = useCallback(() => {
    // Get new token if and only if existing token is available
    console.log('Обновление токена');
    if (localStorage.getItem('token') != null) {
      void refresh();
    }
  }, [refresh]);
  //
  // const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
  //   protocols: [localStorage.getItem('token') || ''],
  //   onOpen: () => {
  //     console.log('WebSocket connection established.');
  //   },
  //   share: true,
  //   filter: () => false,
  //   retryOnError: true,
  //   shouldReconnect: () => true,
  // });

  // Trigger API to get a new token before token gets expired.
  useEffect(() => {
    // 5 minutes interval as our token will expire after 15 minutes.
    const interval = setInterval(() => getToken(), 1000 * 60 * 5);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [getToken]);

  return (
    <Wrapper>
      <Router />
      <ToastContainer />
    </Wrapper>
  );
}
