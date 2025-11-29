import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
], {
  basename: process.env.NODE_ENV === 'production' ? '/insignificant-elements' : '/'
});

export default function Router() {
  return <RouterProvider router={router} />;
}