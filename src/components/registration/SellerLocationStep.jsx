import React from 'react';
import { PinMap, GeoAlt } from 'react-bootstrap-icons';
import LocationPicker from '../common/LocationPicker';

const SellerLocationStep = ({ 
  sellerData, 
  setSellerData, 
  yemenStates = [], 
  colors, 
  fieldErrors = {}, 
  onSubmit, 
  onBack 
}) => {
  const handleLocationSelect = (data) => {
    // تحديث الموقع فقط إذا كان هناك تغيير فعلي
    if (sellerData.storeLocation?.lat !== data.lat || sellerData.storeLocation?.lng !== data.lng) {
      setSellerData({
        ...sellerData,
        addressDetails: sellerData.addressDetails, // الحفاظ على العنوان اليدوي
        storeLocation: { lat: data.lat, lng: data.lng }
      });
    }
  };

  // التحقق من صحة الخطوة: يجب اختيار المحافظة + كتابة وصف + تغيير موقع الخريطة الافتراضي
  const isStepValid = () => {
    const isStateSelected = !!sellerData.address.state;
    const isAddressFilled = sellerData.addressDetails?.trim().length > 10;
    // نعتبر الموقع محدد إذا لم يكن هو الموقع الافتراضي تماماً (أو إذا تم التفاعل معه)
    const isLocationMoved = sellerData.storeLocation?.lat !== 15.352 || sellerData.storeLocation?.lng !== 44.207;
    
    return isStateSelected && isAddressFilled && isLocationMoved;
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: colors.primary, fontSize: '28px', marginBottom: '10px', fontWeight: '800' }}>موقع المتجر</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>حدد موقع متجرك وتفاصيل العنوان ليسهل على العملاء العثور عليك</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        {/* الخريطة الحقيقية */}
        <div style={{ marginBottom: '10px', margin: '0 -40px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px', 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: colors.primary, 
            padding: '0 40px' 
          }}>
            تحديد الموقع على الخريطة <span style={{ color: colors.red }}>*</span>
            {(sellerData.storeLocation?.lat !== 15.352 || sellerData.storeLocation?.lng !== 44.207) && (
              <span style={{ color: '#28a745', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GeoAlt size={14} /> تم التحديد بنجاح
              </span>
            )}
          </label>
          
          <div style={{ 
            borderRadius: '0', 
            overflow: 'hidden', 
            borderTop: `1px solid ${colors.gold}30`, 
            borderBottom: `1px solid ${colors.gold}30`, 
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            background: 'white'
          }}>
            <LocationPicker 
              onLocationSelect={handleLocationSelect} 
              initialLocation={sellerData.storeLocation}
              label={null}
            />
          </div>
          
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#888', textAlign: 'center', fontWeight: '500', padding: '0 40px' }}>
            💡 يمكنك سحب الدبوس أو الضغط على الخريطة لتحديد الموقع بدقة
          </p>
        </div>

        {/* تفاصيل العنوان */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: colors.primary }}>
            تفاصيل العنوان بوصف دقيق <span style={{ color: colors.red }}>*</span>
          </label>
          <textarea
            placeholder="مثال: صنعاء - شارع تعز - بجوار مطعم الأخضر"
            value={sellerData.addressDetails}
            onChange={(e) => setSellerData({ ...sellerData, addressDetails: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '15px', 
              borderRadius: '12px', 
              border: `2px solid ${colors.border}`, 
              outline: 'none', 
              minHeight: '80px', 
              resize: 'vertical',
              fontSize: '15px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
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
              cursor: isStepValid() ? 'pointer' : 'not-allowed',
              boxShadow: isStepValid() ? `0 8px 20px ${colors.gold}30` : 'none',
              opacity: isStepValid() ? 1 : 0.7,
              transition: 'all 0.3s ease'
            }}
          >
            المتابعة ←
          </button>
          <button
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
              fontSize: '16px', 
              cursor: 'pointer' 
            }}
          >
            رجوع
          </button>
        </div>
      </div>
      
      {!isStepValid() && (
        <div style={{ marginTop: '15px', padding: '12px', background: `${colors.red}10`, borderRadius: '10px', color: colors.red, fontSize: '13px', textAlign: 'center' }}>
          يرجى إكمال البيانات المطلوبة وتحديد الموقع على الخريطة لتتمكن من المتابعة
        </div>
      )}
    </div>
  );
};

export default SellerLocationStep;
