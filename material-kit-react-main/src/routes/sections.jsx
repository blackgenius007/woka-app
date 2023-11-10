 /* eslint-disable */ 
import React from 'react';
import { lazy, Suspense } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const EmployeePage = lazy(() => import('src/pages/employee'));
export const EmployeeDetailPage = lazy(() => import('src/pages/employeeDetail'));
export const NewEmployeePage = lazy(() => import('src/pages/newEmployeeForm'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomePage = lazy(() => import('src/components/Home/homePage'));
 
  
export default function Router() {
  const { isSuccess } = useSelector((state) => state.auth);
  console.log(isSuccess && 'user authenticated');

  return (
    <Routes>
      <Route
        path="/"
        element={
          isSuccess ? (
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ) : (
            <HomePage />
          )
        }
      >
        <Route index element={<IndexPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="employee" element={<EmployeePage />} />
        <Route path="new-employee" element={<NewEmployeePage />} />
        <Route path="employee-detail/:id" element={< EmployeeDetailPage />} />
      </Route>
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
