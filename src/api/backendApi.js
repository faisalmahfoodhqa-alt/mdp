import apiClient from './client';

/** Axios يضع رسالة بالإنجليزية عندما لا يصل الطلب للخادم (سيرفر متوقف، CORS، عنوان خاطئ، إلخ). */
function readableRequestError(e) {
  const fromBody = e.response?.data?.error;
  if (fromBody && String(fromBody).trim()) return String(fromBody);
  const st = e.response?.status;
  if (st === 502 || st === 503 || st === 504) {
    return 'خادم الـAPI غير متاح. تأكّد أن الخادم يعمل وأن MongoDB متصل.';
  }
  const code = e.code;
  const m = String(e.message || '').toLowerCase();
  if (code === 'ERR_NETWORK' || m === 'network error' || m.includes('network error'))
    return 'تعذر الاتصال بالخادم. تأكد أن خادم الـAPI يعمل، وأن VITE_API_URL صحيح، وأن المتصفح يسمح بالطلب (CORS)';
  if (code === 'ECONNABORTED' || m.includes('timeout'))
    return 'انتهت مهلة الاتصال بالخادم، حاول مرة أخرى.';
  return e.message || 'خطأ في الشبكة';
}

async function unwrap(promise) {
  try {
    const res = await promise;
    const d = res.data;
    if (d && d.success === false) throw new Error(d.error || 'فشل الطلب');
    return d.data;
  } catch (e) {
    throw new Error(readableRequestError(e));
  }
}

export const backendApi = {
  login: (phone, password) => unwrap(apiClient.post('/auth/login', { phone, password })),
  register: (body) => unwrap(apiClient.post('/auth/register', body)),
  logout: () => unwrap(apiClient.post('/auth/logout')),
  me: () => unwrap(apiClient.get('/auth/me')),
  checkPhone: (phone) => unwrap(apiClient.get('/auth/check-phone', { params: { phone } })),
  resetPasswordPhone: (phone, password) =>
    unwrap(apiClient.post('/auth/reset-password-phone', { phone, password })),
  patchMe: (body) => unwrap(apiClient.patch('/users/me', body)),
  listProducts: (params) => unwrap(apiClient.get('/products', { params })),
  getProduct: (id) => unwrap(apiClient.get(`/products/${id}`)),
  createProduct: (body) => unwrap(apiClient.post('/products', body)),
  updateProduct: (id, body) => unwrap(apiClient.patch(`/products/${id}`, body)),
  deleteProduct: (id) => unwrap(apiClient.delete(`/products/${id}`)),
  createOrder: (body) => unwrap(apiClient.post('/orders', body)),
  listOrders: () => unwrap(apiClient.get('/orders')),
  patchOrderStatus: (id, status) => unwrap(apiClient.patch(`/orders/${id}/status`, { status })),
  getSiteSettings: () => unwrap(apiClient.get('/settings')),
  adminSnapshot: () => unwrap(apiClient.get('/admin/snapshot')),
  adminSyncUsers: (users) => unwrap(apiClient.post('/admin/sync/users', { users })),
  adminSyncProducts: (products) => unwrap(apiClient.post('/admin/sync/products', { products })),
  adminSyncOrders: (orders) => unwrap(apiClient.post('/admin/sync/orders', { orders })),
  adminSyncExtras: (body) => unwrap(apiClient.post('/admin/sync/extras', body)),
  adminAppendAudit: (body) => unwrap(apiClient.post('/admin/audit-log', body)),
  /** تنزيل ملف JSON للنسخ الاحتياطي — يستعمل responseType blob */
  adminBackupExport: () => apiClient.get('/admin/backup/export', { responseType: 'blob' }),
  adminPlatformDeliveryQueue: () => unwrap(apiClient.get('/admin/platform-delivery-queue')),
  adminPatchUser: (id, body) => unwrap(apiClient.patch(`/admin/users/${id}`, body)),
  adminDeleteUser: (id) => unwrap(apiClient.delete(`/admin/users/${id}`)),
  sellerAdRequest: (body) => unwrap(apiClient.post('/seller/ad-requests', body)),
  sellerPlanRequest: (body) => unwrap(apiClient.post('/seller/plan-requests', body)),
  sellerChangeRequest: (body) => unwrap(apiClient.post('/seller/change-requests', body))
};
