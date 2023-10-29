 /* eslint-disable */ 
import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomePage = lazy(() => import('src/components/Home/homePage')); 
  
export default function Router() {
  const isAuthenticated=false
  return (
    <Routes>
      <Route
        path="/"
        element={
          // Use a condition to decide what to render
          // For example, you can check if the user is authenticated
          // and render the DashboardLayout or HomePage accordingly
          // Replace 'isAuthenticated' with your actual condition
          isAuthenticated ? (
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ) : (
            <HomePage />
          )
        }
      />
      <Route path="user" element={<UserPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}









// import { lazy, Suspense } from 'react';
// import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import DashboardLayout from 'src/layouts/dashboard';

// export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found')); 
// export const HomePage = lazy(() => import('src/components/Home/homePage')); 

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       element: (
//         <DashboardLayout>
//           <Suspense>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       path: '404',
//       element: <Page404 />,
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }
