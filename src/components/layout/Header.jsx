// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Person,
  Search,
  List,
  ChevronDown,
  Shop,
  QuestionCircle,
  Bag,
  X,
  ChevronLeft,
  BoxArrowRight,
  Gear,
  PersonCircle,
  BarChart,
  Heart,
  Bell,
  BellFill,
  ClockHistory,
  BagCheckFill
} from 'react-bootstrap-icons';
import { mensProducts, womensProducts, kidsProducts, electronicsProducts, vehiclesProducts, realEstateProducts, constructionProducts, foodProducts } from '../../data/products';

const Header = () => {
  const { user, logout, isAuthenticated, isSeller } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [openMobileSubCategory, setOpenMobileSubCategory] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // دالة للحصول على الاسم الأول والأخير من الاسم الكامل
  // دالة للحصول على الاسم المختصر (أول وآخر كلمة فقط)
  const getDisplayName = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return fullName;
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  // تجميع كل المنتجات في قائمة واحدة للبحث السريع
  const allProducts = React.useMemo(() => {
    const categories = [
      mensProducts, womensProducts, kidsProducts, electronicsProducts,
      vehiclesProducts, realEstateProducts, constructionProducts, foodProducts
    ];
    let flattened = [];
    categories.forEach(cat => {
      Object.values(cat).forEach(productList => {
        flattened = [...flattened, ...productList];
      });
    });
    return flattened;
  }, []);

  // معالجة تغيير نص البحث
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim().length > 1) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.categoryTitle?.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // إغلاق الاقتراحات عند النقر في الخارج
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    goldDark: '#b37a1e',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    red: '#dc3545'
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    logout();
    navigate('/');
    setOpenUserMenu(false);
  };

  // بيانات القوائم - متوافقة مع الأقسام الفعلية
  const menuData = {
    'الأزياء الرجالية': {
      icon: '👔',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'الملابس اليومية',
            'الملابس الرسمية',
            'الملابس التراثية',
            'الملابس الداخلية',
            'الأحذية الرجالية',
            'الاكسسوارات الرجالية',
            'الملابس الرياضية',
            'الأزياء الشتوية'
          ],
          subItems: {
            'الملابس اليومية': ['تيشيرتات', 'قمصان', 'بناطيل جينز', 'بناطيل قماش', 'شورتات'],
            'الملابس الرسمية': ['بدلات رسمية', 'قمصان رسمية', 'بناطيل رسمية'],
            'الملابس التراثية': ['اثواب', 'شيلان', 'فوط يمنية', 'معوز', 'عمائم وكوفية'],
            'الملابس الداخلية': ['فانيلات داخلية', 'سراويل داخلية', 'ملابس نوم رجالي', 'بيجامات'],
            'الأحذية الرجالية': ['أحذية رسمية', 'أحذية كاجوال', 'صنادل', 'شباشب', 'أحذية رياضية'],
            'الاكسسوارات الرجالية': ['جنابي', 'ساعات', 'خواتم', 'عطور رجالية', 'نظارات شمسية', 'محافظ', 'أحزمة'],
            'الملابس الرياضية': ['أطقم رياضية', 'بناطيل رياضية', 'تيشيرتات رياضية', 'أحذية رياضية'],
            'الأزياء الشتوية': [
              'جاكيتات جلد', 'جاكيتات قماش ثقيل', 'معاطف طويلة (بالطو)', 'جاكيتات ضد المطر',
              'بلوفرات صوف', 'كنزات برقبة عالية', 'سترات محبوكة',
              'فانيلات داخلية صوف', 'سراويل داخلية شتوية', 'أطقم داخلية حرارية',
              'شالات وكوفية', 'قبعات صوف', 'قفازات', 'جوارب شتوية سميكة',
              'أحذية مبطنة', 'أحذية مقاومة للمطر', 'شباشب منزلية دافئة'
            ]
          }
        }
      ]
    },
    'الأزياء النسائية': {
      icon: '👗',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'العبايات النسائية',
            'الطرحة واللثام',
            'الفساتين',
            'الجلابيات والدراعات والأرواب',
            'الملابس الداخلية النسائية',
            'الملابس الشتوية النسائية',
            'الأحذية النسائية',
            'الاكسسوارات النسائية',
            'العناية الشخصية النسائية'
          ],
          subItems: {
            'العبايات النسائية': [
              'عبايات رأس', 'عبايات خليجي', 'عبايات سودانية', 'عبايات شتوية',
              'عبايات كتف', 'عبايات مطرزة', 'عبايات مغربية', 'عبايات ملونة', 'عبايات للبنات (صغار)'
            ],
            'الطرحة واللثام': [
              'الطرحة القطنية', 'طرحة الشيفون', 'طرحة القطن السادة', 'طرحة مزخرفة',
              'طرحة ملونة', 'لثام (نقاب)', 'لثام صوفي', 'لثام مطرز', 'لفافات قماش مشجرة (شعبية)'
            ],
            'الفساتين': [
              'فستان استقبال', 'فستان سهرة', 'فستان عُرس (فستان عروسة)',
              'فستان مشجر', 'فستان ناعم (فستان بيت)', 'فساتين شتوية', 'فساتين للبنات (صغيرات)'
            ],
            'الجلابيات والدراعات والأرواب': [
              'جلابيات قطنية للبيت', 'جلابيات مزخرفة', 'دراعة مزخرفة',
              'جلابيات شتوية', 'أرواب فخمة (روب ساتان)'
            ],
            'الملابس الداخلية النسائية': [
              'طقومات داخلية قطنية', 'قمصان نوم طويلة', 'قمصان نوم قصيرة',
              'لأنجري نسائي', 'ملابس داخلية قطنية يومية'
            ],
            'الملابس الشتوية النسائية': [
              'جاكيتات شتوية نسائية', 'معاطف طويلة (بالطو)', 'كنزات صوف (بلوفرات)',
              'شالات صوف / لفحات', 'طقم شتوي (سروال وكنزة)', 'شرابات شتوية / صوفي'
            ],
            'الأحذية النسائية': [
              'أحذية بيت (شبشب)', 'أحذية طلعة (كعب أو مسطح)', 'أحذية شتوية (بوتات)',
              'أحذية رياضية نسائية', 'صنادل نسائية'
            ],
            'الاكسسوارات النسائية': [
              'ساعات يد نسائية', 'نظارات شمسي', 'شنط يد نسائية',
              'حقائب ظهر نسائي', 'محافظ نسائية', 'مجوهرات واكسسوارات', 'ربطات شعر / توك'
            ],
            'العناية الشخصية النسائية': [
              'عطور نسائية', 'مكياج (أساس – روج – كحل)', 'كريمات ومراهم',
              'أدوات تجميل (مقص، ملقاط، …)', 'بخور ومباخر نسائية', 'أدوات الشعر (استشوار، فير)'
            ]
          }
        }
      ]
    },
    'أزياء الأطفال': {
      icon: '🧸',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'ملابس أولاد',
            'ملابس بنات',
            'ملابس أطفال حديثي الولادة',
            'ملابس داخلية وبيجامات',
            'الجوارب والاكسسوارات',
            'أحذية الأطفال',
            'مستلزمات النوم والراحة',
            'مستلزمات الرضع',
            'هدايا ومجموعات مواليد'
          ],
          subItems: {
            'ملابس أولاد': ['تيشيرتات', 'قمصان', 'بناطيل', 'اطقم جاهزة', 'ملابس شتوية', 'ملابس المناسبات'],
            'ملابس بنات': ['فساتين', 'اطقم جاهزة', 'بلوزات وتنانير', 'ملابس المناسبات'],
            'ملابس أطفال حديثي الولادة': ['اطقم مواليد', 'بيجامات', 'افرولات', 'ملابس داخلية'],
            'ملابس داخلية وبيجامات': ['بيجامات اولاد', 'بيجامات بنات', 'ملابس داخلية قطنية', 'اطقم نوم شتوية / صيفية'],
            'الجوارب والاكسسوارات': ['جوارب واحذية قطنية', 'قبعات واوشحة', 'قفازات شتوية', 'احزمة وربطات شعر'],
            'أحذية الأطفال': ['احذية رسمية', 'احذية رياضية', 'احذية شتوية', 'احذية مواليد', 'صنادل'],
            'مستلزمات النوم والراحة': ['فرش اطفال', 'مخدات للأطفال', 'شبكات حماية للسرير', 'بطانيات واغطية'],
            'مستلزمات الرضع': [
              'ملابس مواليد', 'حفاضات ومناديل', 'مستلزمات رضاعة',
              'اطقم استحمام الأطفال', 'عربيات ومقاعد السيارة', 'مستلزمات التسنين'
            ],
            'هدايا ومجموعات مواليد': ['اطقم استحمام', 'اطقم هدايا مواليد', 'سلال جاهزة للهدايا']
          }
        }
      ]
    },
    'الإلكترونيات': {
      icon: '📱',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'الهواتف المحمولة والملحقات',
            'الحواسيب وأجهزة الكمبيوتر',
            'أجهزة الترفيه والصوتيات',
            'مستلزمات إلكترونية عامة',
            'الأجهزة المنزلية الكهربائية',
            'المعدات الصناعية والمهنية',
            'أجهزة ذكية وإنترنت الأشياء',
            'خدمات إلكترونية (صيانة)'
          ],
          subItems: {
            'الهواتف المحمولة والملحقات': [
              'هواتف ذكية جديدة', 'هواتف مستعملة', 'بطاقات SIM وباقات الإنترنت',
              'شواحن وكابلات', 'حافظات وشوايات حماية', 'سماعات رأس وسماعات أذن',
              'بطاريات هواتف', 'إكسسوارات أخرى (حوامل، واقيات شاشة…)'
            ],
            'الحواسيب وأجهزة الكمبيوتر': [
              'حواسيب محمولة (لابتوب)', 'حواسيب مكتبية', 'قطع غيار حواسيب (رام، معالجات…)',
              'شاشات', 'لوحات مفاتيح وفأرات', 'طابعات وماسحات ضوئية', 'وحدات تخزين خارجية'
            ],
            'أجهزة الترفيه والصوتيات': [
              'كاميرات رقمية وفيديو', 'مشغلات', 'مكبرات صوت بلوتوث',
              'انظمة صوت منزلية', 'اجهزة ألعاب الفيديو (بلايستيشن، إكس بوكس)', 'تلفزيونات (LED، سمارت، 4K)'
            ],
            'مستلزمات إلكترونية عامة': [
              'كابلات وشواحن متنوعة', 'بطاريات ومخازن طاقة (باور بانك)',
              'محولات كهربائية وأسلاك', 'قطع غيار إلكترونية (مفاتيح، ريليهات، مكثفات)'
            ],
            'الأجهزة المنزلية الكهربائية': [
              'ثلاجات', 'مكيفات هواء', 'غسالات (ملابس، صحون)',
              'سخانات مياه كهربائية وغازية', 'ماكينات القهوة', 'مكنسات كهربائية',
              'أفران (كهربائية وغاز)', 'مراوح كهربائية', 'أجهزة تنقية الهواء'
            ],
            'المعدات الصناعية والمهنية': [
              'اجهزة القياس والاختبار الكهربائية', 'اجهزة انذار وأمان (كاميرات مراقبة، أجهزة كشف الحريق)',
              'معدات ورش الصيانة', 'معدات الإنارة الصناعية'
            ],
            'أجهزة ذكية وإنترنت الأشياء': [
              'الساعات الذكية', 'اجهزة المنزل الذكي (أضواء ذكية، كاميرات ذكية)',
              'المساعدات الصوتية (Alexa، Google Home)', 'اجهزة تعقب وتتبع'
            ],
            'خدمات إلكترونية (صيانة)': [
              'صيانة أجهزة إلكترونية (هواتف، كمبيوترات، مكيفات)', 'تركيب وصيانة أنظمة الإنذار',
              'خدمات نقل وإعادة تركيب الأجهزة', 'خدمات برمجيات الأجهزة الذكية'
            ]
          }
        }
      ]
    },
    'المركبات': {
      icon: '🚗',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'السيارات - بيع',
            'السيارات - تأجير',
            'مستلزمات السيارات',
            'خدمات السيارات'
          ],
          subItems: {
            'السيارات - بيع': [
              'سيارات خصوصي ( بيع )', 'سيارات نقل خفيف ( بيع )', 'سيارات دفع رباعي(جيب) ( بيع )',
              'باصات / حافلات ( بيع )', 'شاحنات ( بيع )', 'دراجات نارية ( بيع )',
              'مركبات ثقيلة (رافعات، شيولات..) ( بيع)', 'سيارات كهربائية / هايبرد ( بيع )'
            ],
            'السيارات - تأجير': [
              'سيارات خصوصي ( تاجير )', 'سيارات نقل خفيف ( تاجير )', 'سيارات دفع رباعي (جيب) ( تاجير )',
              'باصات / حافلات ( تاجير )', 'شاحنات ( تاجير )', 'دراجات نارية ( تاجير )',
              'مركبات ثقيلة (رافعات، شيولات…) ( تاجير )', 'سيارات كهربائية / هايبرد ( تاجير )'
            ],
            'مستلزمات السيارات': [
              'قطع غيار أصلية', 'قطع غيار بديلة', 'إطارات (تواير)', 'جنوط / رنقات',
              'زيوت / فلاتر', 'بطاريات', 'أنوار / لمبات / كشافات', 'ديكورات خارجية',
              'ديكورات داخلية', 'أجهزة صوتيات وشاشات', 'كاميرات وحساسات', 'مفاتيح / ريموتات',
              'كمبيوترات سيارات', 'معدات ورش الصيانة (لسيارات)'
            ],
            'خدمات السيارات': [
              'فحص سيارات', 'سمكرة / رش', 'كهربائي سيارات', 'تبديل زيوت',
              'غسيل وتلميع', 'تأمين سيارات'
            ]
          }
        }
      ]
    },
    'العقارات': {
      icon: '🏠',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'عقارات للبيع',
            'عقارات للإيجار',
            'تمليك بالتقسيط'
          ],
          subItems: {
            'عقارات للبيع': [
              'منازل للبيع', 'شقق سكنية للبيع', 'فلل للبيع', 'المباني للبيع',
              'اراضي للبيع', 'اراضي زراعية للبيع', 'منازل شعبية للبيع',
              'محلات تجارية للبيع', 'مستودعات / مخازن للبيع'
            ],
            'عقارات للإيجار': [
              'شقق سكنية - ايجار', 'منازل - ايجار', 'فلل - ايجار', 'المباني - ايجار',
              'اراضي - ايجار', 'اراضي زراعية - ايجار', 'منازل شعبية - ايجار',
              'محلات تجارية - ايجار', 'مستودعات / مخازن - ايجار'
            ],
            'تمليك بالتقسيط': [
              'شقق سكنية - تمليك بالتقسيط', 'منازل - تمليك بالتقسيط', 'فلل - تمليك بالتقسيط',
              'المباني - تمليك بالتقسيط', 'اراضي - تمليك بالتقسيط', 'اراضي زراعية - تمليك بالتقسيط',
              'محلات تجارية - تمليك بالتقسيط', 'منازل شعبية - تمليك بالتقسيط', 'مستودعات / مخازن - تمليك بالتقسيط'
            ]
          }
        }
      ]
    },
    'مواد البناء': {
      icon: '🧱',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'الأسمنت والخرسانة',
            'الحديد والمعادن',
            'مواد السباكة',
            'الكهرباء والاضاءة',
            'مواد التشطيب',
            'الدهانات ومستلزماتها',
            'المكملات والاكسسوارات',
            'ادوات ومعدات البناء',
            'معدات الورش'
          ],
          subItems: {
            'الأسمنت والخرسانة': [
              'اسمنت عادي', 'اسمنت مقاوم', 'اسمنت ابيض',
              'خرسانة جاهزة', 'منتجات اسمنتية (بلاط، بدورات، إلخ)'
            ],
            'الحديد والمعادن': [
              'حديد تسليح', 'زوايا ومقاطع حديد', 'شبك تسليح',
              'صفائح حديد', 'مواسير حديد'
            ],
            'مواد السباكة': [
              'مواسير PVC', 'قطع التوصيل البلاستيكية', 'خزانات المياه',
              'مواسير حديد', 'فلاتر ومحابس', 'سخانات ومستلزماتها', 'مضخات'
            ],
            'الكهرباء والاضاءة': [
              'اسلاك وكابلات كهربائية', 'مفاتيح ومقابس', 'لوحات توزيع',
              'مصابيح ولمبات', 'وحدات اضائة (داخلية وخارجية)'
            ],
            'مواد التشطيب': [
              'بلاط وسيراميك', 'جبس وديكورات سقفية', 'ألواح جبس بورد',
              'أبواب ونوافذ', 'مواد لصق وتثبيت', 'صنفرة'
            ],
            'الدهانات ومستلزماتها': [
              'دهانات داخلية وخارجية', 'دهانات مقاومة للرطوبة', 'برايمر ومعجون',
              'فرش وبكرات دهان', 'معدات الدهانات'
            ],
            'المكملات والاكسسوارات': [
              'مسامير وبراغي', 'مفك براغي ( بانات و دساميس )', 'مواد لاصقة وسليكون',
              'فواصل تمدد', 'شريط مانع للتسرب', 'ادوات قطع يدوية'
            ],
            'ادوات ومعدات البناء': [
              'أدوات يدوية (مطارق، فؤوس، كراكات)', 'عربات ورافعات يدوية',
              'خلاطات إسمنت', 'سقالات', 'ميزان ماء وخيوط بناء', 'ادوات مكملة لمعدات البناء'
            ],
            'معدات الورش': [
              'معدات كهربائية يدوية', 'معدات لحام وقطع المعادن', 'ادوات يدوية ويدوية ثقيلة',
              'معدات رفع ونقل', 'معدات القياس والضبط', 'معدات الورش الكهربائية الكبيرة',
              'معدات الحماية والسلامة للورش', 'قطع غيار ومستلزمات الورش', 'مسدس مسامير دبابيس'
            ]
          }
        }
      ]
    },
    'المواد الغذائية': {
      icon: '🍎',
      megaMenu: [
        {
          title: 'جميع الأقسام',
          items: [
            'الحبوب ومشتقاتها',
            'البقوليات',
            'الزيوت والدهون',
            'السكر والمحليات',
            'الألبان ومنتجاتها',
            'اللحوم والأسماك',
            'الخضروات',
            'الفواكه',
            'المشروبات',
            'مواد غذائية أخرى (مكملات)'
          ],
          subItems: {
            'الحبوب ومشتقاتها': [
              'القمح', 'الدقيق', 'الأرز', 'البر', 'الشوفان', 'الشعير',
              'المعكرونة', 'البرغل', 'الذرة'
            ],
            'البقوليات': [
              'الفول', 'العدس', 'الحمص', 'الفاصوليا البيضاء', 'اللوبيا', 'البازلاء المجففة'
            ],
            'الزيوت والدهون': [
              'زيت الطبخ النباتي', 'زيت الذرة', 'السمن الحيواني',
              'السمن النباتي', 'الزبدة', 'زيت دوار الشمس'
            ],
            'السكر والمحليات': [
              'السكر الأبيض', 'السكر البني', 'العسل', 'التمر', 'الدبس', 'المربيات'
            ],
            'الألبان ومنتجاتها': [
              'الحليب السائل', 'الحليب المجفف', 'اللبن', 'الزبادي', 'الجبن', 'القشطة'
            ],
            'اللحوم والأسماك': [
              'اللحم البقري', 'اللحم الضأن', 'الدجاج', 'الأسماك الطازجة', 'الأسماك المعلبة (تونا، سردين)'
            ],
            'الخضروات': [
              'البطاطس', 'الطماطم', 'البصل', 'الثوم', 'الجزر', 'الفلفل', 'الملفوف', 'الخيار', 'الكوسا'
            ],
            'الفواكه': [
              'التفاح', 'الموز', 'البرتقال', 'الليمون', 'العنب', 'الرمان', 'البطيخ', 'المانجو'
            ],
            'المشروبات': [
              'الماء', 'الشاي', 'القهوة', 'الحليب', 'العصائر', 'المشروبات الغازية'
            ],
            'مواد غذائية أخرى (مكملات)': [
              'البيض', 'الخميرة', 'الملح', 'التوابل والبهارات',
              'المكعبات المنكهة', 'المعلبات الغذائية'
            ]
          }
        }
      ]
    }
  };

  // دوال التحكم في قائمة الجوال
  const openMobileCategoryMenu = (category) => {
    setOpenMobileCategory(category);
    setOpenMobileSubCategory(null);
  };

  const openMobileSubCategoryMenu = (subCategory) => {
    setOpenMobileSubCategory(subCategory);
  };

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
    setOpenMobileCategory(null);
    setOpenMobileSubCategory(null);
  };

  const goBackToCategories = () => {
    setOpenMobileCategory(null);
    setOpenMobileSubCategory(null);
  };

  const goBackToSubCategories = () => {
    setOpenMobileSubCategory(null);
  };

  // دالة عرض الميجا مينو للكمبيوتر
  const renderMegaMenu = (menuItems) => {
    const numColumns = menuItems.length;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        gap: '30px',
        minWidth: numColumns === 4 ? '1100px' : numColumns === 5 ? '1300px' : '900px',
        padding: '25px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {menuItems.map((column, colIdx) => (
          <div key={colIdx}>
            <h4 style={{
              color: colors.gold,
              margin: '0 0 15px 0',
              fontSize: '16px',
              fontWeight: 'bold',
              borderBottom: `2px solid ${colors.gold}`,
              paddingBottom: '8px'
            }}>
              {column.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {column.items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ marginBottom: '8px', position: 'relative' }}>
                  <Link
                    to={`/category/${item.replace(/\s+/g, '-')}`}
                    style={{
                      color: colors.primary,
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.3s',
                      display: 'block',
                      padding: '4px 0',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = colors.gold;
                      e.target.style.paddingRight = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = colors.primary;
                      e.target.style.paddingRight = '0';
                    }}
                  >
                    {item}
                  </Link>

                  {/* عرض العناصر الفرعية للكمبيوتر */}
                  {column.subItems && column.subItems[item] && (
                    <div style={{
                      marginTop: '4px',
                      marginRight: '10px',
                      paddingRight: '8px',
                      borderRight: `1px dashed ${colors.gold}40`
                    }}>
                      {column.subItems[item].map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={`/category/${subItem.replace(/\s+/g, '-')}`}
                          style={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '12px',
                            transition: 'all 0.3s',
                            display: 'block',
                            padding: '2px 0 2px 0'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = colors.gold;
                            e.target.style.paddingRight = '5px';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#666';
                            e.target.style.paddingRight = '0';
                          }}
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // دالة عرض قائمة الجوال المتجاوبة
  const renderMobileMenu = () => {
    // عرض القائمة الرئيسية للجوال
    if (!openMobileCategory) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '80%',
          maxWidth: '300px',
          background: colors.primary,
          zIndex: 10000,
          padding: '15px 15px 80px 15px',
          boxShadow: `-5px 0 30px rgba(0,0,0,0.5)`,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          direction: 'rtl',
          textAlign: 'right'
        }}>
          {/* رأس القائمة */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: `1px solid ${colors.gold}40`,
            paddingBottom: '15px'
          }}>
            <button
              onClick={closeMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                color: colors.gold,
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* معلومات المستخدم في الجوال - تم نقلها للأعلى */}
          {isAuthenticated ? (
            <div style={{
              background: `${colors.gold}20`,
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '15px',
              border: `1px solid ${colors.gold}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={user?.profileImage || user?.avatar || 'https://via.placeholder.com/50'}
                  alt={user?.username || user?.name || user?.fullName}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: colors.gold,
                    objectFit: 'cover',
                    border: `2px solid ${colors.gold}`
                  }}
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || user?.username || user?.name || 'U') + '&background=c88c23&color=fff'; }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>
                    {getDisplayName(user?.fullName)}
                  </p>
                  <p style={{ color: colors.goldLight, margin: 0, fontSize: '11px', wordBreak: 'break-all' }}>
                    {user?.phone}
                  </p>
                  {isSeller && (
                    <span style={{
                      background: colors.gold,
                      color: colors.primary,
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginTop: '5px'
                    }}>
                      بائع
                    </span>
                  )}
                </div>
              </div>

              {/* روابط سريعة للملف الشخصي ولوحة التحكم */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {!isSeller && (
                  <Link
                    to="/profile"
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: 'transparent',
                      border: `1px solid ${colors.gold}60`,
                      borderRadius: '6px',
                      color: colors.white,
                      textDecoration: 'none',
                      fontSize: '12px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                    onClick={closeMobileMenu}
                  >
                    <PersonCircle size={14} />
                    الملف الشخصي
                  </Link>
                )}
                {isSeller && (
                  <Link
                    to="/seller/dashboard"
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: 'transparent',
                      border: `1px solid ${colors.gold}60`,
                      borderRadius: '6px',
                      color: colors.white,
                      textDecoration: 'none',
                      fontSize: '12px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                    onClick={closeMobileMenu}
                  >
                    <BarChart size={14} />
                    لوحة التحكم
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <Link
                to="/login"
                style={{
                  display: 'block',
                  padding: '12px 15px',
                  background: colors.gold,
                  border: 'none',
                  borderRadius: '8px',
                  color: colors.primary,
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
                onClick={closeMobileMenu}
              >
                تسجيل الدخول
              </Link>
            </div>
          )}

          {/* قائمة الأقسام الرئيسية */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {/* الرئيسية */}
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 15px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.gold}30`,
                  borderRadius: '8px',
                  color: colors.white,
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
                onClick={closeMobileMenu}
              >
                🏠 الرئيسية
              </Link>
            </li>

            {/* الأقسام الأخرى */}
            {Object.entries(menuData).map(([category, data]) => (
              <li key={category} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => openMobileCategoryMenu(category)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'transparent',
                    border: `1px solid ${colors.gold}`,
                    borderRadius: '8px',
                    color: colors.white,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <span>{data.icon} {category}</span>
                  <ChevronLeft size={16} color={colors.gold} />
                </button>
              </li>
            ))}

            {/* المتجر */}
            <li style={{ marginTop: '20px' }}>
              <Link
                to="/stores"
                style={{
                  display: 'block',
                  padding: '12px 15px',
                  background: colors.gold,
                  border: 'none',
                  borderRadius: '8px',
                  color: colors.primary,
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
                onClick={closeMobileMenu}
              >
                <Bag size={16} style={{ marginLeft: '5px' }} />
                المتجر
              </Link>
            </li>

            {/* زر تسجيل الخروج في الأسفل */}
            {isAuthenticated && (
              <li style={{ marginTop: '20px', paddingBottom: '60px' }}>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'rgba(220, 53, 69, 0.1)',
                    border: `1px solid ${colors.red}`,
                    borderRadius: '8px',
                    color: colors.red,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <BoxArrowRight size={18} />
                  تسجيل خروج
                </button>
              </li>
            )}
          </ul>
        </div>
      );
    }

    // عرض القسم المحدد (المستوى الثاني)
    const selectedCategory = menuData[openMobileCategory];

    if (!openMobileSubCategory) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '75%',
          maxWidth: '280px',
          background: colors.primary,
          zIndex: 10000,
          padding: '15px',
          boxShadow: `-5px 0 30px rgba(0,0,0,0.5)`,
          overflowY: 'auto',
          direction: 'rtl',
          textAlign: 'right'
        }}>
          {/* رأس القسم */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            borderBottom: `2px solid ${colors.gold}`,
            paddingBottom: '12px'
          }}>
            <button
              onClick={goBackToCategories}
              style={{
                background: colors.gold,
                border: 'none',
                borderRadius: '50%',
                color: colors.primary,
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>

            <h3 style={{
              color: colors.white,
              margin: 0,
              fontSize: '16px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}>
              {openMobileCategory}
            </h3>

            <button
              onClick={closeMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                color: colors.gold,
                cursor: 'pointer',
                marginRight: 'auto',
                padding: '5px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* قائمة الأقسام الفرعية */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {selectedCategory.megaMenu.map((column, colIdx) => (
              <li key={colIdx} style={{ marginBottom: '15px' }}>
                <h4 style={{
                  color: colors.gold,
                  margin: '10px 0',
                  fontSize: '15px',
                  borderBottom: `1px solid ${colors.gold}`,
                  paddingBottom: '5px'
                }}>
                  {column.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 10px' }}>
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ marginBottom: '8px' }}>
                      {column.subItems && column.subItems[item] ? (
                        <button
                          onClick={() => openMobileSubCategoryMenu(item)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: 'none',
                            border: 'none',
                            color: colors.white,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textAlign: 'right',
                            fontSize: '14px',
                            cursor: 'pointer',
                            borderBottom: `1px solid ${colors.gold}30`
                          }}
                        >
                          <span>{item}</span>
                          <ChevronLeft size={14} color={colors.gold} />
                        </button>
                      ) : (
                        <Link
                          to={`/category/${item.replace(/\s+/g, '-')}`}
                          style={{
                            display: 'block',
                            padding: '8px 10px',
                            color: colors.white,
                            textDecoration: 'none',
                            fontSize: '14px',
                            borderBottom: `1px solid ${colors.gold}30`
                          }}
                          onClick={closeMobileMenu}
                        >
                          {item}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // عرض العناصر الفرعية (المستوى الثالث)
    const selectedCategoryData = menuData[openMobileCategory];
    let selectedSubItems = [];

    // البحث عن العناصر الفرعية
    for (const column of selectedCategoryData.megaMenu) {
      if (column.subItems && column.subItems[openMobileSubCategory]) {
        selectedSubItems = column.subItems[openMobileSubCategory];
        break;
      }
    }

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '75%',
        maxWidth: '280px',
        background: colors.primary,
        zIndex: 10000,
        padding: '15px',
        boxShadow: `-5px 0 30px rgba(0,0,0,0.5)`,
        overflowY: 'auto',
        direction: 'rtl',
        textAlign: 'right'
      }}>
        {/* رأس العناصر الفرعية */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: `2px solid ${colors.gold}`,
          paddingBottom: '12px'
        }}>
          <button
            onClick={goBackToSubCategories}
            style={{
              background: colors.gold,
              border: 'none',
              borderRadius: '50%',
              color: colors.primary,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>

          <h3 style={{
            color: colors.white,
            margin: 0,
            fontSize: '15px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>
            {openMobileSubCategory}
          </h3>

          <button
            onClick={closeMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: colors.gold,
              cursor: 'pointer',
              marginRight: 'auto',
              padding: '5px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* قائمة العناصر الفرعية */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {selectedSubItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>
              <Link
                to={`/category/${item.replace(/\s+/g, '-')}`}
                style={{
                  display: 'block',
                  padding: '12px 15px',
                  color: colors.white,
                  textDecoration: 'none',
                  fontSize: '14px',
                  borderBottom: `1px solid ${colors.gold}30`,
                  transition: 'all 0.3s'
                }}
                onClick={closeMobileMenu}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.gold;
                  e.target.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = colors.white;
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (location.pathname === '/profile') {
    return null;
  }

  return (
    <div style={{
      background: colors.primary,
      color: colors.white,
      boxShadow: `0 10px 30px -10px ${colors.goldDark}`,
      direction: 'rtl',
      width: '100%',
      position: 'relative',
      top: 0,
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* السطر الأول - الشعار والبحث والأزرار */}
      <div style={{
        padding: isMobile ? '8px 0' : '10px 40px',
        borderBottom: `1px solid ${colors.gold}40`,
        background: colors.primary,
        position: 'relative',
        zIndex: 1002
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          gap: isMobile ? '10px' : '30px'
        }}>
          {/* الشعار والأزرار للجوال */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: isMobile ? '0 5px' : '0',
            gap: 0
          }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', padding: 0, margin: 0 }}>
              <img
                src="/images/logo.png"
                alt="توريد نت"
                style={{
                  height: isMobile ? '45px' : '75px',
                  width: 'auto',
                  maxWidth: '180px',
                  objectFit: 'contain',
                  filter: `drop-shadow(0 4px 8px ${colors.gold}40)`,
                  transition: 'all 0.3s ease'
                }}
              />
            </Link>

            {!isMobile && (
              /* حقل البحث للكمبيوتر - موازٍ للشعار */
              <div style={{ flex: 1, maxWidth: '600px', margin: '0 20px' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchValue.trim()) navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fcfcfc',
                    border: `1px solid ${isSearchFocused ? colors.gold : '#e4e6eb'}`,
                    borderRadius: '30px',
                    padding: '0 5px 0 15px',
                    height: '38px',
                    boxShadow: isSearchFocused ? `0 4px 15px ${colors.gold}20` : '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease',
                  }}>
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      if (searchValue.trim().length > 1) setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      border: 'none',
                      padding: '0 15px 0 5px',
                      height: '100%',
                      outline: 'none',
                      fontSize: '14px',
                      background: 'transparent',
                      color: colors.primary
                    }}
                  />
                  <button type="submit" style={{
                    background: colors.gold, border: 'none', borderRadius: '50%',
                    width: '30px', height: '30px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}>
                    <Search size={16} color={colors.white} />
                  </button>
                </form>

                {/* قائمة الاقتراحات للكمبيوتر */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '20px',
                      right: '20px',
                      background: colors.white,
                      borderRadius: '10px',
                      marginTop: '8px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      zIndex: 1005,
                      overflow: 'hidden',
                      border: `1px solid ${colors.gold}30`
                    }}>
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          navigate(`/product/${item.id}`);
                          setSearchValue('');
                          setShowSuggestions(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          padding: '12px 20px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderBottom: `1px solid ${colors.lightGray}`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = `${colors.gold}10`}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <img
                          src={item.image}
                          alt=""
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ color: colors.primary, fontWeight: 'bold', fontSize: '14px' }}>{item.name}</div>
                          <div style={{ color: '#888', fontSize: '12px' }}>{item.categoryTitle}</div>
                        </div>
                        <div style={{ marginRight: 'auto', color: colors.gold, fontWeight: 'bold' }}>
                          {item.price} ريال
                        </div>
                      </div>
                    ))}
                    <div
                      onClick={() => navigate(`/search?q=${encodeURIComponent(searchValue)}`)}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        background: colors.lightGray,
                        color: colors.gold,
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      مشاهدة جميع النتائج لـ "{searchValue}"
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: isMobile ? '4px' : '8px',
              alignItems: 'center',
              marginRight: isMobile ? 'auto' : '0', // In RTL, margin-right auto pushes to left
              marginLeft: isMobile ? '0' : 'auto'
            }}>
              {/* قائمة المتاجر */}
              <Link
                to="/stores"
                style={{
                  display: 'flex', alignItems: 'center', gap: '3px', padding: isMobile ? '5px 8px' : '8px 15px',
                  borderRadius: '10px', background: `${colors.gold}20`,
                  border: `1px solid ${colors.gold}60`, color: colors.white,
                  textDecoration: 'none', fontSize: isMobile ? '10px' : '14px', transition: 'all 0.3s',
                  whiteSpace: 'nowrap'
                }}
              >
                <Shop size={isMobile ? 16 : 18} color={colors.gold} />
                <span>المتاجر</span>
              </Link>

              {/* قائمة طلباتي والإشعارات */}
              {isAuthenticated && !isSeller && (
                <>
                  <Link
                    to="/notifications"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '3px', padding: isMobile ? '5px 8px' : '8px 15px',
                      borderRadius: '10px', background: `${colors.gold}20`,
                      border: `1px solid ${colors.gold}60`, color: colors.white,
                      textDecoration: 'none', fontSize: isMobile ? '10px' : '14px', transition: 'all 0.3s',
                      whiteSpace: 'nowrap',
                      position: 'relative'
                    }}
                  >
                    <BellFill size={isMobile ? 16 : 18} color={colors.gold} />
                    {(user?.notifications?.filter(n => !n.read).length || 0) > 0 && (
                      <span style={{
                        position: 'absolute', top: '-5px', left: '-5px',
                        background: colors.red || '#dc3545', color: 'white',
                        fontSize: '10px', width: '18px', height: '18px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '50%', fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        border: '1px solid white'
                      }}>
                        {user.notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/orders"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '3px', padding: isMobile ? '5px 8px' : '8px 15px',
                      borderRadius: '10px', background: `${colors.gold}20`,
                      border: `1px solid ${colors.gold}60`, color: colors.white,
                      textDecoration: 'none', fontSize: isMobile ? '10px' : '14px', transition: 'all 0.3s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <BagCheckFill size={isMobile ? 16 : 18} color={colors.gold} />
                    <span>طلباتي</span>
                  </Link>
                </>
              )}

              {/* أيقونة المستخدم */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => !isMobile && setOpenUserMenu(true)}
                onMouseLeave={() => !isMobile && setOpenUserMenu(false)}
              >
                <Link
                  to={isAuthenticated ? (isSeller ? '/seller/dashboard' : '/profile') : '/login'}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: isMobile ? '6px 10px' : '6px 12px',
                    borderRadius: '10px', background: isMobile ? `${colors.gold}20` : colors.gold,
                    border: isMobile ? `1px solid ${colors.gold}60` : `1px solid ${colors.gold}`,
                    color: isMobile ? colors.white : colors.primary, fontWeight: 'bold',
                    transition: 'all 0.3s', cursor: 'pointer',
                    textDecoration: 'none', fontSize: isMobile ? '11px' : '13px', whiteSpace: 'nowrap'
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <Person size={isMobile ? 18 : 20} color={isMobile ? colors.gold : 'inherit'} />
                      <span>حسابي</span>
                    </>
                  ) : (
                    <>
                      <Person size={isMobile ? 18 : 20} color={isMobile ? colors.gold : 'inherit'} />
                      <span>تسجيل الدخول</span>
                    </>
                  )}
                </Link>

                {/* القائمة المنسدلة للكمبيوتر */}
                {isAuthenticated && openUserMenu && !isMobile && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: '10px',
                    background: colors.white, borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)', minWidth: '200px', zIndex: 1001, overflow: 'hidden'
                  }}>
                    <div style={{ padding: '15px', borderBottom: `1px solid ${colors.gold}20`, background: colors.lightGray, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={user.profileImage}
                        style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || user?.username || 'U') + '&background=c88c23&color=fff'; }}
                        alt=""
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', color: colors.primary, fontSize: '14px' }}>{getDisplayName(user.fullName || user.username || user.name)}</div>
                        <div style={{ fontSize: '11px', color: colors.gray }}>{user.phone}</div>
                      </div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      <Link to={isSeller ? "/seller/dashboard" : "/profile"} style={{ display: 'block', padding: '10px 15px', color: colors.primary, textDecoration: 'none', fontSize: '13px' }}>لوحة التحكم</Link>
                      <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'right', padding: '10px 15px', color: colors.red, background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>تسجيل الخروج</button>
                    </div>
                  </div>
                )}
              </div>

              {isMobile && (
                <button
                  onClick={() => setOpenMobileMenu(true)}
                  style={{ background: 'transparent', border: 'none', color: colors.gold, padding: '2px', cursor: 'pointer' }}
                >
                  <List size={30} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* السطر الثاني - حقل البحث (للجوال فقط) مع مسافة علوية */}
        {isMobile && (
          <div style={{ padding: '8px 12px 10px 12px', background: colors.primary, display: 'flex', justifyContent: 'center' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchValue.trim()) navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fcfcfc',
                border: `1px solid ${isSearchFocused ? colors.gold : '#e4e6eb'}`,
                borderRadius: '30px',
                padding: '0 5px 0 15px',
                height: '36px',
                width: '85%',
                maxWidth: '400px',
                boxSizing: 'border-box',
                boxShadow: isSearchFocused ? `0 4px 15px ${colors.gold}30` : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}>
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                style={{
                  flex: 1, border: 'none', padding: '0 15px', height: '100%',
                  outline: 'none', fontSize: '15px', background: 'transparent', color: colors.primary
                }}
              />
              <button type="submit" style={{
                background: colors.gold, border: 'none', borderRadius: '10px',
                width: '30px', height: '30px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                flexShrink: 0
              }}>
                <Search size={15} color={colors.white} />
              </button>
            </form>
          </div>
        )}
      </div>



      {/* السطر الثالث - شريط التنقل (للكمبيوتر فقط) */}
      {!isMobile && (
        <div style={{
          borderTop: `1px solid ${colors.gold}40`,
          borderBottom: `1px solid ${colors.gold}40`,
          padding: '12px 20px',
          position: 'relative',
          zIndex: 1001
        }}>
          <ul style={{
            display: 'flex',
            listStyle: 'none', margin: 0, padding: 0,
            gap: '15px', justifyContent: 'center', flexWrap: 'wrap'
          }}>
            {/* الرئيسية - للكمبيوتر */}
            <li>
              <Link to="/" style={{
                color: location.pathname === '/' ? colors.primary : colors.white,
                textDecoration: 'none',
                padding: '8px 25px',
                display: 'block',
                background: location.pathname === '/' ? colors.gold : 'transparent',
                border: `1px solid ${colors.gold}`,
                borderRadius: '10px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s',
                boxShadow: location.pathname === '/' ? `0 4px 15px ${colors.gold}40` : 'none'
              }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/') {
                    e.target.style.background = colors.gold;
                    e.target.style.color = colors.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/') {
                    e.target.style.background = 'transparent';
                    e.target.style.color = colors.white;
                  }
                }}>
                🏠 الرئيسية
              </Link>
            </li>

            {/* المتجر - للكمبيوتر */}
            <li>
              <Link to="/stores" style={{
                color: colors.primary, textDecoration: 'none', padding: '8px 20px',
                display: 'block', background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
                border: `1px solid ${colors.goldLight}`, borderRadius: '10px',
                textAlign: 'center', fontWeight: 'bold', fontSize: '14px',
                boxShadow: `0 5px 15px ${colors.gold}`
              }}>
                <Bag size={14} style={{ marginLeft: '5px' }} />
                المتجر
              </Link>
            </li>

            {/* جميع الأقسام الرئيسية للكمبيوتر */}
            {Object.entries(menuData).map(([category, data], index) => (
              <li
                key={category}
                style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  style={{
                    background: openDropdown === index ? colors.gold : 'transparent',
                    border: `1px solid ${colors.gold}`,
                    color: openDropdown === index ? colors.primary : colors.white,
                    padding: '8px 20px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    borderRadius: '10px', fontWeight: '500', fontSize: '14px',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {data.icon} {category}
                  <ChevronDown size={12} style={{
                    transform: openDropdown === index ? 'rotate(180deg)' : 'none'
                  }} />
                </button>

                {/* الميجا مينو للكمبيوتر */}
                {openDropdown === index && (
                  <div style={{
                    position: 'absolute', top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: colors.white, borderRadius: '15px',
                    marginTop: '8px', border: `1px solid ${colors.gold}`,
                    boxShadow: `0 10px 30px ${colors.gold}60`,
                    zIndex: 9999
                  }}>
                    {renderMegaMenu(data.megaMenu)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* نافذة قائمة الجوال */}
      {openMobileMenu && (
        <>
          {/* خلفية معتمة لإغلاق القائمة عند الضغط خارجها */}
          <div
            onClick={closeMobileMenu}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 9999,
              backdropFilter: 'blur(3px)'
            }}
          />
          {renderMobileMenu()}
        </>
      )}
    </div>
  );
};

export default Header;