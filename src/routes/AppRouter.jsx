// src/routes/AppRouter.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// مؤشر تحميل بسيط وجميل
const PageLoader = () => (
  <div style={{ 
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    height: '60vh', flexDirection: 'column', gap: '15px' 
  }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div style={{ color: '#666', fontSize: '0.9rem' }}>جاري التحميل...</div>
  </div>
);

// استيراد الصفحات بشكل متأخر (Lazy Loading) لتقليل حجم الملف الأولي
import Home from '../pages/Home'; // الصفحة الرئيسية يتم استيرادها مباشرة لسرعة التشغيل
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Offers = lazy(() => import('../pages/Offers'));
const FeaturedProductsPage = lazy(() => import('../pages/FeaturedProductsPage'));

const SellerWelcome = lazy(() => import('../pages/SellerWelcome'));
const SellerDashboard = lazy(() => import('../pages/SellerDashboard'));
const PlanPaymentPage = lazy(() => import('../pages/PlanPaymentPage'));
const SellerPlans = lazy(() => import('../pages/SellerPlans'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const StorePage = lazy(() => import('../pages/StorePage'));
const CustomerDashboard = lazy(() => import('../pages/CustomerDashboard'));
const Departments = lazy(() => import('../pages/Departments'));
const Stores = lazy(() => import('../pages/Stores'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const TrackOrder = lazy(() => import('../pages/TrackOrder'));
const OrderDetails = lazy(() => import('../pages/OrderDetails'));
const NotFound = lazy(() => import('../pages/NotFound'));

// الصفحات الثابتة
const About = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.About })));
const Privacy = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.Terms })));
const FAQ = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.Contact })));
const News = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.News })));
const Affiliate = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.Affiliate })));
const UserGuide = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.UserGuide })));
const Disputes = lazy(() => import('../pages/static/StaticPages').then(module => ({ default: module.Disputes })));

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

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* صفحات العامة */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/featured-products" element={<FeaturedProductsPage />} />
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
    </Suspense>
  );
};

export default AppRouter;