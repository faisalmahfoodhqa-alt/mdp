# تحليل المشروع (واجهة توريد نت الحالية) — مرجع للباك اند

## 1) التقنية الحالية (الفرونت)

- **React + Vite**، حالة الجلسة والبيانات عبر **`localStorage`** (لا مصدر حقيقة مركزي بعد).
- **مصادقة وهمية**: توكن نصي + كائن `user` في `localStorage`؛ كلمات المرور غير مشفّرة في التخزين المحلي.
- يوجد **`src/api/client.js`** (Axios) مع `VITE_API_URL` جاهز للربط لاحقاً.

## 2) الفاعلون (Actors)

| الدور | الوصف |
|--------|--------|
| `customer` | تسجيل، سلّة، طلبات، محفظة، متابعة متاجر، مفضلة |
| `seller` | متجر، منتجات، طلبات، إعدادات توصيل، باقات، إعلانات، توثيق |
| `admin` | لوحة إدارة + `adminRole` (سوبر أدمن / مشرف / موظف) + `adminPermissions` |

## 3) مخازن `localStorage` ↔ كيانات API مقترحة

| المفتاح في المتصفح | الاستخدام | مجموعة MongoDB / مورد REST |
|--------------------|------------|------------------------------|
| `all_users` / `users` | كل الحسابات | **`users`** |
| `user` + `token` | الجلسة الحالية | **`auth`** (JWT) + `GET /users/me` |
| `all_products` / `allProducts` | كتالوج المنصة | **`products`** |
| `all_orders` | طلبات مسطّحة + نسخ داخل `user.orders` | **`orders`** (مصدر واحد للحقيقة) |
| `siteSettings` | اسم الموقع، تواصل، إلخ | **`sitesettings`** (مستند واحد أو مفتاح) |
| `adRequests` | طلبات إعلان | **`adrequests`** (لاحقاً) |
| `planUpgradeRequests` | ترقية باقة | **`planupgraderequests`** (لاحقاً) |
| `change_requests` | تعديلات حساب البائع | **`changerequests`** (لاحقاً) |
| `admin_audit_log` | سجل إجراءات | **`auditlogs`** (لاحقاً) |
| `cart` / `cart_<userId>` | سلة | **`carts`** أو جلسة فقط (لاحقاً) |

## 4) كيان المستخدم (User) — حقول مهمة من `AuthContext`

- عامة: `phone`, `password` (→ **hash** في السيرفر فقط), `fullName`, `displayName`, `role`, `profileImage`, `createdAt`.
- عميل: `orders[]`, `wishlist`, `followedStores`, `walletBalance`, `notifications`.
- بائع: `storeName`, `storeUrl`, `address`, `addressDetails`, `storeLocation`, `plan`, `trialStartDate`, `isPaid`, `isApproved`, `maxProducts`, `deliveryMode`, `hasDelivery`, `deliveryPricePerKm`, `verificationStatus`, …
- أدمن: `adminRole`, `adminPermissions`.

## 5) كيان المنتج (Product)

- يُخزَّن عالمياً في `all_products` مع `sellerId`, `storeName`, حقول العرض (اسم، سعر، صور، قسم، …).
- في الباك اند: **مرجع `sellerId` → `users`**؛ لا حاجة لتكرار المنتج داخل مستند البائع كمصدر حقيقة.

## 6) كيان الطلب (Order)

- من `CheckoutPage`: `customerId`, `customerName`, `customerPhone`, `items[]`, `subTotal`, `deliveryFee`, `total`, `status`, `payment`, `shipping`, `sellerName`, تواريخ، خصومات، إلخ.
- في الباك اند: حفظ كـ **`orders`** مع `customerUserId` (ObjectId) + نسخة denormalized للعرض السريع؛ حقل `payload` اختياري لأي حقول إضافية أثناء الانتقال.

## 7) تدفقات يجب أن يغطيها الـ API (أولوية)

1. تسجيل عميل / بائع + تسجيل دخول + JWT.  
2. الملف الشخصي `PATCH /users/me`.  
3. منتجات: قائمة عامة، CRUD للبائع.  
4. طلب: إنشاء من عميل، قائمة حسب الدور.  
5. إدارة: قائمة مستخدمين (توسعة لاحقاً للصلاحيات الدقيقة مثل `rbac.js`).

## 8) ملاحظات أمان (إلزامية عند الإنتاج)

- لا تُرجع **كلمة المرور** أو الـ hash في JSON.  
- فرض **RBAC على السيرفر** (لا يكتفي بتخفي الأزرار في React).  
- HTTPS، حدود طلبات على `/auth/login`، أسرار من `.env`.

---

هذا الملف يصف **الواقع الحالي للفرونت**؛ تنفيذ الباك اند في `../src` يطبّق النواة أعلاه ويمكن توسيعته تدريجياً.
