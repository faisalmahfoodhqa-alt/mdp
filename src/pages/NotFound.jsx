import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangle } from 'react-bootstrap-icons';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '20px' }}>
      <ExclamationTriangle size={80} color="#c88c23" style={{ marginBottom: '20px' }} />
      <h1 style={{ color: '#0a1a3a', fontSize: '3rem', marginBottom: '10px' }}>404</h1>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>عفواً، هذه الصفحة غير موجودة</h2>
      <p style={{ color: '#666', maxWidth: '500px', marginBottom: '30px', lineHeight: '1.6' }}>
        يبدو أنك تبحث عن صفحة تم نقلها أو حذفها، أو أن الرابط الذي قمت بإدخاله غير صحيح.
      </p>
      <Link to="/" style={{ background: '#c88c23', color: '#fff', padding: '12px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 15px rgba(200, 140, 35, 0.3)', transition: 'all 0.3s ease' }}>
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
