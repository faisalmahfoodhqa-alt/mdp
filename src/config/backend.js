/** متغير البيئة يفعّل الاتصال بالـ API (معطّل صراحةً بـ VITE_USE_BACKEND=false). */
export const useBackend = import.meta.env.VITE_USE_BACKEND !== 'false';

/**
 * يبني الرابط الصحيح لـ /api/v1 حتى لو كان VITE_API_URL=http://localhost:5000/api فقط.
 * بدون VITE_API_URL: مسار نسبي `/api/v1` يمر عبر proxy في Vite (dev و preview) — يعمل من الجوال على IP الشبكة.
 * في التطوير: إن فتحت الموقع من IP الشبكة وكان في .env عنوان localhost للـAPI، نتجاهله لأن الهاتف لا يصل لـ localhost جهازك.
 */
export function resolveApiBaseUrl() {
  let raw = (import.meta.env.VITE_API_URL || '').trim();

  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    const h = window.location.hostname;
    const openedFromLan = h !== 'localhost' && h !== '127.0.0.1';
    if (openedFromLan && raw && /localhost|127\.0\.0\.1/i.test(raw)) {
      raw = '';
    }
  }

  if (!raw) {
    return '/api/v1';
  }

  const base = raw.replace(/\/$/, '');
  if (base.endsWith('/v1')) return base;
  if (base.endsWith('/api')) return `${base}/v1`;
  return `${base}/v1`;
}

/** مستخدمون/منتجات برقم تعريف Mongo صالح فقط — لمزامنة الإدارة الجماعية */
export function filterMongoDocRows(rows) {
  const idOk = (id) => typeof id === 'string' && /^[a-f0-9]{24}$/i.test(id);
  return (rows || []).filter((r) => idOk(String(r?.id || r?._id || '')));
}
