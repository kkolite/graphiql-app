import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Error, Auth, Home, IDE } from './pages';
import { Layout } from './components';
import { EPages } from './data/types';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: EPages.LOGIN,
          element: <Auth />,
        },
        {
          path: EPages.IDE,
          element: <IDE />,
        },
        {
          path: 'error',
          element: <Error />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/error" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
