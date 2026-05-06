# ربط الواجهة (Vite/React) بالـ API

## 1) عنوان الـ API

في جذر مشروع الواجهة أنشئ أو عدّل `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

ملاحظة: `src/api/client.js` يستخدم `VITE_API_URL` كـ `baseURL` لـ Axios، لذا يجب أن يشمل **`/api/v1`** حتى تكون الطلبات مثل:

- `POST ${VITE_API_URL}/auth/login` → `http://localhost:5000/api/v1/auth/login`

## 2) التوكن

الباك اند يعيد `data.token` (JWT). خزّنه كما تفعل اليوم:

```js
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

مُعترض Axios الحالي يضيف `Authorization: Bearer` — متوافق.

## 3) ما الذي ما زال على الواجهة؟

حالياً **AuthContext** وغيره يقرأون `all_users` و`all_products` من `localStorage`.  
الخطوة التالية (يمكن تنفيذها تدريجياً):

| الوظيفة الحالية | استبدال مقترح |
|-------------------|----------------|
| `login` | `POST /auth/login` |
| `registerCustomer` / `registerSeller` | `POST /auth/register` |
| `updateUser` | `PATCH /users/me` + تحديث `user` في الحالة |
| قائمة المنتجات العامة | `GET /products` |
| إضافة/تعديل منتج بائع | `POST/PATCH/DELETE /products` |
| إتمام الطلب | `POST /orders` |
| لوحة الأدمن للمستخدمين | `GET/PATCH /admin/users` |

حتى تنتهي الهجرة، يمكن الإبقاء على **وضع هجين**: قراءة من API عند توفر `VITE_API_URL` وإلا من `localStorage`.

## 4) معرّفات MongoDB

الباك اند يعيد `user.id` كنص (`_id`). الواجهة الحالية تستخدم أحياناً أرقاماً من `Date.now()`. عند الربط الكامل استخدم **`id` كنص** أو وحّد الحقول في الواجهة.

## 5) CORS

تأكد أن `CORS_ORIGIN` في `.env` الخاص بالباك اند يطابق منفذ Vite (مثلاً `http://localhost:5173`).
