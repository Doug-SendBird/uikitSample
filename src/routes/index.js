import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Page1 } from '../pages/Page1';
import { Page2 } from '../pages/Page2';
import { Page3 } from '../pages/Page3';
import SendbirdProvider from '../providers/SendbirdProvider';

export const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/page1',
      element: (
        <SendbirdProvider>
          <Page1 />
        </SendbirdProvider>
      ),
    },
    {
      path: '/page2',
      element: (
        <SendbirdProvider>
          <Page2 />
        </SendbirdProvider>
      ),
    },
    {
      path: '/page3',
      element: (
        <SendbirdProvider>
          <Page3 />
        </SendbirdProvider>
      ),
    },
  ]);
