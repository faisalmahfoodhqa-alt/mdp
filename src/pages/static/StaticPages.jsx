import React from 'react';

const StaticPage = ({ title, children }) => {
  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    lightGray: '#f8f9fa',
    white: '#ffffff',
    text: '#333'
  };

  return (
    <div style={{ direction: 'rtl', minHeight: '100vh', background: colors.lightGray, padding: '50px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: colors.white, padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: colors.primary, fontSize: '28px', marginBottom: '30px', borderBottom: `3px solid ${colors.gold}`, paddingBottom: '15px' }}>{title}</h1>
        <div style={{ color: colors.text, lineHeight: '1.8', fontSize: '16px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const About = () => (
  <StaticPage title="من نحن">
    <p>توريد نت (Tawreed Net) هي المنصة الرقمية الأولى لتوريد الموارد والخدمات في اليمن. نحن منصة رائدة تهدف إلى ربط الموردين والمصانع وتجار الجملة بجميع فئات العملاء في السوق اليمني.</p>
    <h3 style={{ color: '#c88c23', marginTop: '25px' }}>رؤيتنا</h3>
    <p>أن نكون الوسيط الرقمي الأكثر موثوقية وكفاءة في السوق اليمني لتوفير الوقت والجهد على التجار والعملاء على حد سواء.</p>
    <p>تسهيل وصول العملاء للمنتجات والخدمات التي يحتاجونها بأفضل الأسعار وأقل جهد ممكن، مع توفير واجهة تقنية متطورة للبائعين لإدارة تجارتهم.</p>
    <h3 style={{ color: '#c88c23', marginTop: '25px' }}>لأصحاب المحلات والتجار</h3>
    <p>نحن نوفر لأصحاب المحلات التجارية فرصة ذهبية لفتح متاجر إلكترونية احترافية عبر الإنترنت، مما يمكنهم من الوصول لآلاف العملاء في جميع أنحاء الجمهورية، وإدارة مخزونهم ومبيعاتهم بكل سهولة ويسر من خلال لوحة تحكم ذكية وشاملة.</p>
  </StaticPage>
);

export const Privacy = () => (
  <StaticPage title="سياسة الخصوصية">
    <p>نحن في توريد نت نولي أهمية قصوى لخصوصية بياناتك. نوضح أدناه كيف نقوم بجمع وحماية بياناتك الشخصية:</p>
    <ul style={{ paddingRight: '20px', marginTop: '15px' }}>
      <li>يتم جمع البيانات الأساسية (الاسم، الجوال) لغرض إتمام عمليات الشراء.</li>
      <li>لا نقوم بمشاركة بياناتك مع أي طرف ثالث خارج إطار منصة توريد ومناديب التوصيل.</li>
      <li>نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة تصفحك وتخصيص العروض.</li>
      <li>بيانات الدفع الإلكتروني يتم معالجتها عبر بوابات دفع آمنة ولا نحتفظ بكلمات سر محافظك.</li>
    </ul>
  </StaticPage>
);

export const Terms = () => (
  <StaticPage title="شروط الاستخدام">
    <p>باستخدامك لمنصة توريد نت، فإنك توافق على الشروط التالية:</p>
    <ul style={{ paddingRight: '20px', marginTop: '15px' }}>
      <li>يجب أن تكون المعلومات المقدمة عند التسجيل دقيقة وصحيحة.</li>
      <li>يمنع عرض أي منتجات مخالفة للقانون اليمني أو الأخلاق العامة.</li>
      <li>المنصة لا تتحمل مسؤولية جودة المنتجات المعروضة من قبل التجار، ولكننا نقوم بالتدقيق المستمر.</li>
      <li>سحب الرصيد للبائعين يتم وفقاً للجدول الزمني المحدد في اتفاقية التاجر.</li>
    </ul>
  </StaticPage>
);

export const FAQ = () => (
  <StaticPage title="الأسئلة الشائعة">
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', color: '#0a1a3a' }}>كيف يمكنني التسجيل كتاجر؟</h3>
      <p>يمكنك التوجه لصفحة "سجل كبائع" وملء البيانات المطلوبة وانتظار تفعيل حسابك من قبل الإدارة.</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', color: '#0a1a3a' }}>هل يتوفر الدفع عند الاستلام؟</h3>
      <p>نعم، تتوفر خاصية الدفع عند الاستلام لمعظم المنتجات، بالإضافة لوسائل الدفع الإلكترونية (كريمي، جوال باي، إلخ).</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', color: '#0a1a3a' }}>كم تستغرق عملية التوصيل؟</h3>
      <p>تعتمد فترة التوصيل على موقع التاجر وعنوانك، وعادة ما تستغرق من يوم إلى 3 أيام عمل.</p>
    </div>
  </StaticPage>
);

export const Contact = () => (
  <StaticPage title="تواصل معنا">
    <p>نسعد دائماً بخدمتكم والاستماع لاستفساراتكم. يمكنكم التواصل معنا عبر:</p>
    <div style={{ marginTop: '20px' }}>
      <p>📞 رقم الجوال: 776981756</p>
      <p>📧 البريد الإلكتروني: support@tawreednet.com</p>
      <p>📍 العنوان: صنعاء - عصر - مركز توريد التقني</p>
    </div>
    <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '15px' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>أرسل لنا استفسارك مباشرة</h3>
      <input placeholder="الاسم" style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
      <input placeholder="رقم الجوال" style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
      <textarea placeholder="رسالتك" style={{ display: 'block', width: '100%', padding: '10px', height: '100px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
      <button style={{ width: '100%', padding: '12px', background: '#0a1a3a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>إرسال</button>
    </div>
  </StaticPage>
);

export const News = () => (
  <StaticPage title="مركز الأخبار">
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '20px' }}>
      <span style={{ color: '#c88c23', fontSize: '12px' }}>1 أبريل 2026</span>
      <h3 style={{ fontSize: '18px', margin: '5px 0' }}>إطلاق تحديث " Amazon Style" لمنصة توريد نت</h3>
      <p>تم إطلاق التحديث الجديد الذي يشمل تحسينات كبيرة في تجربة المستخدم ونظام التقييمات...</p>
    </div>
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '20px' }}>
      <span style={{ color: '#c88c23', fontSize: '12px' }}>25 مارس 2026</span>
      <h3 style={{ fontSize: '18px', margin: '5px 0' }}>توسع خدمات التوصيل لتشمل جميع المحافظات اليمنية</h3>
      <p>يسرنا أن نعلن عن زيادة تغطية مناديب التوصيل لتشمل القرى والمناطق النائية...</p>
    </div>
  </StaticPage>
);

export const Affiliate = () => (
  <StaticPage title="التسويق بالعمولة">
    <p>انطلق الآن وحقق أرباحك مع توريد نت! يسمح لك برنامج التسويق بالعمولة بكسب نسبة من المبيعات التي تتم عن طريقك.</p>
    <div style={{ marginTop: '20px', background: '#c88c2315', padding: '20px', borderRadius: '15px' }}>
      <h3 style={{ color: '#c88c23' }}>كيف يعمل؟</h3>
      <ol style={{ paddingRight: '20px' }}>
        <li>اشترك في البرنامج من خلال لوحة المستخدم.</li>
        <li>شارك روابط المنتجات مع أصدقائك أو متابعيك.</li>
        <li>احصل على عمولة عن كل عملية شراء ناجحة تتم عبر رابطك.</li>
      </ol>
      <button style={{ marginTop: '15px', padding: '10px 25px', background: '#c88c23', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>ابدأ الآن</button>
    </div>
  </StaticPage>
);

export const UserGuide = () => (
  <StaticPage title="دليل المستخدم">
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#0a1a3a' }}>1. كيف تشتري من الموقع؟</h3>
      <p>ابحث عن المنتج، اختر المقاس واللون، أضفه للسلة، ثم اذهب لصفحة الدفع وأدخل بيانات الشحن.</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#0a1a3a' }}>2. كيف تدير طلباتك؟</h3>
      <p>من القائمة العلوية، اذهب لـ "الملف الشخصي" ثم "طلباتي" لمتابعة حالة شحن منتجاتك.</p>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#0a1a3a' }}>3. التواصل مع التاجر</h3>
      <p>في صفحة كل منتج يوجد زر "واتساب" يسمح لك بمحادثة التاجر مباشرة للاستفسار.</p>
    </div>
  </StaticPage>
);

export const Disputes = () => (
  <StaticPage title="سياسة النزاعات والاسترجاع">
    <p>نحن نضمن حقك كعميل في الحصول على منتج مطابق للمواصفات:</p>
    <ul style={{ paddingRight: '20px', marginTop: '15px' }}>
      <li>يمكن طلب الاسترجاع خلال 14 يوماً من استلام المنتج إذا كان به عيب مصنعي أو غير مطابق.</li>
      <li>عند وجود نزاع بين البائع والمشتري، تتدخل إدارة توريد نت كحكم للفصل خلال 48 ساعة.</li>
      <li>يتم استرداد المبالغ إلكترونياً لنفس المحفظة التي تم منها الدفع أو كاش حسب طريقة الدفع الأصلية.</li>
    </ul>
  </StaticPage>
);
