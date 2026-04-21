import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MensFashion = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    goldDark: '#b37a1e',
    white: '#ffffff',
    lightGray: '#f5f5f5',
    darkGray: '#333333'
  };

  // بيانات المنتجات الحقيقية (هذه ستأتي من قاعدة البيانات لاحقاً)
  const productsData = {
    'الملابس اليومية': [
      { id: 101, name: 'تيشيرت قطني أبيض', price: 89 },
      { id: 102, name: 'تيشيرت أسود رياضي', price: 99 },
      { id: 103, name: 'جينز أزرق كلاسيكي', price: 199 },
      { id: 104, name: 'شورت جينز قصير', price: 79 },
      { id: 105, name: 'هودي رمادي', price: 149 }
    ],
    'الملابس الرسمية': [
      { id: 201, name: 'قميص رسمي أبيض', price: 149 },
      { id: 202, name: 'قميص رسمي أزرق', price: 159 },
      { id: 203, name: 'بنطلون رسمي أسود', price: 189 },
      { id: 204, name: 'بدلة رمادية', price: 899 },
      { id: 205, name: 'ربطة عنق حرير', price: 49 }
    ],
    'الملابس التراثية': [
      { id: 301, name: 'ثوب أبيض', price: 229 },
      { id: 302, name: 'مشلح صوف أسود', price: 399 },
      { id: 303, name: 'غترة بيضاء', price: 45 },
      { id: 304, name: 'شماغ أحمر', price: 65 },
      { id: 305, name: 'عقال', price: 35 }
    ],
    'الملابس الداخلية': [
      { id: 401, name: 'فانلة قطن (3 قطع)', price: 59 },
      { id: 402, name: 'كلسون قطن (3 قطع)', price: 49 },
      { id: 403, name: 'طقم ملابس حرارية', price: 89 },
      { id: 404, name: 'جوارب قطن (6 أزواج)', price: 29 }
    ],
    'الأحذية الرجالية': [
      { id: 501, name: 'حذاء رسمي أسود', price: 199 },
      { id: 502, name: 'حذاء رياضي أزرق', price: 159 },
      { id: 503, name: 'صندل جلدي بني', price: 89 },
      { id: 504, name: 'حذاء كاجوال رمادي', price: 129 },
      { id: 505, name: 'حذاء رسمي بني', price: 219 }
    ],
    // الأقسام الجديدة
    'الاكسسوارات الرجالية': [
      { id: 601, name: 'ساعة يد كلاسيكية', price: 249 },
      { id: 602, name: 'نظارة شمسية', price: 129 },
      { id: 603, name: 'محفظة جلدية', price: 89 },
      { id: 604, name: 'سوار رياضي', price: 59 },
      { id: 605, name: 'ربطة عنق حرير', price: 79 },
      { id: 606, name: 'أزرار أكمام', price: 45 },
      { id: 607, name: 'حمالة بنطلون', price: 35 }
    ],
    'الملابس الرياضية': [
      { id: 701, name: 'طقم رياضي قطني', price: 189 },
      { id: 702, name: 'تيشيرت رياضي', price: 89 },
      { id: 703, name: 'شورت رياضي', price: 69 },
      { id: 704, name: 'بنطال رياضي', price: 129 },
      { id: 705, name: 'جاكيت رياضي', price: 219 },
      { id: 706, name: 'ترينج سويت', price: 159 }
    ],
    'الأزياء الشتوية': [
      { id: 801, name: 'معطف شتوي', price: 349 },
      { id: 802, name: 'كنزة صوف', price: 179 },
      { id: 803, name: 'قبعة شتوية', price: 49 },
      { id: 804, name: 'قفازات شتوية', price: 39 },
      { id: 805, name: 'وشاح صوف', price: 59 },
      { id: 806, name: 'سترة صوفية', price: 199 }
    ]
  };

  // حساب عدد المنتجات لكل قسم
  useEffect(() => {
    const categoriesList = [
      {
        id: 1,
        title: 'الملابس اليومية',
        image: '/images/daily-main.jpg',
        link: '/category/الملابس-اليومية',
        count: productsData['الملابس اليومية'].length + ' منتج'
      },
      {
        id: 2,
        title: 'الملابس الرسمية',
        image: '/images/formal-main.jpg',
        link: '/category/الملابس-الرسمية',
        count: productsData['الملابس الرسمية'].length + ' منتج'
      },
      {
        id: 3,
        title: 'الملابس التراثية',
        image: '/images/traditional-main.jpg',
        link: '/category/الملابس-التراثية',
        count: productsData['الملابس التراثية'].length + ' منتج'
      },
      {
        id: 4,
        title: 'الملابس الداخلية',
        image: '/images/underwear-main.jpg',
        link: '/category/الملابس-الداخلية',
        count: productsData['الملابس الداخلية'].length + ' منتج'
      },
      {
        id: 5,
        title: 'الأحذية الرجالية',
        image: '/images/shoes-main.jpg',
        link: '/category/الأحذية-الرجالية',
        count: productsData['الأحذية الرجالية'].length + ' منتج'
      },
      // الأقسام الجديدة
      {
        id: 6,
        title: 'الاكسسوارات الرجالية',
        image: '/images/accessories-main.jpg',
        link: '/category/الاكسسوارات-الرجالية',
        count: productsData['الاكسسوارات الرجالية'].length + ' منتج'
      },
      {
        id: 7,
        title: 'الملابس الرياضية',
        image: '/images/sportswear-main.jpg',
        link: '/category/الملابس-الرياضية',
        count: productsData['الملابس الرياضية'].length + ' منتج'
      },
      {
        id: 8,
        title: 'الأزياء الشتوية',
        image: '/images/winter-main.jpg',
        link: '/category/الأزياء-الشتوية',
        count: productsData['الأزياء الشتوية'].length + ' منتج'
      }
    ];
    
    setCategories(categoriesList);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        direction: 'rtl'
      }}>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <section style={{
      padding: '60px 20px',
      background: colors.lightGray,
      direction: 'rtl'
    }}>
      {/* عنوان القسم بتصميم احترافي */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{
          color: colors.primary,
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '10px',
          position: 'relative',
          display: 'inline-block'
        }}>
          الأزياء الرجالية
          <span style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            background: colors.gold,
            borderRadius: '2px'
          }} />
        </h2>
        <p style={{
          color: colors.darkGray,
          fontSize: '16px',
          marginTop: '20px'
        }}>
          اكتشف أحدث صيحات الموضة الرجالية
        </p>
      </div>

      {/* شبكة الأقسام - تصميم احترافي */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: colors.white,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 15px 30px ${colors.gold}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            }}
            >
              {/* صورة القسم */}
              <div style={{
                height: '160px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={category.image}
                  alt={category.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/${colors.primary.slice(1)}/${colors.gold.slice(1)}?text=${category.title}`;
                  }}
                />
              </div>

              {/* محتوى البطاقة */}
              <div style={{ padding: '15px' }}>
                <h3 style={{
                  color: colors.primary,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  textAlign: 'center'
                }}>
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* زر عرض المزيد */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        <Link
          to="/category/الأزياء-الرجالية"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: colors.gold,
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            padding: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primary;
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.gold;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span>عرض المزيد</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default MensFashion;