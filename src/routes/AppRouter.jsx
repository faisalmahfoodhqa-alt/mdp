// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchPage from '../pages/SearchPage';
import Offers from '../pages/Offers';
import SellerWelcome from '../pages/SellerWelcome';
import SellerDashboard from '../pages/SellerDashboard';
import PlanPaymentPage from '../pages/PlanPaymentPage';
import SellerPlans from '../pages/SellerPlans';
import ForgotPassword from '../pages/ForgotPassword';
import AdminDashboard from '../pages/AdminDashboard';
import StorePage from '../pages/StorePage';
import CustomerDashboard from '../pages/CustomerDashboard';
import Departments from '../pages/Departments';
import Stores from '../pages/Stores';
import { 
  About, Privacy, Terms, FAQ, Contact, News, Affiliate, UserGuide, Disputes 
} from '../pages/static/StaticPages';
import NotFound from '../pages/NotFound';


// حماية عامة (يتطلب تسجيل الدخول)
const ProtectedRoute = ({ children, sellerOnly = false, adminOnly = false }) => {
  const { isAuthenticated, isSeller, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (sellerOnly && !isSeller) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProfileSelector = () => {
  const { isSeller } = useAuth();
  if (isSeller) return <Navigate to="/seller/dashboard" replace />;
  return <CustomerDashboard />;
};

import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import TrackOrder from '../pages/TrackOrder';
import OrderDetails from '../pages/OrderDetails';

const AppRouter = () => {
  return (
    <Routes>
      {/* صفحات العامة */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/news" element={<News />} />
      <Route path="/affiliate" element={<Affiliate />} />
      <Route path="/user-guide" element={<UserGuide />} />
      <Route path="/disputes" element={<Disputes />} />

      {/* تحويلات سريعة لروابط الفوتر */}
      <Route path="/register-seller" element={<Navigate to="/register?type=seller" replace />} />
      <Route path="/upgrade-store" element={<Navigate to="/seller/plans" replace />} />

      {/* صفحة متجر البائع العامة */}
      <Route path="/store/:storeUrl" element={<StorePage />} />

      {/* صفحات البائع */}
      <Route path="/seller/welcome" element={
        <ProtectedRoute sellerOnly>
          <SellerWelcome />
        </ProtectedRoute>
      } />

      <Route path="/seller/dashboard" element={
        <ProtectedRoute sellerOnly>
          <SellerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/seller/payment" element={
        <ProtectedRoute sellerOnly>
          <PlanPaymentPage />
        </ProtectedRoute>
      } />

      <Route path="/seller/plans" element={
        <ProtectedRoute sellerOnly>
          <SellerPlans />
        </ProtectedRoute>
      } />

      {/* لوحة تحكم الأدمن */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/wishlist" element={
        <ProtectedRoute>
          <CustomerDashboard defaultTab="wishlist" />
        </ProtectedRoute>
      } />

      <Route path="/orders" element={
        <ProtectedRoute>
          <CustomerDashboard defaultTab="orders" />
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <CustomerDashboard defaultTab="notifications" />
        </ProtectedRoute>
      } />

      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />

      <Route path="/track-order/:orderId" element={
        <ProtectedRoute>
          <TrackOrder />
        </ProtectedRoute>
      } />

      <Route path="/order-details/:orderId" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      } />

      {/* الملف الشخصي (توجيه ذكي بناءً على النوع) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfileSelector />
        </ProtectedRoute>
      } />

      {/* صفحة 404 - يجب أن تكون في نهاية الراوتس */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;