import * as React from 'react';
import { Home } from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [],
    errorElement: null,
  },
]);

export class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}
