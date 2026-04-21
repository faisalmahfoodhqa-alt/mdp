// src/pages/Departments.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Grid3x3GapFill,
  BagCheckFill,
  StarFill,
  ClockFill
} from 'react-bootstrap-icons';
import { 
  mensCategories, 
  womensCategories, 
  kidsCategories, 
  electronicsCategories,
  foodCategories,
  vehiclesCategories,
  constructionCategories,
  realEstateCategories 
} from '../data/categories';
import { mensProducts, womensProducts, electronicsProducts } from '../data/products';

const Departments = () => {
  const [activeDept, setActiveDept] = useState('mens');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const departments = [
    { id: 'mens', name: 'الأزياء الرجالية', icon: '👔', data: mensCategories, products: Object.values(mensProducts).flat().slice(0, 4) },
    { id: 'womens', name: 'الأزياء النسائية', icon: '👗', data: womensCategories, products: Object.values(womensProducts).flat().slice(0, 4) },
    { id: 'kids', name: 'أزياء الأطفال', icon: '🧸', data: kidsCategories, products: [] },
    { id: 'electronics', name: 'الإلكترونيات', icon: '📱', data: electronicsCategories, products: Object.values(electronicsProducts || {}).flat().slice(0, 4) },
    { id: 'food', name: 'المواد الغذائية', icon: '🍎', data: foodCategories, products: [] },
    { id: 'vehicles', name: 'المركبات', icon: '🚗', data: vehiclesCategories, products: [] },
    { id: 'construction', name: 'مواد البناء', icon: '🔨', data: constructionCategories, products: [] },
    { id: 'realestate', name: 'العقارات', icon: '🏠', data: realEstateCategories, products: [] },
  ];

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    bg: '#f8f9fa',
    border: '#eeeeee',
    text: '#333333',
    gray: '#888888'
  };

  const currentDept = departments.find(d => d.id === activeDept);

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 70px)', // Height minus bottom nav
      background: colors.white,
      direction: 'rtl',
      overflow: 'hidden'
    }}>
      {/* Sidebar - Right side for RTL */}
      <div style={{
        width: isMobile ? '90px' : '220px',
        background: colors.bg,
        borderLeft: `1px solid ${colors.border}`,
        overflowY: 'auto',
        flexShrink: 0
      }}>
        {departments.map(dept => (
          <div
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            style={{
              padding: isMobile ? '15px 5px' : '18px 20px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: isMobile ? '5px' : '12px',
              background: activeDept === dept.id ? colors.white : 'transparent',
              borderRight: activeDept === dept.id ? `4px solid ${colors.gold}` : '4px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: isMobile ? '22px' : '20px' }}>{dept.icon}</span>
            <span style={{ 
              fontSize: isMobile ? '10px' : '14px', 
              fontWeight: activeDept === dept.id ? 'bold' : 'normal',
              color: activeDept === dept.id ? colors.gold : colors.text,
              textAlign: 'center'
            }}>
              {dept.name}
            </span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: isMobile ? '15px' : '25px',
        background: colors.white
      }}>
        {/* Banner Placeholder */}
        <div style={{
          width: '100%',
          height: isMobile ? '60px' : '80px',
          background: `linear-gradient(135deg, ${colors.primary}, #1a3a6a)`,
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.gold,
          fontSize: isMobile ? '18px' : '22px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          {currentDept.name}
        </div>

        {/* Sub-categories Grid */}
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: colors.primary }}>الأقسام الفرعية</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          {currentDept.data.map(cat => (
            <Link 
              key={cat.id} 
              to={cat.link}
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '50%',
                background: colors.bg,
                overflow: 'hidden',
                marginBottom: '8px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100?text=" + cat.title;
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: colors.text, display: 'block', lineHeight: '1.2' }}>{cat.title}</span>
            </Link>
          ))}
        </div>

        {/* Main Products in this Department */}
        {currentDept.products && currentDept.products.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.primary, margin: 0 }}>أبرز المنتجات</h3>
              <Link to={`/category/${currentDept.id}`} style={{ color: colors.gold, fontSize: '12px', textDecoration: 'none' }}>عرض الكل</Link>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {currentDept.products.map(product => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  style={{ 
                    textDecoration: 'none', 
                    background: colors.white, 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    border: `1px solid ${colors.border}`,
                    display: 'block'
                  }}
                >
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: isMobile ? '120px' : '150px', objectFit: 'cover' }} />
                  <div style={{ padding: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: colors.text, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
                    <div style={{ color: colors.gold, fontWeight: 'bold', fontSize: '14px' }}>{product.price} ريال</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Departments;
