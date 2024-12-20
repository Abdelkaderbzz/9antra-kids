/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@src/components/Loader/Loader'
import { Suspense, Fragment } from 'react'
import { Routes, Route, RouteProps } from 'react-router-dom'

import pages from './routes'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

export const renderRoutes = (routes: RouteConfig[] = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component
        const Guard = route?.guard || Fragment
        const Layout = route?.layout || Fragment

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        )
      })}
    </Routes>
  </Suspense>
)

const routes: RouteConfig[] = [...pages]

export default routes
