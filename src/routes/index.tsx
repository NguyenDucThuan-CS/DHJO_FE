import { TotalInfo, Login, Register } from '../pages'
import { PublicRouter } from './PublicRouter'
import { PrivateRouter } from './Private'
import { Route } from 'react-router-dom'
import { Fragment } from 'react'

interface IRoute {
  path: string
  element: JSX.Element
}

const routes: IRoute[] = [
  {
    path: '/',
    element: (
      <PrivateRouter>
        <TotalInfo />
      </PrivateRouter>
    )
  },
  {
    path: '/login',
    element: (
      <PublicRouter>
        <Login />
      </PublicRouter>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRouter>
        <Register />
      </PublicRouter>
    )
  }
]

export const AppRouter = () => {
  return (
    <Fragment>
      {routes.map((item: IRoute, index: number) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Fragment>
  )
}
