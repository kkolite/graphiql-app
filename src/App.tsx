import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Error, Auth, Home, IDE } from './pages'
import { Layout } from './components'
import { EPages } from './data/types'
import './styles/App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
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
      ],
    },
    {
      path: '/*',
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
