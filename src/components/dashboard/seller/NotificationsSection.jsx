import React from 'react';
import { Bell, BellSlash } from 'react-bootstrap-icons';
import { C } from './constants';

export const NotificationsSection = ({ user, updateUser }) => {
  const notifications = user.notifications || [];

  return (
    <div style={{ background: C.card, borderRadius: '16px', padding: '24px', border: `1px solid ${C.border}` }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: C.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Bell size={20} color={C.gold}/> الإشعارات والتنبيهات
      </h3>
      {notifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <BellSlash size={48} color={`${C.gold}20`} style={{ marginBottom: '15px' }} />
          <p style={{ color: C.gray }}>لا توجد إشعارات حالياً</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...notifications].reverse().map((notif, idx) => (
            <div key={idx} style={{ 
               padding: '15px', 
               borderRadius: '12px', 
               border: `1px solid ${notif.read ? C.border : C.gold + '30'}`,
               background: notif.read ? 'transparent' : `${C.gold}05`,
               position: 'relative',
               cursor: 'pointer'
            }} onClick={() => {
               if(!notif.read) {
                   const newNotifs = notifications.map((n, i) => 
                     i === (notifications.length - 1 - idx) ? {...n, read: true} : n
                   );
                   updateUser({ notifications: newNotifs });
               }
            }}>
              <div style={{ fontWeight: '700', color: C.text, fontSize: '14px', marginBottom: '4px' }}>{notif.title}</div>
              <div style={{ color: C.gray, fontSize: '13px' }}>{notif.message}</div>
              <div style={{ fontSize: '11px', color: C.gray, marginTop: '8px' }}>{new Date(notif.date).toLocaleString('ar-YE')}</div>
              {!notif.read && <div style={{ position: 'absolute', top: '15px', left: '15px', width: '8px', height: '8px', borderRadius: '50%', background: C.gold }}></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
