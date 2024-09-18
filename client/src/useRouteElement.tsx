import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ])
  return routeElement
}
