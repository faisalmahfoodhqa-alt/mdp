# tawreeed-api — باك اند منفصل (Express + MongoDB)

## المتطلبات

- Node.js 18+
- MongoDB محلي أو Atlas (`MONGODB_URI`)

## التشغيل السريع

```bash
cd backend
cp .env.example .env
# عدّل MONGODB_URI و JWT_SECRET و (اختياري) BOOTSTRAP_ADMIN_*

npm install
npm run dev
```

- الخادم الافتراضي: `http://localhost:5000`
- فحص: `GET http://localhost:5000/api/v1/health`

## الهيكل

```
src/
  app.js              # Express + وسطيات عامة
  server.js           # اتصال قاعدة البيانات + listen
  config/             # env, db
  models/             # Mongoose: User, Product, Order, SiteSettings
  routes/v1/          # مسارات الإصدار الأول
  controllers/        # ربط HTTP ↔ services
  services/           # منطق العمل
  middleware/         # JWT، أدوار، معالج أخطاء
  utils/
```

## الوثائق

- `docs/PROJECT_ANALYSIS.md` — تحليل الواجهة الحالية ومطابقة الكيانات
- `docs/API.md` — جدول المسارات
- `docs/FRONTEND_INTEGRATION.md` — ربط Vite/React بـ `VITE_API_URL`

## الأمان

- كلمات المرور: **bcrypt** فقط في الحقل `passwordHash` (لا تُرجع في JSON).
- الجلسات: **JWT** في الهيدر `Authorization: Bearer <token>`.
- في الإنتاج: عيّن `JWT_SECRET` قوياً، وفعّل HTTPS، وقيّد `CORS_ORIGIN`.
