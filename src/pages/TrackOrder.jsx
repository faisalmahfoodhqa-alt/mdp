import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleFill, Truck, BoxSeam, Receipt, ArrowRight } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { UIButton } from '../shared/components/ui';

const TrackOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);

    const colors = {
        primary: '#0a1a3a',
        gold: '#c88c23',
        gray: '#ffffff88',
        accent: '#c88c23', // اللون الذهبي بدلاً من الأخضر
        cardBg: '#162343',
        text: '#ffffff'
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
                deliveryTime: { day: 'اليوم', time: '10:00' }
            });
        }
    }, [user, orderId, navigate]);

    if (!order) return <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>جاري التحميل...</div>;

    const steps = [
        { id: 'pending', label: 'تم الطلب', icon: <Receipt size={24} /> },
        { id: 'processing', label: 'جاري التجهيز', icon: <BoxSeam size={24} /> },
        { id: 'shipping', label: 'في الطريق', icon: <Truck size={24} /> },
        { id: 'delivered', label: 'تم التسليم', icon: <CheckCircleFill size={24} /> }
    ];

    let currentStepIdx = 0;
    if (order.status === 'processing') currentStepIdx = 1;
    if (order.status === 'shipping') currentStepIdx = 2;
    if (order.status === 'delivered') currentStepIdx = 3;

    return (
        <div style={{ direction: 'rtl', minHeight: '100vh', background: colors.primary, padding: '0 0 40px 0' }}>
            
            {/* Header with Back Button */}
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
                <UIButton 
                  onClick={() => navigate(-1)} 
                  style={{ background: 'transparent', border: `1px solid ${colors.gold}40`, padding: '8px', borderRadius: '12px', cursor: 'pointer', display: 'flex' }}
                >
                    <ArrowRight size={22} color={colors.gold} />
                </UIButton>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 15px' }}>
                <div style={{ background: colors.cardBg, borderRadius: '25px', padding: '35px 25px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: `1px solid ${colors.gold}15` }}>
                    <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                        <h2 style={{ fontSize: '26px', color: 'white', fontWeight: '900', marginBottom: '15px' }}>تسليم طلبك</h2>
                        <div style={{ padding: '12px 20px', borderRadius: '15px', background: `${colors.gold}10`, border: `1px solid ${colors.gold}20`, display: 'inline-block', marginBottom: '15px' }}>
                           <span style={{ fontSize: '15px', color: colors.gold, fontWeight: 'bold' }}>
                               الوقت المقدر: <strong style={{ color: 'white' }}>{order.deliveryTime?.day} {order.deliveryTime?.time || ''}</strong>
                           </span>
                        </div>
                        <p style={{ fontSize: '14px', color: colors.gray, fontWeight: 'bold' }}>رقم الطلب: <span style={{ color: colors.gold }}>{order.id}</span></p>
                    </div>

                    {/* Progress Tracker */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                        {/* Connecting Line */}
                        <div style={{ position: 'absolute', top: '25px', left: '10%', right: '10%', height: '3px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}>
                            <div style={{ height: '100%', background: colors.gold, width: `${(currentStepIdx / (steps.length - 1)) * 100}%`, transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 10px ${colors.gold}` }} />
                        </div>
                        
                        {steps.map((step, idx) => {
                            const isActive = idx <= currentStepIdx;
                            const isCurrent = idx === currentStepIdx;
                            
                            return (
                                <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '25%' }}>
                                    <div style={{ 
                                        width: '52px', height: '52px', borderRadius: '50%', 
                                        background: isActive ? colors.gold : colors.primary,
                                        border: `3px solid ${isActive ? colors.gold : '#ffffff15'}`,
                                        color: isActive ? 'white' : colors.gray,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '15px', transition: 'all 0.4s ease',
                                        boxShadow: isCurrent ? `0 0 20px ${colors.gold}60` : 'none',
                                        transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                                    }}>
                                        {step.icon}
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: isCurrent ? '900' : 'bold', color: isActive ? 'white' : colors.gray, textAlign: 'center' }}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                        <UIButton 
                            onClick={() => navigate('/')}
                            style={{ flex: 1, padding: '16px', background: 'transparent', color: 'white', border: `1.5px solid ${colors.gold}40`, borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                        >
                            الرئيسية
                        </UIButton>
                        <UIButton 
                             onClick={() => navigate('/orders')} 
                             style={{ flex: 1, padding: '16px', background: colors.gold, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: `0 8px 15px rgba(200, 140, 35, 0.2)` }}
                        >
                            قائمة طلباتي
                        </UIButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
