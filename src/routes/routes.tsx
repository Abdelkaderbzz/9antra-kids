/* eslint-disable react-refresh/only-export-components */
import { Fragment, lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const GuestLayout = lazy(() => import('../layout/GuestLayout/GuestLayout'))
const MainLayout = lazy(() => import('../layout/MainLayout/MainLayout'))
import GuestGuard from './guards/GuestGuard'
import AuthGuard from './guards/AuthGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    path: '/',
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('@src/pages/Login')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('@src/pages/Register')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forget-password',
    component: lazy(() => import('@src/features/ForgetPassword/ForgetPassword')),
    layout: GuestLayout,
  },

  {
    exact: true,
    guard: GuestGuard,
    path: '/reset-password',
    component: lazy(
      () => import('@src/features/ForgetPassword/components/ResetPassword/ResetPassword'),
    ),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/reset-wait',
    component: lazy(() => import('@src/features/ForgetPassword/components/ResetWait/ResetWait')),
    layout: GuestLayout,
  },
  {
    exact: true,
    // guard: AuthGuard,
    path: '/courses',
    component: lazy(() => import('@src/pages/Courses')),
    layout: MainLayout,
  },
  {
    exact: true,
    // guard: AuthGuard,
    path: '/map',
    component: lazy(() => import('@src/pages/Map')),
    layout: MainLayout,
  },
  {
    exact: true,
    // guard: AuthGuard,
    path: '/leagues',
    component: lazy(() => import('@src/pages/Leagues')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/clients',
    component: lazy(() => import('@src/pages/Clients')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/products',
    component: lazy(() => import('@src/pages/Products')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/products/:id/create',
    component: lazy(() => import('@src/features/Products/create/ProductsCreate')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/products/:id/update',
    component: lazy(() => import('@src/features/Products/create/ProductsCreate')),
    layout: MainLayout,
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/profile',
    component: lazy(() => import('@src/pages/Profile')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/settings',
    component: lazy(() => import('@src/pages/Settings')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/reports',
    component: lazy(() => import('@src/pages/Reports')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/list_reports',
    component: lazy(() => import('@src/pages/ListReports')),
    layout: MainLayout,
  },
  // Public Routes
  {
    exact: true,
    path: '*',
    component: lazy(() => import('@src/pages/NotFound')),
  },
]

export default routes
