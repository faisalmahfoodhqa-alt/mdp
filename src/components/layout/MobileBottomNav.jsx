import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, TagFill, Cart3, Headset, Grid3x3Gap } from 'react-bootstrap-icons';

import { useCart } from '../../context/CartContext';

const MobileBottomNav = () => {
  const { getCartCount } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) return null;

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    gray: '#666666',
    lightGray: '#f8f9fa',
    red: '#dc3545'
  };

  const navItems = [
    { name: 'الرئيسية', icon: House, path: '/' },
    { name: 'الأقسام', icon: Grid3x3Gap, path: '/departments' },
    { name: 'السلة', icon: Cart3, path: '/cart', isCart: true },
    { name: 'العروض', icon: TagFill, path: '/offers' },
    { name: 'تواصل', icon: Headset, path: '/contact' }
  ];

  return (
    <div className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.primary,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 5px',
      paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      zIndex: 9999,
      borderTop: `1px solid ${colors.gold}40`,
      direction: 'rtl'
    }}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        const Icon = item.icon;
        
        return (
          <Link
            key={index}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: isActive ? colors.gold : `${colors.white}AA`,
              width: '20%',
              gap: '4px',
              transition: 'all 0.3s'
            }}
          >
            <div style={{
              background: isActive ? `${colors.gold}20` : 'transparent',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              position: 'relative'
            }}>
              <Icon size={20} color={isActive ? colors.gold : `${colors.white}AA`} />
              {item.isCart && getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  background: colors.red,
                  color: 'white',
                  fontSize: '9px',
                  minWidth: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 0 5px rgba(0,0,0,0.3)'
                }}>
                  {getCartCount()}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? colors.gold : `${colors.white}AA`,
              transition: 'all 0.3s'
            }}>
              {item.name}
            </span>
          </Link>
        )}
      )}
    </div>
  );
};

export default MobileBottomNav;
