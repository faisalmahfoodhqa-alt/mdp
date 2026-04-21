// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import AppRouter from './routes/AppRouter';

const AnimatedWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      style={{ flex: 1, animation: 'simpleFadeIn 0.25s ease' }}
    >
      <AppRouter />
    </div>
  );
};

import { CartProvider } from './context/CartContext';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

// مكون منفصل للوصول لـ useLocation
const AppContent = () => {
  const location = useLocation();
  const [toast, setToast] = React.useState(null);

  // وظيفة عالمية لإظهار الإشعارات بدلاً من alert
  useEffect(() => {
    window.showToast = (message, type = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4000);
    };
  }, []);

  const hideLayout = 
    location.pathname.startsWith('/seller/') || 
    location.pathname.startsWith('/admin/') ||
    location.pathname.startsWith('/store/') ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/checkout' ||
    location.pathname.startsWith('/order-details') ||
    location.pathname.startsWith('/track-order') ||
    location.pathname === '/orders';

  const hideHeaderOnly = location.pathname === '/stores';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <style>{`
        @keyframes simpleFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastFadeIn {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, background: toast.type === 'error' ? '#e74c3c' : '#0a1a3a',
          color: 'white', padding: '12px 25px', borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', fontWeight: 'bold',
          animation: 'toastFadeIn 0.3s ease', direction: 'rtl', minWidth: '280px', textAlign: 'center'
        }}>
          {toast.message}
        </div>
      )}
      {!hideLayout && !hideHeaderOnly && <Header />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatedWrapper />
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <MobileBottomNav />}
    </div>
  );
};

export default App;