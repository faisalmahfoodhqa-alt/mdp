// src/data/categories.js

export const mensCategories = [
  { id: 1, title: 'الملابس اليومية', image: '/images/daily-main.jpg', link: '/category/الملابس-اليومية', count: 5 },
  { id: 2, title: 'الملابس الرسمية', image: '/images/formal-main.jpg', link: '/category/الملابس-الرسمية', count: 3 },
  { id: 3, title: 'الملابس التراثية', image: '/images/traditional-main.jpg', link: '/category/الملابس-التراثية', count: 5 },
  { id: 4, title: 'الملابس الداخلية', image: '/images/underwear-main.jpg', link: '/category/الملابس-الداخلية', count: 4 },
  { id: 5, title: 'الأحذية الرجالية', image: '/images/shoes-main.jpg', link: '/category/الأحذية-الرجالية', count: 5 },
  { id: 6, title: 'الاكسسوارات الرجالية', image: '/images/accessories-main.jpg', link: '/category/الاكسسوارات-الرجالية', count: 7 },
  { id: 7, title: 'الملابس الرياضية', image: '/images/sportswear-main.jpg', link: '/category/الملابس-الرياضية', count: 4 },
  { id: 8, title: 'الأزياء الشتوية', image: '/images/winter-main.jpg', link: '/category/الأزياء-الشتوية', count: 17 }
];

export const womensCategories = [
  { id: 101, title: 'العبايات النسائية', image: '/images/abaya-main.jpg', link: '/category/العبايات-النسائية', count: 9 },
  { id: 102, title: 'الطرحة واللثام', image: '/images/hijab-main.jpg', link: '/category/الطرحة-واللثام', count: 9 },
  { id: 103, title: 'الفساتين', image: '/images/dresses-main.jpg', link: '/category/الفساتين', count: 7 },
  { id: 104, title: 'الجلابيات والدراعات والأرواب', image: '/images/jalabiya-daraa-robe-main.jpg', link: '/category/الجلابيات-الدراعات-الأرواب', count: 5 },
  { id: 105, title: 'الملابس الداخلية النسائية', image: '/images/women-underwear-main.jpg', link: '/category/الملابس-الداخلية-النسائية', count: 5 },
  { id: 106, title: 'الاكسسوارات النسائية', image: '/images/women-accessories-main.jpg', link: '/category/الاكسسوارات-النسائية', count: 7 },
  { id: 107, title: 'العناية الشخصية النسائية', image: '/images/personal-care-main.jpg', link: '/category/العناية-الشخصية-النسائية', count: 6 },
  { id: 108, title: 'الأحذية النسائية', image: '/images/women-shoes-main.jpg', link: '/category/الأحذية-النسائية', count: 5 },
  { id: 109, title: 'الملابس الشتوية النسائية', image: '/images/women-winter-main.jpg', link: '/category/الملابس-الشتوية-النسائية', count: 6 }
];

// ✅ أقسام أزياء الأطفال (مع دمج الجوارب والاكسسوارات)
export const kidsCategories = [
  { id: 201, title: 'ملابس أولاد', image: '/images/kids-clothes.jpg', link: '/category/ملابس-أولاد', count: 6 },
  { id: 202, title: 'ملابس بنات', image: '/images/girls-clothes.jpg', link: '/category/ملابس-بنات', count: 4 },
  { id: 203, title: 'ملابس أطفال حديثي الولادة (24 شهر)', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&auto=format', link: '/category/ملابس-حديثي-الولادة', count: 4 },
  { id: 204, title: 'ملابس داخلية وبيجامات', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format', link: '/category/ملابس-داخلية-بيجامات', count: 4 },
  { id: 205, title: 'الجوارب والاكسسوارات', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&auto=format', link: '/category/جوارب-اكسسوارات-أطفال', count: 4 },
  { id: 206, title: 'أحذية الأطفال', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format', link: '/category/أحذية-أطفال', count: 5 },
  { id: 207, title: 'مستلزمات النوم والراحة', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&auto=format', link: '/category/مستلزمات-النوم', count: 4 },
  { id: 208, title: 'مستلزمات الرضع', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format', link: '/category/مستلزمات-الرضع', count: 6 },
  { id: 209, title: 'هدايا ومجموعات مواليد', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&auto=format', link: '/category/هدايا-مواليد', count: 3 }
];
export const electronicsCategories = [
  { id: 301, title: 'الهواتف المحمولة والملحقات', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format', link: '/category/الهواتف-المحمولة-والملحقات', count: 8 },
  { id: 302, title: 'الحواسيب وأجهزة الكمبيوتر', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&auto=format', link: '/category/الحواسيب-وأجهزة-الكمبيوتر', count: 7 },
  { id: 303, title: 'أجهزة الترفيه والصوتيات', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format', link: '/category/أجهزة-الترفيه-والصوتيات', count: 6 },
  { id: 304, title: 'مستلزمات إلكترونية عامة', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format', link: '/category/مستلزمات-إلكترونية-عامة', count: 4 },
  { id: 305, title: 'الأجهزة المنزلية الكهربائية', image: 'https://images.unsplash.com/photo-1576468106695-efc3e4c1cc79?w=400&auto=format', link: '/category/الأجهزة-المنزلية-الكهربائية', count: 9 },
  { id: 306, title: 'المعدات الصناعية والمهنية', image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&auto=format', link: '/category/المعدات-الصناعية-والمهنية', count: 4 },
  { id: 307, title: 'أجهزة ذكية وإنترنت الأشياء', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format', link: '/category/أجهزة-ذكية-وإنترنت-الأشياء', count: 4 },
  { id: 308, title: 'خدمات إلكترونية (صيانة)', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format', link: '/category/خدمات-إلكترونية-(صيانة)', count: 4 }
];

// ✅ أقسام المواد الغذائية
export const foodCategories = [
  { id: 401, title: 'الحبوب ومشتقاتها', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format', link: '/category/الحبوب-مشتقاتها', count: 9 },
  { id: 402, title: 'البقوليات', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe0b8f?w=400&auto=format', link: '/category/البقوليات', count: 6 },
  { id: 403, title: 'الزيوت والدهون', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format', link: '/category/الزيوت-والدهون', count: 6 },
  { id: 404, title: 'السكر والمحليات', image: 'https://images.unsplash.com/photo-1589986740557-380b1c15b164?w=400&auto=format', link: '/category/السكر-والمحليات', count: 6 },
  { id: 405, title: 'الألبان ومنتجاتها', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format', link: '/category/الألبان-ومنتجاتها', count: 6 },
  { id: 406, title: 'اللحوم والأسماك', image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&auto=format', link: '/category/اللحوم-والأسماك', count: 5 },
  { id: 407, title: 'الخضروات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format', link: '/category/الخضروات', count: 9 },
  { id: 408, title: 'الفواكه', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format', link: '/category/الفواكه', count: 8 },
  { id: 409, title: 'المشروبات', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&auto=format', link: '/category/المشروبات', count: 6 },
  { id: 410, title: 'مواد غذائية أخرى (مكملات)', image: 'https://images.unsplash.com/photo-1589986740557-380b1c15b164?w=400&auto=format', link: '/category/مواد-غذائية-أخرى-(مكملات)', count: 6 }
];
// ✅ أقسام المركبات ومستلزماتها
export const vehiclesCategories = [
  { id: 501, title: 'السيارات - بيع', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format', link: '/category/السيارات---بيع', count: 8 },
  { id: 502, title: 'السيارات - تأجير', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format', link: '/category/السيارات---تأجير', count: 8 },
  { id: 503, title: 'مستلزمات السيارات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&auto=format', link: '/category/مستلزمات-السيارات', count: 14 },
  { id: 504, title: 'خدمات السيارات', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format', link: '/category/خدمات-السيارات', count: 6 }
];
// ✅ أقسام مواد البناء
export const constructionCategories = [
  { id: 601, title: 'الأسمنت والخرسانة', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format', link: '/category/الأسمنت-والخرسانة', count: 5 },
  { id: 602, title: 'الحديد والمعادن', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format', link: '/category/الحديد-والمعادن', count: 5 },
  { id: 603, title: 'مواد السباكة', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format', link: '/category/مواد-السباكة', count: 7 },
  { id: 604, title: 'الكهرباء والاضاءة', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format', link: '/category/الكهرباء-والاضاءة', count: 5 },
  { id: 605, title: 'مواد التشطيب', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format', link: '/category/مواد-التشطيب', count: 6 },
  { id: 606, title: 'الدهانات ومستلزماتها', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format', link: '/category/الدهانات-ومستلزماتها', count: 5 },
  { id: 607, title: 'المكملات والاكسسوارات', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format', link: '/category/المكملات-والإكسسوارات', count: 6 },
  { id: 608, title: 'ادوات ومعدات البناء', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format', link: '/category/ادوات-ومعدات-البناء', count: 6 },
  { id: 609, title: 'معدات الورش', image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=400&auto=format', link: '/category/معدات-الورش', count: 9 }
];
// ✅ أقسام العقارات
export const realEstateCategories = [
  { id: 701, title: 'عقارات للبيع', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&auto=format', link: '/category/عقارات-للبيع', count: 9 },
  { id: 702, title: 'عقارات للإيجار', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format', link: '/category/عقارات-للإيجار', count: 9 },
  { id: 703, title: 'تمليك بالتقسيط', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format', link: '/category/تمليك-بالتقسيط', count: 9 }
];

// ✅ دالة للحصول على أقسام العقارات
export function getRealEstateCategories() {
  return realEstateCategories;
}


// ✅ دالة للحصول على أقسام مواد البناء
export function getConstructionCategories() {
  return constructionCategories;
}



// ✅ دالة للحصول على أقسام المركبات
export function getVehiclesCategories() {
  return vehiclesCategories;
}

// ✅ تحديث دالة getCategoriesByType


// ✅ دالة للحصول على أقسام المواد الغذائية
export function getFoodCategories() {
  return foodCategories;
}

// ✅ تحديث دالة getCategoriesByType

// ✅ دالة للحصول على أقسام الإلكترونيات
export function getElectronicsCategories() {
  return electronicsCategories;
}
// ✅ دالة للحصول على أقسام الأطفال
export function getKidsCategories() {
  return kidsCategories;
}

// / ✅ تحديث دالة getCategoriesByType
export function getCategoriesByType(type) {
  if (type === 'mens') return mensCategories;
  if (type === 'womens') return womensCategories;
  if (type === 'kids') return kidsCategories;
  if (type === 'electronics') return electronicsCategories;
  if (type === 'food') return foodCategories;
  if (type === 'vehicles') return vehiclesCategories;
  if (type === 'construction') return constructionCategories;
  if (type === 'realestate') return realEstateCategories;
  return [];
}