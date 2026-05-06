import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllCategories, getProductsByCategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { UIButton } from '../shared/components/ui';
import { ArrowLeft } from 'react-bootstrap-icons';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    lightGray: '#f8f9fa'
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate network request
      setTimeout(() => {
        const categories = getAllCategories();
        let allProds = [];
        categories.forEach(cat => {
          allProds = [...allProds, ...getProductsByCategory(cat)];
        });
        
        // Filter unique products by text match
        const uniqueProds = [];
        const seenIds = new Set();
        
        allProds.forEach(prod => {
          if (!seenIds.has(prod.id)) {
            const matchName = prod.name?.toLowerCase().includes(query.toLowerCase());
            const matchDesc = prod.description?.toLowerCase().includes(query.toLowerCase());
            if (matchName || matchDesc) {
              uniqueProds.push(prod);
              seenIds.add(prod.id);
            }
          }
        });
        
        setResults(uniqueProds);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div style={{ padding: '30px 20px', minHeight: '60vh', direction: 'rtl', background: colors.lightGray }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)`, 
            color: colors.white, 
            padding: '20px', 
            borderRadius: '15px', 
            marginBottom: '25px' 
        }}>
          <div>
            <h2 style={{ color: colors.gold, marginBottom: '5px', fontSize: '24px' }}>
              نتائج البحث عن: "{query}"
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#eee' }}>تم العثور على {results.length} منتج</p>
          </div>
          <UIButton 
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
            style={{
              background: 'transparent',
              border: `1px solid ${colors.gold}`,
              color: colors.white,
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              transition: 'all 0.3s'
            }}
          >
            رجوع
            <ArrowLeft size={14} />
          </UIButton>
        </div>
        
        {!query ? (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#888', fontSize: '16px' }}>يرجى إدخال كلمة البحث في الشريط العلوي لتشاهد النتائج.</p>
          </div>
        ) : loading ? (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ 
              width: '40px', height: '40px', border: `3px solid ${colors.gold}`, borderTop: '3px solid transparent', 
              borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' 
            }} />
            <h3 style={{ color: '#666', marginBottom: '10px' }}>جاري البحث...</h3>
          </div>
        ) : results.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '20px' 
          }}>
            {results.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode="grid" 
                isMobile={window.innerWidth <= 768} 
              />
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.primary, marginBottom: '15px' }}>لم يتم العثور على أي منتج يطابق بحثك</h3>
            <p style={{ color: '#666' }}>تأكد من كتابة اسم المنتج بشكل صحيح، أو جرب كلمات أخرى.</p>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default SearchPage;
