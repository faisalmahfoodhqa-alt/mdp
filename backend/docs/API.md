# API v1 — ملخص المسارات

الأساس: `http://localhost:5000/api/v1`  
الاستجابة الناجحة: `{ "success": true, "data": { ... } }`  
الخطأ: `{ "success": false, "error": "..." }`

## صحة الخدمة

| الطريقة | المسار | وصف |
|---------|--------|-----|
| GET | `/health` | فحص التشغيل |

## مصادقة

| الطريقة | المسار | جسم الطلب | ملاحظات |
|---------|--------|------------|----------|
| POST | `/auth/register` | `{ "role":"customer"\|"seller", "phone", "password", "fullName", ... }` | عميل أو بائع |
| POST | `/auth/login` | `{ "phone", "password" }` | يعيد `token` + `user` |
| GET | `/auth/check-phone?phone=` | — | `{ exists, field }` |
| GET | `/auth/me` | — | هيدر Bearer |

## المستخدم (جلسة)

| الطريقة | المسار | ملاحظات |
|---------|--------|----------|
| PATCH | `/users/me` | تحديث الحقول المسموحة (لا يغيّر `role`/`phone` من هنا) |

## المنتجات

| الطريقة | المسار | صلاحية |
|---------|--------|---------|
| GET | `/products?page=&limit=&q=&sellerId=` | عام |
| GET | `/products/:id` | عام |
| POST | `/products` | بائع أو أدمن |
| PATCH | `/products/:id` | مالك المنتج أو أدمن |
| DELETE | `/products/:id` | مالك المنتج أو أدمن |

## الطلبات

| الطريقة | المسار | صلاحية |
|---------|--------|---------|
| GET | `/orders` | مسجّل (عميل: طلباته، بائع: حسب اسم المتجر، أدمن: الكل ضمن حد) |
| POST | `/orders` | عميل — جسم يطابق تقريباً كائن الطلب من `CheckoutPage` |
| PATCH | `/orders/:id/status` | بائع (طلب متجره) أو أدمن |

## إعدادات الموقع

| الطريقة | المسار | صلاحية |
|---------|--------|---------|
| GET | `/settings` | عام |
| PATCH | `/admin/site-settings` | أدمن |

## إدارة (أدمن)

| الطريقة | المسار | ملاحظات |
|---------|--------|----------|
| GET | `/admin/users?role=&page=&limit=` | قائمة مستخدمين |
| PATCH | `/admin/users/:id` | تعديل حقول مستخدم (مثلاً `isLocked`, `plan`) |

---

**توسعة لاحقة:** `adRequests`, `planUpgradeRequests`, `change_requests`, `audit_logs` — يمكن إضافتها كنفس النمط (model + service + routes).
