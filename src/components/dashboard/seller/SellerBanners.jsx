import React from 'react';
import { Link } from 'react-router-dom';
import { InfoCircle, LockFill, Clock, StarFill } from 'react-bootstrap-icons';
import { C } from './constants';
import { UIButton } from '../../../shared/components/ui';

export const Badge = ({ color, children }) => (
  <span style={{
    display:'inline-flex', alignItems:'center', gap:'4px',
    padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'700',
    background:`${color}18`, color
  }}>{children}</span>
);

export const Stat = ({ icon, label, value, sub, color }) => (
  <div style={{
    background:C.card, borderRadius:'16px', padding:'20px 22px',
    boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
    display:'flex', alignItems:'center', gap:'16px',
    border:`1px solid ${C.border}`
  }}>
    <div style={{
      width:'52px', height:'52px', borderRadius:'14px',
      background:`${color}14`, flexShrink:0,
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>{icon}</div>
    <div>
      <div style={{fontSize:'26px', fontWeight:'800', color:C.text, lineHeight:1}}>{value}</div>
      <div style={{fontSize:'12px', color:C.gray, marginTop:'3px'}}>{label}</div>
      {sub && <div style={{fontSize:'11px', color:C.textLight}}>{sub}</div>}
    </div>
  </div>
);

export const ApprovalBanner = ({ user }) => {
  const isRejected = user?.activationRejected;
  const reason = user?.activationRejectionReason;

  return (
    <div style={{
      background: isRejected ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : `linear-gradient(135deg, ${C.sidebar}, #1a3a6a)`,
      color: C.white, padding: '20px 24px', borderRadius: '14px',
      marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: isRejected ? `1px solid ${C.white}40` : `1px solid ${C.gold}40`
    }}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%', background: isRejected ? 'rgba(255,255,255,0.2)' : `${C.gold}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <InfoCircle size={28} color={isRejected ? C.white : C.gold}/>
      </div>
      <div style={{ flex: 1 }}>
        <b style={{ fontSize: '18px', color: isRejected ? C.white : C.gold, display: 'block', marginBottom: '5px' }}>
          {isRejected ? 'تم رفض تفعيل الحساب' : 'طلبك قيد المراجعة'}
        </b>
        <div style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.9 }}>
          {isRejected 
            ? `نعتذر، لم يتم تفعيل حسابك. السبب: ${reason || 'يرجى التواصل مع الإدارة لمزيد من التفاصيل.'}`
            : user?.plan === 'trial' || !user?.plan
              ? 'لقد استلمنا طلب اشتراكك في الباقة المجانية. يتم حالياً مراجعة بياناتك من قبل الإدارة وسوف يتم تفعيل حسابك قريباً.'
              : `لقد استلمنا طلب اشتراكك في الباقة ${user?.plan === 'bronze' ? 'البرونزية' : user?.plan === 'silver' ? 'الفضية' : user?.plan === 'gold' ? 'الذهبية' : 'المدفوعة'}. يتم حالياً مراجعة البيانات من قبل الإدارة وسوف يتم تفعيل حسابك بالكامل فور التأكد من عملية الدفع.`
          }
          <br/>
          <small style={{ color: isRejected ? C.white : C.goldLight }}>
            {isRejected ? 'يمكنك تحديث بياناتك أو التواصل مع الدعم الفني لحل المشكلة.' : 'عادة ما تستغرق هذه العملية أقل من 24 ساعة.'}
          </small>
        </div>
      </div>
    </div>
  );
};

export const TrialBanner = ({ status, user }) => {
  if (!status || status.isPaid || !user?.isApproved) return null;
  if (status.isLocked) return (
    <div style={{
      background:'linear-gradient(135deg,#e74c3c,#c0392b)',
      color:C.white, padding:'14px 24px', borderRadius:'14px',
      marginBottom:'22px', display:'flex', alignItems:'center', gap:'14px',
      boxShadow:'0 4px 16px rgba(231,76,60,0.3)'
    }}>
      <LockFill size={24}/>
      <div style={{flex:1}}>
        <b>الحساب موقوف</b>
        <div style={{fontSize:'12px',opacity:.85}}>انتهت الفترة التجريبية — اشترك لاستعادة وصولك</div>
      </div>
      <Link to="/seller/plans" style={{
        background:C.white, color:C.red, padding:'8px 18px',
        borderRadius:'50px', fontWeight:'700', fontSize:'13px', textDecoration:'none'
      }}>اشترك الآن</Link>
    </div>
  );
  return (
    <div style={{
      background: status.daysLeft <= 2
        ? 'linear-gradient(135deg,#fd7e14,#e55a00)'
        : `linear-gradient(135deg,${C.sidebar},#1a3a6a)`,
      color:C.white, padding:'14px 24px', borderRadius:'14px',
      marginBottom:'22px', display:'flex', alignItems:'center', gap:'14px'
    }}>
      <Clock size={22}/>
      <div style={{flex:1}}>
        <div style={{fontSize:'14px', fontWeight:'700'}}>🎁 باقة الاشتراك {status.planInfo.name}</div>
        <div style={{fontSize:'12px',opacity:.85}}>
          متبقي لك {status.daysLeft} يوم من أصل 90 يوم
        </div>
      </div>
      <Link to="/seller/plans" style={{
        background:C.gold, color:C.sidebar, padding:'6px 14px',
        borderRadius:'50px', fontWeight:'700', fontSize:'13px', textDecoration:'none'
      }}>ترقية</Link>
    </div>
  );
};

export const LockedScreen = () => (
  <div style={{
    display:'flex', flexDirection:'column', alignItems:'center',
    justifyContent:'center', minHeight:'60vh', textAlign:'center', padding:'40px'
  }}>
    <div style={{
      width:'100px', height:'100px', borderRadius:'50%',
      background:`${C.red}12`, display:'flex', alignItems:'center',
      justifyContent:'center', marginBottom:'24px'
    }}><LockFill size={48} color={C.red}/></div>
    <h2 style={{color:C.text, marginBottom:'12px'}}>انتهت فترتك التجريبية</h2>
    <p style={{color:C.gray, maxWidth:'380px', lineHeight:'1.7', marginBottom:'28px'}}>
      اشترك في إحدى الباقات للاستمرار في إدارة متجرك ورفع منتجاتك.
    </p>
    <Link to="/seller/plans" style={{
      display:'inline-flex', alignItems:'center', gap:'8px',
      padding:'14px 36px',
      background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,
      color:C.sidebar, fontWeight:'700', fontSize:'15px',
      borderRadius:'50px', textDecoration:'none',
      boxShadow:'0 6px 20px rgba(200,140,35,0.35)'
    }}><StarFill size={16}/> عرض الباقات</Link>
  </div>
);

export const PaymentReminderBanner = ({ setPage }) => (
  <div style={{
    background: 'rgba(200, 140, 35, 0.1)',
    color: C.text, padding: '16px 20px', borderRadius: '14px',
    marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '15px',
    border: `1.5px dashed ${C.gold}50`
  }}>
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px', background: `${C.gold}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <InfoCircle size={24} color={C.gold}/>
    </div>
    <div style={{ flex: 1 }}>
      <b style={{ fontSize: '15px', color: C.sidebar, display: 'block', marginBottom: '2px' }}>تنبيه: لم تضف وسائل دفع بعد!</b>
      <div style={{ fontSize: '13px', opacity: 0.8 }}>
        يرجى إضافة أرقام محافظك الإلكترونية (جيب، الكريمي، إلخ) ليتمكن العملاء من الدفع لك مباشرة.
      </div>
    </div>
    <UIButton 
      onClick={() => setPage('profile')}
      style={{
        background: C.gold, color: C.sidebar, padding: '8px 16px',
        borderRadius: '10px', fontWeight: '700', fontSize: '12px', border: 'none', cursor: 'pointer'
      }}
    >
      إضافة الآن
    </UIButton>
  </div>
);
export const AddressReminderBanner = ({ setPage }) => (
  <div style={{
    background: 'rgba(200, 140, 35, 0.1)',
    color: C.text, padding: '16px 20px', borderRadius: '14px',
    marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '15px',
    border: `1.5px dashed ${C.gold}50`
  }}>
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px', background: `${C.gold}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <InfoCircle size={24} color={C.gold}/>
    </div>
    <div style={{ flex: 1 }}>
      <b style={{ fontSize: '15px', color: C.sidebar, display: 'block', marginBottom: '2px' }}>تنبيه: موقع المتجر غير محدد!</b>
      <div style={{ fontSize: '13px', opacity: 0.8 }}>
        يرجى إضافة عنوان المتجر وتحديد موقعه على الخريطة ليتمكن العملاء من الوصول إليك واستلام طلباتهم.
      </div>
    </div>
    <UIButton 
      onClick={() => setPage('profile')}
      style={{
        background: C.gold, color: C.sidebar, padding: '8px 16px',
        borderRadius: '10px', fontWeight: '700', fontSize: '12px', border: 'none', cursor: 'pointer'
      }}
    >
      إعداد الآن
    </UIButton>
  </div>
);
