/* eslint-disable */
import React from 'react';
import { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const PortalPage = lazy(() => import('src/pages/portal'));
export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const PaymentDetail = lazy(() => import('src/pages/paymentDetail'));
export const UserPage = lazy(() => import('src/pages/user'));
export const EmployeePage = lazy(() => import('src/pages/employee'));
export const EmployeeUpdate = lazy(() => import('src/pages/employeeUpdate'));
export const SalaryCalculatorPage = lazy(() => import('src/pages/salaryCalculator'));
export const DepartmentPage = lazy(() => import('src/pages/department'));
export const EmployeeDetailPage = lazy(() => import('src/pages/employeeDetail'));
export const NewEmployeePage = lazy(() => import('src/pages/newEmployeeForm'));
export const IMSPage = lazy(() => import('src/pages/ims'));
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
        <Route path="salary" element={<SalaryCalculatorPage />} />
        <Route path="inventory" element={<IMSPage />} />
        <Route path="new-employee" element={<NewEmployeePage />} />
        
        <Route path="employee-detail/:id" element={<EmployeeDetailPage />} />
        <Route path="employee-update/:id" element={<EmployeeUpdate />} />
        <Route path="/department-view/:unit" element={<DepartmentPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="portal" element={<PortalPage />} />
      <Route path="inventory-records" element={<InventoryPage />} />
      <Route path="payroll/:id" element={<PaymentDetail />} />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

 