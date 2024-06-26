/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PromoImport } from './routes/promo'
import { Route as OrderImport } from './routes/order'
import { Route as IndexImport } from './routes/index'
import { Route as CategoryIndexImport } from './routes/category/index'
import { Route as CategoryCategoryidImport } from './routes/category/$categoryid'

// Create/Update Routes

const PromoRoute = PromoImport.update({
  path: '/promo',
  getParentRoute: () => rootRoute,
} as any)

const OrderRoute = OrderImport.update({
  path: '/order',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CategoryIndexRoute = CategoryIndexImport.update({
  path: '/category/',
  getParentRoute: () => rootRoute,
} as any)

const CategoryCategoryidRoute = CategoryCategoryidImport.update({
  path: '/category/$categoryid',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/order': {
      preLoaderRoute: typeof OrderImport
      parentRoute: typeof rootRoute
    }
    '/promo': {
      preLoaderRoute: typeof PromoImport
      parentRoute: typeof rootRoute
    }
    '/category/$categoryid': {
      preLoaderRoute: typeof CategoryCategoryidImport
      parentRoute: typeof rootRoute
    }
    '/category/': {
      preLoaderRoute: typeof CategoryIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  OrderRoute,
  PromoRoute,
  CategoryCategoryidRoute,
  CategoryIndexRoute,
])

/* prettier-ignore-end */
