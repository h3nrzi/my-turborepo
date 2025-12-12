import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from 'presentation/components/layout/AdminLayout';
import AppLayout from 'presentation/components/layout/AppLayout';
import PrivateLayout from 'presentation/components/layout/PrivateLayout';
import CartPage from 'presentation/pages/CartPage';
import HomePage from 'presentation/pages/HomePage';
import LoginPage from 'presentation/pages/LoginPage';
import OrderPage from 'presentation/pages/OrderPage';
import PaymentPage from 'presentation/pages/PaymentPage';
import PlaceOrderPage from 'presentation/pages/PlaceOrderPage';
import ProductPage from 'presentation/pages/ProductPage';
import ProfilePage from 'presentation/pages/ProfilePage';
import RegisterPage from 'presentation/pages/RegisterPage';
import ShippingPage from 'presentation/pages/ShippingPage';
import OrderListPage from 'presentation/pages/admin/OrderListPage';
import ProductEditPage from 'presentation/pages/admin/ProductEditPage';
import ProductListPage from 'presentation/pages/admin/ProductListPage';
import ProductNewPage from 'presentation/pages/admin/ProductNewPage';
import UserEditPage from 'presentation/pages/admin/UserEditPage';
import UserListPage from 'presentation/pages/admin/UserListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: '',
        element: <PrivateLayout />,
        children: [
          { path: 'shipping', element: <ShippingPage /> },
          { path: 'payment', element: <PaymentPage /> },
          { path: 'placeorder', element: <PlaceOrderPage /> },
          { path: 'order/:id', element: <OrderPage /> },
          { path: '/profile', element: <ProfilePage /> },
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { path: 'order-list', element: <OrderListPage /> },
              { path: 'product-list', element: <ProductListPage /> },
              { path: 'product/new', element: <ProductNewPage /> },
              { path: 'product/:id/edit', element: <ProductEditPage /> },
              { path: 'user-list', element: <UserListPage /> },
              { path: 'user/:id/edit', element: <UserEditPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
