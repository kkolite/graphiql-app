import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Error, Auth, Home, IDE } from './pages';
import { Layout } from './components';
import { EPages } from './data/types';
import { PrivateRoute } from './hoc/PrivateRoute';

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
          element: (
            <PrivateRoute forAnonim={true} redirect={EPages.IDE}>
              <Auth />
            </PrivateRoute>
          ),
        },
        {
          path: EPages.IDE,
          element: (
            <PrivateRoute forAnonim={false} redirect={EPages.LOGIN}>
              <IDE />
            </PrivateRoute>
          ),
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
