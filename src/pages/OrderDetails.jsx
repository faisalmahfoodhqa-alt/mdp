import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, GeoAlt, CreditCard, BoxSeam, InfoCircle, XCircleFill, CheckCircleFill, Truck, ClockHistory, BagCheckFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const [order, setOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const C = {
        primary: '#0a1a3a',
        gold: '#c88c23',
        cardBg: '#162343',
        text: '#ffffff',
        gray: '#ffffff88',
        red: '#e74c3c'
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const userOrders = user.orders || [];
        const found = userOrders.find(o => o.id === orderId);
        if (found) {
            setOrder(found);
        } else {
            setOrder({
                id: orderId,
                status: 'pending',
                date: new Date().toISOString(),
                sellerName: 'متجرنا المميز',
                items: [{ name: 'منتج تجريبي', price: 5000, quantity: 1, image: 'https://via.placeholder.com/80' }],
                subTotal: 5000,
                deliveryFee: 1000,
                total: 6000,
                shipping: { address: 'صنعاء، التحرير', details: 'بجوار المعلم المعروف', name: 'العميل الأول', phone: '777000000' },
                payment: { method: 'wallet', wallet: 'الكريمي' },
                deliveryType: 'delivery',
                deliveryTime: { day: 'اليوم', time: 'الصباح' }
            });
        }
    }, [user, orderId, navigate]);

    if (!order) return <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>جاري التحميل...</div>;

    const statusTexts = {
        pending: { text: "طلبك قيد الانتظار", color: C.gold, bg: `${C.gold}15`, border: `${C.gold}30` },
        processing: { text: "طلبك قيد التجهيز", color: 'white', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
        shipped: { text: "طلبك في الطريق الآن", color: C.gold, bg: `${C.gold}10`, border: `${C.gold}30` },
        delivered: { text: "تم تسليم الطلب بنجاح", color: '#fff', bg: `${C.gold}44`, border: C.gold },
        cancelled: { text: "تم إلغاء الطلب", color: C.red, bg: `${C.red}10`, border: `${C.red}30` }
    };
    
    const currStatus = statusTexts[order.status || 'pending'];
    const sellersNameList = order.sellerNotifications?.map(n => n.vendorName).join('، ') || order.sellerName || 'متجر غير معروف';

    const handleConfirmCancel = () => {
        if (!cancelReason.trim()) {
            alert('يرجى إدخال سبب الإلغاء');
            return;
        }
        if (user && user.orders) {
            const updatedOrders = user.orders.map(o => {
                if (o.id === order.id) {
                    return { ...o, status: 'cancelled', cancelReason };
                }
                return o;
            });
            updateUser({ orders: updatedOrders });
            setOrder({ ...order, status: 'cancelled', cancelReason });
        }
        setShowCancelModal(false);
    };

    const cardStyle = {
        background: C.cardBg, 
        padding: '20px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.05)'
    };

    return (
        <div style={{ direction: 'rtl', minHeight: '100vh', background: C.primary, paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ background: '#162343', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => navigate('/orders')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: C.gold }}>
                    <ArrowRight size={24} />
                </button>
                <h2 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: 'bold' }}>تفاصيل الطلب</h2>
            </div>

            <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Status Stepper */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '10px 0' }}>
                        {/* Progress Line */}
                        <div style={{ position: 'absolute', top: '25px', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 1 }}></div>
                        <div style={{ 
                            position: 'absolute', top: '25px', left: '10%', 
                            width: order.status === 'pending' ? '0%' : order.status === 'processing' ? '33%' : order.status === 'shipped' ? '66%' : order.status === 'delivered' ? '80%' : '0%', 
                            height: '2px', background: C.gold, zIndex: 2, transition: '0.5s' 
                        }}></div>

                        {[
                            { id: 'pending', label: 'طلب جديد', icon: ClockHistory },
                            { id: 'processing', label: 'تجهيز', icon: BoxSeam },
                            { id: 'shipped', label: 'توصيل', icon: Truck },
                            { id: 'delivered', label: 'استلمت', icon: BagCheckFill }
                        ].map((step, idx) => {
                            const isCompleted = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= idx;
                            const isCurrent = order.status === step.id;
                            const StepIcon = step.icon;

                            return (
                                <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 3, flex: 1 }}>
                                    <div style={{ 
                                        width: '32px', height: '32px', borderRadius: '50%', 
                                        background: isCompleted ? C.gold : '#162343', 
                                        color: isCompleted ? C.primary : 'rgba(255,255,255,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: `2px solid ${isCompleted ? C.gold : 'rgba(255,255,255,0.1)'}`,
                                        boxShadow: isCurrent ? `0 0 15px ${C.gold}66` : 'none',
                                        transition: '0.3s'
                                    }}>
                                        <StepIcon size={16} />
                                    </div>
                                    <span style={{ fontSize: '11px', fontWeight: isCurrent ? 'bold' : 'normal', color: isCompleted ? 'white' : 'rgba(255,255,255,0.4)', transition: '0.3s' }}>{step.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detailed Status Box */}
                <div style={{ ...cardStyle, borderRight: `5px solid ${currStatus.color}`, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: currStatus.bg, color: currStatus.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {order.status === 'cancelled' ? <XCircleFill size={24} /> : <InfoCircle size={24} />}
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: C.gray, marginBottom: '2px' }}>رقم الطلب: #{order.id}</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{currStatus.text}</div>
                        </div>
                    </div>
                </div>

                {/* Delivery Info */}
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '16px', color: C.gold, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        <GeoAlt /> معلومات التوصيل
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <span style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '4px' }}>المتجر:</span>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{sellersNameList}</span>
                        </div>
                        <div style={{ borderTop: `1px dashed rgba(255,255,255,0.1)`, paddingTop: '15px' }}>
                            <span style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '4px' }}>المستلم ومسار التوصيل:</span>
                            {order.deliveryType === 'delivery' ? (
                                <>
                                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{order.shipping?.name} <span style={{fontSize: '13px', fontWeight: 'normal', opacity: 0.7}}>({order.shipping?.phone})</span></div>
                                  <div style={{ fontSize: '14px', color: 'white', marginTop: '8px', opacity: 0.9 }}>الموقع: {order.shipping?.address}</div>
                                  <div style={{ fontSize: '13px', color: C.gray, marginTop: '4px' }}>{order.shipping?.details}</div>
                                </>
                            ) : (
                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: C.gold }}>استلام مباشر من فرع المتجر</div>
                            )}
                        </div>
                        <div style={{ borderTop: `1px dashed rgba(255,255,255,0.1)`, paddingTop: '15px' }}>
                             <span style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '4px' }}>موعد وصول طلبك المتوقع:</span>
                             <span style={{ fontSize: '15px', fontWeight: 'bold', color: C.gold }}>{order.deliveryTime?.day}، في {order.deliveryTime?.time || 'أقرب وقت'}</span>
                        </div>
                    </div>
                </div>

                {/* Products Info */}
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '16px', color: C.gold, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        <BoxSeam /> قائمة المشتريات
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: idx !== order.items.length - 1 ? `1px solid rgba(255,255,255,0.08)` : 'none', paddingBottom: idx !== order.items.length - 1 ? '20px' : 0 }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                                        <img 
                                            src={item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'} 
                                            alt={item.name} 
                                            style={{ width: '85px', height: '85px', borderRadius: '15px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
                                        />
                                    </Link>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                            <div style={{ fontSize: '15px', fontWeight: '900', color: 'white', marginBottom: '6px', lineHeight: '1.4' }}>{item.name}</div>
                                        </Link>
                                        
                                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                            {item.options?.size && <span style={{ background: 'rgba(255,255,255,0.1)', color: C.gold, padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>المقاس: {item.options.size}</span>}
                                            {item.options?.color && <span style={{ background: 'rgba(255,255,255,0.1)', color: C.gold, padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>اللون: {item.options.color}</span>}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                            <span style={{ color: C.gray }}>الكمية: {item.quantity}</span>
                                            <span style={{ fontWeight: 'bold', color: C.gold }}>{(item.price * item.quantity).toLocaleString()} ريال</span>
                                        </div>
                                    </div>
                                </div>
                                {item.description && (
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', fontSize: '13px', color: C.gray, border: '1px solid rgba(255,255,255,0.05)', lineHeight: '1.6' }}>
                                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '11px', marginBottom: '5px' }}>وصف المنتج:</div>
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Info */}
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '16px', color: C.gold, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        <CreditCard /> الحساب والفوترة
                    </h3>
                    <div style={{ paddingBottom: '15px', marginBottom: '15px', borderBottom: `1px dashed rgba(255,255,255,0.1)` }}>
                        <span style={{ fontSize: '14px', color: C.gray }}>وسيلة الدفع: </span>
                        <strong style={{ fontSize: '14px', color: 'white' }}>
                            {order.payment?.method === 'cash' ? 'نقد عند الاستلام' : `إلكتروني (${typeof order.payment?.wallet === 'object' ? order.payment.wallet.type : (order.payment?.wallet || '')})`}
                        </strong>
                        {order.payment?.verificationCode && (
                            <div style={{ fontSize: '12px', color: C.gray, marginTop: '6px' }}>رقم العملية: <span style={{fontWeight: 'bold', color: C.gold}}>{order.payment.verificationCode}</span></div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: C.gray }}>
                            <span>الصافي:</span>
                            <span style={{ color: 'white' }}>{(order.subTotal || 0).toLocaleString()} ريال</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: C.gray }}>
                            <span>التوصيل:</span>
                            <span style={{ color: order.deliveryFee > 0 ? C.red : C.gold }}>{order.deliveryFee > 0 ? `+${order.deliveryFee.toLocaleString()} ريال` : 'خدمة مجانية'}</span>
                        </div>
                        {(order.discount || 0) > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#27ae60' }}>
                                <span>الخصم ({order.appliedCoupon}):</span>
                                <span>-{(order.discount).toLocaleString()} ريال</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: 'white', marginTop: '12px', paddingTop: '15px', borderTop: `1px solid rgba(255,255,255,0.1)` }}>
                            <span>الإجمالي الكلي:</span>
                            <span style={{ color: C.gold }}>{(order.total || 0).toLocaleString()} ريال</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#162343', padding: '18px', boxShadow: '0 -8px 25px rgba(0,0,0,0.3)', zIndex: 100, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <button 
                        onClick={() => setShowCancelModal(true)}
                        disabled={order.status === 'cancelled' || order.status === 'delivered'}
                        style={{ 
                            width: '100%', padding: '16px', 
                            background: order.status === 'cancelled' || order.status === 'delivered' ? 'rgba(255,255,255,0.05)' : 'transparent', 
                            color: order.status === 'cancelled' || order.status === 'delivered' ? C.gray : C.red, 
                            border: `2px solid ${order.status === 'cancelled' || order.status === 'delivered' ? 'rgba(255,255,255,0.1)' : C.red}`, 
                            borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: (order.status === 'cancelled' || order.status === 'delivered') ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <XCircleFill /> {order.status === 'cancelled' ? 'الطلب ملغي' : (order.status === 'delivered' ? 'مكتمل - لا يمكن الإلغاء' : 'إلغاء الطلب')}
                    </button>
                </div>
            </div>

            {/* Cancel Popup */}
            {showCancelModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
                    <div style={{ background: '#162343', padding: '30px', borderRadius: '25px', width: '100%', maxWidth: '380px', border: `1.5px solid ${C.gold}22` }}>
                        <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '12px', textAlign: 'center', fontWeight: 'bold' }}>تأكيد إلغاء الطلب</h3>
                        <p style={{ fontSize: '14px', color: C.gray, marginBottom: '25px', textAlign: 'center', lineHeight: '1.6' }}>هل أنت متأكد؟ سيتم إخطار المتجر ومندوب التوصيل فوراً.</p>
                        
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', fontSize: '13px', color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>ملاحظة الإلغاء:</label>
                            <textarea 
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="اكتب السبب هنا..."
                                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: `1px solid rgba(255,255,255,0.1)`, minHeight: '100px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={handleConfirmCancel} style={{ flex: 1, padding: '14px', background: C.red, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>نعم، إلغاء</button>
                            <button onClick={() => setShowCancelModal(false)} style={{ flex: 1, padding: '14px', background: 'transparent', color: 'white', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>تراجع</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
