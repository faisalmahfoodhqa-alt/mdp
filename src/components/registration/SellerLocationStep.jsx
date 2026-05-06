import React from 'react';
import LocationPicker from '../common/LocationPicker';
import { UIButton } from '../../shared/components/ui';

const SellerLocationStep = ({
  sellerData,
  setSellerData,
  yemenStates = [],
  colors,
  fieldErrors = {},
  onSubmit,
  onBack,
}) => {
  const handleLocationSelect = (data) => {
    if (sellerData.storeLocation?.lat !== data.lat || sellerData.storeLocation?.lng !== data.lng) {
      setSellerData({
        ...sellerData,
        addressDetails: sellerData.addressDetails,
        storeLocation: { lat: data.lat, lng: data.lng }
      });
    }
  };

  const isStepValid = () => {
    const isStateSelected = !!sellerData.address.state;
    const isAddressFilled = sellerData.addressDetails?.trim().length > 5;
    const isLocationMoved = sellerData.storeLocation?.lat !== 15.352 || sellerData.storeLocation?.lng !== 44.207;
    return isStateSelected && isAddressFilled && isLocationMoved;
  };

  const gx = 'clamp(10px, 4vw, 22px)';
  /** هامش جانبي صغير ويتقلص مع عرض الشاشة (جوال بحافة قريبة من الشاشة) */
  const hPad = `0 ${gx}`;

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: hPad }}>
        <h2 style={{ color: colors.primary, fontSize: '22px', marginBottom: '5px', fontWeight: '800' }}>موقع المتجر</h2>
        <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>حدد موقع متجرك بدقة على الخريطة</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 2. الخريطة - ممسوحة تماماً بدون أي هوامش جانبية */}
        <div style={{ margin: '0', position: 'relative', width: '100%' }}>
          <div style={{ 
            borderRadius: '0', 
            overflow: 'hidden', 
            borderTop: `1px solid ${colors.gold}30`, 
            borderBottom: `1px solid ${colors.gold}30`, 
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            background: 'white'
          }}>
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              initialLocation={sellerData.storeLocation}
              label={null}
              edgeToEdgeMap
            />
          </div>
          {/* تعليمات الخريطة - نعيد لها المسافة الجانبية */}
          <div style={{ padding: `10px ${gx} 0`, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '11px', color: '#888', fontWeight: '500' }}>
              💡 اسحب الدبوس لتحديد مكان متجرك بدقة
            </p>
          </div>
        </div>

        {/* 3. باقي العناصر - نغلفها بمسافة جانبية (20px) لتبقى منظمة */}
        <div style={{ padding: hPad, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* المحافظة */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: colors.primary }}>
              المحافظة <span style={{ color: colors.red }}>*</span>
            </label>
            <select
              value={sellerData.address.state}
              onChange={(e) => setSellerData({ ...sellerData, address: { ...sellerData.address, state: e.target.value } })}
              style={{ 
                width: '100%', 
                padding: '15px', 
                borderRadius: '12px', 
                border: `2px solid ${fieldErrors?.state ? colors.red : colors.border}`, 
                outline: 'none',
                fontSize: '15px',
                background: 'white'
              }}
            >
              <option value="">اختر المحافظة</option>
              {yemenStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* تفاصيل العنوان */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: colors.primary }}>
              وصف العنوان بدقة <span style={{ color: colors.red }}>*</span>
            </label>
            <textarea
              placeholder="مثال: شارع تعز - خلف فندق السعيد"
              value={sellerData.addressDetails}
              onChange={(e) => setSellerData({ ...sellerData, addressDetails: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '15px', 
                borderRadius: '12px', 
                border: `2px solid ${colors.border}`, 
                outline: 'none', 
                minHeight: '80px', 
                resize: 'none',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* أزرار التحكم */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <UIButton
              type="button"
              disabled={!isStepValid()}
              onClick={onSubmit}
              style={{ 
                flex: 2, 
                padding: '18px', 
                background: isStepValid() ? colors.gold : '#ccc', 
                border: 'none', 
                borderRadius: '15px', 
                color: colors.primary, 
                fontWeight: '900', 
                fontSize: '18px', 
                cursor: isStepValid() ? 'pointer' : 'not-allowed'
              }}
            >
              تأكيد المتابعة ←
            </UIButton>
            <UIButton
              type="button"
              onClick={onBack}
              style={{ 
                flex: 1, 
                padding: '18px', 
                background: 'transparent', 
                border: `2px solid ${colors.gold}`, 
                borderRadius: '15px', 
                color: colors.gold, 
                fontWeight: '900', 
                fontSize: '16px'
              }}
            >
              رجوع
            </UIButton>
          </div>
        </div>
      </div>
      
      {!isStepValid() && (
        <div style={{ margin: `0 ${gx} 20px`, padding: '12px', background: `${colors.red}10`, borderRadius: '10px', color: colors.red, fontSize: '12px', textAlign: 'center' }}>
          يرجى تحديد الموقع على الخريطة واختيار المحافظة
        </div>
      )}
    </div>
  );

};

export default SellerLocationStep;
