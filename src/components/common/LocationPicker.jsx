import React, { useState, useEffect, useRef } from 'react';
import { Crosshair, GeoAlt, Check2Circle, PinMap } from 'react-bootstrap-icons';

// مفتاح Google Maps - ضع مفتاحك هنا
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationPicker = ({ onLocationSelect, initialLocation, label = "حدد الموقع على الخريطة" }) => {
  const SANAA_DEFAULT = { lat: 15.3694, lng: 44.1910 };
  const [coords, setCoords] = useState(() => {
    if (initialLocation && typeof initialLocation.lat === 'number' && typeof initialLocation.lng === 'number') {
      return initialLocation;
    }
    return SANAA_DEFAULT;
  });
  const [address, setAddress] = useState("جاري التحميل...");
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    border: '#e8ecf0',
    bg: '#f0f2f7'
  };

  // تحميل خريطة جوجل API مع معالجة الخطأ
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // إذا كانت جوجل محملة مسبقاً، نتحقق من جاهزيتها
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // الانتظار إذا كان هناك سكريبت قيد التحميل بالفعل
    const existingScript = document.querySelector('#google-maps-script');
    if (existingScript) {
      // ننتظر تحميل السكريبت الموجود بدلاً من حذفه
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          setMapLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 500);
      return () => clearInterval(checkLoaded);
    }

    const timeoutId = setTimeout(() => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps failed to load (timeout)");
        setMapError(true);
      }
    }, 15000); // زيادة المهلة إلى 15 ثانية

    // تعريف التابع العالمي قبل تحميل السكريبت
    window.initMap = () => {
      console.log("✅ Google Maps initialized successfully");
      setMapLoaded(true);
      setMapError(false);
      clearTimeout(timeoutId);
    };

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    // إضافة timestamp للرابط لإجبار المتصفح على التحميل الجديد
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&language=ar&region=YE&v=weekly&t=${new Date().getTime()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("❌ Google Maps script load error");
      setMapError(true);
      clearTimeout(timeoutId);
    };

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      // لا نحذف initMap هنا للسماح للسكريبت المتأخر بالوصول إليه إذا لزم الأمر
    };
  }, [GOOGLE_MAPS_API_KEY]);

  // تهيئة الخريطة بعد تحميل API
  useEffect(() => {
    if (!mapLoaded || !window.google || !mapRef.current || mapError) return;
    if (mapInstance.current) return;

    try {
      // إنشاء الخريطة
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: coords.lat, lng: coords.lng },
        zoom: 16,
        mapTypeId: 'roadmap',
        disableDefaultUI: true, // تعطيل الأزرار الافتراضية
        mapTypeControl: true, // إعادة خيار القمر الاصطناعي
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        gestureHandling: 'greedy'
      });

      // إضافة Marker (دبوس) قابل للسحب
      markerRef.current = new window.google.maps.Marker({
        position: { lat: coords.lat, lng: coords.lng },
        map: mapInstance.current,
        draggable: true, // يمكن سحبه
        animation: window.google.maps.Animation.DROP,
      });

      // عند سحب الدبوس
      markerRef.current.addListener('dragend', () => {
        const position = markerRef.current.getPosition();
        const newCoords = { lat: position.lat(), lng: position.lng() };
        setCoords(newCoords);
        updateLocationMetadata(newCoords.lat, newCoords.lng);
      });

      // عند النقر على الخريطة
      mapInstance.current.addListener('click', (e) => {
        const newCoords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setCoords(newCoords);
        markerRef.current.setPosition(newCoords);
        updateLocationMetadata(newCoords.lat, newCoords.lng);
      });
    } catch (e) {
      console.error("Error initializing map instance:", e);
      setMapError(true);
    }

  }, [mapLoaded, mapError]);

  // تحديث الخريطة عند تغيير الإحداثيات
  useEffect(() => {
    if (mapInstance.current && markerRef.current && !mapError) {
      mapInstance.current.panTo({ lat: coords.lat, lng: coords.lng });
      markerRef.current.setPosition({ lat: coords.lat, lng: coords.lng });
    }
  }, [coords, mapError]);

  // الحصول على العنوان من الإحداثيات
  const updateLocationMetadata = async (lat, lng) => {
    if (mapError) {
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      if (onLocationSelect) onLocationSelect({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=ar`);
      const data = await response.json();
      if (data && data.status === 'OK' && data.results && data.results[0]) {
        const fullAddress = data.results[0].formatted_address;
        setAddress(fullAddress);
        if (onLocationSelect) {
          onLocationSelect({ lat, lng, address: fullAddress });
        }
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        if (onLocationSelect) {
          onLocationSelect({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
        }
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      if (onLocationSelect) {
        onLocationSelect({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // الحصول على الموقع الحالي للمستخدم
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoords = { lat: latitude, lng: longitude };
          setCoords(newCoords);
          updateLocationMetadata(latitude, longitude);
          if (window.showToast) {
            window.showToast('تم تحديد موقعك الحالي بنجاح', 'success');
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
          // Fallback if geolocation fails
          if (!coords.lat) setCoords(SANAA_DEFAULT);
          if (window.showToast) {
            window.showToast('تعذر تحديد موقعك بدقة، تم استخدام الموقع الافتراضي', 'info');
          }
        }
      );
    }
  };

  useEffect(() => {
    // إذا لم يكن هناك موقع ابتدائي ممرر، نحاول تحديد الموقع تلقائياً
    if (!initialLocation || !initialLocation.lat) {
      getCurrentLocation();
    }
    // لا نستدعي updateLocationMetadata هنا لتجنب الحلقات اللانهائية عند فتح الصفحة
  }, []);

  // إذا فشلت الخريطة، نعرض الواجهة البديلة (نفس اللي في التسجيل)
  if (mapError) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: colors.primary, background: 'white', borderRadius: '16px' }}>
        <div style={{ color: colors.gold, marginBottom: '15px' }}><PinMap size={48} /></div>
        <h3>عذراً، تعذر تحميل الخريطة</h3>
        <p>يرجى التحقق من اتصال الإنترنت أو المحاولة لاحقاً</p>
        <button onClick={() => window.location.reload()} style={{ background: colors.gold, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', direction: 'rtl', boxSizing: 'border-box' }}>
      {/* زر تحديد الموقع الحالي */}
      <div style={{ padding: '0 0 15px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={getCurrentLocation}
          style={{
            background: 'rgba(200, 140, 35, 0.15)',
            color: '#c88c23',
            border: '1px solid rgba(200, 140, 35, 0.3)',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Crosshair size={18} /> 📍 تحديد موقعي الحالي
        </button>
      </div>

      {/* الخريطة التفاعلية */}
      <div style={{
        margin: '0',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        height: '450px',
        position: 'relative'
      }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        {!mapLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#1a2b4b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c88c23',
            borderRadius: '16px',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid rgba(200,140,35,0.2)', borderTopColor: '#c88c23', borderRadius: '50%', animation: 'spinner 1s linear infinite' }} />
            جاري تحميل الخريطة...
          </div>
        )}
      </div>

      {/* تم إزالة التعليمات المتكررة */}
    </div>
  );
};

export default LocationPicker;
