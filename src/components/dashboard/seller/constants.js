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

export const compressImage = (file, { maxWidth = 800, maxHeight = 800, quality = 0.7 } = {}) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
        if (height > maxHeight) { width = Math.round((width * maxHeight) / height); height = maxHeight; }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
