import React from 'react';
import { BoxSeam, Whatsapp, Telephone } from 'react-bootstrap-icons';
import { C } from './constants';
import { DELIVERY_COMPANIES } from '../../../data/deliveryCompanies';

export const OrdersSection = ({ user }) => {
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const myOrders = [];
  
  allUsers.forEach(u => {
    if (u.orders) {
      u.orders.forEach(order => {
        const myItems = (order.items || []).filter(item => {
          const itemSellerId = item.sellerId || item.seller?.id;
          const itemStoreName = item.storeName || item.seller?.name || (typeof item.seller === 'string' ? item.seller : '');
          
          // التحقق بواسطة المعرف (الأكثر دقة)
          if (itemSellerId && user.id && String(itemSellerId) === String(user.id)) {
            return true;
          }
          
          // التحقق بواسطة اسم المتجر (إذا كان المعرف غير متوفر)
          if (user.storeName && itemStoreName && itemStoreName.trim() === user.storeName.trim()) {
            return true;
          }
          
          // التحقق بواسطة اسم المستخدم (كخيار أخير)
          if (user.username && itemStoreName && itemStoreName.trim() === user.username.trim()) {
            return true;
          }

          return false;
        });
        if (myItems && myItems.length > 0) {
          myOrders.push({
            ...order,
            customerId: u.id || u.phone,
            customerName: u.fullName || u.username,
            customerPhone: u.phone,
            items: myItems
          });
        }
      });
    }
  });

  const updateStatus = (customerId, orderId, newStatus) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const cIdx = users.findIndex(u => (u.id === customerId) || (u.phone === customerId));
    if (cIdx > -1) {
      const orders = users[cIdx].orders || [];
      const oIdx = orders.findIndex(o => o.id === orderId);
      if (oIdx > -1) {
        users[cIdx].orders[oIdx].status = newStatus;
        
        const statusLabels = {
          pending: 'قيد الانتظار',
          processing: 'جاري التجهيز',
          shipped: 'جاري التوصيل',
          delivered: 'تم التسليم',
          cancelled: 'ملغي'
        };

        if (!users[cIdx].notifications) users[cIdx].notifications = [];
        users[cIdx].notifications.push({
          id: Date.now(),
          title: 'تحديث حالة الطلب',
          message: `تم تحديث حالة طلبك #${orderId} إلى: ${statusLabels[newStatus] || newStatus}`,
          date: new Date().toISOString(),
          read: false,
          type: newStatus === 'cancelled' ? 'danger' : 'success'
        });

        localStorage.setItem('users', JSON.stringify(users));
        window.location.reload();
      }
    }
  };

  if (myOrders.length === 0) {
    return (
      <div style={{ background: C.card, borderRadius: '16px', padding: '24px', border: `1px solid ${C.border}` }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: C.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BoxSeam size={20} color={C.gold}/> طلبات عملائي
        </h3>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: '80px', height: '80px', background: C.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <BoxSeam size={40} color={`${C.gold}40`} />
          </div>
          <p style={{ color: C.gray }}>لا توجد طلبات جديدة حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.card, borderRadius: '16px', padding: '24px', border: `1px solid ${C.border}` }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: C.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BoxSeam size={20} color={C.gold}/> طلبات عملائي
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {myOrders.map(order => {
          const sColors = {
            pending: { bg: '#fff9e6', text: '#856404' },
            processing: { bg: '#eef2ff', text: '#3730a3' },
            shipped: { bg: '#ecfdf5', text: '#065f46' },
            delivered: { bg: '#f0fdf4', text: '#166534' },
            cancelled: { bg: '#fef2f2', text: '#991b1b' }
          };
          const status = order.status || 'pending';
          const sc = sColors[status] || sColors.pending;

          return (
            <div key={order.id} style={{ border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px', background: C.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: C.text }}>طلب #{order.id}</div>
                  <div style={{ fontSize: '12px', color: C.gray }}>العميل: {order.customerName} | الجوال: {order.customerPhone}</div>
                  <div style={{ fontSize: '12px', color: C.gray }}>التاريخ: {new Date(order.date).toLocaleDateString('ar-YE')}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <span style={{ background: sc.bg, color: sc.text, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: `1px solid ${sc.text}20` }}>
                    {status === 'pending' ? 'قيد الانتظار' : status === 'processing' ? 'جاري التجهيز' : status === 'shipped' ? 'جاري التوصيل' : status === 'delivered' ? 'تم التسليم' : 'ملغي'}
                  </span>
                  <select 
                    value={status} 
                    onChange={(e) => updateStatus(order.customerId, order.id, e.target.value)}
                    style={{ padding: '6px', borderRadius: '8px', border: `1px solid ${C.border}`, fontSize: '12px', outline: 'none', background: C.bg }}
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="processing">جاري التجهيز</option>
                    <option value="shipped">جاري التوصيل</option>
                    <option value="delivered">تم التسليم</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', borderTop: `1px solid ${C.border}`, paddingTop: '15px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: C.bg, padding: '12px', borderRadius: '12px', flex: 1, minWidth: '240px', border: `1px solid ${C.border}` }}>
                    <img 
                      src={item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'} 
                      style={{ width: '55px', height: '55px', borderRadius: '10px', objectFit: 'cover', border: `1px solid ${C.border}` }} 
                      alt={item.name}
                    />
                    <div style={{ fontSize: '13px', flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: C.text, marginBottom: '3px' }}>{item.name}</div>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        {item.options?.size && <span style={{ background: '#ddd', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>المقاس: {item.options.size}</span>}
                        {item.options?.color && <span style={{ background: '#ddd', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>اللون: {item.options.color}</span>}
                      </div>
                      <div style={{ color: C.gold, fontWeight: 'bold' }}>{item.quantity} × {item.price} ريال</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* تفاصيل الدفع */}
              <div style={{ marginTop: '15px', padding: '15px', background: `${C.gold}10`, borderRadius: '12px', border: `1px dashed ${C.gold}50` }}>
                  <div style={{ fontSize: '13px', color: C.text, fontWeight: 'bold', marginBottom: '5px' }}>
                    طريقة الدفع: <span style={{ color: C.sidebar }}>{order.payment?.method === 'cash' ? 'نقد عند الاستلام' : `الكتروني (${typeof order.payment?.wallet === 'object' ? order.payment.wallet.type : (order.payment?.wallet || '')})`}</span>
                  </div>
                  {order.payment?.verificationCode && (
                    <div style={{ fontSize: '13px', color: C.gray }}>
                      رقم العملية / الإيداع: <span style={{ fontWeight: 'bold', color: C.red, fontSize: '14px' }}>{order.payment.verificationCode}</span>
                    </div>
                  )}
              </div>

              {/* تنسيق التوصيل */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                 <button 
                  onClick={() => {
                    const shipping = order.shipping || {};
                    const itemsText = order.items.map(it => `${it.name} (${it.quantity})`).join('\n');
                    const mapLink = shipping.lat ? `https://www.google.com/maps/dir/?api=1&destination=${shipping.lat},${shipping.lng}` : '';
                    const total = order.items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
                    
                    const selectedCompany = DELIVERY_COMPANIES.find(c => c.id === user.deliveryService) || DELIVERY_COMPANIES[0];
                    const targetPhone = selectedCompany.whatsapp || '';

                    const message = encodeURIComponent(
                      `📌 *طلب توصيل جديد من متجر: ${user.storeName}*\n` +
                      `🔢 *رقم الطلب:* ${order.id}\n` +
                      `👤 *العميل:* ${order.customerName}\n` +
                      `📞 *الجوال:* ${order.customerPhone}\n` +
                      `📍 *المحافظة:* ${shipping.governorate || 'غير محدد'}\n` +
                      `🏠 *العنوان:* ${shipping.details || 'غير محدد'}\n` +
                      `📦 *المنتجات:*\n${itemsText}\n` +
                      `💰 *المبلغ المطلوب تحصيله:* ${total} ريال\n` +
                      (mapLink ? `🌍 *موقع العميل:* ${mapLink}` : '') +
                      `\n\n--- إشعار لشركة التوصيل: ${selectedCompany.name} ---`
                    );
                    
                    window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
                  }}
                  style={{ padding: '10px 20px', border: 'none', borderRadius: '12px', background: (DELIVERY_COMPANIES.find(c => c.id === user.deliveryService)?.id !== 'merchant') ? '#0088cc' : '#25D366', color: 'white', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                 >
                    <Whatsapp size={18}/> 
                    {(DELIVERY_COMPANIES.find(c => c.id === user.deliveryService)?.id !== 'merchant') 
                      ? `إرسال إشعار لشركة ${DELIVERY_COMPANIES.find(c => c.id === user.deliveryService)?.name || 'التوصيل'}` 
                      : 'إرسال بيانات الطلب للمندوب'}
                 </button>
                 
                 <button 
                  onClick={() => window.open(`tel:${order.customerPhone}`)}
                  style={{ padding: '10px 20px', border: `1px solid ${C.border}`, borderRadius: '12px', background: C.white, color: C.text, fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                 >
                    <Telephone size={18}/> اتصال بالعميل
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
