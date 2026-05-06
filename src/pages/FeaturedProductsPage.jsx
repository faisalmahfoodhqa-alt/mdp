import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import { featuredProducts as staticFeatured } from '../data/featuredProducts';

const isAdActive = (expiryStr) => {
  if (!expiryStr) return false;
  return new Date(expiryStr) > new Date();
};

const FeaturedProductsPage = () => {
  const { allProducts } = useAuth();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    bg: '#f8f9fa'
  };

  const allFeatured = useMemo(() => {
    const sellerProducts = (allProducts || []).filter((p) => p.isVisible !== false);
    const paidFeatured = sellerProducts.filter(
      (p) => p.isFeatured && isAdActive(p.featuredExpiry)
    );
    return [...paidFeatured, ...staticFeatured];
  }, [allProducts]);

  return (
    <div style={{ direction: 'rtl', minHeight: '70vh', background: colors.bg, padding: isMobile ? '20px 14px 36px' : '28px 20px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{
          textAlign: 'center',
          marginBottom: isMobile ? '22px' : '32px',
          padding: isMobile ? '0 8px' : '0 16px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <StarFill color={colors.gold} size={isMobile ? 24 : 30} />
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? '22px' : '28px',
              color: colors.primary,
              fontWeight: '900',
              lineHeight: 1.3
            }}>
              جميع المنتجات المميزة
            </h1>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? '14px' : '15px',
            color: '#5a6570',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {allFeatured.length > 0
              ? `${allFeatured.length} منتج مميز متاح حالياً`
              : 'لا توجد منتجات مميزة حالياً'}
          </p>
        </header>

        {allFeatured.length === 0 ? (
          <div style={{
            background: colors.white,
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            border: `1px solid #eee`
          }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>لم نعثر على منتجات مميزة.</p>
            <Link to="/offers" style={{ color: colors.gold, fontWeight: 'bold' }}>تصفح العروض والتخفيضات</Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: isMobile ? '12px' : '24px'
          }}>
            {allFeatured.map((product, idx) => (
              <ProductCard
                key={product.id ?? product._id ?? `f-${idx}`}
                isMobile={isMobile}
                product={{
                  ...product,
                  seller: product.seller?.name || product.storeName || product.seller || 'متجر'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductsPage;
