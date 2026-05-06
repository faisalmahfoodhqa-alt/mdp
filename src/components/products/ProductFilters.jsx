// src/components/products/ProductFilters.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Filter } from 'react-bootstrap-icons';
import { UIButton } from '../../shared/components/ui';

const ProductFilters = ({ 
  products, 
  onFilterChange, 
  isMobile,
  showFilters,
  setShowFilters
}) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    gray: '#6c757d',
    lightBorder: '#dee2e6'
  };

  // تحديث نطاق السعر بناءً على المنتجات
  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map(p => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange({ min, max });
    }
  }, [products]);



  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    if (onFilterChange) onFilterChange({ priceRange: { min, max } });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    if (onFilterChange) onFilterChange({ selectedRating: rating });
  };

  const handleStockChange = (checked) => {
    setInStockOnly(checked);
    if (onFilterChange) onFilterChange({ inStockOnly: checked });
  };

  const resetFilters = () => {
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    }
    setSelectedRating(0);
    setInStockOnly(false);
    if (onFilterChange) onFilterChange({ reset: true });
  };

  const formatPrice = (price) => price.toLocaleString() + ' ريال';

  const FilterContent = () => (
    <>
      {/* فلتر السعر */}
      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}
          onClick={() => setShowPriceFilter(!showPriceFilter)}
        >
          <h4 style={{ color: colors.primary, fontSize: '15px', margin: 0 }}>نطاق السعر</h4>
          {showPriceFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {showPriceFilter && (
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <input 
                type="number" 
                value={priceRange.min} 
                onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
                style={{ width: '45%', padding: '8px', border: `1px solid ${colors.gold}`, borderRadius: '5px', fontSize: '13px' }} 
              />
              <span>-</span>
              <input 
                type="number" 
                value={priceRange.max} 
                onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
                style={{ width: '45%', padding: '8px', border: `1px solid ${colors.gold}`, borderRadius: '5px', fontSize: '13px' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: colors.gray }}>
              <span>{formatPrice(priceRange.min)}</span>
              <span>{formatPrice(priceRange.max)}</span>
            </div>
          </div>
        )}
      </div>

      {/* فلتر التقييم */}
      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}
          onClick={() => setShowRatingFilter(!showRatingFilter)}
        >
          <h4 style={{ color: colors.primary, fontSize: '15px', margin: 0 }}>التقييم</h4>
          {showRatingFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {showRatingFilter && (
          <div>
            {[5, 4, 3, 2, 1].map(stars => (
              <label key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input 
                  type="radio" 
                  name="rating" 
                  checked={selectedRating === stars} 
                  onChange={() => handleRatingChange(stars)} 
                />
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={14} color={star <= stars ? colors.gold : colors.lightBorder} />
                  ))}
                </div>
                <span>{stars} نجوم فأكثر</span>
              </label>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px', cursor: 'pointer', fontSize: '13px' }}>
              <input 
                type="radio" 
                name="rating" 
                checked={selectedRating === 0} 
                onChange={() => handleRatingChange(0)} 
              />
              <span>جميع التقييمات</span>
            </label>
          </div>
        )}
      </div>

      {/* فلتر التوفر */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: colors.primary, fontSize: '15px', marginBottom: '10px' }}>التوفر</h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
          <input type="checkbox" checked={inStockOnly} onChange={(e) => handleStockChange(e.target.checked)} />
          المنتجات المتوفرة فقط
        </label>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {showFilters && (
          <div 
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0, left: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 9998,
              transition: 'opacity 0.3s ease'
            }}
            onClick={() => setShowFilters && setShowFilters(false)}
          />
        )}
        <div style={{
          position: 'fixed',
          top: 0,
          right: showFilters ? 0 : '-100%',
          width: '280px',
          height: '100%',
          background: colors.white,
          zIndex: 9999,
          transition: 'right 0.3s ease',
          boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          direction: 'rtl'
        }}>
           <div style={{ padding: '20px', borderBottom: `1px solid ${colors.lightBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h3 style={{ margin: 0, color: colors.primary, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Filter size={20} color={colors.gold} /> الفلترة
             </h3>
             <UIButton onClick={() => setShowFilters && setShowFilters(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: colors.gray, padding: '5px' }}>✕</UIButton>
           </div>
           <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '100px' }}>
              <FilterContent />
              
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${colors.lightBorder}`, display: 'flex', gap: '10px' }}>
                <UIButton 
                  onClick={() => setShowFilters && setShowFilters(false)} 
                  style={{ flex: 1, background: colors.primary, color: colors.white, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  عرض النتائج
                </UIButton>
                <UIButton 
                  onClick={resetFilters} 
                  style={{ flex: 1, background: colors.gold, color: colors.primary, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  مسح الفلتر
                </UIButton>
              </div>
           </div>
        </div>
      </>
    );
  }

  return (
    <div style={{
      background: colors.white,
      borderRadius: '12px',
      padding: '20px',
      height: 'auto',
      overflow: 'hidden'
    }}>
      <UIButton
        onClick={resetFilters}
        style={{
          width: '100%',
          padding: '10px',
          background: colors.gold,
          color: colors.primary,
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        إعادة تعيين الفلاتر
      </UIButton>

      <FilterContent />
    </div>
  );
};

export default ProductFilters;