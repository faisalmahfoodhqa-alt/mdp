export const C = {
  sidebar: '#0a1a3a',
  sidebarHover: '#1a3a6a',
  gold: '#c88c23',
  goldLight: '#e5a847',
  white: '#ffffff',
  bg: '#f0f2f7',
  card: '#ffffff',
  red: '#e74c3c',
  green: '#27ae60',
  gray: '#6c757d',
  border: '#e8ecf0',
  text: '#1a2a4a',
  textLight: '#8896a5',
  primary: '#0a1a3a',
  orange: '#fd7e14'
};

export const CATEGORY_MAP = {
  'ملابس': {
    'رجالية': {
      'الملابس اليومية': ['تيشيرتات', 'قمصان', 'بناطيل جينز', 'بناطيل قماش', 'شورتات'],
      'الملابس الرسمية': ['بدلات رسمية', 'قمصان رسمية', 'بناطيل رسمية'],
      'الملابس التراثية': ['اثواب', 'شيلان', 'فوط يمنية', 'معوز', 'عمائم وكوفية'],
      'الملابس الداخلية': ['فانيلات داخلية', 'سراويل داخلية', 'ملابس نوم رجالي', 'بيجامات'],
      'الأحذية الرجالية': ['أحذية رسمية', 'أحذية كاجوال', 'صنادل', 'شباشب', 'أحذية رياضية'],
      'الاكسسوارات الرجالية': ['جنابي', 'ساعات', 'خواتم', 'عطور رجالية', 'نظارات شمسية', 'محافظ', 'أحزمة'],
      'الملابس الرياضية': ['أطقم رياضية', 'بناطيل رياضية', 'تيشيرتات رياضية', 'أحذية رياضية'],
      'الأزياء الشتوية': ['جاكيتات جلد', 'جاكيتات قماش ثقيل', 'معاطف طويلة (بالطو)', 'بلوفرات صوف', 'شالات وكوفية']
    },
    'نسائية': {
      'العبايات النسائية': ['عبايات رأس', 'عبايات خليجي', 'عبايات مطرزة', 'عبايات ملونة'],
      'الطرحة واللثام': ['الطرحة القطنية', 'طرحة الشيفون', 'لثام (نقاب)'],
      'الفساتين': ['فستان استقبال', 'فستان سهرة', 'فستان عُرس', 'فستان مشجر', 'فستان ناعم'],
      'جلابيات وأرواب': ['جلابيات قطنية', 'جلابيات مزخرفة', 'دراعة مزخرفة', 'أرواب فخمة'],
      'الملابس الداخلية النسائية': ['طقومات قطنية', 'قمصان نوم', 'لأنجري نسائي'],
      'الأحذية النسائية': ['أحذية كعب', 'أحذية مسطحة', 'صنادل نسائية'],
      'الاكسسوارات النسائية': ['ساعات يد', 'شنط يد', 'مجوهرات واكسسوارات'],
      'العناية والجمال': ['عطور نسائية', 'مكياج', 'بخور ومباخر']
    },
    'ولادي': {
      'ملابس أولاد': ['تيشيرتات', 'بناطيل', 'اطقم جاهزة', 'ملابس شتوية'],
      'ملابس بنات': ['فساتين', 'اطقم بنات', 'بلوزات وتنانير'],
      'ملابس مواليد': ['اطقم مواليد', 'بيجامات مواليد', 'افرولات'],
      'أحذية الأطفال': ['احذية رياضية', 'احذية رسمية', 'احذية مواليد'],
      'مستلزمات الأطفال': ['حفاضات ومناديل', 'مستلزمات رضاعة', 'عربيات ومقاعد']
    }
  },
  'الإلكترونيات': [
    'هواتف وجوالات', 'كمبيوتر ولابتوب', 'ساعات ذكية', 'سماعات وصوتيات', 'ألعاب إلكترونية', 'كاميرات'
  ],
  'المواد الغذائية': [
    'معلبات', 'لحوم وأسماك', 'فواكه وخضروات', 'مخبوزات', 'حلويات وسكاكر', 'مشروبات'
  ],
  'المركبات': [
    'بيع سيارات', 'تأجير سيارات', 'قطع غيار', 'إكسسوارات سيارات'
  ],
  'العقارات': [
    'شقق للإيجار', 'بيوت للبيع', 'أراضي', 'مكاتب ومحلات'
  ],
  'مواد البناء': [
    'الأسمنت والخرسانة', 'الحديد والمعادن', 'مواد السباكة', 'الكهرباء والاضاءة', 'مواد التشطيب', 'الدهانات ومستلزماتها', 'ادوات ومعدات البناء'
  ],
  'أخرى': [
    'أدوات مكتبية', 'خدمات عامة', 'ألعاب أطفال', 'كتب ومجلات'
  ]
};

export const MAIN_CATS = Object.keys(CATEGORY_MAP);

export const hasSubGroups = (activity) => {
  const cats = CATEGORY_MAP[activity];
  return cats && !Array.isArray(cats);
};

export const getSubGroups = (activity) => {
  if (!hasSubGroups(activity)) return [];
  return Object.keys(CATEGORY_MAP[activity]);
};

export const getSubCategories = (activity, subGroup) => {
  const cats = CATEGORY_MAP[activity];
  if (!cats) return [];
  if (Array.isArray(cats)) return cats;
  const group = cats[subGroup];
  if (!group) return [];
  if (Array.isArray(group)) return group;
  return Object.keys(group); // Return sub-categories like "الملابس اليومية"
};

export const getDetailedItems = (activity, subGroup, category) => {
  const cats = CATEGORY_MAP[activity];
  if (!cats || Array.isArray(cats)) return [];
  const group = cats[subGroup];
  if (!group || Array.isArray(group)) return [];
  const items = group[category];
  return Array.isArray(items) ? items : [];
};

function dataUrlApproxBytes(dataUrl) {
  const i = dataUrl.indexOf(',');
  if (i < 0) return Infinity;
  return Math.round((dataUrl.length - i - 1) * 0.75);
}

function fitInside(w, h, maxW, maxH) {
  const r = Math.min(maxW / w, maxH / h, 1);
  return {
    width: Math.max(1, Math.round(w * r)),
    height: Math.max(1, Math.round(h * r)),
  };
}

/**
 * يقلّل أبعاد الصورة وجودة JPEG حتى يقترب حجم الناتج من maxBytes (تقريباً من طول base64).
 * يدعم المعامل القديم quality أو مصفوفة qualities.
 */
export const compressImage = (file, opts = {}) => {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    maxBytes = 400 * 1024,
    quality,
    qualities: qualitiesOverride,
    minDimension = 260,
    maxShrinkPasses = 7,
  } = opts;

  const defaultQualities = [0.82, 0.72, 0.62, 0.54, 0.47, 0.41];
  let qualities = qualitiesOverride;
  if (!qualities?.length) {
    qualities =
      typeof quality === 'number'
        ? [
            quality,
            Math.max(0.4, quality - 0.1),
            Math.max(0.38, quality - 0.18),
            Math.max(0.35, quality - 0.26),
          ]
        : defaultQualities;
  }

  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith?.('image/')) {
      reject(new Error('الملف المختار ليس صورة'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذّر قراءة الملف'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('تعذّر فتح الصورة'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let { width, height } = fitInside(img.width, img.height, maxWidth, maxHeight);

        const encodeAtSize = (w, h) => {
          canvas.width = w;
          canvas.height = h;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          let best = canvas.toDataURL('image/jpeg', qualities[qualities.length - 1]);
          let bestB = dataUrlApproxBytes(best);
          for (const q of qualities) {
            const du = canvas.toDataURL('image/jpeg', q);
            const b = dataUrlApproxBytes(du);
            if (b <= maxBytes) return du;
            if (b < bestB) {
              best = du;
              bestB = b;
            }
          }
          return best;
        };

        let dataUrl = encodeAtSize(width, height);
        let passes = 0;
        while (
          dataUrlApproxBytes(dataUrl) > maxBytes &&
          passes < maxShrinkPasses &&
          width > minDimension &&
          height > minDimension
        ) {
          width = Math.max(minDimension, Math.round(width * 0.84));
          height = Math.max(minDimension, Math.round(height * 0.84));
          passes++;
          dataUrl = encodeAtSize(width, height);
        }
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
