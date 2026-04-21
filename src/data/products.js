// src/data/products.js

// ========== المنتجات الرجالية ==========
export const mensProducts = {
  'الملابس-اليومية': [
    {
      id: 101,
      name: 'تيشيرت قطني أبيض',
      price: 89,
      oldPrice: 120,
      isOffer: true,
      offerExpiry: '2026-12-31',
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format'
      ],
      seller: { name: 'متجر الأزياء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'daily',
      categoryTitle: 'الملابس اليومية',
      categoryLink: 'الملابس-اليومية',
      description: 'تيشيرت قطني 100%، مريح ومناسب للاستخدام اليومي',
      longDescription: 'تيشيرت مصنوع من أجود أنواع القطن المصري، يتميز بنعومته وتهويته العالية.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أبيض', 'أسود', 'أزرق'],
      features: ['قماش قطني 100%', 'مقاوم للتجعد', 'تهوية عالية'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': 'S, M, L, XL' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 102,
      name: 'تيشيرت أسود رياضي',
      price: 99,
      oldPrice: 150,
      isOffer: true,
      offerExpiry: '2026-12-31',
      rating: 4.3,
      reviews: 85,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعتين', returns: '7 أيام' },
      inStock: true,
      stock: 32,
      categoryEn: 'daily',
      categoryTitle: 'الملابس اليومية',
      categoryLink: 'الملابس-اليومية',
      description: 'تيشيرت رياضي مناسب للتمارين',
      sizes: ['M', 'L', 'XL'],
      colors: ['أسود', 'أزرق'],
      features: ['تقنية Dri-FIT', 'خامة خفيفة الوزن'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 103,
      name: 'جينز أزرق كلاسيكي',
      price: 199,
      oldPrice: 299,
      isOffer: true,
      offerExpiry: '2026-12-31',
      rating: 4.7,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format'],
      seller: { name: 'متجر الجينز', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 78,
      categoryEn: 'daily',
      categoryTitle: 'الملابس اليومية',
      categoryLink: 'الملابس-اليومية',
      description: 'جينز كلاسيكي بقصة مستقيمة',
      sizes: ['30', '32', '34', '36'],
      colors: ['أزرق', 'أسود'],
      features: ['دنيم أصلي', 'قصة مستقيمة'],
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'الملابس-الرسمية': [
    {
      id: 201,
      name: 'قميص رسمي أبيض',
      price: 149,
      oldPrice: 199,
      isOffer: true,
      offerExpiry: '2026-12-31',
      rating: 4.6,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format'],
      seller: { name: 'متجر الرسميات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'formal',
      categoryTitle: 'الملابس الرسمية',
      categoryLink: 'الملابس-الرسمية',
      description: 'قميص رسمي أبيض مناسب للمناسبات الرسمية والعمل',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['أبيض'],
      features: ['قماش فاخر', 'مقاوم للتجعد'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 202,
      name: 'قميص رسمي أزرق فاتح',
      price: 159,
      oldPrice: 199,
      isOffer: true,
      offerExpiry: '2026-12-31',
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1598033121393-5c6b2c64c0b7?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1598033121393-5c6b2c64c0b7?w=800&auto=format'],
      seller: { name: 'متجر الرسميات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'formal',
      categoryTitle: 'الملابس الرسمية',
      categoryLink: 'الملابس-الرسمية',
      description: 'قميص رسمي أزرق فاتح أنيق',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أزرق فاتح'],
      features: ['قصة عصرية', 'قماش ناعم'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 203,
      name: 'بنطلون رسمي أسود',
      price: 189,
      oldPrice: 249,
      rating: 4.5,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format'],
      seller: { name: 'متجر الأناقة', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعتين', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'formal',
      categoryTitle: 'الملابس الرسمية',
      categoryLink: 'الملابس-الرسمية',
      description: 'بنطلون رسمي أسود بقصة عصرية',
      sizes: ['30', '32', '34', '36', '38'],
      colors: ['أسود'],
      features: ['قماش فاخر', 'قصة عصرية'],
      hasDelivery: true,
      deliveryCost: 25
    }
  ],
  'الملابس-التراثية': [
    {
      id: 301,
      name: 'ثوب أبيض',
      price: 229,
      oldPrice: 299,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format'],
      seller: { name: 'متجر التراث', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 123,
      categoryEn: 'traditional',
      categoryTitle: 'الملابس التراثية',
      categoryLink: 'الملابس-التراثية',
      description: 'ثوب أبيض تقليدي',
      sizes: ['48', '50', '52', '54', '56'],
      colors: ['أبيض'],
      features: ['قطن فاخر', 'تفصيل دقيق'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 302,
      name: 'مشلح صوف أسود',
      price: 399,
      oldPrice: 499,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1592878904946-5d3b8e702e42?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1592878904946-5d3b8e702e42?w=800&auto=format'],
      seller: { name: 'متجر المشالح', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعتين', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'traditional',
      categoryTitle: 'الملابس التراثية',
      categoryLink: 'الملابس-التراثية',
      description: 'مشلح صوف أسود فاخر',
      sizes: ['مقاس واحد'],
      colors: ['أسود'],
      features: ['صوف فاخر', 'تطريز يدوي'],
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 303,
      name: 'غترة بيضاء',
      price: 45,
      oldPrice: 59,
      rating: 4.6,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1596783074918-c84c1c9e7e0f?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1596783074918-c84c1c9e7e0f?w=800&auto=format'],
      seller: { name: 'متجر الغتر', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 345,
      categoryEn: 'traditional',
      categoryTitle: 'الملابس التراثية',
      categoryLink: 'الملابس-التراثية',
      description: 'غترة بيضاء ناعمة',
      sizes: ['مقاس واحد'],
      colors: ['أبيض'],
      features: ['قطن ناعم', 'خفيفة الوزن'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الملابس-الداخلية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 401,
      name: 'فانلة قطن (3 قطع)',
      price: 59,
      oldPrice: 89,
      rating: 4.5,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الداخلي', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 120,
      categoryEn: 'underwear',
      categoryTitle: 'الملابس الداخلية',
      categoryLink: 'الملابس-الداخلية',
      description: 'فانلة قطن ناعمة',
      longDescription: 'فانلة قطن 100% مكونة من 3 قطع، ناعمة ومريحة.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أبيض', 'أسود'],
      features: ['قطن 100%', 'طقم 3 قطع'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 402,
      name: 'كلسون قطن (3 قطع)',
      price: 49,
      oldPrice: 69,
      rating: 4.4,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الداخلي', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 150,
      categoryEn: 'underwear',
      categoryTitle: 'الملابس الداخلية',
      categoryLink: 'الملابس-الداخلية',
      description: 'كلسون قطني مريح',
      longDescription: 'كلسون قطني 100% مكون من 3 قطع، ناعم ومريح.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'أبيض'],
      features: ['قطن 100%', 'مريح'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الأحذية-الرجالية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 501,
      name: 'حذاء رسمي أسود',
      price: 199,
      oldPrice: 299,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format'],
      seller: { name: 'متجر الأحذية', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'shoes',
      categoryTitle: 'الأحذية الرجالية',
      categoryLink: 'الأحذية-الرجالية',
      description: 'حذاء رسمي أسود أنيق',
      longDescription: 'حذاء رسمي من الجلد الطبيعي، مناسب للمناسبات الرسمية.',
      sizes: ['39', '40', '41', '42', '43', '44'],
      colors: ['أسود', 'بني'],
      features: ['جلد طبيعي', 'مريح'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 502,
      name: 'حذاء رياضي أزرق',
      price: 159,
      oldPrice: 199,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'shoes',
      categoryTitle: 'الأحذية الرجالية',
      categoryLink: 'الأحذية-الرجالية',
      description: 'حذاء رياضي للجري',
      longDescription: 'حذاء رياضي خفيف الوزن، مناسب للجري والتمارين.',
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['أزرق', 'أسود'],
      features: ['خفيف الوزن', 'نعل مطاطي'],
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'الاكسسوارات-الرجالية': [
    {
      id: 601,
      name: 'ساعة يد كلاسيكية',
      price: 249,
      oldPrice: 299,
      rating: 4.7,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format'],
      seller: { name: 'متجر الساعات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 23,
      categoryEn: 'accessories',
      categoryTitle: 'الاكسسوارات الرجالية',
      categoryLink: 'الاكسسوارات-الرجالية',
      description: 'ساعة يد كلاسيكية بتصميم أنيق',
      colors: ['فضي', 'ذهبي', 'أسود'],
      features: ['فولاذ مقاوم للصدأ', 'حركة كوارتز'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 602,
      name: 'نظارة شمسية',
      price: 129,
      oldPrice: 179,
      rating: 4.5,
      reviews: 62,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format'],
      seller: { name: 'متجر النظارات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعتين', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'accessories',
      categoryTitle: 'الاكسسوارات الرجالية',
      categoryLink: 'الاكسسوارات-الرجالية',
      description: 'نظارة شمسية عصرية مع حماية من الأشعة فوق البنفسجية',
      colors: ['أسود', 'بني', 'أزرق'],
      features: ['حماية UV400', 'عدسات عالية الجودة'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 603,
      name: 'محفظة جلدية',
      price: 89,
      oldPrice: 129,
      rating: 4.6,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format'],
      seller: { name: 'متجر الجلديات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'accessories',
      categoryTitle: 'الاكسسوارات الرجالية',
      categoryLink: 'الاكسسوارات-الرجالية',
      description: 'محفظة جلدية أنيقة متعددة الجيوب',
      colors: ['بني', 'أسود', 'بيج'],
      features: ['جلد طبيعي', '8 جيوب للبطاقات'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الملابس-الرياضية': [
    {
      id: 701,
      name: 'طقم رياضي قطني',
      price: 189,
      oldPrice: 249,
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'sportswear',
      categoryTitle: 'الملابس الرياضية',
      categoryLink: 'الملابس-الرياضية',
      description: 'طقم رياضي قطني مريح',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['رمادي', 'أسود'],
      features: ['قطن فاخر', 'مريح للتمارين'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 702,
      name: 'تيشيرت رياضي',
      price: 89,
      oldPrice: 119,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعتين', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'sportswear',
      categoryTitle: 'الملابس الرياضية',
      categoryLink: 'الملابس-الرياضية',
      description: 'تيشيرت رياضي للتمارين',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'أزرق', 'أحمر'],
      features: ['خفيف الوزن', 'يمتص العرق'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 703,
      name: 'شورت رياضي',
      price: 69,
      oldPrice: 89,
      rating: 4.3,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعتين', returns: '7 أيام' },
      inStock: true,
      stock: 45,
      categoryEn: 'sportswear',
      categoryTitle: 'الملابس الرياضية',
      categoryLink: 'الملابس-الرياضية',
      description: 'شورت رياضي للجري',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'أزرق', 'رمادي'],
      features: ['خفيف الوزن', 'تهوية عالية'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الأزياء-الشتوية': [
    {
      id: 801,
      name: 'معطف شتوي',
      price: 349,
      oldPrice: 449,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format'],
      seller: { name: 'متجر الشتاء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 18,
      categoryEn: 'winter',
      categoryTitle: 'الأزياء الشتوية',
      categoryLink: 'الأزياء-الشتوية',
      description: 'معطف شتوي طويل',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'بيج', 'كحلي'],
      features: ['صوف فاخر', 'تصميم كلاسيكي'],
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 802,
      name: 'كنزة صوف',
      price: 179,
      oldPrice: 229,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format'],
      seller: { name: 'متجر الشتاء', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'winter',
      categoryTitle: 'الأزياء الشتوية',
      categoryLink: 'الأزياء-الشتوية',
      description: 'كنزة صوف دافئة',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['رمادي', 'بيج', 'أسود'],
      features: ['صوف ناعم', 'دافئة للشتاء'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 803,
      name: 'قبعة شتوية',
      price: 49,
      oldPrice: 69,
      rating: 4.4,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format'],
      seller: { name: 'متجر الاكسسوارات', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعتين', returns: '7 أيام' },
      inStock: true,
      stock: 56,
      categoryEn: 'winter',
      categoryTitle: 'الأزياء الشتوية',
      categoryLink: 'الأزياء-الشتوية',
      description: 'قبعة شتوية صوفية',
      sizes: ['مقاس واحد'],
      colors: ['أسود', 'رمادي', 'أزرق'],
      features: ['صوف دافئ', 'تصميم عصري'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'تیشيرتات': [
    {
      id: 901,
      name: 'تيشيرت رياضي',
      price: 85,
      oldPrice: 110,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format',
      seller: { name: 'متجر الأزياء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 50,
      categoryEn: 'daily',
      categoryTitle: 'تیشيرتات',
      categoryLink: 'تیشيرتات',
      description: 'تيشيرت رياضي مريح',
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'قمصان': [
    {
      id: 902,
      name: 'قميص أبيض كاجوال',
      price: 120,
      oldPrice: 160,
      rating: 4.7,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1598033121393-5c6b2c64c0b7?w=800&auto=format',
      seller: { name: 'متجر الأزياء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 25,
      categoryEn: 'daily',
      categoryTitle: 'قمصان',
      categoryLink: 'قمصان',
      description: 'قميص كاجوال أنيق',
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'بناطيل-جينز': [
    {
      id: 903,
      name: 'بنطلون جينز أزرق',
      price: 180,
      oldPrice: 240,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format',
      seller: { name: 'متجر الجينز', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 60,
      categoryEn: 'daily',
      categoryTitle: 'بناطيل جينز',
      categoryLink: 'بناطيل-جينز',
      description: 'جينز كلاسيكي مريح',
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'بناطيل-قماش': [
    {
      id: 904,
      name: 'بنطلون قماش بني',
      price: 150,
      oldPrice: 200,
      rating: 4.5,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format',
      seller: { name: 'متجر الأناقة', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعتين', returns: '14 يوم' },
      inStock: true,
      stock: 40,
      categoryEn: 'daily',
      categoryTitle: 'بناطيل قماش',
      categoryLink: 'بناطيل-قماش',
      description: 'بنطلون قماش بقصة عصرية',
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'شورتات': [
    {
      id: 905,
      name: 'شورت صيفي مريح',
      price: 70,
      oldPrice: 95,
      rating: 4.4,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format',
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعتين', returns: '7 أيام' },
      inStock: true,
      stock: 35,
      categoryEn: 'daily',
      categoryTitle: 'شورتات',
      categoryLink: 'شورتات',
      description: 'شورت صيفي مريح للسباحة أو النزهات',
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'بدلات-رسمية': [
    { id: 1101, name: 'بدلة رسمية كلاسيكية', price: 1200, categoryLink: 'بدلات-رسمية', categoryTitle: 'بدلات رسمية', image: 'https://images.unsplash.com/photo-1594932224030-94042858bb63?w=800&auto=format', seller: { name: 'متجر الرسميات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'قمصان-رسمية': [
    { id: 1102, name: 'قميص رسمي ناصع البياض', price: 180, categoryLink: 'قمصان-رسمية', categoryTitle: 'قمصان رسمية', image: 'https://images.unsplash.com/photo-1621072156002-e2fcceddf5d7?w=800&auto=format', seller: { name: 'متجر الرسميات', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'بناطيل-رسمية': [
    { id: 1103, name: 'بنطلون رسمي شارك سكين', price: 250, categoryLink: 'بناطيل-رسمية', categoryTitle: 'بناطيل رسمية', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format', seller: { name: 'متجر الرسميات', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'اثواب': [
    { id: 1201, name: 'ثوب يمني مطرز', price: 350, categoryLink: 'اثواب', categoryTitle: 'اثواب', image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format', seller: { name: 'متجر التراث', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'شيلان': [
    { id: 1202, name: 'شال كشميري فاخر', price: 500, categoryLink: 'شيلان', categoryTitle: 'شيلان', image: 'https://images.unsplash.com/photo-1596783074918-c84c1c9e7e0f?w=800&auto=format', seller: { name: 'متجر التراث', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'فوط-يمنية': [
    { id: 1203, name: 'فوطة تعزي أصلية', price: 120, categoryLink: 'فوط-يمنية', categoryTitle: 'فوط يمنية', image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format', seller: { name: 'متجر التراث', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'معوز': [
    { id: 1204, name: 'معوز عدني ملكي', price: 180, categoryLink: 'معوز', categoryTitle: 'معوز', image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format', seller: { name: 'متجر التراث', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'عمائم-وكوفية': [
    { id: 1205, name: 'عمامة تهامية', price: 80, categoryLink: 'عمائم-وكوفية', categoryTitle: 'عمائم وكوفية', image: 'https://images.unsplash.com/photo-1596783074918-c84c1c9e7e0f?w=800&auto=format', seller: { name: 'متجر التراث', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'فانيلات-داخلية': [
    { id: 1301, name: 'فانلة داخلية قطنية', price: 35, categoryLink: 'فانيلات-داخلية', categoryTitle: 'فانيلات داخلية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'سراويل-داخلية': [
    { id: 1302, name: 'سروال داخلي مريح', price: 30, categoryLink: 'سراويل-داخلية', categoryTitle: 'سراويل داخلية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'ملابس-نوم-رجالي': [
    { id: 1303, name: 'روب نوم رجالي', price: 120, categoryLink: 'ملابس-نوم-رجالي', categoryTitle: 'ملابس نوم رجالي', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'بيجامات': [
    { id: 1304, name: 'بيجامة قطنية مريحة', price: 95, categoryLink: 'بيجامات', categoryTitle: 'بيجامات', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'أحذية-رسمية': [
    { id: 1401, name: 'حذاء رسمي جلد طبيعي', price: 280, categoryLink: 'أحذية-رسمية', categoryTitle: 'أحذية رسمية', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'أحذية-كاجوال': [
    { id: 1402, name: 'حذاء كاجوال مريح', price: 160, categoryLink: 'أحذية-كاجوال', categoryTitle: 'أحذية كاجوال', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'صنادل': [
    { id: 1403, name: 'صندل جلدي كلاسيكي', price: 90, categoryLink: 'صنادل', categoryTitle: 'صنادل', image: 'https://images.unsplash.com/photo-1603215264639-652a23351656?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'شباشب': [
    { id: 1404, name: 'شبشب منزلي مريح', price: 45, categoryLink: 'شباشب', categoryTitle: 'شباشب', image: 'https://images.unsplash.com/photo-1603217431411-9a9972323e07?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'أحذية-رياضية': [
    { id: 1405, name: 'حذاء رياضي متطور', price: 210, categoryLink: 'أحذية-رياضية', categoryTitle: 'أحذية رياضية', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الرياضة', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'جنابي': [
    { id: 1501, name: 'جنبية صيفاني أصيلة', price: 5000, categoryLink: 'جنابي', categoryTitle: 'جنابي', image: 'https://images.unsplash.com/photo-1614352222222-2b6e4e4e4e4e?w=800&auto=format', seller: { name: 'متجر الجنابي', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'ساعات': [
    { id: 1502, name: 'ساعة يد فاخرة', price: 850, categoryLink: 'ساعات', categoryTitle: 'ساعات', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format', seller: { name: 'متجر النخبة', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'خواتم': [
    { id: 1503, name: 'خاتم عقيق يمني', price: 300, categoryLink: 'خواتم', categoryTitle: 'خواتم', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format', seller: { name: 'متجر الخواتم', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'عطور-رجالية': [
    { id: 1504, name: 'عطر عود ملكي', price: 450, categoryLink: 'عطور-رجالية', categoryTitle: 'عطور رجالية', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format', seller: { name: 'متجر العطور', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'نظارات-شمسية': [
    { id: 1505, name: 'نظارة شمسية بولارايزد', price: 220, categoryLink: 'نظارات-شمسية', categoryTitle: 'نظارات شمسية', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format', seller: { name: 'متجر النظارات', whatsapp: '776981756' }, inStock: true, stock: 18 }
  ],
  'محافظ': [
    { id: 1506, name: 'محفظة جلد طبيعي', price: 95, categoryLink: 'محافظ', categoryTitle: 'محافظ', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'أحزمة': [
    { id: 1507, name: 'حزام جلد فاخر', price: 75, categoryLink: 'أحزمة', categoryTitle: 'أحزمة', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'أطقم-رياضية': [
    { id: 1601, name: 'طقم رياضي كامل', price: 185, categoryLink: 'أطقم-رياضية', categoryTitle: 'أطقم رياضي', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format', seller: { name: 'متجر الرياضة', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'بناطيل-رياضية': [
    { id: 1602, name: 'بنطلون رياضي مريح', price: 90, categoryLink: 'بناطيل-رياضية', categoryTitle: 'بناطيل رياضة', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format', seller: { name: 'متجر الرياضة', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'تیشيرتات-رياضية': [
    { id: 1603, name: 'تیشيرت رياضي بوليستر', price: 70, categoryLink: 'تیشيرتات-رياضية', categoryTitle: 'تیشيرتات رياضية', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format', seller: { name: 'متجر الرياضة', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'جاكيتات-جلد': [
    { id: 1701, name: 'جاكيت جلد أصلي', price: 450, categoryLink: 'جاكيتات-جلد', categoryTitle: 'جاكيتات جلد', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d50d?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'جاكيتات-قماش-ثقيل': [
    { id: 1702, name: 'جاكيت صوف ثقيل', price: 320, categoryLink: 'جاكيتات-قماش-ثقيل', categoryTitle: 'جاكيتات قماش ثقيل', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'معاطف-طويلة-(بالطو)': [
    { id: 1703, name: 'بالطو طويل شتوي', price: 580, categoryLink: 'معاطف-طويلة-(بالطو)', categoryTitle: 'معاطف طويلة (بالطو)', image: 'https://images.unsplash.com/photo-1544022613-e87f17a7837c?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'جاكيتات-ضد-المطر': [
    { id: 1704, name: 'جاكيت وتر بروف', price: 150, categoryLink: 'جاكيتات-ضد-المطر', categoryTitle: 'جاكيتات ضد المطر', image: 'https://images.unsplash.com/photo-1591047139829-d91ad1630737?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'بلوفرات-صوف': [
    { id: 1705, name: 'بلوفر صوف أوسلي', price: 110, categoryLink: 'بلوفرات-صوف', categoryTitle: 'بلوفرات صوف', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'كنزات-برقبة-عالية': [
    { id: 1706, name: 'كنزة هاينك شيك', price: 130, categoryLink: 'كنزات-برقبة-عالية', categoryTitle: 'كنزات برقبة عالية', image: 'https://images.unsplash.com/photo-1620791231932-888989528e0e?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'سترات-محبوكة': [
    { id: 1707, name: 'سترة محبوكة يدوياً', price: 210, categoryLink: 'سترات-محبوكة', categoryTitle: 'سترات محبوكة', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'فانيلات-داخلية-صوف': [
    { id: 1708, name: 'طقم ملابس داخلية حرارية', price: 120, categoryLink: 'فانيلات-داخلية-صوف', categoryTitle: 'فانيلات داخلية صوف', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'سراويل-داخلية-شتوية': [
    { id: 1709, name: 'سروال داخلي صوف دافئ', price: 60, categoryLink: 'سراويل-داخلية-شتوية', categoryTitle: 'سراويل داخلية شتوية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'أطقم-داخلية-حرارية': [
    { id: 1710, name: 'طقم حراري للبرد القارس', price: 180, categoryLink: 'أطقم-داخلية-حرارية', categoryTitle: 'أطقم داخلية حرارية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'شالات-وكوفية': [
    { id: 1711, name: 'شال شتوي صوف', price: 65, categoryLink: 'شالات-وكوفية', categoryTitle: 'شالات وكوفية', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'قبعات-صوف': [
    { id: 1712, name: 'قبعة صوف دافئة', price: 40, categoryLink: 'قبعات-صوف', categoryTitle: 'قبعات صوف', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'قفازات': [
    { id: 1713, name: 'قفازات جلد شتوية', price: 55, categoryLink: 'قفازات', categoryTitle: 'قفازات', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'جوارب-شتوية-سميكة': [
    { id: 1714, name: 'شرابات صوف سميكة', price: 25, categoryLink: 'جوارب-شتوية-سميكة', categoryTitle: 'جوارب شتوية سميكة', image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'أحذية-مبطنة': [
    { id: 1715, name: 'حذاء شتوي مبطن', price: 240, categoryLink: 'أحذية-مبطنة', categoryTitle: 'أحذية مبطنة', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'أحذية-مقاومة-للمطر': [
    { id: 1716, name: 'حذاء بووت للمطر', price: 180, categoryLink: 'أحذية-مقاومة-للمطر', categoryTitle: 'أحذية مقاومة للمطر', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'شباشب-منزلية-دافئة': [
    { id: 1717, name: 'شبشب منزلي فراء', price: 40, categoryLink: 'شباشب-منزلية-دافئة', categoryTitle: 'شباشب منزلية دافئة', image: 'https://images.unsplash.com/photo-1603217431411-9a9972323e07?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ]
};

// ========== المنتجات النسائية ==========
export const womensProducts = {
  'فستان-استقبال': [
    { id: 3101, name: 'فستان استقبال ناعم', price: 250, categoryLink: 'فستان-استقبال', categoryTitle: 'فستان استقبال', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format', seller: { name: 'متجر فساتين', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'فستان-سهرة': [
    { id: 3102, name: 'فستان سهرة ملكي', price: 850, categoryLink: 'فستان-سهرة', categoryTitle: 'فستان سهرة', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format', seller: { name: 'متجر السهرات', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'فستان-عُرس-(فستان-عروسة)': [
    { id: 3103, name: 'فستان زفاف دانتيل', price: 3500, categoryLink: 'فستان-عُرس-(فستان-عروسة)', categoryTitle: 'فستان عُرس (فستان عروسة)', image: 'https://images.unsplash.com/photo-1594553924364-c3dc5277150a?w=800&auto=format', seller: { name: 'متجر العرايس', whatsapp: '776981756' }, inStock: true, stock: 3 }
  ],
  'فستان-مشجر': [
    { id: 3104, name: 'فستان مشجر صيفي', price: 180, categoryLink: 'فستان-مشجر', categoryTitle: 'فستان مشجر', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format', seller: { name: 'متجر فساتين', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'فستان-ناعم-(فستان-بيت)': [
    { id: 3105, name: 'فستان بيت قطني', price: 90, categoryLink: 'فستان-ناعم-(فستان-بيت)', categoryTitle: 'فستان ناعم (فستان بيت)', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'فساتين-شتوية': [
    { id: 3106, name: 'فستان صوف شتوي', price: 210, categoryLink: 'فساتين-شتوية', categoryTitle: 'فساتين شتوية', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'فساتين-للبنات-(صغيرات)': [
    { id: 3107, name: 'فستان بناتي مخمل', price: 120, categoryLink: 'فساتين-للبنات-(صغيرات)', categoryTitle: 'فساتين للبنات (صغيرات)', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format', seller: { name: 'متجر الأطفال', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'جلابيات-قطنية-للبيت': [
    { id: 3201, name: 'جلابية قطن مصرية', price: 85, categoryLink: 'جلابيات-قطنية-للبيت', categoryTitle: 'جلابيات قطنية للبيت', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر الجلابيات', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'جلابيات-مزخرفة': [
    { id: 3202, name: 'جلابية مزخرفة فاخرة', price: 280, categoryLink: 'جلابيات-مزخرفة', categoryTitle: 'جلابيات مزخرفة', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر الجلابيات', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'دراعة-مزخرفة': [
    { id: 3203, name: 'دراعة كويتية مطرزة', price: 320, categoryLink: 'دراعة-مزخرفة', categoryTitle: 'دراعة مزخرفة', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر الجلابيات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'جلابيات-شتوية': [
    { id: 3204, name: 'جلابية شتوية ثقيلة', price: 190, categoryLink: 'جلابيات-شتوية', categoryTitle: 'جلابيات شتوية', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'أروايب-فخمة-(روب-ساتان)': [
    { id: 3205, name: 'روب ساتان فاخر', price: 150, categoryLink: 'أروايب-فخمة-(روب-ساتان)', categoryTitle: 'أروايب فخمة (روب ساتان)', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الراحة', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'طقومات-داخلية-قطنية': [
    { id: 3301, name: 'طقم داخلي قطن 100%', price: 45, categoryLink: 'طقومات-داخلية-قطنية', categoryTitle: 'طقومات داخلية قطنية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'قمصان-نوم-طويلة': [
    { id: 3302, name: 'قميص نوم ساتان طويل', price: 110, categoryLink: 'قمصان-نوم-طويلة', categoryTitle: 'قمصان نوم طويلة', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'قمصان-نوم-قصيرة': [
    { id: 3303, name: 'قميص نوم ناعم قصير', price: 85, categoryLink: 'قمصان-نوم-قصيرة', categoryTitle: 'قمصان نوم قصيرة', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'لأنجري-نسائي': [
    { id: 3304, name: 'لأنجري دانتيل فاخر', price: 160, categoryLink: 'لأنجري-نسائي', categoryTitle: 'لأنجري نسائي', image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'ملابس-داخلية-قطنية-يومية': [
    { id: 3305, name: 'ملابس داخلية يومية مريحة', price: 35, categoryLink: 'ملابس-داخلية-قطنية-يومية', categoryTitle: 'ملابس داخلية قطنية يومية', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 120 }
  ],
  'ساعات-يد-نسائية': [
    { id: 3401, name: 'ساعة يد ذهبية سويسرية', price: 1200, categoryLink: 'ساعات-يد-نسائية', categoryTitle: 'ساعات يد نسائية', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format', seller: { name: 'متجر الساعات', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'نظارات-شمسي': [
    { id: 3402, name: 'نظارة شمسية ماركة عالمية', price: 450, categoryLink: 'نظارات-شمسي', categoryTitle: 'نظارات شمسي', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format', seller: { name: 'متجر النظارات', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'شنط-يد-نسائية': [
    { id: 3403, name: 'شنطة يد جلد طبيعي', price: 550, categoryLink: 'شنط-يد-نسائية', categoryTitle: 'شنط يد نسائية', image: 'https://images.unsplash.com/photo-1584917033794-c735e9cd2e74?w=800&auto=format', seller: { name: 'متجر الشنط', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'حقائب-ظهر-نسائي': [
    { id: 3404, name: 'حقيبة ظهر عصرية', price: 210, categoryLink: 'حقائب-ظهر-نسائي', categoryTitle: 'حقائب ظهر نسائي', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format', seller: { name: 'متجر الشنط', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'محافظ-نسائية': [
    { id: 3405, name: 'محفظة نسائية أنيقة', price: 120, categoryLink: 'محافظ-نسائية', categoryTitle: 'محافظ نسائية', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'مجوهرات-واكسسوارات': [
    { id: 3406, name: 'طقم مجوهرات مطلي بالذهب', price: 350, categoryLink: 'مجوهرات-واكسسوارات', categoryTitle: 'مجوهرات واكسسوارات', image: 'https://images.unsplash.com/photo-15356333027efd-9cf339e0f644?w=800&auto=format', seller: { name: 'متجر المجوهرات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'ربطات-شعر-/-توك': [
    { id: 3407, name: 'مجموعة توك شعر ملونة', price: 25, categoryLink: 'ربطات-شعر-/-توك', categoryTitle: 'ربطات شعر / توك', image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'عطور-نسائية': [
    { id: 3501, name: 'عطر فرنسي فاخر', price: 380, categoryLink: 'عطور-نسائية', categoryTitle: 'عطور نسائية', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format', seller: { name: 'متجر العطور', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'مكياج-(أساس-–-روج-–-كحل)': [
    { id: 3502, name: 'طقم مكياج كامل', price: 220, categoryLink: 'مكياج-(أساس-–-روج-–-كحل)', categoryTitle: 'مكياج (أساس – روج – كحل)', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format', seller: { name: 'متجر التجميل', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'كريمات-ومراهم': [
    { id: 3503, name: 'كريم مرطب للبشرة', price: 65, categoryLink: 'كريمات-ومراهم', categoryTitle: 'كريمات ومراهم', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format', seller: { name: 'متجر التجميل', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'أدوات-تجميل-(مقص،-ملقاط،-…)': [
    { id: 3504, name: 'طقم أدوات عناية بالأظافر', price: 45, categoryLink: 'أدوات-تجميل-(مقص،-ملقاط،-…)', categoryTitle: 'أدوات تجميل (مقص، ملقاط، …)', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format', seller: { name: 'متجر التجميل', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'بخور-ومباخر-نسائية': [
    { id: 3505, name: 'بخور عدني فاخر', price: 150, categoryLink: 'بخور-ومباخر-نسائية', categoryTitle: 'بخور ومباخر نسائية', image: 'https://images.unsplash.com/photo-1614352222222-2b6e4e4e4e4e?w=800&auto=format', seller: { name: 'متجر الطيب', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'أدوات-الشعر-(استشوار،-فير)': [
    { id: 3506, name: 'استشوار حراري متطور', price: 290, categoryLink: 'أدوات-الشعر-(استشوار،-فير)', categoryTitle: 'أدوات الشعر (استشوار، فير)', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format', seller: { name: 'متجر التجميل', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'أحذية-بيت-(شبشب)': [
    { id: 3601, name: 'شبشب فرو منزلي', price: 45, categoryLink: 'أحذية-بيت-(شبشب)', categoryTitle: 'أحذية بيت (شبشب)', image: 'https://images.unsplash.com/photo-1603217431411-9a9972323e07?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'أحذية-طلعة-(كعب-أو-مسطح)': [
    { id: 3602, name: 'حذاء كعب عالي للسهرات', price: 280, categoryLink: 'أحذية-طلعة-(كعب-أو-مسطح)', categoryTitle: 'أحذية طلعة (كعب أو مسطح)', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'أحذية-شتوية-(بوتات)': [
    { id: 3603, name: 'بوت شتوي مبطن', price: 320, categoryLink: 'أحذية-شتوية-(بوتات)', categoryTitle: 'أحذية شتوية (بوتات)', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'أحذية-رياضية-نسائية': [
    { id: 3604, name: 'حذاء رياضي نسائي وردي', price: 190, categoryLink: 'أحذية-رياضية-نسائية', categoryTitle: 'أحذية رياضية نسائية', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الرياضة', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'صنادل-نسائية': [
    { id: 3605, name: 'صندل صيفي أنيق', price: 75, categoryLink: 'صنادل-نسائية', categoryTitle: 'صنادل نسائية', image: 'https://images.unsplash.com/photo-1603215264639-652a23351656?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'جاكيتات-شتوية-نسائية': [
    { id: 3701, name: 'جاكيت شتوي نسائي فرو', price: 420, categoryLink: 'جاكيتات-شتوية-نسائية', categoryTitle: 'جاكيتات شتوية نسائية', image: 'https://images.unsplash.com/photo-1591047139829-d91ad1630737?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'معاطف-طويلة-(بالطو)-نسائي': [
    { id: 3702, name: 'بالطو طويل شتوي أنيق', price: 650, categoryLink: 'معاطف-طويلة-(بالطو)-نسائي', categoryTitle: 'معاطف طويلة (بالطو)', image: 'https://images.unsplash.com/photo-1544022613-e87f17a7837c?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'كنزات-صوف-(بلوفرات)-نسائي': [
    { id: 3703, name: 'بلوفر صوف ناعم', price: 145, categoryLink: 'كنزات-صوف-(بلوفرات)-نسائي', categoryTitle: 'كنزات صوف (بلوفرات)', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'شالات-صوف-/-لفحات': [
    { id: 3704, name: 'شال صوف ملون', price: 55, categoryLink: 'شالات-صوف-/-لفحات', categoryTitle: 'شالات صوف / لفحات', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'طقم-شتوي-(سروال-وكنزة)': [
    { id: 3705, name: 'طقم شتوي نسائي كامل', price: 230, categoryLink: 'طقم-شتوي-(سروال-وكنزة)', categoryTitle: 'طقم شتوي (سروال وكنزة)', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'شرابات-شتوية-/-صوفي': [
    { id: 3706, name: 'جوارب صوف شتوية سميكة', price: 20, categoryLink: 'شرابات-شتوية-/-صوفي', categoryTitle: 'شرابات شتوية / صوفي', image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'عبايات-رأس': [
    { id: 2101, name: 'عباية رأس كلاسيكية', price: 350, categoryLink: 'عبايات-رأس', categoryTitle: 'عبايات رأس', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'عبايات-خليجي': [
    { id: 2102, name: 'عباية خليجية مطرزة', price: 450, categoryLink: 'عبايات-خليجي', categoryTitle: 'عبايات خليجي', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'عبايات-سودانية': [
    { id: 2103, name: 'ثوب سوداني فاخر', price: 300, categoryLink: 'عبايات-سودانية', categoryTitle: 'عبايات سودانية', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'عبايات-شتوية': [
    { id: 2104, name: 'عباية شتوية مخمل', price: 550, categoryLink: 'عبايات-شتوية', categoryTitle: 'عبايات شتوية', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'عبايات-كتف': [
    { id: 2105, name: 'عباية كتف عصرية', price: 280, categoryLink: 'عبايات-كتف', categoryTitle: 'عبايات كتف', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'عبايات-مطرزة': [
    { id: 2106, name: 'عباية مطرزة يدوياً', price: 600, categoryLink: 'عبايات-مطرزة', categoryTitle: 'عبايات مطرزة', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'عبايات-مغربية': [
    { id: 2107, name: 'قفطان مغربي أنيق', price: 800, categoryLink: 'عبايات-مغربية', categoryTitle: 'عبايات مغربية', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 7 }
  ],
  'عبايات-ملونة': [
    { id: 2108, name: 'عباية ملونة صيفية', price: 320, categoryLink: 'عبايات-ملونة', categoryTitle: 'عبايات ملونة', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 18 }
  ],
  'عبايات-للبنات-(صغار)': [
    { id: 2109, name: 'عباية بنات صغار مطرزة', price: 150, categoryLink: 'عبايات-للبنات-(صغار)', categoryTitle: 'عبايات للبنات (صغار)', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format', seller: { name: 'متجر العبايات', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'الطرحة-القطنية': [
    { id: 2201, name: 'طرحة قطن يومية', price: 40, categoryLink: 'الطرحة-القطنية', categoryTitle: 'الطرحة القطنية', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'طرحة-الشيفون': [
    { id: 2202, name: 'طرحة شيفون ناعمة', price: 50, categoryLink: 'طرحة-الشيفون', categoryTitle: 'طرحة الشيفون', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'طرحة-القطن-السادة': [
    { id: 2203, name: 'طرحة قطن سادة ألوان', price: 35, categoryLink: 'طرحة-القطن-السادة', categoryTitle: 'طرحة القطن السادة', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'طرحة-مزخرفة': [
    { id: 2204, name: 'طرحة مزخرفة للسهرات', price: 75, categoryLink: 'طرحة-مزخرفة', categoryTitle: 'طرحة مزخرفة', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'طرحة-ملونة': [
    { id: 2205, name: 'طرحة ملونة زاهية', price: 45, categoryLink: 'طرحة-ملونة', categoryTitle: 'طرحة ملونة', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'لثام-(نقاب)': [
    { id: 2206, name: 'نقاب ملكي فاخر', price: 30, categoryLink: 'لثام-(نقاب)', categoryTitle: 'لثام (نقاب)', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'لثام-صوفي': [
    { id: 2207, name: 'لثام صوفي شتوي', price: 55, categoryLink: 'لثام-صوفي', categoryTitle: 'لثام صوفي', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'لثام-مطرز': [
    { id: 2208, name: 'لثام مطرز كلاسيك', price: 45, categoryLink: 'لثام-مطرز', categoryTitle: 'لثام مطرز', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'لفافات-قماش-مشجرة-(شعبية)': [
    { id: 2209, name: 'لفافة شعبية مشجرة', price: 25, categoryLink: 'لفافات-قماش-مشجرة-(شعبية)', categoryTitle: 'لفافات قماش مشجرة (شعبية)', image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format', seller: { name: 'متجر الطرح', whatsapp: '776981756' }, inStock: true, stock: 70 }
  ],
  'العبايات-النسائية': [
    {
      id: 1001,
      name: 'عباية سوداء كلاسيكية',
      price: 299,
      oldPrice: 399,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر العبايات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'abaya',
      categoryTitle: 'العبايات النسائية',
      categoryLink: 'العبايات-النسائية',
      description: 'عباية سوداء كلاسيكية أنيقة',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'بيج'],
      features: ['قماش فاخر', 'تصميم كلاسيكي'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 1002,
      name: 'عباية مطرزة فاخرة',
      price: 449,
      oldPrice: 599,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر العبايات', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 23,
      categoryEn: 'abaya',
      categoryTitle: 'العبايات النسائية',
      categoryLink: 'العبايات-النسائية',
      description: 'عباية مطرزة بتطريز يدوي',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'بيج'],
      features: ['تطريز يدوي', 'قماش فاخر'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 1003,
      name: 'عباية صيفية خفيفة',
      price: 199,
      oldPrice: 249,
      rating: 4.5,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر العبايات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'abaya',
      categoryTitle: 'العبايات النسائية',
      categoryLink: 'العبايات-النسائية',
      description: 'عباية صيفية خفيفة الوزن',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['بيج', 'وردي'],
      features: ['خامة خفيفة', 'مناسبة للصيف'],
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'الطرحة-واللثام': [
    {
      id: 2001,
      name: 'طرحة سادة',
      price: 45,
      oldPrice: 59,
      rating: 4.4,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format'],
      seller: { name: 'متجر الطرح', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 234,
      categoryEn: 'hijab',
      categoryTitle: 'الطرحة واللثام',
      categoryLink: 'الطرحة-واللثام',
      description: 'طرحة سادة ناعمة',
      colors: ['أبيض', 'أسود', 'بيج'],
      features: ['قطن ناعم', 'خفيفة الوزن'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 2002,
      name: 'طرحة مطرزة',
      price: 89,
      oldPrice: 119,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format'],
      seller: { name: 'متجر الطرح', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'hijab',
      categoryTitle: 'الطرحة واللثام',
      categoryLink: 'الطرحة-واللثام',
      description: 'طرحة مطرزة بتطريز أنيق',
      colors: ['بيج', 'وردي', 'أزرق'],
      features: ['تطريز يدوي', 'قطن ناعم'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 2003,
      name: 'لثام سادة',
      price: 25,
      oldPrice: 35,
      rating: 4.3,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1600950208022-cf6e1c5a5a5a?w=800&auto=format'],
      seller: { name: 'متجر الطرح', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعتين', returns: '7 أيام' },
      inStock: true,
      stock: 345,
      categoryEn: 'hijab',
      categoryTitle: 'الطرحة واللثام',
      categoryLink: 'الطرحة-واللثام',
      description: 'لثام سادة ناعم',
      colors: ['أسود', 'أبيض', 'بيج'],
      features: ['قطن ناعم', 'خفيف الوزن'],
      hasDelivery: true,
      deliveryCost: 8
    }
  ],
  'الفساتين': [
    {
      id: 3001,
      name: 'فستان طويل',
      price: 249,
      oldPrice: 329,
      rating: 4.7,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format'],
      seller: { name: 'متجر الفساتين', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'dresses',
      categoryTitle: 'الفساتين',
      categoryLink: 'الفساتين',
      description: 'فستان طويل أنيق',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'أزرق', 'وردي'],
      features: ['قماش فاخر', 'تصميم أنيق'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 3002,
      name: 'فستان قصير',
      price: 189,
      oldPrice: 249,
      rating: 4.5,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format'],
      seller: { name: 'متجر الفساتين', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'dresses',
      categoryTitle: 'الفساتين',
      categoryLink: 'الفساتين',
      description: 'فستان قصير عصري',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أبيض', 'أسود', 'أزرق'],
      features: ['قطن مريح', 'تصميم عصري'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 3003,
      name: 'فستان سهرة',
      price: 399,
      oldPrice: 499,
      rating: 4.9,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format'],
      seller: { name: 'متجر الفساتين', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 12,
      categoryEn: 'dresses',
      categoryTitle: 'الفساتين',
      categoryLink: 'الفساتين',
      description: 'فستان سهرة فاخر',
      sizes: ['S', 'M', 'L'],
      colors: ['أحمر', 'أسود', 'ذهبي'],
      features: ['حرير طبيعي', 'تطريز يدوي'],
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'الجلابيات-الدراعات-الأرواب': [
    {
      id: 4001,
      name: 'جلابية خليجية',
      price: 179,
      oldPrice: 229,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر الجلابيات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'jalabiya',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'جلابية خليجية أنيقة',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'ذهبي'],
      features: ['قماش فاخر', 'تطريز أنيق'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 4002,
      name: 'جلابية مطرزة',
      price: 249,
      oldPrice: 329,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر الجلابيات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 23,
      categoryEn: 'jalabiya',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'جلابية مطرزة يدوياً',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'أحمر'],
      features: ['تطريز يدوي', 'قماش فاخر'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 5001,
      name: 'دراعة سادة',
      price: 159,
      oldPrice: 199,
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر الدراعات', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'daraa',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'دراعة سادة أنيقة',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'بيج'],
      features: ['قماش ناعم', 'تصميم كلاسيكي'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 5002,
      name: 'دراعة مطرزة',
      price: 219,
      oldPrice: 279,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format'],
      seller: { name: 'متجر الدراعات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'daraa',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'دراعة مطرزة فاخرة',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'ذهبي'],
      features: ['تطريز يدوي', 'قماش فاخر'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 6001,
      name: 'روب قطني',
      price: 129,
      oldPrice: 169,
      rating: 4.4,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الأرواب', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 78,
      categoryEn: 'robe',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'روب قطني مريح',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['رمادي', 'أزرق'],
      features: ['قطن ناعم', 'مريح'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 6002,
      name: 'روب حرير',
      price: 199,
      oldPrice: 249,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الأرواب', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'robe',
      categoryTitle: 'الجلابيات والدراعات والأرواب',
      categoryLink: 'الجلابيات-الدراعات-الأرواب',
      description: 'روب حرير فاخر',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['وردي', 'أسود'],
      features: ['حرير طبيعي', 'فاخر'],
      hasDelivery: true,
      deliveryCost: 10
    }
    
  ],
  'الملابس-الداخلية-النسائية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 7001,
      name: 'فانلة قطن نسائي',
      price: 39,
      oldPrice: 49,
      rating: 4.4,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الداخلي النسائي', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 200,
      categoryEn: 'women-underwear',
      categoryTitle: 'الملابس الداخلية النسائية',
      categoryLink: 'الملابس-الداخلية-النسائية',
      description: 'فانلة قطن ناعمة',
      longDescription: 'فانلة قطن 100% ناعمة ومريحة.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أبيض', 'أسود', 'بيج'],
      features: ['قطن 100%', 'ناعمة'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 7002,
      name: 'طقم قطني نسائي (3 قطع)',
      price: 89,
      oldPrice: 119,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1623856018491-245b1c6b2b3a?w=800&auto=format'],
      seller: { name: 'متجر الداخلي النسائي', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 120,
      categoryEn: 'women-underwear',
      categoryTitle: 'الملابس الداخلية النسائية',
      categoryLink: 'الملابس-الداخلية-النسائية',
      description: 'طقم قطني مكون من 3 قطع',
      longDescription: 'طقم قطني فاخر مكون من 3 قطع.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أبيض', 'أسود', 'بيج'],
      features: ['قطن 100%', 'طقم 3 قطع'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الاكسسوارات-النسائية': [
    {
      id: 8001,
      name: 'طقم مجوهرات',
      price: 159,
      oldPrice: 199,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format'],
      seller: { name: 'متجر الاكسسوارات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'women-accessories',
      categoryTitle: 'الاكسسوارات النسائية',
      categoryLink: 'الاكسسوارات-النسائية',
      description: 'طقم مجوهرات أنيق',
      colors: ['ذهبي', 'فضي'],
      features: ['مطلي بالذهب', 'هدية مثالية'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 8002,
      name: 'ساعة نسائية',
      price: 199,
      oldPrice: 249,
      rating: 4.6,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format'],
      seller: { name: 'متجر الساعات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 23,
      categoryEn: 'women-accessories',
      categoryTitle: 'الاكسسوارات النسائية',
      categoryLink: 'الاكسسوارات-النسائية',
      description: 'ساعة يد نسائية',
      colors: ['ذهبي', 'فضي', 'وردي'],
      features: ['مقاومة للماء', 'حركة كوارتز'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 8003,
      name: 'حقيبة يد',
      price: 129,
      oldPrice: 169,
      rating: 4.5,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1584917865442-4b19e2f5b1b1?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1584917865442-4b19e2f5b1b1?w=800&auto=format'],
      seller: { name: 'متجر الحقائب', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'women-accessories',
      categoryTitle: 'الاكسسوارات النسائية',
      categoryLink: 'الاكسسوارات-النسائية',
      description: 'حقيبة يد أنيقة',
      colors: ['أسود', 'بني', 'بيج'],
      features: ['جلد طبيعي', 'تصميم عصري'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'العناية-الشخصية-النسائية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 9001,
      name: 'طقم عطور',
      price: 249,
      oldPrice: 329,
      rating: 4.8,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format'],
      seller: { name: 'متجر العطور', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'personal-care',
      categoryTitle: 'العناية الشخصية النسائية',
      categoryLink: 'العناية-الشخصية-النسائية',
      description: 'طقم عطور فاخر',
      longDescription: 'طقم عطور فاخر مكون من 3 عطور.',
      colors: ['متعدد'],
      features: ['تركيز عالي', 'ثبات طويل'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 9002,
      name: 'كريمات العناية',
      price: 89,
      oldPrice: 119,
      rating: 4.5,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f0?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f0?w=800&auto=format'],
      seller: { name: 'متجر العناية', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 67,
      categoryEn: 'personal-care',
      categoryTitle: 'العناية الشخصية النسائية',
      categoryLink: 'العناية-الشخصية-النسائية',
      description: 'كريمات عناية بالبشرة',
      longDescription: 'كريمات طبيعية للعناية بالبشرة.',
      colors: ['متعدد'],
      features: ['طبيعي 100%', 'للبشرة الحساسة'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 9003,
      name: 'مستحضرات تجميل',
      price: 129,
      oldPrice: 169,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format'],
      seller: { name: 'متجر التجميل', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 89,
      categoryEn: 'personal-care',
      categoryTitle: 'العناية الشخصية النسائية',
      categoryLink: 'العناية-الشخصية-النسائية',
      description: 'طقم مكياج',
      longDescription: 'طقم مكياج كامل للمناسبات.',
      colors: ['متعدد'],
      features: ['جودة عالية', 'ألوان ثابتة'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'الأحذية-النسائية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 10001,
      name: 'حذاء كعب عالي',
      price: 199,
      oldPrice: 249,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format'],
      seller: { name: 'متجر الأحذية', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 34,
      categoryEn: 'women-shoes',
      categoryTitle: 'الأحذية النسائية',
      categoryLink: 'الأحذية-النسائية',
      description: 'حذاء كعب عالي أنيق',
      longDescription: 'حذاء بكعب عالي بتصميم أنيق للمناسبات.',
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['أسود', 'بيج', 'أحمر'],
      features: ['جلد طبيعي', 'كعب مريح'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 10002,
      name: 'صندل نسائي',
      price: 129,
      oldPrice: 169,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format'],
      seller: { name: 'متجر الأحذية', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 56,
      categoryEn: 'women-shoes',
      categoryTitle: 'الأحذية النسائية',
      categoryLink: 'الأحذية-النسائية',
      description: 'صندل صيفي',
      longDescription: 'صندل مريح وأنيق للأجواء الصيفية.',
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['ذهبي', 'فضي', 'بني'],
      features: ['مريح', 'خفيف الوزن'],
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 10003,
      name: 'حذاء رياضي نسائي',
      price: 159,
      oldPrice: 199,
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format'],
      seller: { name: 'متجر الرياضة', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'women-shoes',
      categoryTitle: 'الأحذية النسائية',
      categoryLink: 'الأحذية-النسائية',
      description: 'حذاء رياضي للنساء',
      longDescription: 'حذاء رياضي مريح للتمارين والمشي.',
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['وردي', 'أسود', 'أبيض'],
      features: ['مريح', 'نعل مطاطي'],
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'الملابس-الشتوية-النسائية': [  // ✅ إضافة المنتجات الناقصة
    {
      id: 11001,
      name: 'معطف شتوي نسائي',
      price: 299,
      oldPrice: 399,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format'],
      seller: { name: 'متجر الشتاء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 18,
      categoryEn: 'women-winter',
      categoryTitle: 'الملابس الشتوية النسائية',
      categoryLink: 'الملابس-الشتوية-النسائية',
      description: 'معطف شتوي طويل',
      longDescription: 'معطف شتوي دافئ بتصميم أنيق.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أسود', 'بيج', 'كحلي'],
      features: ['صوف فاخر', 'دافئ'],
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 11002,
      name: 'كنزة صوف نسائية',
      price: 149,
      oldPrice: 199,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format'],
      seller: { name: 'متجر الشتاء', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'women-winter',
      categoryTitle: 'الملابس الشتوية النسائية',
      categoryLink: 'الملابس-الشتوية-النسائية',
      description: 'كنزة صوف دافئة',
      longDescription: 'كنزة صوف ناعمة ودافئة.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['رمادي', 'بيج', 'وردي'],
      features: ['صوف ناعم', 'دافئة'],
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 11003,
      name: 'وشاح شتوي نسائي',
      price: 59,
      oldPrice: 79,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=800&auto=format'],
      seller: { name: 'متجر الاكسسوارات', whatsapp: '776981756', rating: 4.4, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 78,
      categoryEn: 'women-winter',
      categoryTitle: 'الملابس الشتوية النسائية',
      categoryLink: 'الملابس-الشتوية-النسائية',
      description: 'وشاح شتوي أنيق',
      longDescription: 'وشاح صوف دافئ وأنيق.',
      colors: ['أسود', 'رمادي', 'بيج'],
      features: ['صوف ناعم', 'أنيق'],
      hasDelivery: true,
      deliveryCost: 10
    }
  ]
};
// src/data/products.js

// ... الكود السابق للمنتجات الرجالية والنسائية ...

export const kidsProducts = {
  'تیشيرتات': [
    { id: 4101, name: 'تيشيرت أولاد صيفي', price: 45, categoryLink: 'تیشيرتات', categoryTitle: 'تیشيرتات', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر الأطفال', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'قمصان': [
    { id: 4102, name: 'قميص أولاد كاجوال', price: 65, categoryLink: 'قمصان', categoryTitle: 'قمصان', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر الأطفال', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'بناطيل': [
    { id: 4103, name: 'بنطلون جينز أولاد', price: 80, categoryLink: 'بناطيل', categoryTitle: 'بناطيل', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر الأطفال', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'اطقم-جاهزة': [
    { id: 4104, name: 'طقم أولاد متكامل', price: 120, categoryLink: 'اطقم-جاهزة', categoryTitle: 'اطقم جاهزة', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر الأطفال', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'ملابس-شتوية': [
    { id: 4105, name: 'جاكيت شتوي أولاد', price: 150, categoryLink: 'ملابس-شتوية', categoryTitle: 'ملابس شتوية', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر الشتاء', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'ملابس-المناسبات': [
    { id: 4106, name: 'بدلة مناسبات أولاد', price: 250, categoryLink: 'ملابس-المناسبات', categoryTitle: 'ملابس المناسبات', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format', seller: { name: 'متجر المناسبات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'فساتين': [
    { id: 4201, name: 'فستان بنات وردي', price: 95, categoryLink: 'فساتين', categoryTitle: 'فساتين', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format', seller: { name: 'متجر البنات', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'بلوزات-وتنانير': [
    { id: 4202, name: 'طقم بلوزة وتنورة', price: 110, categoryLink: 'بلوزات-وتنانير', categoryTitle: 'بلوزات وتنانير', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format', seller: { name: 'متجر البنات', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'اطقم-مواليد': [
    { id: 4301, name: 'طقم استقبال مواليد', price: 180, categoryLink: 'اطقم-مواليد', categoryTitle: 'اطقم مواليد', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر المواليد', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'بيجامات': [
    { id: 4302, name: 'بيجامة قطنية للرضع', price: 65, categoryLink: 'بيجامات', categoryTitle: 'بيجامات', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر المواليد', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'افرولات': [
    { id: 4303, name: 'افرول مواليد مريح', price: 55, categoryLink: 'افرولات', categoryTitle: 'افرولات', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر المواليد', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'ملابس-داخلية': [
    { id: 4304, name: 'ملابس داخلية للرضع', price: 30, categoryLink: 'ملابس-داخلية', categoryTitle: 'ملابس داخلية', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر المواليد', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'بيجامات-اولاد': [
    { id: 4401, name: 'بيجامة أولاد سوبرمان', price: 75, categoryLink: 'بيجامات-اولاد', categoryTitle: 'بيجامات اولاد', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر البيجامات', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'بيجامات-بنات': [
    { id: 4402, name: 'بيجامة بنات وحشية', price: 75, categoryLink: 'بيجامات-بنات', categoryTitle: 'بيجامات بنات', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر البيجامات', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'ملابس-داخلية-قطنية': [
    { id: 4403, name: 'طقم داخلي أطفال قطن', price: 40, categoryLink: 'ملابس-داخلية-قطنية', categoryTitle: 'ملابس داخلية قطنية', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الملابس الداخلية', whatsapp: '776981756' }, inStock: true, stock: 120 }
  ],
  'اطقم-نوم-شتوية-/-صيفية': [
    { id: 4404, name: 'طقم نوم حراري أطفال', price: 110, categoryLink: 'اطقم-نوم-شتوية-/-صيفية', categoryTitle: 'اطقم نوم شتوية / صيفية', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر النوم', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'جوارب-واحذية-قطنية': [
    { id: 4501, name: 'شرابات قطنية للأطفال', price: 20, categoryLink: 'جوارب-واحذية-قطنية', categoryTitle: 'جوارب واحذية قطنية', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 150 }
  ],
  'قبعات-واوشحة': [
    { id: 4502, name: 'قبعة أطفال صوفية', price: 35, categoryLink: 'قبعات-واوشحة', categoryTitle: 'قبعات واوشحة', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'قفازات-شتوية': [
    { id: 4503, name: 'قفازات دافئة للأطفال', price: 25, categoryLink: 'قفازات-شتوية', categoryTitle: 'قفازات شتوية', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'احزمة-وربطات-شعر': [
    { id: 4504, name: 'مجموعة ربطات شعر بنات', price: 15, categoryLink: 'احزمة-وربطات-شعر', categoryTitle: 'احزمة وربطات شعر', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الإكسسوارات', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'احذية-رسمية-أطفال': [
    { id: 4601, name: 'حذاء أطفال كلاسيكي', price: 120, categoryLink: 'احذية-رسمية-أطفال', categoryTitle: 'احذية رسمية', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'احذية-رياضية-أطفال': [
    { id: 4602, name: 'حذاء كوتش رياضي أطفال', price: 160, categoryLink: 'احذية-رياضية-أطفال', categoryTitle: 'احذية رياضية', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'احذية-مواليد': [
    { id: 4603, name: 'حذاء مواليد ناعم', price: 40, categoryLink: 'احذية-مواليد', categoryTitle: 'احذية مواليد', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر المواليد', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'صنادل-أطفال': [
    { id: 4604, name: 'صندل صيفي للأطفال', price: 65, categoryLink: 'صنادل-أطفال', categoryTitle: 'صنادل', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format', seller: { name: 'متجر الأحذية', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'فرش-اطفال': [
    { id: 4701, name: 'طقم فرش سرير أطفال', price: 210, categoryLink: 'فرش-اطفال', categoryTitle: 'فرش اطفال', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر النوم', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'مخدات-للأطفال': [
    { id: 4702, name: 'مخدة أطفال مريحة', price: 35, categoryLink: 'مخدات-للأطفال', categoryTitle: 'مخدات للأطفال', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر النوم', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'شبكات-حماية-للسرير': [
    { id: 4703, name: 'شبكة حماية أطفال', price: 85, categoryLink: 'شبكات-حماية-للسرير', categoryTitle: 'شبكات حماية للسرير', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الحماية', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'بطانيات-واغطية': [
    { id: 4704, name: 'بطانية أطفال ناعمة', price: 90, categoryLink: 'بطانيات-واغطية', categoryTitle: 'بطانيات واغطية', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر النوم', whatsapp: '776981756' }, inStock: true, stock: 45 }
  ],
  'ملابس-مواليد': [
    { id: 4801, name: 'طقم مواليد قطن', price: 130, categoryLink: 'ملابس-مواليد', categoryTitle: 'ملابس مواليد', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الرضع', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'حفاضات-ومناديل': [
    { id: 4802, name: 'حفاضات أطفال عبوة اقتصادية', price: 45, categoryLink: 'حفاضات-ومناديل', categoryTitle: 'حفاضات ومناديل', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'المركز الصحي', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'مستلزمات-رضاعة': [
    { id: 4803, name: 'زجاجة رضاعة متطورة', price: 55, categoryLink: 'مستلزمات-رضاعة', categoryTitle: 'مستلزمات رضاعة', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الرضع', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'اطقم-استحمام-الأطفال': [
    { id: 4804, name: 'بانيو أطفال مع مستلزمات', price: 120, categoryLink: 'اطقم-استحمام-الأطفال', categoryTitle: 'اطقم استحمام الأطفال', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الرضع', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'عربيات-ومقاعد-السيارة': [
    { id: 4805, name: 'عربة أطفال خفيفة الوزن', price: 650, categoryLink: 'عربيات-ومقاعد-السيارة', categoryTitle: 'عربيات ومقاعد السيارة', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الرضع', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'مستلزمات-التسنين': [
    { id: 4806, name: 'عضاضات أطفال سيليكون', price: 35, categoryLink: 'مستلزمات-التسنين', categoryTitle: 'مستلزمات التسنين', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format', seller: { name: 'متجر الرضع', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'اطقم-استحمام': [
    { id: 4901, name: 'طقم هدايا استحمام', price: 140, categoryLink: 'اطقم-استحمام', categoryTitle: 'اطقم استحمام', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الهدايا', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'اطقم-هدايا-مواليد': [
    { id: 4902, name: 'طقم هدايا استقبال فاخر', price: 290, categoryLink: 'اطقم-هدايا-مواليد', categoryTitle: 'اطقم هدايا مواليد', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الهدايا', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'سلال-جاهزة-للهدايا': [
    { id: 4903, name: 'سلة هدايا متكاملة', price: 450, categoryLink: 'سلال-جاهزة-للهدايا', categoryTitle: 'سلال جاهزة للهدايا', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format', seller: { name: 'متجر الهدايا', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'ملابس-أولاد': [
    // ... المنتجات كما هي ...
    {
      id: 2001,
      name: 'تيشيرت أطفال قطني',
      price: 45,
      oldPrice: 65,
      rating: 4.6,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر أطفال', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 120,
      categoryEn: 'kids',
      categoryTitle: 'ملابس الأطفال',
      categoryLink: 'ملابس-الأطفال',
      description: 'تيشيرت أطفال قطني مريح',
      longDescription: 'تيشيرت أطفال مصنوع من القطن الفاخر، ناعم على بشرة الطفل. مناسب للارتداء اليومي والألعاب.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['أزرق', 'أحمر', 'أخضر', 'أصفر'],
      features: ['قطن 100%', 'ناعم على البشرة', 'ألوان زاهية', 'مقاوم للانكماش'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'متعدد', 'العناية': 'غسيل بارد', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 12
    },
    {
      id: 2002,
      name: 'بنطلون جينز أطفال',
      price: 79,
      oldPrice: 109,
      rating: 4.5,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format'
      ],
      seller: { name: 'متجر أطفال', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 85,
      categoryEn: 'kids',
      categoryTitle: 'ملابس الأطفال',
      categoryLink: 'ملابس-الأطفال',
      description: 'بنطلون جينز أطفال مريح',
      longDescription: 'بنطلون جينز بقصة مريحة للأطفال، مصنوع من دنيم ناعم لا يسبب الحساسية.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['أزرق', 'رمادي'],
      features: ['دنيم ناعم', 'مطاطي', 'مريح للحركة', 'متين'],
      specifications: { 'المادة': 'دنيم 95%، إسباندكس 5%', 'المقاسات': '2-9 سنوات', 'الألوان': 'أزرق، رمادي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 12
    },
    {
      id: 2003,
      name: 'هودي أطفال',
      price: 89,
      oldPrice: 129,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format'
      ],
      seller: { name: 'متجر أطفال', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 65,
      categoryEn: 'kids',
      categoryTitle: 'ملابس الأطفال',
      categoryLink: 'ملابس-الأطفال',
      description: 'هودي أطفال قطني مع قلنسوة',
      longDescription: 'هودي قطني دافئ مع قلنسوة، مثالي للأجواء المعتدلة والباردة.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['رمادي', 'أزرق', 'وردي'],
      features: ['قطن ثقيل', 'قلنسوة مريحة', 'جيب أمامي', 'دافئ'],
      specifications: { 'المادة': 'قطن 85%، بوليستر 15%', 'المقاسات': '2-9 سنوات', 'الألوان': 'رمادي، أزرق، وردي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 12
    }
  ],
  'ملابس-بنات': [
    // ... المنتجات كما هي ...
    {
      id: 2101,
      name: 'فستان بنات صيفي',
      price: 69,
      oldPrice: 99,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format',
        'https://images.unsplash.com/photo-1546215364-12f3fff5c578?w=800&auto=format'
      ],
      seller: { name: 'متجر بناتي', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 95,
      categoryEn: 'girls',
      categoryTitle: 'ملابس بنات',
      categoryLink: 'ملابس-بنات',
      description: 'فستان بنات صيفي منقط',
      longDescription: 'فستان صيفي جميل بتصميم منقط، مصنوع من قطن ناعم ومناسب للأجواء الحارة.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['وردي', 'أبيض', 'أزرق'],
      features: ['قطن ناعم', 'تصميم أنيق', 'مناسب للصيف', 'ألوان زاهية'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'وردي، أبيض، أزرق', 'العناية': 'غسيل بارد' },
      hasDelivery: true,
      deliveryCost: 12
    },
    {
      id: 2102,
      name: 'تنورة بنات',
      price: 49,
      oldPrice: 69,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1546215364-12f3fff5c578?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1546215364-12f3fff5c578?w=800&auto=format',
        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format'
      ],
      seller: { name: 'متجر بناتي', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 110,
      categoryEn: 'girls',
      categoryTitle: 'ملابس بنات',
      categoryLink: 'ملابس-بنات',
      description: 'تنورة بنات أنيقة',
      longDescription: 'تنورة بقصة واسعة ومريحة، مصنوعة من قطن ناعم مع ألوان زاهية.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['وردي', 'أرجواني', 'أزرق'],
      features: ['قطن ناعم', 'قصة واسعة', 'مطاطية', 'ألوان جميلة'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'وردي، أرجواني، أزرق', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 2103,
      name: 'بلوزة بنات',
      price: 59,
      oldPrice: 79,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format'],
      seller: { name: 'متجر بناتي', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 75,
      categoryEn: 'girls',
      categoryTitle: 'ملابس بنات',
      categoryLink: 'ملابس-بنات',
      description: 'بلوزة بنات بتطريز',
      longDescription: 'بلوزة أنيقة بتطريز جميل، مناسبة للمناسبات والاستخدام اليومي.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['أبيض', 'وردي', 'بيج'],
      features: ['تطريز جميل', 'قماش ناعم', 'تصميم أنيق', 'مناسب للمناسبات'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'أبيض، وردي، بيج', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'ملابس-حديثي-الولادة': [
    // ... المنتجات كما هي ...
    {
      id: 2201,
      name: 'طقم أطفال حديثي الولادة (3 قطع)',
      price: 89,
      oldPrice: 129,
      rating: 4.9,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر مواليد', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 50,
      categoryEn: 'baby',
      categoryTitle: 'ملابس أطفال حديثي الولادة (24 شهر)',
      categoryLink: 'ملابس-حديثي-الولادة',
      description: 'طقم كامل لحديثي الولادة',
      longDescription: 'طقم مكون من 3 قطع (بدي + بنطلون + قبعة)، مصنوع من قطن عضوي ناعم جداً، مناسب لبشرة الطفل الحساسة.',
      sizes: ['0-3 شهور', '3-6 شهور', '6-12 شهور', '12-24 شهر'],
      colors: ['أبيض', 'بيج', 'وردي فاتح', 'أزرق فاتح'],
      features: ['قطن عضوي', 'ناعم جداً', 'آمن للبشرة', 'طقم كامل'],
      specifications: { 'المادة': 'قطن عضوي 100%', 'المقاسات': '0-24 شهر', 'الألوان': 'متعدد', 'العدد': '3 قطع', 'العناية': 'غسيل يدوي' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 2202,
      name: 'بدي أطفال رضّع',
      price: 35,
      oldPrice: 49,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'],
      seller: { name: 'متجر مواليد', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 120,
      categoryEn: 'baby',
      categoryTitle: 'ملابس أطفال حديثي الولادة (24 شهر)',
      categoryLink: 'ملابس-حديثي-الولادة',
      description: 'بدي أطفال بمشبك',
      longDescription: 'بدي قطني ناعم مع مشابك سهلة الفتح، مثالي للأطفال الرضع.',
      sizes: ['0-3 شهور', '3-6 شهور', '6-12 شهور'],
      colors: ['أبيض', 'بيج', 'وردي', 'أزرق'],
      features: ['مشابك سهلة', 'قطن ناعم', 'يغلق بسهولة', 'مناسب للبشرة'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '0-12 شهر', 'الألوان': 'أبيض، بيج، وردي، أزرق', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'ملابس-داخلية-بيجامات': [
    // ... المنتجات كما هي ...
    {
      id: 2301,
      name: 'بيجامة أطفال قطن',
      price: 59,
      oldPrice: 89,
      rating: 4.7,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر النوم', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 85,
      categoryEn: 'pajamas',
      categoryTitle: 'ملابس داخلية وبيجامات',
      categoryLink: 'ملابس-داخلية-بيجامات',
      description: 'بيجامة أطفال قطنية',
      longDescription: 'بيجامة مكونة من قطعتين، مصنوعة من قطن ناعم مريح للنوم.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['أزرق', 'وردي', 'رمادي'],
      features: ['قطن ناعم', 'مريح للنوم', 'قطعتين', 'ألوان جميلة'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'أزرق، وردي، رمادي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 12
    },
    {
      id: 2302,
      name: 'فانلة داخلية أطفال (3 قطع)',
      price: 49,
      oldPrice: 69,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'],
      seller: { name: 'متجر الداخلي', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 150,
      categoryEn: 'underwear',
      categoryTitle: 'ملابس داخلية وبيجامات',
      categoryLink: 'ملابس-داخلية-بيجامات',
      description: 'فانلة داخلية أطفال',
      longDescription: 'طقم فانلات داخلية مكون من 3 قطع، قطن ناعم ومريح.',
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
      colors: ['أبيض', 'رمادي'],
      features: ['قطن 100%', 'طقم 3 قطع', 'ناعم', 'مريح'],
      specifications: { 'المادة': 'قطن 100%', 'المقاسات': '2-9 سنوات', 'الألوان': 'أبيض، رمادي', 'العدد': '3 قطع', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  // ✅ قسم مدمج: الجوارب والاكسسوارات
  'جوارب-اكسسوارات-أطفال': [
    {
      id: 2401,
      name: 'جوارب أطفال (5 أزواج)',
      price: 29,
      oldPrice: 45,
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر الجوارب', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 200,
      categoryEn: 'socks',
      categoryTitle: 'الجوارب والاكسسوارات',
      categoryLink: 'جوارب-اكسسوارات-أطفال',
      description: 'جوارب أطفال قطنية',
      longDescription: 'طقم جوارب مكون من 5 أزواج، قطن ناعم بألوان زاهية مع قاعدة مضادة للانزلاق.',
      sizes: ['0-12 شهر', '1-3 سنوات', '4-7 سنوات', '8-12 سنوات'],
      colors: ['متعدد الألوان'],
      features: ['قطن ناعم', 'مضاد للانزلاق', '5 أزواج', 'ألوان جميلة'],
      specifications: { 'المادة': 'قطن 80%، بوليستر 20%', 'المقاسات': '0-12 سنة', 'العدد': '5 أزواج', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 2501,
      name: 'طقم أطواق شعر بنات',
      price: 35,
      oldPrice: 49,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format'],
      seller: { name: 'متجر الاكسسوارات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 120,
      categoryEn: 'accessories',
      categoryTitle: 'الجوارب والاكسسوارات',
      categoryLink: 'جوارب-اكسسوارات-أطفال',
      description: 'طقم أطواق شعر ملونة',
      longDescription: 'طقم أطواق شعر ملونة بتصميمات جميلة للبنات، آمنة ولا تؤذي الشعر.',
      sizes: ['مقاس واحد'],
      colors: ['وردي', 'أحمر', 'أصفر', 'أزرق'],
      features: ['تصميمات جميلة', 'ألوان زاهية', 'آمنة للشعر', 'هدية مثالية'],
      specifications: { 'المادة': 'بلاستيك آمن', 'العدد': '6 قطع', 'الألوان': 'متعدد', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 2502,
      name: 'قبعة أطفال',
      price: 39,
      oldPrice: 59,
      rating: 4.8,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'],
      seller: { name: 'متجر الاكسسوارات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 85,
      categoryEn: 'accessories',
      categoryTitle: 'الجوارب والاكسسوارات',
      categoryLink: 'جوارب-اكسسوارات-أطفال',
      description: 'قبعة أطفال قطنية',
      longDescription: 'قبعة قطنية لحماية رأس الطفل من الشمس، بتصميم جميل وخفيف الوزن.',
      sizes: ['مقاس واحد'],
      colors: ['أبيض', 'بيج', 'وردي', 'أزرق'],
      features: ['قطن ناعم', 'حماية من الشمس', 'تصميم جميل', 'خفيفة الوزن'],
      specifications: { 'المادة': 'قطن 100%', 'المقاس': 'مقاس واحد', 'الألوان': 'متعدد', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 8
    }
  ],
  'أحذية-أطفال': [
    // ... المنتجات كما هي ...
    {
      id: 2601,
      name: 'حذاء رياضي أطفال',
      price: 89,
      oldPrice: 129,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format'
      ],
      seller: { name: 'متجر الأحذية', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 65,
      categoryEn: 'shoes',
      categoryTitle: 'أحذية الأطفال',
      categoryLink: 'أحذية-أطفال',
      description: 'حذاء رياضي مريح للأطفال',
      longDescription: 'حذاء رياضي خفيف الوزن مع نعل مطاطي مضاد للانزلاق، مثالي للألعاب والحركة.',
      sizes: ['23', '24', '25', '26', '27', '28', '29', '30'],
      colors: ['أزرق', 'وردي', 'أسود'],
      features: ['خفيف الوزن', 'مضاد للانزلاق', 'ناعم', 'متين'],
      specifications: { 'المادة': 'قماش + مطاط', 'المقاسات': '23-30', 'الألوان': 'أزرق، وردي، أسود', 'النعل': 'مطاطي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 2602,
      name: 'صندل أطفال',
      price: 49,
      oldPrice: 69,
      rating: 4.5,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1543163521-3bf539c55dd2?w=800&auto=format'],
      seller: { name: 'متجر الأحذية', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 110,
      categoryEn: 'shoes',
      categoryTitle: 'أحذية الأطفال',
      categoryLink: 'أحذية-أطفال',
      description: 'صندل أطفال صيفي',
      longDescription: 'صندل صيفي مريح، مناسب للأجواء الحارة والألعاب الخارجية.',
      sizes: ['23', '24', '25', '26', '27', '28', '29', '30'],
      colors: ['أزرق', 'وردي', 'أخضر'],
      features: ['خفيف الوزن', 'مضاد للانزلاق', 'مريح', 'جيد التهوية'],
      specifications: { 'المادة': 'جلد صناعي', 'المقاسات': '23-30', 'الألوان': 'أزرق، وردي، أخضر', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 12
    }
  ],
  'مستلزمات-النوم': [
    {
      id: 2701,
      name: 'غطاء نوم أطفال',
      price: 79,
      oldPrice: 109,
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر النوم', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'sleep',
      categoryTitle: 'مستلزمات النوم والراحة',
      categoryLink: 'مستلزمات-النوم',
      description: 'غطاء نوم قطني للأطفال',
      longDescription: 'غطاء نوم ناعم من القطن العضوي، يوفر الراحة والدفء للطفل أثناء النوم.',
      sizes: ['0-12 شهر', '1-3 سنوات', '4-7 سنوات'],
      colors: ['أبيض', 'بيج', 'وردي', 'أزرق'],
      features: ['قطن عضوي', 'ناعم جداً', 'آمن للبشرة', 'مريح للنوم'],
      specifications: { 'المادة': 'قطن عضوي 100%', 'المقاسات': '0-7 سنوات', 'الألوان': 'متعدد', 'العناية': 'غسيل يدوي' },
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'مستلزمات-الرضع': [
    {
      id: 2801,
      name: 'طقم رضاعة كامل',
      price: 129,
      oldPrice: 179,
      rating: 4.9,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر الرضع', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 35,
      categoryEn: 'baby-essentials',
      categoryTitle: 'مستلزمات الرضع',
      categoryLink: 'مستلزمات-الرضع',
      description: 'طقم رضاعة كامل',
      longDescription: 'طقم رضاعة متكامل يحتوي على زجاجات وفرشاة تنظيف، مصنوع من مواد آمنة.',
      sizes: ['مقاس واحد'],
      colors: ['أزرق', 'وردي'],
      features: ['مواد آمنة', 'طقم كامل', 'سهل التنظيف', 'مناسب للرضع'],
      specifications: { 'المادة': 'بلاستيك آمن', 'العدد': '6 قطع', 'الألوان': 'أزرق، وردي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 2802,
      name: 'حفاضات قماشية (5 قطع)',
      price: 89,
      oldPrice: 129,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'],
      seller: { name: 'متجر الرضع', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 75,
      categoryEn: 'baby-essentials',
      categoryTitle: 'مستلزمات الرضع',
      categoryLink: 'مستلزمات-الرضع',
      description: 'حفاضات قماشية قابلة للغسل',
      longDescription: 'حفاضات قماشية ناعمة قابلة للغسل، صديقة للبيئة ومناسبة للبشرة الحساسة.',
      sizes: ['مقاس واحد'],
      colors: ['أبيض', 'بيج'],
      features: ['قابلة للغسل', 'صديقة للبيئة', 'ناعمة', 'مقاومة للتسرب'],
      specifications: { 'المادة': 'قطن عضوي', 'العدد': '5 قطع', 'الألوان': 'أبيض، بيج', 'العناية': 'غسيل يدوي' },
      hasDelivery: true,
      deliveryCost: 12
    }
  ],
  'هدايا-مواليد': [
    {
      id: 2901,
      name: 'صندوق هدايا مولود جديد',
      price: 149,
      oldPrice: 199,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'
      ],
      seller: { name: 'متجر الهدايا', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 25,
      categoryEn: 'gifts',
      categoryTitle: 'هدايا ومجموعات مواليد',
      categoryLink: 'هدايا-مواليد',
      description: 'صندوق هدايا مولود كامل',
      longDescription: 'صندوق هدايا فاخر للمواليد يحتوي على ملابس، جوارب، قبعة، ودمية صغيرة.',
      sizes: ['0-6 شهور'],
      colors: ['أزرق', 'وردي', 'أصفر'],
      features: ['هدية مثالية', 'طقم كامل', 'تغليف فاخر', 'مناسب للمواليد'],
      specifications: { 'المحتويات': 'ملابس + جوارب + قبعة + دمية', 'العدد': '7 قطع', 'الألوان': 'أزرق، وردي، أصفر', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 2902,
      name: 'طقم مواليد فاخر',
      price: 199,
      oldPrice: 279,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format'],
      seller: { name: 'متجر الهدايا', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 30,
      categoryEn: 'gifts',
      categoryTitle: 'هدايا ومجموعات مواليد',
      categoryLink: 'هدايا-مواليد',
      description: 'طقم مواليد فاخر',
      longDescription: 'طقم مواليد فاخر مكون من 7 قطع، هدية مثالية للعائلة الجديدة.',
      sizes: ['0-6 شهور'],
      colors: ['أزرق', 'وردي'],
      features: ['7 قطع', 'تغليف فاخر', 'قطن عضوي', 'هدية مميزة'],
      specifications: { 'المحتويات': '7 قطع متنوعة', 'المقاس': '0-6 شهور', 'الألوان': 'أزرق، وردي', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 20
    }
  ]
};

// src/data/products.js

// ... الكود السابق للمنتجات الرجالية والنسائية والأطفال ...

// ✅ ========== منتجات الإلكترونيات ==========
export const electronicsProducts = {
  'هواتف-ذكية-جديدة': [
    { id: 5101, name: 'آيفون 15 برو ماكس', price: 5200, categoryLink: 'هواتف-ذكية-جديدة', categoryTitle: 'هواتف ذكية جديدة', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format', seller: { name: 'عالم التقنية', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'هواتف-مستعملة': [
    { id: 5102, name: 'سامسونج S22 مستعمل نظيف', price: 1800, categoryLink: 'هواتف-مستعملة', categoryTitle: 'هواتف مستعملة', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format', seller: { name: 'موبايل ستور', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'بطاقات-SIM-وباقات-الإنترنت': [
    { id: 5103, name: 'شريحة اتصال 4G مع باقة', price: 50, categoryLink: 'بطاقات-SIM-وباقات-الإنترنت', categoryTitle: 'بطاقات SIM وباقات الإنترنت', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format', seller: { name: 'مزود الخدمة', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'شواحن-وكابلات': [
    { id: 5104, name: 'شاحن سريع 65 وات', price: 95, categoryLink: 'شواحن-وكابلات', categoryTitle: 'شواحن وكابلات', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format', seller: { name: 'إكسسوارات برو', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'حافظات-وشوايات-حماية': [
    { id: 5105, name: 'كفر حماية سيليكون', price: 30, categoryLink: 'حافظات-وشوايات-حماية', categoryTitle: 'حافظات وشوايات حماية', image: 'https://images.unsplash.com/photo-1603915003054-946764499645?w=800&auto=format', seller: { name: 'إكسسوارات برو', whatsapp: '776981756' }, inStock: true, stock: 60 }
  ],
  'سماعات-رأس-وسماعات-أذن': [
    { id: 5106, name: 'سماعات بلوتوث لاسلكية', price: 150, categoryLink: 'سماعات-رأس-وسماعات-أذن', categoryTitle: 'سماعات رأس وسماعات أذن', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format', seller: { name: 'صوتيات دبي', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'بطاريات-هواتف': [
    { id: 5107, name: 'بطارية آيفون أصلية', price: 180, categoryLink: 'بطاريات-هواتف', categoryTitle: 'بطاريات هواتف', image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format', seller: { name: 'مركز الصيانة', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'إكسسوارات-أخرى-(حوامل،-واقيات-شاشة…)': [
    { id: 5108, name: 'واقي شاشة زجاجي', price: 20, categoryLink: 'إكسسوارات-أخرى-(حوامل،-واقيات-شاشة…)', categoryTitle: 'إكسسوارات أخرى (حوامل، واقيات شاشة…)', image: 'https://images.unsplash.com/photo-1603915003054-946764499645?w=800&auto=format', seller: { name: 'إكسسوارات برو', whatsapp: '776981756' }, inStock: true, stock: 200 }
  ],
  'حواسيب-محمولة-(لابتوب)': [
    { id: 5201, name: 'ماك بوك اير M2', price: 4500, categoryLink: 'حواسيب-محمولة-(لابتوب)', categoryTitle: 'حواسيب محمولة (لابتوب)', image: 'https://images.unsplash.com/photo-1517336714460-d13f82285266?w=800&auto=format', seller: { name: 'متجر الكمبيوتر', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'حواسيب-مكتبية': [
    { id: 5202, name: 'كمبيوتر مكتبي قيمنق', price: 3200, categoryLink: 'حواسيب-مكتبية', categoryTitle: 'حواسيب مكتبية', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format', seller: { name: 'متجر الكمبيوتر', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'قطع-غيار-حواسيب-(رام،-معالجات…)': [
    { id: 5203, name: 'رام 16 جيجا DDR4', price: 280, categoryLink: 'قطع-غيار-حواسيب-(رام،-معالجات…)', categoryTitle: 'قطع غيار حواسيب (رام، معالجات…)', image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format', seller: { name: 'متجر الكمبيوتر', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'شاشات': [
    { id: 5204, name: 'شاشة 27 بوصة 4K', price: 1100, categoryLink: 'شاشات', categoryTitle: 'شاشات', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format', seller: { name: 'متجر الشاشات', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'لوحات-مفاتيح-وفأرات': [
    { id: 5205, name: 'لوحة مفاتيح ميكانيكية', price: 220, categoryLink: 'لوحات-مفاتيح-وفأرات', categoryTitle: 'لوحات مفاتيح وفأرات', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format', seller: { name: 'متجر الكمبيوتر', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'طابعات-وماسحات-ضوئية': [
    { id: 5206, name: 'طابعة ليزر ملونة', price: 1400, categoryLink: 'طابعات-وماسحات-ضوئية', categoryTitle: 'طابعات وماسحات ضوئية', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format', seller: { name: 'المكتب العربي', whatsapp: '776981756' }, inStock: true, stock: 6 }
  ],
  'وحدات-تخزين-خارجية': [
    { id: 5207, name: 'هارد ديسك 2 تيرا', price: 350, categoryLink: 'وحدات-تخزين-خارجية', categoryTitle: 'وحدات تخزين خارجية', image: 'https://images.unsplash.com/photo-1597872200349-01604297f0ca?w=800&auto=format', seller: { name: 'متجر الكمبيوتر', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'كاميرات-رقمية-وفيديو': [
    { id: 5301, name: 'كاميرا سوني ميرورليس', price: 6500, categoryLink: 'كاميرات-رقمية-وفيديو', categoryTitle: 'كاميرات رقمية وفيديو', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format', seller: { name: 'عالم التصوير', whatsapp: '776981756' }, inStock: true, stock: 3 }
  ],
  'مشغلات': [
    { id: 5302, name: 'مشغل وسائط ذكي', price: 190, categoryLink: 'مشغلات', categoryTitle: 'مشغلات', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format', seller: { name: 'ترفيه منزلي', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'مكبرات-صوت-بلوتوث': [
    { id: 5303, name: 'سبيكر بلوتوث محمول', price: 290, categoryLink: 'مكبرات-صوت-بلوتوث', categoryTitle: 'مكبرات صوت بلوتوث', image: 'https://images.unsplash.com/photo-1608155613952-30f14d952062?w=800&auto=format', seller: { name: 'ترفيه منزلي', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'انظمة-صوت-منزلية': [
    { id: 5304, name: 'نظام صوت محيطي', price: 1800, categoryLink: 'انظمة-صوت-منزلية', categoryTitle: 'انظمة صوت منزلية', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format', seller: { name: 'ترفيه منزلي', whatsapp: '776981756' }, inStock: true, stock: 7 }
  ],
  'اجهزة-ألعاب-الفيديو-(بلايستيشن،-إكس-بوكس)': [
    { id: 5305, name: 'بلايستيشن 5', price: 2400, categoryLink: 'اجهزة-ألعاب-الفيديو-(بلايستيشن،-إكس-بوكس)', categoryTitle: 'اجهزة ألعاب الفيديو (بلايستيشن، إكس بوكس)', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format', seller: { name: 'متجر الألعاب', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'تلفزيونات-(LED،-سمارت،-4K)': [
    { id: 5306, name: 'تلفزيون سامسونج 65 بوصة QLED', price: 3800, categoryLink: 'تلفزيونات-(LED،-سمارت،-4K)', categoryTitle: 'تلفزيونات (LED، سمارت، 4K)', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format', seller: { name: 'عالم التلفزيون', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'كابلات-وشواحن-متنوعة': [
    { id: 5401, name: 'موزع كابلات طاقة', price: 45, categoryLink: 'كابلات-وشواحن-متنوعة', categoryTitle: 'كابلات وشواحن متنوعة', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format', seller: { name: 'متجر الكهرباء', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'بطاريات-ومخازن-طاقة-(باور-بانك)': [
    { id: 5402, name: 'باور بانك 30000mAh', price: 180, categoryLink: 'بطاريات-ومخازن-طاقة-(باور-بانك)', categoryTitle: 'بطاريات ومخازن طاقة (باور بانك)', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format', seller: { name: 'إكسسوارات برو', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'محولات-كهربائية-وأسلاك': [
    { id: 5403, name: 'محول كهرباء دولي', price: 65, categoryLink: 'محولات-كهربائية-وأسلاك', categoryTitle: 'محولات كهربائية وأسلاك', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format', seller: { name: 'متجر الكهرباء', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'قطع-غيار-إلكترونية-(مفاتيح،-ريليهات،-مكثفات)': [
    { id: 5404, name: 'مجموعة مكثفات متنوعة', price: 120, categoryLink: 'قطع-غيار-إلكترونية-(مفاتيح،-ريليهات،-مكثفات)', categoryTitle: 'قطع غيار إلكترونية (مفاتيح، ريليهات، مكثفات)', image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format', seller: { name: 'الإلكترونيات الذكية', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'ثلاجات': [
    { id: 5501, name: 'ثلاجة ال جي بابين', price: 4200, categoryLink: 'ثلاجات', categoryTitle: 'ثلاجات', image: 'https://images.unsplash.com/photo-1571175432248-52216db81a95?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 4 }
  ],
  'مكيفات-هواء': [
    { id: 5502, name: 'مكيف سبليت 18 وحدة', price: 2100, categoryLink: 'مكيفات-هواء', categoryTitle: 'مكيفات هواء', image: 'https://images.unsplash.com/photo-1563200022-a7404a7428f5?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'غسالات-(ملابس،-صحون)': [
    { id: 5503, name: 'غسالة ملابس اتوماتيك', price: 1600, categoryLink: 'غسالات-(ملابس،-صحون)', categoryTitle: 'غسالات (ملابس، صحون)', image: 'https://images.unsplash.com/photo-1610557870699-0a56e7e4838f?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 6 }
  ],
  'सखانات-مياه-كهربائية-وغازية': [
    { id: 5504, name: 'سخان مياه 50 لتر', price: 380, categoryLink: 'سخانات-مياه-كهربائية-وغازية', categoryTitle: 'سخانات مياه كهربائية وغازية', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'ماكينات-القهوة': [
    { id: 5505, name: 'ماكينة ايسبريسو منزلية', price: 750, categoryLink: 'ماكينات-القهوة', categoryTitle: 'ماكينات القهوة', image: 'https://images.unsplash.com/photo-1510511459019-5dee995d3ec3?w=800&auto=format', seller: { name: 'عالم القهوة', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'مكنسات-كهربائية': [
    { id: 5506, name: 'مكنسة كهربائية ذكية', price: 600, categoryLink: 'مكنسات-كهربائية', categoryTitle: 'مكنسات كهربائية', image: 'https://images.unsplash.com/photo-1527515545084-589d6723f6c2?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'أفران-(كهربائية-وغاز)': [
    { id: 5507, name: 'فرن بلت ان كبير', price: 1900, categoryLink: 'أفران-(كهربائية-وغاز)', categoryTitle: 'أفران (كهربائية وغاز)', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 7 }
  ],
  'مراوح-كهربائية': [
    { id: 5508, name: 'مروحة عمودية بريموت', price: 180, categoryLink: 'مراوح-كهربائية', categoryTitle: 'مراوح كهربائية', image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 35 }
  ],
  'أجهزة-تنقية-الهواء': [
    { id: 5509, name: 'منقي هواء هيبا', price: 850, categoryLink: 'أجهزة-تنقية-الهواء', categoryTitle: 'أجهزة تنقية الهواء', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format', seller: { name: 'متجر الأجهزة', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'اجهزة-القياس-والاختبار-الكهربائية': [
    { id: 5601, name: 'جهاز أفوميتر رقمي', price: 120, categoryLink: 'اجهزة-القياس-والاختبار-الكهربائية', categoryTitle: 'اجهزة القياس والاختبار الكهربائية', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format', seller: { name: 'المعدات المهنية', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'اجهزة-انذار-وأمان-(كاميرات-مراقبة،-أجهزة-كشف-الحريق)': [
    { id: 5602, name: 'طقم كاميرات مراقبة 4K', price: 1100, categoryLink: 'اجهزة-انذار-وأمان-(كاميرات-مراقبة،-أجهزة-كشف-الحريق)', categoryTitle: 'اجهزة انذار وأمان (كاميرات مراقبة، أجهزة كشف الحريق)', image: 'https://images.unsplash.com/photo-1557597774-9d2739f8fa48?w=800&auto=format', seller: { name: 'بيت الأمان', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'معدات-ورش-الصيانة': [
    { id: 5603, name: 'طقم مفكات ميكانيكا', price: 350, categoryLink: 'معدات-ورش-الصيانة', categoryTitle: 'معدات ورش الصيانة', image: 'https://images.unsplash.com/photo-1586864387789-628af9fea93f?w=800&auto=format', seller: { name: 'المعدات المهنية', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'معدات-الإنارة-الصناعية': [
    { id: 5604, name: 'كشاف انارة صناعي 200W', price: 450, categoryLink: 'معدات-الإنارة-الصناعية', categoryTitle: 'معدات الإنارة الصناعية', image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format', seller: { name: 'المعدات المهنية', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'الساعات-الذكية': [
    { id: 5701, name: 'ابل واتش الترا', price: 3200, categoryLink: 'الساعات-الذكية', categoryTitle: 'الساعات الذكية', image: 'https://images.unsplash.com/photo-1508685096489-77a4ff4dcedc?w=800&auto=format', seller: { name: 'عالم التقنية', whatsapp: '776981756' }, inStock: true, stock: 6 }
  ],
  'اجهزة-المنزل-الذكي-(أضواء-ذكية،-كاميرات-ذكية)': [
    { id: 5702, name: 'طقم اضاءة ذكية ملون', price: 210, categoryLink: 'اجهزة-المنزل-الذكي-(أضواء-ذكية،-كاميرات-ذكية)', categoryTitle: 'اجهزة المنزل الذكي (أضواء ذكية، كاميرات ذكية)', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format', seller: { name: 'البيت الذكي', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'المساعدات-الصوتية-(Alexa،-Google-Home)': [
    { id: 5703, name: 'أليكسا الجيل الخامس', price: 450, categoryLink: 'المساعدات-الصوتية-(Alexa،-Google-Home)', categoryTitle: 'المساعدات الصوتية (Alexa، Google Home)', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format', seller: { name: 'البيت الذكي', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'اجهزة-تعقب-وتتبع': [
    { id: 5704, name: 'ابل اير تاج عبوة 4 قطع', price: 420, categoryLink: 'اجهزة-تعقب-وتتبع', categoryTitle: 'اجهزة تعقب وتتبع', image: 'https://images.unsplash.com/photo-1618335829737-2228915674bd?w=800&auto=format', seller: { name: 'عالم التقنية', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'صيانة-أجهزة-إلكترونية-(هواتف،-كمبيوترات،-مكيفات)': [
    { id: 5801, name: 'خدمة فحص وتشخيص أجهزة', price: 100, categoryLink: 'صيانة-أجهزة-إلكترونية-(هواتف،-كمبيوترات،-مكيفات)', categoryTitle: 'صيانة أجهزة إلكترونية (هواتف، كمبيوترات، مكيفات)', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format', seller: { name: 'مركز الصيانة المعتمد', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'تركيب-وصيانة-أنظمة-الإنذار': [
    { id: 5802, name: 'خدمة تركيب نظام كاميرات', price: 500, categoryLink: 'تركيب-وصيانة-أنظمة-الإنذار', categoryTitle: 'تركيب وصيانة أنظمة الإنذار', image: 'https://images.unsplash.com/photo-1557597774-9d2739f8fa48?w=800&auto=format', seller: { name: 'مركز الصيانة المعتمد', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'خدمات-نقل-وإعادة-تركيب-الأجهزة': [
    { id: 5803, name: 'فك وتركيب مكيف سبليت', price: 250, categoryLink: 'خدمات-نقل-وإعادة-تركيب-الأجهزة', categoryTitle: 'خدمات نقل وإعادة تركيب الأجهزة', image: 'https://images.unsplash.com/photo-1563200022-a7404a7428f5?w=800&auto=format', seller: { name: 'مركز الصيانة المعتمد', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'خدمات-برمجيات-الأجهزة-الذكية': [
    { id: 5804, name: 'تثبيت برامج وتحديث أنظمة', price: 150, categoryLink: 'خدمات-برمجيات-الأجهزة-الذكية', categoryTitle: 'خدمات برمجيات الأجهزة الذكية', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format', seller: { name: 'مركز الصيانة المعتمد', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'هواتف-محمولة-ملحقات': [
    {
      id: 3001,
      name: 'آيفون 15 برو',
      price: 3999,
      oldPrice: 4499,
      rating: 4.9,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format'
      ],
      seller: { name: 'متجر التقنية', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 15,
      categoryEn: 'electronics',
      categoryTitle: 'الهواتف المحمولة والملحقات',
      categoryLink: 'هواتف-محمولة-ملحقات',
      description: 'آيفون 15 برو بشريحة A17 Pro',
      longDescription: 'آيفون 15 برو بتصميم جديد من التيتانيوم، مع شريحة A17 Pro فائقة القوة، وكاميرا محسنة، وشحن سريع.',
      colors: ['أسود', 'أبيض', 'أزرق', 'ذهبي'],
      features: ['شريحة A17 Pro', 'كاميرا 48 ميجابكسل', 'شحن سريع', 'مقاوم للماء'],
      specifications: { 'المعالج': 'A17 Pro', 'الذاكرة': '8GB', 'التخزين': '256GB', 'الشاشة': '6.1 بوصة', 'البطارية': '3274 mAh' },
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 3002,
      name: 'سامسونج جالاكسي S24',
      price: 3499,
      oldPrice: 3999,
      rating: 4.8,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format'
      ],
      seller: { name: 'متجر التقنية', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 20,
      categoryEn: 'electronics',
      categoryTitle: 'الهواتف المحمولة والملحقات',
      categoryLink: 'هواتف-محمولة-ملحقات',
      description: 'سامسونج جالاكسي S24 مع AI',
      longDescription: 'هاتف سامسونج جالاكسي S24 بتقنيات الذكاء الاصطناعي، كاميرا عالية الدقة، وشاشة Dynamic AMOLED.',
      colors: ['أسود', 'رمادي', 'أرجواني', 'أصفر'],
      features: ['AI الذكاء الاصطناعي', 'كاميرا 50 ميجابكسل', 'شاشة 120Hz', 'بطارية 4000 mAh'],
      specifications: { 'المعالج': 'Snapdragon 8 Gen 3', 'الذاكرة': '8GB', 'التخزين': '256GB', 'الشاشة': '6.2 بوصة', 'البطارية': '4000 mAh' },
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 3003,
      name: 'شاحن لاسلكي سريع',
      price: 129,
      oldPrice: 199,
      rating: 4.6,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1586810724476-29447a1f01a1?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1586810724476-29447a1f01a1?w=800&auto=format'],
      seller: { name: 'متجر الملحقات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 150,
      categoryEn: 'electronics',
      categoryTitle: 'الهواتف المحمولة والملحقات',
      categoryLink: 'هواتف-محمولة-ملحقات',
      description: 'شاحن لاسلكي سريع 15W',
      longDescription: 'شاحن لاسلكي سريع بقوة 15 واط، متوافق مع جميع هواتف iPhone و Samsung التي تدعم الشحن اللاسلكي.',
      colors: ['أسود', 'أبيض'],
      features: ['شحن سريع 15W', 'متوافق مع Qi', 'آمن للبطارية', 'تصميم أنيق'],
      specifications: { 'القوة': '15W', 'النوع': 'لاسلكي', 'المعيار': 'Qi', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'حواسيب-كمبيوتر': [
    {
      id: 3101,
      name: 'ماك بوك برو M3',
      price: 6999,
      oldPrice: 7999,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format'
      ],
      seller: { name: 'متجر أبل', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 10,
      categoryEn: 'electronics',
      categoryTitle: 'الحواسيب وأجهزة الكمبيوتر',
      categoryLink: 'حواسيب-كمبيوتر',
      description: 'ماك بوك برو بشريحة M3',
      longDescription: 'ماك بوك برو بشريحة M3 الجديدة، أداء خارق وعمر بطارية طويل، شاشة Liquid Retina XDR.',
      colors: ['رمادي فلكي', 'فضي'],
      features: ['شريحة M3', 'شاشة XDR', 'بطارية تدوم 22 ساعة', 'كاميرا 1080p'],
      specifications: { 'المعالج': 'M3', 'الذاكرة': '16GB', 'التخزين': '512GB', 'الشاشة': '14 بوصة', 'البطارية': '22 ساعة' },
      hasDelivery: true,
      deliveryCost: 30
    },
    {
      id: 3102,
      name: 'لابتوب ديل XPS 15',
      price: 5499,
      oldPrice: 6499,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
        'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&auto=format'
      ],
      seller: { name: 'متجر ديل', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 8,
      categoryEn: 'electronics',
      categoryTitle: 'الحواسيب وأجهزة الكمبيوتر',
      categoryLink: 'حواسيب-كمبيوتر',
      description: 'لابتوب ديل XPS 15',
      longDescription: 'لابتوب ديل XPS 15 بشاشة OLED، معالج Intel Core i9، بطارية قوية، تصميم أنيق.',
      colors: ['أسود', 'فضي'],
      features: ['شاشة OLED', 'معالج i9', 'كرت شاشة RTX', 'تصميم نحيف'],
      specifications: { 'المعالج': 'Intel Core i9', 'الذاكرة': '32GB', 'التخزين': '1TB', 'الشاشة': '15.6 بوصة OLED', 'كرت الشاشة': 'RTX 4060' },
      hasDelivery: true,
      deliveryCost: 30
    }
  ],
  'ترفيه-صوتيات': [
    {
      id: 3201,
      name: 'سماعات AirPods Pro',
      price: 899,
      oldPrice: 1099,
      rating: 4.8,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format',
        'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&auto=format'
      ],
      seller: { name: 'متجر الصوتيات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 45,
      categoryEn: 'electronics',
      categoryTitle: 'أجهزة الترفيه والصوتيات',
      categoryLink: 'ترفيه-صوتيات',
      description: 'سماعات AirPods Pro مع خاصية إلغاء الضوضاء',
      longDescription: 'سماعات AirPods Pro من أبل مع خاصية إلغاء الضوضاء النشط، صوت غامر، مقاومة للماء والعرق.',
      colors: ['أبيض'],
      features: ['إلغاء الضوضاء', 'مقاومة للماء', 'شحن لاسلكي', 'صوت Spatial'],
      specifications: { 'النوع': 'لاسلكي', 'البطارية': '6 ساعات', 'الشحن': 'لاسلكي', 'المقاومة': 'IPX4' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 3202,
      name: 'مكبر صوت JBL Charge 5',
      price: 499,
      oldPrice: 649,
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&auto=format'],
      seller: { name: 'متجر الصوتيات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 60,
      categoryEn: 'electronics',
      categoryTitle: 'أجهزة الترفيه والصوتيات',
      categoryLink: 'ترفيه-صوتيات',
      description: 'مكبر صوت JBL Charge 5',
      longDescription: 'مكبر صوت محمول من JBL بقوة 40 واط، صوت قوي، بطارية تدوم 20 ساعة، مقاوم للماء.',
      colors: ['أسود', 'أزرق', 'أحمر'],
      features: ['قوة 40 واط', 'بطارية 20 ساعة', 'مقاوم للماء IP67', 'شحن USB-C'],
      specifications: { 'القوة': '40W', 'البطارية': '20 ساعة', 'المقاومة': 'IP67', 'الاتصال': 'Bluetooth 5.1' },
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'مستلزمات-الكترونية': [
    {
      id: 3301,
      name: 'بطارية خارجية 20000mAh',
      price: 129,
      oldPrice: 179,
      rating: 4.6,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1609592425854-75c9d6ad7a09?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1609592425854-75c9d6ad7a09?w=800&auto=format'],
      seller: { name: 'متجر الملحقات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 200,
      categoryEn: 'electronics',
      categoryTitle: 'مستلزمات إلكترونية عامة',
      categoryLink: 'مستلزمات-الكترونية',
      description: 'بطارية خارجية 20000mAh شحن سريع',
      longDescription: 'بطارية خارجية عالية السعة 20000 مللي أمبير، تدعم الشحن السريع، منافذ USB متعددة.',
      colors: ['أسود', 'أبيض', 'أزرق'],
      features: ['سعة 20000mAh', 'شحن سريع', 'منفذين USB', 'مؤشر LED'],
      specifications: { 'السعة': '20000mAh', 'المدخل': 'USB-C', 'المخرج': '2x USB', 'الشحن السريع': '18W' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'اجهزة-منزلية': [
    {
      id: 3401,
      name: 'مكنسة روبوتية ذكية',
      price: 899,
      oldPrice: 1299,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1587555938636-cd240d8edced?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1587555938636-cd240d8edced?w=800&auto=format',
        'https://images.unsplash.com/photo-1576468106695-efc3e4c1cc79?w=800&auto=format'
      ],
      seller: { name: 'متجر المنزل', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 25,
      categoryEn: 'electronics',
      categoryTitle: 'الأجهزة المنزلية الكهربائية',
      categoryLink: 'اجهزة-منزلية',
      description: 'مكنسة روبوتية ذكية مع تطبيق',
      longDescription: 'مكنسة روبوتية ذكية مع خاصية التعرف على العوائق، قوة شفط عالية، تعمل بتطبيق هاتف.',
      colors: ['أسود', 'أبيض'],
      features: ['قوة شفط 3000Pa', 'تطبيق تحكم', 'خرائط ذكية', 'يعمل 150 دقيقة'],
      specifications: { 'قوة الشفط': '3000Pa', 'البطارية': '5200mAh', 'التحكم': 'واي فاي + تطبيق', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 25
    }
  ],
  'معدات-صناعية': [
    {
      id: 3501,
      name: 'طابعة ليزر ملونة',
      price: 1299,
      oldPrice: 1799,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format'],
      seller: { name: 'متجر المعدات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 12,
      categoryEn: 'electronics',
      categoryTitle: 'المعدات الصناعية والمهنية',
      categoryLink: 'معدات-صناعية',
      description: 'طابعة ليزر ملونة للمكاتب',
      longDescription: 'طابعة ليزر ملونة عالية السرعة، طباعة مزدوجة، اتصال لاسلكي، مناسبة للمكاتب.',
      colors: ['أبيض', 'أسود'],
      features: ['طباعة مزدوجة', 'واي فاي', 'سرعة 20 صفحة/دقيقة', 'جودة عالية'],
      specifications: { 'النوع': 'ليزر ملون', 'السرعة': '20 صفحة/دقيقة', 'الاتصال': 'واي فاي + USB', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 35
    }
  ],
  'اجهزة-ذكية': [
    {
      id: 3601,
      name: 'ساعة أبل الذكية Series 9',
      price: 1499,
      oldPrice: 1899,
      rating: 4.9,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format',
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format'
      ],
      seller: { name: 'متجر أبل', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 30,
      categoryEn: 'electronics',
      categoryTitle: 'أجهزة ذكية وإنترنت الأشياء',
      categoryLink: 'اجهزة-ذكية',
      description: 'ساعة أبل الذكية Series 9',
      longDescription: 'ساعة أبل الذكية Series 9 مع شريحة S9، شاشة أكثر سطوعاً، خاصية اللمس المزدوج.',
      colors: ['أسود', 'فضي', 'ذهبي', 'وردي'],
      features: ['شريحة S9', 'شاشة ساطعة', 'لمسة مزدوجة', 'GPS + Cellular'],
      specifications: { 'الشاشة': 'Always-On Retina', 'المقاومة': '50 متر', 'البطارية': '18 ساعة', 'المستشعرات': 'ECG + SpO2' },
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'خدمات-الكترونية': [
    {
      id: 3701,
      name: 'تصميم مواقع إلكترونية',
      price: 999,
      oldPrice: 1499,
      rating: 4.9,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format'],
      seller: { name: 'خدمات تقنية', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال 3 ساعات', returns: '30 يوم' },
      inStock: true,
      stock: 99,
      categoryEn: 'services',
      categoryTitle: 'خدمات إلكترونية',
      categoryLink: 'خدمات-الكترونية',
      description: 'تصميم موقع إلكتروني احترافي',
      longDescription: 'خدمة تصميم مواقع إلكترونية متجاوبة، مع تحسين محركات البحث، وتسليم خلال 7 أيام.',
      colors: ['رقمي'],
      features: ['تصميم متجاوب', 'تحسين SEO', 'لوحة تحكم', 'استضافة مجانية سنة'],
      specifications: { 'المدة': '7 أيام', 'الصفحات': '5 صفحات', 'SEO': 'مضمن', 'الدعم': 'شهر مجاني' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ]
};
// src/data/products.js

// ... الكود السابق للمنتجات الأخرى ...

export const foodProducts = {
  'الحبوب-مشتقاتها': [
    { id: 6101, name: 'أرز بسمتي هندي فاخر 5كجم', price: 120, categoryLink: 'الحبوب-مشتقاتها', categoryTitle: 'الحبوب ومشتقاتها', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format', seller: { name: 'الخير للحبوب', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'البقوليات': [
    { id: 6201, name: 'عدس أحمر تركي 1كجم', price: 25, categoryLink: 'البقوليات', categoryTitle: 'البقوليات', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe0b8f?w=800&auto=format', seller: { name: 'متجر البركة', whatsapp: '776981756' }, inStock: true, stock: 150 }
  ],
  'الزيوت-والدهون': [
    { id: 6301, name: 'زيت طبخ نباتي 1.5 لتر', price: 45, categoryLink: 'الزيوت-والدهون', categoryTitle: 'الزيوت والدهون', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format', seller: { name: 'التموين الغذائي', whatsapp: '776981756' }, inStock: true, stock: 200 }
  ],
  'السكر-والمحليات': [
    { id: 6401, name: 'سكر أبيض نقي 5كجم', price: 60, categoryLink: 'السكر-والمحليات', categoryTitle: 'السكر والمحليات', image: 'https://images.unsplash.com/photo-1589986740557-380b1c15b164?w=800&auto=format', seller: { name: 'نحل الشمال', whatsapp: '776981756' }, inStock: true, stock: 300 }
  ],
  'الألبان-ومنتجاتها': [
    { id: 6501, name: 'حليب كامل الدسم 1لتر', price: 10, categoryLink: 'الألبان-ومنتجاتها', categoryTitle: 'الألبان ومنتجاتها', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format', seller: { name: 'مزارعنا طازجة', whatsapp: '776981756' }, inStock: true, stock: 500 }
  ],
  'اللحوم-والأسماك': [
    { id: 6601, name: 'دجاج طازج 1كجم', price: 35, categoryLink: 'اللحوم-والأسماك', categoryTitle: 'اللحوم والأسماك', image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&auto=format', seller: { name: 'لحوم الخير', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'الخضروات': [
    { id: 6701, name: 'طماطم طازجة 1كجم', price: 8, categoryLink: 'الخضروات', categoryTitle: 'الخضروات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format', seller: { name: 'المسوق الأخضر', whatsapp: '776981756' }, inStock: true, stock: 1000 }
  ],
  'الفواكه': [
    { id: 6801, name: 'تفاح أحمر 1كجم', price: 15, categoryLink: 'الفواكه', categoryTitle: 'الفواكه', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format', seller: { name: 'المسوق الأخضر', whatsapp: '776981756' }, inStock: true, stock: 500 }
  ],
  'المشروبات': [
    { id: 6901, name: 'شاي أحمر كيني 100 خيط', price: 18, categoryLink: 'المشروبات', categoryTitle: 'المشروبات', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&auto=format', seller: { name: 'عالم المشروبات', whatsapp: '776981756' }, inStock: true, stock: 1000 }
  ],
  'مواد-غذائية-أخرى-(مكملات)': [
    { id: 7001, name: 'بيض مزارع طازج 30 حبة', price: 28, categoryLink: 'مواد-غذائية-أخرى-(مكملات)', categoryTitle: 'مواد غذائية أخرى (مكملات)', image: 'https://images.unsplash.com/photo-1582722872445-41DC50bfce30?w=800&auto=format', seller: { name: 'الخير للإنتاج الحيواني', whatsapp: '776981756' }, inStock: true, stock: 200 }
  ],
  'حبوب-مشتقاتها': [
    {
      id: 4001,
      name: 'أرز بسمتي هندي',
      price: 45,
      oldPrice: 55,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format',
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format'
      ],
      seller: { name: 'متجر المواد الغذائية', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 500,
      categoryEn: 'food',
      categoryTitle: 'الحبوب ومشتقاتها',
      categoryLink: 'حبوب-مشتقاتها',
      description: 'أرز بسمتي هندي فاخر 5 كجم',
      longDescription: 'أرز بسمتي هندي فاخر، حبات طويلة ونقية، مطبوخ على البخار، مثالي للمناسبات والولائم.',
      sizes: ['1 كجم', '2 كجم', '5 كجم', '10 كجم'],
      colors: ['أبيض'],
      features: ['حبات طويلة', 'مطبوخ على البخار', 'نقي 100%', 'رائحة عطرة'],
      specifications: { 'النوع': 'بسمتي', 'المنشأ': 'الهند', 'الوزن': '5 كجم', 'الصلاحية': 'سنتين', 'التخزين': 'مكان جاف' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 4002,
      name: 'دقيق قمح أبيض',
      price: 18,
      oldPrice: 25,
      rating: 4.7,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format'],
      seller: { name: 'متجر المواد الغذائية', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 800,
      categoryEn: 'food',
      categoryTitle: 'الحبوب ومشتقاتها',
      categoryLink: 'حبوب-مشتقاتها',
      description: 'دقيق قمح أبيض فاخر 2 كجم',
      longDescription: 'دقيق قمح أبيض ناعم، مناسب للخبز والمعجنات والحلويات، طبيعي 100%.',
      sizes: ['1 كجم', '2 كجم', '5 كجم', '10 كجم'],
      colors: ['أبيض'],
      features: ['ناعم جداً', 'مناسب للخبز', 'طبيعي 100%', 'خالي من المواد الحافظة'],
      specifications: { 'النوع': 'قمح أبيض', 'الوزن': '2 كجم', 'الصلاحية': 'سنة', 'الاستخدام': 'متعدد' },
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 4003,
      name: 'شوفان كامل الحبة',
      price: 24,
      oldPrice: 32,
      rating: 4.9,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1599907500847-5c4e0d06a26a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1599907500847-5c4e0d06a26a?w=800&auto=format'],
      seller: { name: 'متجر الأطعمة الصحية', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 300,
      categoryEn: 'food',
      categoryTitle: 'الحبوب ومشتقاتها',
      categoryLink: 'حبوب-مشتقاتها',
      description: 'شوفان كامل الحبة 500 جرام',
      longDescription: 'شوفان كامل الحبة، غني بالألياف، مثالي لوجبة الإفطار الصحية.',
      sizes: ['500 جرام', '1 كجم'],
      colors: ['ذهبي'],
      features: ['غني بالألياف', 'كامل الحبة', 'صحي', 'مثالي للرجيم'],
      specifications: { 'النوع': 'شوفان كامل', 'الوزن': '500 جرام', 'الألياف': 'عالية', 'السعرات': '380 كالوري/100جم' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'بقوليات': [
    {
      id: 4101,
      name: 'عدس أحمر',
      price: 14,
      oldPrice: 19,
      rating: 4.8,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1515543904379-3d757afe0b8f?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1515543904379-3d757afe0b8f?w=800&auto=format',
        'https://images.unsplash.com/photo-1599690382425-d97f4ff6d6c1?w=800&auto=format'
      ],
      seller: { name: 'متجر البقوليات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 400,
      categoryEn: 'food',
      categoryTitle: 'البقوليات',
      categoryLink: 'بقوليات',
      description: 'عدس أحمر فاخر 1 كجم',
      longDescription: 'عدس أحمر مغسول ومنقى، سريع الطهي، غني بالبروتين والحديد.',
      sizes: ['500 جرام', '1 كجم', '2 كجم'],
      colors: ['أحمر'],
      features: ['مغسول ومنقى', 'سريع الطهي', 'غني بالبروتين', 'غني بالحديد'],
      specifications: { 'النوع': 'عدس أحمر', 'الوزن': '1 كجم', 'البروتين': '24%', 'الصلاحية': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 4102,
      name: 'حمص حب',
      price: 16,
      oldPrice: 22,
      rating: 4.7,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1599690382425-d97f4ff6d6c1?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1599690382425-d97f4ff6d6c1?w=800&auto=format'],
      seller: { name: 'متجر البقوليات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 350,
      categoryEn: 'food',
      categoryTitle: 'البقوليات',
      categoryLink: 'بقوليات',
      description: 'حمص حب فاخر 1 كجم',
      longDescription: 'حمص حب كبير الحجم، نقي ومنقى، مناسب للفتة والحمصية والمطابخ.',
      sizes: ['500 جرام', '1 كجم', '2 كجم'],
      colors: ['بيج'],
      features: ['حب كبير', 'منقى', 'غني بالبروتين', 'متعدد الاستخدامات'],
      specifications: { 'النوع': 'حمص حب', 'الوزن': '1 كجم', 'البروتين': '19%', 'الصلاحية': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'زيوت-دهون': [
    {
      id: 4201,
      name: 'زيت زيتون بكر ممتاز',
      price: 45,
      oldPrice: 60,
      rating: 4.9,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format',
        'https://images.unsplash.com/photo-1532529867795-3c83442c1e5f?w=800&auto=format'
      ],
      seller: { name: 'متجر الزيوت', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 200,
      categoryEn: 'food',
      categoryTitle: 'الزيوت والدهون',
      categoryLink: 'زيوت-دهون',
      description: 'زيت زيتون بكر ممتاز 1 لتر',
      longDescription: 'زيت زيتون بكر ممتاز، عصرة أولى باردة، غني بمضادات الأكسدة، طعم فاخر.',
      sizes: ['500 مل', '1 لتر', '2 لتر'],
      colors: ['ذهبي'],
      features: ['عصرة أولى باردة', 'غني بمضادات الأكسدة', 'طعم فاخر', 'صحي'],
      specifications: { 'النوع': 'زيت زيتون بكر', 'الحجم': '1 لتر', 'الحموضة': 'أقل من 0.8%', 'الصلاحية': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 12
    },
    {
      id: 4202,
      name: 'زيت دوار الشمس',
      price: 28,
      oldPrice: 38,
      rating: 4.6,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1532529867795-3c83442c1e5f?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1532529867795-3c83442c1e5f?w=800&auto=format'],
      seller: { name: 'متجر الزيوت', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 600,
      categoryEn: 'food',
      categoryTitle: 'الزيوت والدهون',
      categoryLink: 'زيوت-دهون',
      description: 'زيت دوار الشمس 1.8 لتر',
      longDescription: 'زيت دوار الشمس نقي، مناسب للقلي والطهي، غني بفيتامين E.',
      sizes: ['1 لتر', '1.8 لتر', '5 لتر'],
      colors: ['أصفر'],
      features: ['نقي', 'مناسب للقلي', 'غني بفيتامين E', 'خفيف'],
      specifications: { 'النوع': 'زيت دوار الشمس', 'الحجم': '1.8 لتر', 'فيتامين E': 'غني', 'الصلاحية': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'سكر-محليات': [
    {
      id: 4301,
      name: 'سكر أبيض ناعم',
      price: 12,
      oldPrice: 16,
      rating: 4.7,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1589986740557-380b1c15b164?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1589986740557-380b1c15b164?w=800&auto=format'],
      seller: { name: 'متجر السكر', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 1000,
      categoryEn: 'food',
      categoryTitle: 'السكر والمحليات',
      categoryLink: 'سكر-محليات',
      description: 'سكر أبيض ناعم 2 كجم',
      longDescription: 'سكر أبيض ناعم، نقي 100%، مناسب للتحلية والطبخ والحلويات.',
      sizes: ['1 كجم', '2 كجم', '5 كجم'],
      colors: ['أبيض'],
      features: ['نقي 100%', 'ناعم', 'مناسب للتحلية', 'جودة عالية'],
      specifications: { 'النوع': 'سكر أبيض', 'الوزن': '2 كجم', 'النعومة': 'ناعم', 'الصلاحية': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 4302,
      name: 'عسل نحل طبيعي',
      price: 65,
      oldPrice: 85,
      rating: 4.9,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format'],
      seller: { name: 'متجر العسل', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 150,
      categoryEn: 'food',
      categoryTitle: 'السكر والمحليات',
      categoryLink: 'سكر-محليات',
      description: 'عسل نحل طبيعي 500 جرام',
      longDescription: 'عسل نحل طبيعي 100%، من أزهار السدر، غني بالفيتامينات والمعادن.',
      sizes: ['250 جرام', '500 جرام', '1 كجم'],
      colors: ['ذهبي'],
      features: ['طبيعي 100%', 'من أزهار السدر', 'غني بالفيتامينات', 'مضاد للأكسدة'],
      specifications: { 'النوع': 'عسل سدر', 'الوزن': '500 جرام', 'الطبيعة': 'طبيعي 100%', 'الصلاحية': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 12
    }
  ],
  'البان-منتجاتها': [
    {
      id: 4401,
      name: 'حليب طازج',
      price: 8,
      oldPrice: 10,
      rating: 4.8,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format',
        'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format'
      ],
      seller: { name: 'متجر الألبان', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 800,
      categoryEn: 'food',
      categoryTitle: 'الألبان ومنتجاتها',
      categoryLink: 'البان-منتجاتها',
      description: 'حليب طازج مبستر 1 لتر',
      longDescription: 'حليب طازج مبستر، غني بالكالسيوم وفيتامين D، طبيعي 100%.',
      sizes: ['1 لتر', '1.5 لتر', '2 لتر'],
      colors: ['أبيض'],
      features: ['طازج', 'مبستر', 'غني بالكالسيوم', 'غني بفيتامين D'],
      specifications: { 'النوع': 'حليب طازج', 'الحجم': '1 لتر', 'الدهون': '2%', 'الصلاحية': '7 أيام' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 4402,
      name: 'زبادي طبيعي',
      price: 6,
      oldPrice: 8,
      rating: 4.7,
      reviews: 789,
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format'],
      seller: { name: 'متجر الألبان', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 600,
      categoryEn: 'food',
      categoryTitle: 'الألبان ومنتجاتها',
      categoryLink: 'البان-منتجاتها',
      description: 'زبادي طبيعي 1 كجم',
      longDescription: 'زبادي طبيعي كامل الدسم، غني بالبروبيوتيك، مفيد للهضم.',
      sizes: ['250 جرام', '500 جرام', '1 كجم'],
      colors: ['أبيض'],
      features: ['طبيعي', 'غني بالبروبيوتيك', 'مفيد للهضم', 'كامل الدسم'],
      specifications: { 'النوع': 'زبادي طبيعي', 'الوزن': '1 كجم', 'الدهون': '3%', 'الصلاحية': '14 يوم' },
      hasDelivery: true,
      deliveryCost: 8
    }
  ],
  'لحوم-اسماك': [
    {
      id: 4501,
      name: 'لحم بقري طازج',
      price: 55,
      oldPrice: 70,
      rating: 4.8,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&auto=format',
        'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&auto=format'
      ],
      seller: { name: 'متجر اللحوم', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '3 أيام' },
      inStock: true,
      stock: 100,
      categoryEn: 'food',
      categoryTitle: 'اللحوم والأسماك',
      categoryLink: 'لحوم-اسماك',
      description: 'لحم بقري طازج 1 كجم',
      longDescription: 'لحم بقري طازج، مبرد، خالي من الدهون، مناسب للشوي والطبخ.',
      sizes: ['500 جرام', '1 كجم', '2 كجم'],
      colors: ['أحمر'],
      features: ['طازج', 'مبرد', 'خالي من الدهون', 'جودة عالية'],
      specifications: { 'النوع': 'لحم بقري', 'الوزن': '1 كجم', 'التبريد': 'مبرد', 'الصلاحية': '3 أيام' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 4502,
      name: 'سمك فيليه طازج',
      price: 42,
      oldPrice: 55,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&auto=format'],
      seller: { name: 'متجر الأسماك', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '3 أيام' },
      inStock: true,
      stock: 80,
      categoryEn: 'food',
      categoryTitle: 'اللحوم والأسماك',
      categoryLink: 'لحوم-اسماك',
      description: 'سمك فيليه طازج 500 جرام',
      longDescription: 'سمك فيليه طازج، خالي من العظام، غني بالأوميغا 3.',
      sizes: ['500 جرام', '1 كجم'],
      colors: ['أبيض'],
      features: ['طازج', 'خالي من العظام', 'غني بالأوميغا 3', 'سهل الطهي'],
      specifications: { 'النوع': 'فيليه سمك', 'الوزن': '500 جرام', 'الأوميغا 3': 'غني', 'الصلاحية': '3 أيام' },
      hasDelivery: true,
      deliveryCost: 12
    }
  ],
  'خضروات': [
    {
      id: 4601,
      name: 'طماطم طازجة',
      price: 8,
      oldPrice: 12,
      rating: 4.6,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format',
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format'
      ],
      seller: { name: 'متجر الخضروات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '3 أيام' },
      inStock: true,
      stock: 300,
      categoryEn: 'food',
      categoryTitle: 'الخضروات',
      categoryLink: 'خضروات',
      description: 'طماطم طازجة 1 كجم',
      longDescription: 'طماطم طازجة، حمراء ناضجة، غنية بفيتامين C، مثالية للسلطات والطبخ.',
      sizes: ['500 جرام', '1 كجم', '2 كجم'],
      colors: ['أحمر'],
      features: ['طازجة', 'حمراء ناضجة', 'غنية بفيتامين C', 'مناسبة للسلطات'],
      specifications: { 'النوع': 'طماطم', 'الوزن': '1 كجم', 'فيتامين C': 'غني', 'الصلاحية': '5 أيام' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 4602,
      name: 'بطاطس',
      price: 6,
      oldPrice: 9,
      rating: 4.7,
      reviews: 789,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format'],
      seller: { name: 'متجر الخضروات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 500,
      categoryEn: 'food',
      categoryTitle: 'الخضروات',
      categoryLink: 'خضروات',
      description: 'بطاطس طازجة 1 كجم',
      longDescription: 'بطاطس طازجة، حجم متوسط، مناسبة للقلي والسلق والشوي.',
      sizes: ['1 كجم', '2 كجم', '5 كجم'],
      colors: ['أصفر'],
      features: ['طازجة', 'حجم متوسط', 'متعددة الاستخدامات', 'جودة عالية'],
      specifications: { 'النوع': 'بطاطس', 'الوزن': '1 كجم', 'الحجم': 'متوسط', 'الصلاحية': 'أسبوعين' },
      hasDelivery: true,
      deliveryCost: 8
    }
  ],
  'فواكه': [
    {
      id: 4701,
      name: 'تفاح أحمر',
      price: 12,
      oldPrice: 16,
      rating: 4.8,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format',
        'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format'
      ],
      seller: { name: 'متجر الفواكه', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 400,
      categoryEn: 'food',
      categoryTitle: 'الفواكه',
      categoryLink: 'فواكه',
      description: 'تفاح أحمر طازج 1 كجم',
      longDescription: 'تفاح أحمر طازج، مقرمش وحلو، غني بالألياف والفيتامينات.',
      sizes: ['500 جرام', '1 كجم', '2 كجم'],
      colors: ['أحمر'],
      features: ['طازج', 'مقرمش', 'حلو', 'غني بالألياف'],
      specifications: { 'النوع': 'تفاح أحمر', 'الوزن': '1 كجم', 'الألياف': 'غني', 'الصلاحية': 'أسبوع' },
      hasDelivery: true,
      deliveryCost: 8
    },
    {
      id: 4702,
      name: 'موز',
      price: 10,
      oldPrice: 14,
      rating: 4.7,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format'],
      seller: { name: 'متجر الفواكه', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '5 أيام' },
      inStock: true,
      stock: 350,
      categoryEn: 'food',
      categoryTitle: 'الفواكه',
      categoryLink: 'فواكه',
      description: 'موز طازج 1 كجم',
      longDescription: 'موز طازج، غني بالبوتاسيوم، مثالي للطاقة والصحة.',
      sizes: ['500 جرام', '1 كجم'],
      colors: ['أصفر'],
      features: ['طازج', 'غني بالبوتاسيوم', 'مصدر للطاقة', 'صحي'],
      specifications: { 'النوع': 'موز', 'الوزن': '1 كجم', 'البوتاسيوم': 'غني', 'الصلاحية': '5 أيام' },
      hasDelivery: true,
      deliveryCost: 8
    }
  ]
};
// src/data/products.js

// ... الكود السابق للمنتجات الأخرى ...

// ✅ ========== منتجات المركبات ومستلزماتها ==========
export const vehiclesProducts = {
  'سيارات-خصوصي-(-بيع-)': [
    { id: 8101, name: 'تويوتا كامري 2024 חדید', price: 95000, categoryLink: 'سيارات-خصوصي-(-بيع-)', categoryTitle: 'سيارات خصوصي ( بيع )', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format', seller: { name: 'معرض النخبة', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'سيارات-نقل-خفيف-(-بيع-)': [
    { id: 8102, name: 'هايلوكس غمارتين 2023', price: 110000, categoryLink: 'سيارات-نقل-خفيف-(-بيع-)', categoryTitle: 'سيارات نقل خفيف ( بيع )', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format', seller: { name: 'معرض النخبة', whatsapp: '776981756' }, inStock: true, stock: 3 }
  ],
  'سيارات-دفع-رباعي(جيب)-(-بيع-)': [
    { id: 8103, name: 'لاندكروزر VXR 2024', price: 320000, categoryLink: 'سيارات-دفع-رباعي(جيب)-(-بيع-)', categoryTitle: 'سيارات دفع رباعي(جيب) ( بيع )', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format', seller: { name: 'معرض النخبة', whatsapp: '776981756' }, inStock: true, stock: 2 }
  ],
  'باصات-/-حافلات-(-بيع-)': [
    { id: 8104, name: 'باص هيونداي H1 2024', price: 85000, categoryLink: 'باصات-/-حافلات-(-بيع-)', categoryTitle: 'باصات / حافلات ( بيع )', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format', seller: { name: 'معرض الباصات', whatsapp: '776981756' }, inStock: true, stock: 4 }
  ],
  'شاحنات-(-بيع-)': [
    { id: 8105, name: 'شاحنة مرسيدس اكتروس', price: 450000, categoryLink: 'شاحنات-(-بيع-)', categoryTitle: 'شاحنات ( بيع )', image: 'https://images.unsplash.com/photo-1586191121278-200df1d4d659?w=800&auto=format', seller: { name: 'وكالة الشاحنات', whatsapp: '776981756' }, inStock: true, stock: 1 }
  ],
  'دراجات-نارية-(-بيع-)': [
    { id: 8106, name: 'دراجة هوندا CBR 600', price: 42000, categoryLink: 'دراجات-نارية-(-بيع-)', categoryTitle: 'دراجات نارية ( بيع )', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format', seller: { name: 'عالم الدراجات', whatsapp: '776981756' }, inStock: true, stock: 6 }
  ],
  'مركبات-ثقيلة-(رافعات،-شيولات..)-(-بيع)': [
    { id: 8107, name: 'شيول كوماتسو موديل حديث', price: 280000, categoryLink: 'مركبات-ثقيلة-(رافعات،-شيولات..)-(-بيع)', categoryTitle: 'مركبات ثقيلة (بيع)', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format', seller: { name: 'شركة المعدات', whatsapp: '776981756' }, inStock: true, stock: 2 }
  ],
  'سيارات-كهربائية-/-هايبرد-(-بيع-)': [
    { id: 8108, name: 'تسلا موديل 3 2024', price: 180000, categoryLink: 'سيارات-كهربائية-/-هايبرد-(-بيع-)', categoryTitle: 'سيارات كهربائية / هايبرد ( بيع )', image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format', seller: { name: 'السيارات الذكية', whatsapp: '776981756' }, inStock: true, stock: 3 }
  ],
  'سيارات-خصوصي-(-تاجير-)': [
    { id: 8201, name: 'إيجار تيجوان موديل 2023', price: 250, categoryLink: 'سيارات-خصوصي-(-تاجير-)', categoryTitle: 'سيارات خصوصي ( تاجير )', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format', seller: { name: 'بريميم لتأجير السيارات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'سيارات-نقل-خفيف-(-تاجير-)': [
    { id: 8202, name: 'تأجير بيك اب ديزل', price: 350, categoryLink: 'سيارات-نقل-خفيف-(-تاجير-)', categoryTitle: 'سيارات نقل خفيف ( تاجير )', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format', seller: { name: 'تأجير المعدات النقلية', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'سيارات-دفع-رباعي-(جيب)-(-تاجير-)': [
    { id: 8203, name: 'تأجير نيسان باترول', price: 800, categoryLink: 'سيارات-دفع-رباعي-(جيب)-(-تاجير-)', categoryTitle: 'سيارات دفع رباعي (جيب) ( تاجير )', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format', seller: { name: 'بريميم لتأجير السيارات', whatsapp: '776981756' }, inStock: true, stock: 4 }
  ],
  'باصات-/-حافلات-(-تاجير-)': [
    { id: 8204, name: 'تأجير حافلة سياحية 50 راكب', price: 1500, categoryLink: 'باصات-/-حافلات-(-تاجير-)', categoryTitle: 'باصات / حافلات ( تاجير )', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format', seller: { name: 'تأجير الباصات', whatsapp: '776981756' }, inStock: true, stock: 2 }
  ],
  'شاحنات-(-تاجير-)': [
    { id: 8205, name: 'تأجير شاحنة نقل عفش', price: 600, categoryLink: 'شاحنات-(-تاجير-)', categoryTitle: 'شاحنات ( تاجير )', image: 'https://images.unsplash.com/photo-1586191121278-200df1d4d659?w=800&auto=format', seller: { name: 'تأجير المعدات النقلية', whatsapp: '776981756' }, inStock: true, stock: 6 }
  ],
  'دراجات-نارية-(-تاجير-)': [
    { id: 8206, name: 'تأجير سكوتر كهربائي', price: 50, categoryLink: 'دراجات-نارية-(-تاجير-)', categoryTitle: 'دراجات نارية ( تاجير )', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format', seller: { name: 'عالم التأجير', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'مركبات-ثقيلة-(رافعات،-شيولات…)-(-تاجير-)': [
    { id: 8207, name: 'تأجير رافعة شوكية يومي', price: 900, categoryLink: 'مركبات-ثقيلة-(رافعات،-شيولات…)-(-تاجير-)', categoryTitle: 'مركبات ثقيلة (تاجير)', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format', seller: { name: 'شركة المعدات', whatsapp: '776981756' }, inStock: true, stock: 3 }
  ],
  'سيارات-كهربائية-/-هايبرد-(-تاجير-)': [
    { id: 8208, name: 'تأجير تسلا موديل S', price: 1200, categoryLink: 'سيارات-كهربائية-/-هايبرد-(-تاجير-)', categoryTitle: 'سيارات كهربائية / هايبرد ( تاجير )', image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format', seller: { name: 'السيارات الذكية', whatsapp: '776981756' }, inStock: true, stock: 2 }
  ],
  'قطع-غيار-أصلية': [
    { id: 8301, name: 'فحمات فرامل أصلية تويوتا', price: 180, categoryLink: 'قطع-غيار-أصلية', categoryTitle: 'قطع غيار أصلية', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'متجر قطع الغيار', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'قطع-غيار-بديلة': [
    { id: 8302, name: 'مساعدات ياباني درجة أولى', price: 450, categoryLink: 'قطع-غيار-بديلة', categoryTitle: 'قطع غيار بديلة', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'متجر قطع الغيار', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'إطارات-(تواير)': [
    { id: 8303, name: 'طقم إطارات ميشلان R17', price: 2100, categoryLink: 'إطارات-(تواير)', categoryTitle: 'إطارات (تواير)', image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format', seller: { name: 'متجر الإطارات', whatsapp: '776981756' }, inStock: true, stock: 12 }
  ],
  'جنوط-/-رنقات': [
    { id: 8304, name: 'جنوط لاندكروزر مقاس 18', price: 3500, categoryLink: 'جنوط-/-رنقات', categoryTitle: 'جنوط / رنقات', image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format', seller: { name: 'الجنوط الحديثة', whatsapp: '776981756' }, inStock: true, stock: 4 }
  ],
  'زيوت-/-فلاتر': [
    { id: 8305, name: 'طقم زيت وفلتر أصلي', price: 150, categoryLink: 'زيوت-/-فلاتر', categoryTitle: 'زيوت / فلاتر', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format', seller: { name: 'متجر غيار الزيت', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'بطاريات': [
    { id: 8306, name: 'بطارية ايبا 70 أمبير', price: 280, categoryLink: 'بطاريات', categoryTitle: 'بطاريات', image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format', seller: { name: 'متجر البطاريات', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'أنوار-/-لمبات-/-كشافات': [
    { id: 8307, name: 'طقم شمعات ليد 8000 لومن', price: 120, categoryLink: 'أنوار-/-لمبات-/-كشافات', categoryTitle: 'أنوار / لمبات / كشافات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'إضاءة السيارات', whatsapp: '776981756' }, inStock: true, stock: 40 }
  ],
  'ديكورات-خارجية': [
    { id: 8308, name: 'شبك أمامي تجميلي', price: 350, categoryLink: 'ديكورات-خارجية', categoryTitle: 'ديكورات خارجية', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'إكسسوارات زينة', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'ديكورات-داخلية': [
    { id: 8309, name: 'طقم دواسات أرضية فاخرة', price: 140, categoryLink: 'ديكورات-داخلية', categoryTitle: 'ديكورات داخلية', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'إكسسوارات زينة', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'أجهزة-صوتيات-وشاشات': [
    { id: 8310, name: 'شاشة اندرويد مقاس 10 بوصة', price: 850, categoryLink: 'أجهزة-صوتيات-وشاشات', categoryTitle: 'أجهزة صوتيات وشاشات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'إلكترونيات السيارات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'كاميرات-وحساسات': [
    { id: 8311, name: 'طقم حساسات خلفية 4 نقاط', price: 190, categoryLink: 'كاميرات-وحساسات', categoryTitle: 'كاميرات وحساسات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'إلكترونيات السيارات', whatsapp: '776981756' }, inStock: true, stock: 20 }
  ],
  'مفاتيح-/-ريموتات': [
    { id: 8312, name: 'ريموت سيارة بصمة ذكي', price: 320, categoryLink: 'مفاتيح-/-ريموتات', categoryTitle: 'مفاتيح / ريموتات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'مفاتيح النخبة', whatsapp: '776981756' }, inStock: true, stock: 15 }
  ],
  'كمبيوترات-سيارات': [
    { id: 8313, name: 'كمبيوتر محرك مستعمل مضمون', price: 1200, categoryLink: 'كمبيوترات-سيارات', categoryTitle: 'كمبيوترات سيارات', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format', seller: { name: 'مركز القطع الإلكترونية', whatsapp: '776981756' }, inStock: true, stock: 5 }
  ],
  'معدات-ورش-الصيانة-(لسيارات)': [
    { id: 8314, name: 'رافعة سيارة هيدروليك 3 طن', price: 650, categoryLink: 'معدات-ورش-الصيانة-(لسيارات)', categoryTitle: 'معدات ورش الصيانة (لسيارات)', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'معدات الورش', whatsapp: '776981756' }, inStock: true, stock: 8 }
  ],
  'فحص-سيارات': [
    { id: 8401, name: 'خدمة فحص كمبيوتر شامل', price: 150, categoryLink: 'فحص-سيارات', categoryTitle: 'فحص سيارات', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'مركز الصيانة المتقدم', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'سمكرة-/-رش': [
    { id: 8402, name: 'سمكرة ورش قطعة واحدة', price: 450, categoryLink: 'سمكرة-/-رش', categoryTitle: 'سمكرة / رش', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'مركز الصيانة المتقدم', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'كهربائي-سيارات': [
    { id: 8403, name: 'صيانة ضفيرة وكهرباء كاملة', price: 300, categoryLink: 'كهربائي-سيارات', categoryTitle: 'كهربائي سيارات', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'مركز الصيانة المتقدم', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'تبديل-زيوت': [
    { id: 8404, name: 'خدمة تبديل زيت مكينة وفلتر', price: 35, categoryLink: 'تبديل-زيوت', categoryTitle: 'تبديل زيوت', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'سريع لخدمات الزيت', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'غسيل-وتلميع': [
    { id: 8405, name: 'تلميع ساطع داخلي وخارجي', price: 200, categoryLink: 'غسيل-وتلميع', categoryTitle: 'غسيل وتلميع', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'اللمسة الملكية', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'تأمين-سيارات': [
    { id: 8406, name: 'تأمين ضد الغير - سنوي', price: 800, categoryLink: 'تأمين-سيارات', categoryTitle: 'تأمين سيارات', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format', seller: { name: 'مكتب خدمات التأمين', whatsapp: '776981756' }, inStock: true, stock: 999 }
  ],
  'سيارات-بيع': [
    {
      id: 5001,
      name: 'تويوتا كامري 2024',
      price: 125000,
      oldPrice: 135000,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format'
      ],
      seller: { name: 'معرض السيارات', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 5,
      categoryEn: 'vehicles',
      categoryTitle: 'السيارات - بيع',
      categoryLink: 'سيارات-بيع',
      description: 'تويوتا كامري 2024 فئة LE',
      longDescription: 'تويوتا كامري 2024، محرك 2.5 لتر، ناقل حركة أوتوماتيك، موفرة للوقود، نظام أمان متكامل.',
      colors: ['أبيض', 'أسود', 'فضي', 'أحمر'],
      features: ['محرك 2.5 لتر', 'ناقل أوتوماتيك', 'موفرة للوقود', 'نظام أمان متكامل'],
      specifications: { 'الموديل': '2024', 'المحرك': '2.5 لتر', 'ناقل الحركة': 'أوتوماتيك', 'الوقود': 'بنزين', 'الضمان': '3 سنوات' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 5002,
      name: 'هيونداي إلنترا 2024',
      price: 89000,
      oldPrice: 99000,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format'
      ],
      seller: { name: 'معرض السيارات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 8,
      categoryEn: 'vehicles',
      categoryTitle: 'السيارات - بيع',
      categoryLink: 'سيارات-بيع',
      description: 'هيونداي إلنترا 2024',
      longDescription: 'هيونداي إلنترا 2024، تصميم عصري، موفرة للوقود، تقنيات أمان متطورة.',
      colors: ['أبيض', 'أسود', 'فضي', 'أزرق'],
      features: ['تصميم عصري', 'موفرة للوقود', 'شاشة لمس 8 بوصة', 'كاميرا خلفية'],
      specifications: { 'الموديل': '2024', 'المحرك': '2.0 لتر', 'ناقل الحركة': 'أوتوماتيك', 'الوقود': 'بنزين', 'الضمان': '3 سنوات' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'سيارات-تاجير': [
    {
      id: 5101,
      name: 'تأجير سيارة تويوتا كامري',
      price: 150,
      oldPrice: 200,
      rating: 4.8,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format'
      ],
      seller: { name: 'شركة تأجير السيارات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 20,
      categoryEn: 'vehicles',
      categoryTitle: 'السيارات - تأجير',
      categoryLink: 'سيارات-تاجير',
      description: 'تأجير تويوتا كامري - يومي',
      longDescription: 'تأجير سيارة تويوتا كامري موديل حديث، نظيفة ومجهزة، تأمين شامل، توصيل مجاني.',
      sizes: ['يومي', 'أسبوعي', 'شهري'],
      colors: ['أبيض', 'أسود'],
      features: ['تأمين شامل', 'توصيل مجاني', 'صيانة دورية', 'نظافة عالية'],
      specifications: { 'الموديل': '2023-2024', 'السعر اليومي': '150 ريال', 'السعر الأسبوعي': '900 ريال', 'السعر الشهري': '3000 ريال', 'التأمين': 'شامل' },
      hasDelivery: true,
      deliveryCost: 0
    },
    {
      id: 5102,
      name: 'تأجير سيارة هونداي',
      price: 120,
      oldPrice: 160,
      rating: 4.6,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format'],
      seller: { name: 'شركة تأجير السيارات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 15,
      categoryEn: 'vehicles',
      categoryTitle: 'السيارات - تأجير',
      categoryLink: 'سيارات-تاجير',
      description: 'تأجير هونداي إلنترا - يومي',
      longDescription: 'تأجير هونداي إلنترا، موفرة للوقود، مناسبة للاستخدام اليومي، تأمين شامل.',
      sizes: ['يومي', 'أسبوعي', 'شهري'],
      colors: ['أبيض', 'فضي'],
      features: ['موفرة للوقود', 'تأمين شامل', 'توصيل مجاني', 'صيانة دورية'],
      specifications: { 'الموديل': '2023-2024', 'السعر اليومي': '120 ريال', 'السعر الأسبوعي': '700 ريال', 'السعر الشهري': '2400 ريال', 'التأمين': 'شامل' },
      hasDelivery: true,
      deliveryCost: 0
    }
  ],
  'دراجات-نارية': [
    {
      id: 5201,
      name: 'دراجة نارية هوندا',
      price: 18900,
      oldPrice: 22900,
      rating: 4.7,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format'
      ],
      seller: { name: 'معرض الدراجات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 6,
      categoryEn: 'vehicles',
      categoryTitle: 'دراجات نارية',
      categoryLink: 'دراجات-نارية',
      description: 'دراجة هوندا CBR 500R',
      longDescription: 'دراجة هوندا CBR 500R، محرك 500 سي سي، أداء رياضي، تصميم أنيق، موفرة للوقود.',
      colors: ['أسود', 'أحمر', 'أزرق'],
      features: ['محرك 500cc', 'أداء رياضي', 'مكابح ABS', 'إضاءة LED'],
      specifications: { 'المحرك': '500cc', 'ناقل الحركة': '6 سرعات', 'الوزن': '190 كجم', 'الوقود': 'بنزين 95', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 150
    },
    {
      id: 5202,
      name: 'دراجة نارية ياماها',
      price: 15900,
      oldPrice: 19900,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format'],
      seller: { name: 'معرض الدراجات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 8,
      categoryEn: 'vehicles',
      categoryTitle: 'دراجات نارية',
      categoryLink: 'دراجات-نارية',
      description: 'دراجة ياماها MT-07',
      longDescription: 'دراجة ياماها MT-07، محرك 689 سي سي، قوة عالية، تصميم رياضي، مناسبة للمبتدئين والمحترفين.',
      colors: ['أسود', 'أزرق', 'رمادي'],
      features: ['محرك 689cc', 'قوة عالية', 'خفيفة الوزن', 'تصميم رياضي'],
      specifications: { 'المحرك': '689cc', 'ناقل الحركة': '6 سرعات', 'الوزن': '184 كجم', 'الوقود': 'بنزين 95', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 150
    }
  ],
  'مستلزمات-سيارات': [
    {
      id: 5301,
      name: 'إطارات ميشلان',
      price: 450,
      oldPrice: 550,
      rating: 4.8,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format',
        'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format'
      ],
      seller: { name: 'متجر الإطارات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 50,
      categoryEn: 'vehicles',
      categoryTitle: 'مستلزمات السيارات',
      categoryLink: 'مستلزمات-سيارات',
      description: 'إطار ميشلان 225/55R17',
      longDescription: 'إطار ميشلان عالي الجودة، أداء ممتاز على الطرق الجافة والمبتلة، عمر طويل.',
      sizes: ['205/55R16', '215/60R16', '225/55R17', '235/60R18'],
      colors: ['أسود'],
      features: ['أداء ممتاز', 'عمر طويل', 'ثبات عالي', 'مقاومة للحرارة'],
      specifications: { 'المقاس': '225/55R17', 'النوع': 'صيفي', 'السرعة': 'V (240 كم/س)', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 5302,
      name: 'بطارية سيارة',
      price: 350,
      oldPrice: 450,
      rating: 4.7,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format'],
      seller: { name: 'متجر البطاريات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 30,
      categoryEn: 'vehicles',
      categoryTitle: 'مستلزمات السيارات',
      categoryLink: 'مستلزمات-سيارات',
      description: 'بطارية 70 أمبير',
      longDescription: 'بطارية سياره عالية الجودة، تشغيل فوري، عمر طويل، ضمان سنتين.',
      sizes: ['50 أمبير', '60 أمبير', '70 أمبير', '80 أمبير'],
      colors: ['أسود'],
      features: ['تشغيل فوري', 'عمر طويل', 'مقاومة للحرارة', 'ضمان سنتين'],
      specifications: { 'السعة': '70 أمبير', 'الجهد': '12 فولت', 'النوع': 'حمض رصاص', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 20
    },
    {
      id: 5303,
      name: 'زيت محرك',
      price: 120,
      oldPrice: 160,
      rating: 4.9,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format'],
      seller: { name: 'متجر الزيوت', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 100,
      categoryEn: 'vehicles',
      categoryTitle: 'مستلزمات السيارات',
      categoryLink: 'مستلزمات-سيارات',
      description: 'زيت محرك 5W-30',
      longDescription: 'زيت محرك تخليقي بالكامل، حماية فائقة للمحرك، تحسين أداء الوقود.',
      sizes: ['1 لتر', '4 لتر', '5 لتر'],
      colors: ['ذهبي'],
      features: ['تخليقي بالكامل', 'حماية فائقة', 'تحسين أداء الوقود', 'مناسب لجميع السيارات'],
      specifications: { 'النوع': 'تخليقي', 'اللزوجة': '5W-30', 'الحجم': '4 لتر', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'خدمات-سيارات': [
    {
      id: 5401,
      name: 'تغيير زيت وصيانة',
      price: 150,
      oldPrice: 200,
      rating: 4.8,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format',
        'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format'
      ],
      seller: { name: 'مركز الصيانة', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 99,
      categoryEn: 'vehicles',
      categoryTitle: 'خدمات السيارات',
      categoryLink: 'خدمات-سيارات',
      description: 'خدمة تغيير الزيت والفلتر',
      longDescription: 'خدمة تغيير زيت المحرك مع الفلتر، فحص شامل للسيارة، استشارة مجانية.',
      sizes: ['سيارة صغيرة', 'سيارة متوسطة', 'سيارة كبيرة'],
      colors: ['خدمة'],
      features: ['زيت أصلي', 'فلتر أصلي', 'فحص شامل', 'استشارة مجانية'],
      specifications: { 'المدة': '30 دقيقة', 'الزيت': 'تخليقي', 'الفلتر': 'أصلي', 'الفحص': 'شامل 15 نقطة' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 5402,
      name: 'غسيل وتلميع سيارات',
      price: 80,
      oldPrice: 120,
      rating: 4.7,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&auto=format'],
      seller: { name: 'مركز الغسيل', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '7 أيام' },
      inStock: true,
      stock: 99,
      categoryEn: 'vehicles',
      categoryTitle: 'خدمات السيارات',
      categoryLink: 'خدمات-سيارات',
      description: 'غسيل شامل وتلميع',
      longDescription: 'خدمة غسيل خارجي وداخلي، تلميع، تنظيف المكيف، تعطير السيارة.',
      sizes: ['سيارة صغيرة', 'سيارة متوسطة', 'سيارة كبيرة'],
      colors: ['خدمة'],
      features: ['غسيل خارجي', 'غسيل داخلي', 'تلميع', 'تعطير'],
      specifications: { 'المدة': 'ساعة', 'الغسيل': 'خارجي وداخلي', 'التلميع': 'يدوي', 'التعطير': 'معطر فاخر' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ]
};
// src/data/products.js

// ... الكود السابق للمنتجات الأخرى ...

export const constructionProducts = {
  'الأسمنت-والخرسانة': [
    { id: 10101, name: 'اسمنت بورتلاندي عادي 50كجم', price: 25, categoryLink: 'الأسمنت-والخرسانة', categoryTitle: 'الأسمنت والخرسانة', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format', seller: { name: 'الرواد للمقاولات', whatsapp: '776981756' }, inStock: true, stock: 1000 }
  ],
  'الحديد-والمعادن': [
    { id: 10102, name: 'حديد تسليح سابك 12ملم', price: 3400, categoryLink: 'الحديد-والمعادن', categoryTitle: 'الحديد والمعادن', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format', seller: { name: 'الرواد للمقاولات', whatsapp: '776981756' }, inStock: true, stock: 50 }
  ],
  'مواد-السباكة': [
    { id: 10103, name: 'مواسير PVC ضغط عالي', price: 45, categoryLink: 'مواد-السباكة', categoryTitle: 'مواد السباكة', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format', seller: { name: 'السباك المعتمد', whatsapp: '776981756' }, inStock: true, stock: 200 }
  ],
  'الكهرباء-والاضاءة': [
    { id: 10104, name: 'سلك كهرباء 6 ملم - لفة 100 متر', price: 280, categoryLink: 'الكهرباء-والاضاءة', categoryTitle: 'الكهرباء والاضاءة', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format', seller: { name: 'عالم التكييف والكهرباء', whatsapp: '776981756' }, inStock: true, stock: 30 }
  ],
  'مواد-التشطيب': [
    { id: 10105, name: 'سيراميك أرضيات فرز أول', price: 35, categoryLink: 'مواد-التشطيب', categoryTitle: 'مواد التشطيب', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format', seller: { name: 'بيت الإبداع', whatsapp: '776981756' }, inStock: true, stock: 500 }
  ],
  'الدهانات-ومستلزماتها': [
    { id: 10106, name: 'دهان جوتن بلاستيك مط', price: 150, categoryLink: 'الدهانات-ومستلزماتها', categoryTitle: 'الدهانات ومستلزماتها', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format', seller: { name: 'عالم الألوان', whatsapp: '776981756' }, inStock: true, stock: 100 }
  ],
  'المكملات-والإكسسوارات': [
    { id: 10107, name: 'طقم مسامير براغي متنوع', price: 15, categoryLink: 'المكملات-والإكسسوارات', categoryTitle: 'المكملات والإكسسوارات', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format', seller: { name: 'متجر مكملات البناء', whatsapp: '776981756' }, inStock: true, stock: 1000 }
  ],
  'ادوات-ومعدات-البناء': [
    { id: 10108, name: 'عربة بناء يدوية سعة 80 لتر', price: 120, categoryLink: 'ادوات-ومعدات-البناء', categoryTitle: 'ادوات ومعدات البناء', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format', seller: { name: 'مركز المعدات', whatsapp: '776981756' }, inStock: true, stock: 25 }
  ],
  'معدات-الورش': [
    { id: 10109, name: 'جهاز لحام إنفرتر 200 أمبير', price: 450, categoryLink: 'معدات-الورش', categoryTitle: 'معدات الورش', image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format', seller: { name: 'مركز المعدات', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'اسمنت-خرسانة': [
    {
      id: 6001,
      name: 'أسمنت بورتلاندي',
      price: 18,
      oldPrice: 22,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format'
      ],
      seller: { name: 'متجر مواد البناء', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 500,
      categoryEn: 'construction',
      categoryTitle: 'الأسمنت والخرسانة',
      categoryLink: 'اسمنت-خرسانة',
      description: 'أسمنت بورتلاندي عالي الجودة 50 كجم',
      longDescription: 'أسمنت بورتلاندي عادي، مناسب لجميع أعمال البناء والتشييد، قوة عالية، جودة مضمونة.',
      sizes: ['25 كجم', '50 كجم'],
      colors: ['رمادي'],
      features: ['جودة عالية', 'قوة تحمل', 'مقاوم للرطوبة', 'مناسب لجميع الأعمال'],
      specifications: { 'النوع': 'بورتلاندي', 'الوزن': '50 كجم', 'القوة': '42.5 R', 'الصلاحية': '3 شهور' },
      hasDelivery: true,
      deliveryCost: 50
    },
    {
      id: 6002,
      name: 'خرسانة جاهزة',
      price: 280,
      oldPrice: 320,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format'],
      seller: { name: 'متجر الخرسانة', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 100,
      categoryEn: 'construction',
      categoryTitle: 'الأسمنت والخرسانة',
      categoryLink: 'اسمنت-خرسانة',
      description: 'خرسانة جاهزة C30',
      longDescription: 'خرسانة جاهزة درجة C30، مناسبة للأساسات والأعمدة، تسليم فوري.',
      sizes: ['متر مكعب'],
      colors: ['رمادي'],
      features: ['جودة عالية', 'تسليم فوري', 'مقاومة عالية', 'مناسبة للأساسات'],
      specifications: { 'النوع': 'خرسانة جاهزة', 'الدرجة': 'C30', 'المقاومة': '30 MPa', 'التسليم': 'خلال ساعتين' },
      hasDelivery: true,
      deliveryCost: 100
    }
  ],
  'حديد-معادن': [
    {
      id: 6101,
      name: 'حديد تسليح',
      price: 3200,
      oldPrice: 3600,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format'
      ],
      seller: { name: 'متجر الحديد', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 200,
      categoryEn: 'construction',
      categoryTitle: 'الحديد والمعادن',
      categoryLink: 'حديد-معادن',
      description: 'حديد تسليح سابك 12 مم',
      longDescription: 'حديد تسليح سابك عالي الجودة، مقاس 12 مم، مطابق للمواصفات السعودية، قوة شد عالية.',
      sizes: ['8 مم', '10 مم', '12 مم', '14 مم', '16 مم', '18 مم'],
      colors: ['رمادي'],
      features: ['مطابق للمواصفات', 'قوة شد عالية', 'مقاوم للصدأ', 'سابك'],
      specifications: { 'المقاس': '12 مم', 'الطول': '12 متر', 'القوة': '420 MPa', 'المنشأ': 'السعودية' },
      hasDelivery: true,
      deliveryCost: 150
    },
    {
      id: 6102,
      name: 'ألواح ألمنيوم',
      price: 180,
      oldPrice: 220,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'],
      seller: { name: 'متجر المعادن', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 300,
      categoryEn: 'construction',
      categoryTitle: 'الحديد والمعادن',
      categoryLink: 'حديد-معادن',
      description: 'ألواح ألمنيوم 2 مم',
      longDescription: 'ألواح ألمنيوم عالية الجودة، متعددة الاستخدامات، خفيفة الوزن، مقاومة للصدأ.',
      sizes: ['1 مم', '2 مم', '3 مم', '4 مم'],
      colors: ['فضي', 'ذهبي', 'أسود'],
      features: ['خفيف الوزن', 'مقاوم للصدأ', 'سهل التشكيل', 'متعدد الاستخدامات'],
      specifications: { 'السماكة': '2 مم', 'المقاس': '1×2 متر', 'النوع': 'ألمنيوم 6061', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 50
    }
  ],
  'مواد-سباكة': [
    {
      id: 6201,
      name: 'مواسير PVC',
      price: 25,
      oldPrice: 35,
      rating: 4.7,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format',
        'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'
      ],
      seller: { name: 'متجر السباكة', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 500,
      categoryEn: 'construction',
      categoryTitle: 'مواد السباكة',
      categoryLink: 'مواد-سباكة',
      description: 'مواسير PVC ضغط 4 بوصة',
      longDescription: 'مواسير PVC عالية الجودة، مقاومة للضغط والحرارة، مناسبة لشبكات المياه والصرف الصحي.',
      sizes: ['1/2 بوصة', '3/4 بوصة', '1 بوصة', '2 بوصة', '4 بوصة'],
      colors: ['رمادي', 'أبيض'],
      features: ['مقاوم للضغط', 'مقاوم للحرارة', 'خفيف الوزن', 'سهل التركيب'],
      specifications: { 'النوع': 'PVC', 'المقاس': '4 بوصة', 'الضغط': '10 بار', 'الطول': '6 متر' },
      hasDelivery: true,
      deliveryCost: 30
    },
    {
      id: 6202,
      name: 'خلاط مياه',
      price: 120,
      oldPrice: 180,
      rating: 4.8,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format'],
      seller: { name: 'متجر السباكة', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 80,
      categoryEn: 'construction',
      categoryTitle: 'مواد السباكة',
      categoryLink: 'مواد-سباكة',
      description: 'خلاط مياه مطلي بالكروم',
      longDescription: 'خلاط مياه عصري، مطلي بالكروم، مقاوم للصدأ، توفير للمياه، تصميم أنيق.',
      colors: ['كروم', 'ذهبي', 'أسود'],
      features: ['مقاوم للصدأ', 'توفير للمياه', 'تصميم أنيق', 'سهل التركيب'],
      specifications: { 'النوع': 'خلاط', 'المادة': 'نحاس مطلي', 'الضمان': 'سنتين', 'التوفير': '30% ماء' },
      hasDelivery: true,
      deliveryCost: 20
    }
  ],
  'تشطيب-دهانات': [
    {
      id: 6301,
      name: 'دهان داخلي',
      price: 45,
      oldPrice: 60,
      rating: 4.8,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
        'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'
      ],
      seller: { name: 'متجر الدهانات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 400,
      categoryEn: 'construction',
      categoryTitle: 'مواد التشطيب والدهانات',
      categoryLink: 'تشطيب-دهانات',
      description: 'دهان داخلي أكريليك 3 لتر',
      longDescription: 'دهان داخلي أكريليك، قابل للغسل، مقاوم للبكتيريا، ألوان زاهية، تغطية ممتازة.',
      sizes: ['1 لتر', '3 لتر', '5 لتر', '18 لتر'],
      colors: ['أبيض', 'بيج', 'رمادي', 'أزرق فاتح', 'وردي فاتح'],
      features: ['قابل للغسل', 'مقاوم للبكتيريا', 'تغطية ممتازة', 'عديم الرائحة'],
      specifications: { 'النوع': 'أكريليك', 'الحجم': '3 لتر', 'التغطية': '35-40 م²', 'التجفيف': 'ساعتين' },
      hasDelivery: true,
      deliveryCost: 15
    },
    {
      id: 6302,
      name: 'سيراميك أرضيات',
      price: 55,
      oldPrice: 75,
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format'],
      seller: { name: 'متجر السيراميك', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 300,
      categoryEn: 'construction',
      categoryTitle: 'مواد التشطيب والدهانات',
      categoryLink: 'تشطيب-دهانات',
      description: 'سيراميك أرضيات 60×60',
      longDescription: 'سيراميك أرضيات فاخر، مقاوم للخدش، سهل التنظيف، ألوان عصرية.',
      sizes: ['30×30', '40×40', '60×60', '80×80'],
      colors: ['بيج', 'رمادي', 'كريمي', 'بني'],
      features: ['مقاوم للخدش', 'سهل التنظيف', 'ألوان عصرية', 'جودة عالية'],
      specifications: { 'المقاس': '60×60 سم', 'النوع': 'بورسلان', 'المقاومة': 'عالية', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 50
    }
  ],
  'مكملات-اكسسوارات': [
    {
      id: 6401,
      name: 'مسامير براغي',
      price: 25,
      oldPrice: 35,
      rating: 4.6,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format'],
      seller: { name: 'متجر المكملات', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 1000,
      categoryEn: 'construction',
      categoryTitle: 'المكملات والإكسسوارات',
      categoryLink: 'مكملات-اكسسوارات',
      description: 'طقم مسامير براغي 100 قطعة',
      longDescription: 'طقم مسامير براغي متنوع، مجلفن مقاوم للصدأ، مناسب لجميع الأعمال.',
      sizes: ['طقم 50 قطعة', 'طقم 100 قطعة', 'طقم 200 قطعة'],
      colors: ['فضي', 'ذهبي'],
      features: ['مقاوم للصدأ', 'متنوع المقاسات', 'جودة عالية', 'متين'],
      specifications: { 'العدد': '100 قطعة', 'المادة': 'فولاذ مجلفن', 'المقاسات': 'متنوعة', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    },
    {
      id: 6402,
      name: 'زوايا حماية',
      price: 12,
      oldPrice: 18,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'],
      seller: { name: 'متجر المكملات', whatsapp: '776981756', rating: 4.5, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 500,
      categoryEn: 'construction',
      categoryTitle: 'المكملات والإكسسوارات',
      categoryLink: 'مكملات-اكسسوارات',
      description: 'زوايا حماية من الألمنيوم',
      longDescription: 'زوايا حماية للحوائط والزوايا، من الألمنيوم، مقاومة للصدمات، سهلة التركيب.',
      sizes: ['2 متر', '2.5 متر', '3 متر'],
      colors: ['فضي', 'ذهبي'],
      features: ['مقاوم للصدمات', 'سهل التركيب', 'أنيق', 'متين'],
      specifications: { 'المادة': 'ألمنيوم', 'الطول': '2.5 متر', 'السمك': '1 مم', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 10
    }
  ],
  'ادوات-معدات-بناء': [
    {
      id: 6501,
      name: 'مطرقة ثقب',
      price: 120,
      oldPrice: 180,
      rating: 4.8,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
        'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'
      ],
      seller: { name: 'متجر الأدوات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 50,
      categoryEn: 'construction',
      categoryTitle: 'أدوات ومعدات البناء',
      categoryLink: 'ادوات-معدات-بناء',
      description: 'مطرقة ثقب كهربائية 800 واط',
      longDescription: 'مطرقة ثقب كهربائية بقوة 800 واط، للحفر في الخرسانة والجدران، سهلة الاستخدام.',
      sizes: ['800 واط', '1200 واط', '1500 واط'],
      colors: ['أزرق', 'أحمر'],
      features: ['قوة عالية', 'حفر في الخرسانة', 'سهلة الاستخدام', 'ضمان سنتين'],
      specifications: { 'القوة': '800 واط', 'السرعة': '3000 دورة/دقيقة', 'الوضع': 'حفر + ثقب', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 25
    },
    {
      id: 6502,
      name: 'منشار يدوي',
      price: 45,
      oldPrice: 65,
      rating: 4.7,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'],
      seller: { name: 'متجر الأدوات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 100,
      categoryEn: 'construction',
      categoryTitle: 'أدوات ومعدات البناء',
      categoryLink: 'ادوات-معدات-بناء',
      description: 'منشار يدوي متعدد الاستخدامات',
      longDescription: 'منشار يدوي مع شفرة قابلة للتبديل، مناسب لقطع الخشب والبلاستيك والمعادن الخفيفة.',
      sizes: ['15 سم', '20 سم', '25 سم'],
      colors: ['أصفر', 'أسود'],
      features: ['شفرة قابلة للتبديل', 'خفيف الوزن', 'سهل الاستخدام', 'متين'],
      specifications: { 'الطول': '20 سم', 'الشفرة': 'قابلة للتبديل', 'المواد': 'خشب - بلاستيك - معدن', 'الضمان': 'سنة' },
      hasDelivery: true,
      deliveryCost: 15
    }
  ],
  'معدات-ورش': [
    {
      id: 6601,
      name: 'جهاز لحام',
      price: 450,
      oldPrice: 600,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format'
      ],
      seller: { name: 'متجر المعدات', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 20,
      categoryEn: 'construction',
      categoryTitle: 'معدات الورش',
      categoryLink: 'معدات-ورش',
      description: 'جهاز لحام 200 أمبير',
      longDescription: 'جهاز لحام بقدرة 200 أمبير، مناسب للحام الصلب والألمنيوم، مع كامل الملحقات.',
      sizes: ['150 أمبير', '200 أمبير', '250 أمبير'],
      colors: ['أحمر', 'أسود'],
      features: ['قوة عالية', 'ملحقات كاملة', 'سهل الاستخدام', 'تبريد جيد'],
      specifications: { 'القدرة': '200 أمبير', 'الجهد': '220 فولت', 'النوع': 'إنفرتر', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 50
    },
    {
      id: 6602,
      name: 'كمبروسر هواء',
      price: 550,
      oldPrice: 750,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'],
      seller: { name: 'متجر المعدات', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 15,
      categoryEn: 'construction',
      categoryTitle: 'معدات الورش',
      categoryLink: 'معدات-ورش',
      description: 'كمبروسر هواء 50 لتر',
      longDescription: 'كمبروسر هواء بقدرة 50 لتر، مناسب لورش السيارات والصناعات الخفيفة، هادئ وقوي.',
      sizes: ['25 لتر', '50 لتر', '100 لتر'],
      colors: ['أزرق', 'أسود'],
      features: ['خزان 50 لتر', 'هادئ', 'قوي', 'سهل الحمل'],
      specifications: { 'السعة': '50 لتر', 'الضغط': '8 بار', 'الطاقة': '1.5 حصان', 'الضمان': 'سنتين' },
      hasDelivery: true,
      deliveryCost: 60
    }
  ]
};
// src/data/products.js

// ... الكود السابق للمنتجات الأخرى ...

export const realEstateProducts = {
  'عقارات-للبيع': [
    { id: 9101, name: 'فيلا فاخرة للبيع - 5 غرف', price: 1200000, categoryLink: 'عقارات-للبيع', categoryTitle: 'عقارات للبيع', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format', seller: { name: 'عقارات مكة', whatsapp: '776981756' }, inStock: true, stock: 1 }
  ],
  'عقارات-للإيجار': [
    { id: 9201, name: 'شقة مفروشة للإيجار - حي النزهة', price: 3500, categoryLink: 'عقارات-للإيجار', categoryTitle: 'عقارات للإيجار', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format', seller: { name: 'عقارات مكة', whatsapp: '776981756' }, inStock: true, stock: 1 }
  ],
  'تمليك-بالتقسيط': [
    { id: 9301, name: 'شقة تمليك بالتقسيط - مشروع ريادة', price: 450000, categoryLink: 'تمليك-بالتقسيط', categoryTitle: 'تمليك بالتقسيط', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format', seller: { name: 'عقارات مكة', whatsapp: '776981756' }, inStock: true, stock: 10 }
  ],
  'منازل-فيلل': [
    {
      id: 7001,
      name: 'فيلا فاخرة للبيع',
      price: 1500000,
      oldPrice: 1800000,
      rating: 4.9,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 1,
      categoryEn: 'realestate',
      categoryTitle: 'منازل وفيلل',
      categoryLink: 'منازل-فيلل',
      description: 'فيلا فاخرة للبيع في حي الرائد',
      longDescription: 'فيلا فاخرة بمساحة 500 متر، 5 غرف نوم، 4 حمامات، حديقة خاصة، مسبح، موقف سيارات، موقع ممتاز.',
      sizes: ['500 متر', '600 متر', '800 متر'],
      colors: ['أبيض', 'بيج'],
      features: ['مساحة كبيرة', 'حديقة خاصة', 'مسبح', 'موقف سيارات', 'موقع ممتاز'],
      specifications: { 'المساحة': '500 متر', 'الغرف': '5 غرف', 'الحمامات': '4 حمامات', 'الصالة': '2 صالة', 'السعر': '1,500,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 7002,
      name: 'منزل مستقل للبيع',
      price: 850000,
      oldPrice: 950000,
      rating: 4.7,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 2,
      categoryEn: 'realestate',
      categoryTitle: 'منازل وفيلل',
      categoryLink: 'منازل-فيلل',
      description: 'منزل مستقل للبيع في حي النهضة',
      longDescription: 'منزل مستقل بمساحة 350 متر، 4 غرف نوم، 3 حمامات، مجلس رجال، حديقة صغيرة.',
      sizes: ['350 متر', '400 متر'],
      colors: ['أبيض'],
      features: ['مساحة 350 متر', '4 غرف نوم', 'مجلس رجال', 'حديقة'],
      specifications: { 'المساحة': '350 متر', 'الغرف': '4 غرف', 'الحمامات': '3 حمامات', 'الموقع': 'حي النهضة', 'السعر': '850,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'شقق': [
    {
      id: 7101,
      name: 'شقة فاخرة للبيع',
      price: 450000,
      oldPrice: 550000,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 3,
      categoryEn: 'realestate',
      categoryTitle: 'الشقق',
      categoryLink: 'شقق',
      description: 'شقة فاخرة 3 غرف للبيع',
      longDescription: 'شقة فاخرة في طابق ثالث، مساحة 180 متر، 3 غرف نوم، 2 حمام، صالة واسعة، مطبخ راكب.',
      sizes: ['150 متر', '180 متر', '200 متر'],
      colors: ['بيج'],
      features: ['مساحة واسعة', '3 غرف نوم', 'صالة كبيرة', 'مطبخ راكب', 'موقع ممتاز'],
      specifications: { 'المساحة': '180 متر', 'الغرف': '3 غرف', 'الحمامات': '2 حمام', 'الطابق': 'الثالث', 'السعر': '450,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 7102,
      name: 'شقة للإيجار',
      price: 25000,
      oldPrice: 30000,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format'],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 5,
      categoryEn: 'realestate',
      categoryTitle: 'الشقق',
      categoryLink: 'شقق',
      description: 'شقة للإيجار السنوي',
      longDescription: 'شقة مفروشة 2 غرفة نوم، صالة، مطبخ، حمام، موقع ممتاز، للعوائل.',
      sizes: ['120 متر'],
      colors: ['أبيض'],
      features: ['مفروشة', '2 غرفة نوم', 'موقع ممتاز', 'للعوائل'],
      specifications: { 'المساحة': '120 متر', 'الغرف': '2 غرف', 'الإيجار السنوي': '25,000 ريال', 'الموقع': 'وسط المدينة' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'مباني': [
    {
      id: 7201,
      name: 'مبنى تجاري للبيع',
      price: 3200000,
      oldPrice: 3800000,
      rating: 4.9,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.9, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 1,
      categoryEn: 'realestate',
      categoryTitle: 'مباني',
      categoryLink: 'مباني',
      description: 'مبنى تجاري مكون من 3 طوابق',
      longDescription: 'مبنى تجاري في منطقة حيوية، 3 طوابق، 6 محلات تجارية، مكتب إدارة، موقف سيارات.',
      sizes: ['500 متر', '800 متر'],
      colors: ['رمادي'],
      features: ['3 طوابق', '6 محلات تجارية', 'موقع حيوي', 'موقف سيارات'],
      specifications: { 'المساحة': '500 متر', 'الطوابق': '3 طوابق', 'المحلات': '6 محلات', 'السعر': '3,200,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'اراضي': [
    {
      id: 7301,
      name: 'أرض سكنية للبيع',
      price: 350000,
      oldPrice: 400000,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 4,
      categoryEn: 'realestate',
      categoryTitle: 'أراضي',
      categoryLink: 'اراضي',
      description: 'أرض سكنية في حي الوادي',
      longDescription: 'أرض سكنية بمساحة 600 متر، مخطط رقم 123، شارع 20 متر، خدمات متوفرة.',
      sizes: ['500 متر', '600 متر', '800 متر', '1000 متر'],
      colors: ['بني'],
      features: ['مساحة 600 متر', 'شارع 20 متر', 'خدمات متوفرة', 'موقع ممتاز'],
      specifications: { 'المساحة': '600 متر', 'الشارع': '20 متر', 'المخطط': 'رقم 123', 'السعر': '350,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 7302,
      name: 'أرض تجارية للبيع',
      price: 850000,
      oldPrice: 950000,
      rating: 4.8,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format'],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 2,
      categoryEn: 'realestate',
      categoryTitle: 'أراضي',
      categoryLink: 'اراضي',
      description: 'أرض تجارية على شارع رئيسي',
      longDescription: 'أرض تجارية مميزة على شارع رئيسي، مساحة 500 متر، مناسبة للمشاريع التجارية.',
      sizes: ['500 متر', '800 متر'],
      colors: ['بني'],
      features: ['على شارع رئيسي', 'مساحة 500 متر', 'موقع ممتاز', 'مناسبة للمشاريع التجارية'],
      specifications: { 'المساحة': '500 متر', 'الشارع': 'رئيسي 40 متر', 'المنطقة': 'تجارية', 'السعر': '850,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'اراضي-زراعية': [
    {
      id: 7401,
      name: 'مزرعة للبيع',
      price: 1200000,
      oldPrice: 1500000,
      rating: 4.8,
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 1,
      categoryEn: 'realestate',
      categoryTitle: 'أراضي زراعية',
      categoryLink: 'اراضي-زراعية',
      description: 'مزرعة بمساحة 10,000 متر',
      longDescription: 'مزرعة متكاملة، بئر مياه، أشجار مثمرة، منزل ريفي، مناسبة للاستثمار الزراعي.',
      sizes: ['10000 متر', '20000 متر', '50000 متر'],
      colors: ['أخضر'],
      features: ['بئر مياه', 'أشجار مثمرة', 'منزل ريفي', 'مساحة كبيرة'],
      specifications: { 'المساحة': '10000 متر', 'البئر': 'مياه جوفية', 'الأشجار': 'نخيل - حمضيات', 'السعر': '1,200,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'منازل-شعبية': [
    {
      id: 7501,
      name: 'منزل شعبي للبيع',
      price: 280000,
      oldPrice: 320000,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.6, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 3,
      categoryEn: 'realestate',
      categoryTitle: 'منازل شعبية',
      categoryLink: 'منازل-شعبية',
      description: 'منزل شعبي بحي المساكن',
      longDescription: 'منزل شعبي بمساحة 250 متر، 3 غرف، مجلس رجال، فناء واسع، موقع هادئ.',
      sizes: ['200 متر', '250 متر', '300 متر'],
      colors: ['أصفر', 'بيج'],
      features: ['مساحة 250 متر', '3 غرف', 'فناء واسع', 'موقع هادئ'],
      specifications: { 'المساحة': '250 متر', 'الغرف': '3 غرف', 'المجلس': 'رجال', 'السعر': '280,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'محلات-تجارية': [
    {
      id: 7601,
      name: 'محل تجاري للبيع',
      price: 450000,
      oldPrice: 550000,
      rating: 4.8,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 2,
      categoryEn: 'realestate',
      categoryTitle: 'محلات تجارية',
      categoryLink: 'محلات-تجارية',
      description: 'محل تجاري في شارع رئيسي',
      longDescription: 'محل تجاري بمساحة 120 متر، واجهة زجاجية، موقع ممتاز، مناسب لجميع الأنشطة التجارية.',
      sizes: ['80 متر', '100 متر', '120 متر', '150 متر'],
      colors: ['فضي'],
      features: ['واجهة زجاجية', 'موقع ممتاز', 'مساحة 120 متر', 'شارع رئيسي'],
      specifications: { 'المساحة': '120 متر', 'الواجهة': 'زجاجية', 'الشارع': 'رئيسي', 'السعر': '450,000 ريال' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 7602,
      name: 'محل تجاري للإيجار',
      price: 36000,
      oldPrice: 48000,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format'],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '14 يوم' },
      inStock: true,
      stock: 4,
      categoryEn: 'realestate',
      categoryTitle: 'محلات تجارية',
      categoryLink: 'محلات-تجارية',
      description: 'محل تجاري للإيجار السنوي',
      longDescription: 'محل تجاري في مجمع تجاري، مساحة 80 متر، مكيف، موقع ممتاز.',
      sizes: ['80 متر'],
      colors: ['أبيض'],
      features: ['مجمع تجاري', 'مكيف', 'موقع ممتاز', 'إيجار سنوي'],
      specifications: { 'المساحة': '80 متر', 'الإيجار السنوي': '36,000 ريال', 'المجمع': 'تجاري', 'الموقع': 'وسط المدينة' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ],
  'مستودعات-مخازن': [
    {
      id: 7701,
      name: 'مستودع للإيجار',
      price: 48000,
      oldPrice: 60000,
      rating: 4.7,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format',
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format'
      ],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.7, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 3,
      categoryEn: 'realestate',
      categoryTitle: 'مستودعات - مخازن',
      categoryLink: 'مستودعات-مخازن',
      description: 'مستودع للإيجار السنوي',
      longDescription: 'مستودع بمساحة 200 متر، ارتفاع 6 متر، مناسب للتخزين، موقع استراتيجي.',
      sizes: ['200 متر', '300 متر', '500 متر'],
      colors: ['رمادي'],
      features: ['مساحة 200 متر', 'ارتفاع 6 متر', 'موقع استراتيجي', 'أمان عالي'],
      specifications: { 'المساحة': '200 متر', 'الارتفاع': '6 متر', 'الإيجار السنوي': '48,000 ريال', 'الموقع': 'المنطقة الصناعية' },
      hasDelivery: false,
      deliveryCost: 0
    },
    {
      id: 7702,
      name: 'مخزن للبيع',
      price: 650000,
      oldPrice: 750000,
      rating: 4.8,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format',
      images: ['https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format'],
      seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.8, verified: true, response: 'خلال ساعة', returns: '30 يوم' },
      inStock: true,
      stock: 1,
      categoryEn: 'realestate',
      categoryTitle: 'مستودعات - مخازن',
      categoryLink: 'مستودعات-مخازن',
      description: 'مخزن للبيع بالمنطقة الصناعية',
      longDescription: 'مخزن بمساحة 400 متر، بناء قوي، مناسب للتخزين الثقيل، سعر ممتاز.',
      sizes: ['400 متر'],
      colors: ['رمادي'],
      features: ['مساحة 400 متر', 'بناء قوي', 'موقع صناعي', 'سعر ممتاز'],
      specifications: { 'المساحة': '400 متر', 'الارتفاع': '8 متر', 'السعر': '650,000 ريال', 'المنطقة': 'صناعية' },
      hasDelivery: false,
      deliveryCost: 0
    }
  ]
};

// دمج جميع المنتجات
export const allProducts = {
  ...mensProducts,
  ...womensProducts,
  ...kidsProducts,
  ...electronicsProducts,
  ...foodProducts,
  ...vehiclesProducts,
  ...constructionProducts,
  ...realEstateProducts  // ✅ إضافة منتجات العقارات
};

// ... باقي الدوال المساعدة كما هي ...

// دمج جميع المنتجات


// ... باقي الدوال المساعدة كما هي ...
// دمج جميع المنتجات

// ... باقي الدوال المساعدة كما هي ...

// دمج جميع المنتجات


// ... باقي الدوال المساعدة كما هي ...

// دمج جميع المنتجات


// ... باقي الدوال المساعدة كما هي ...
// دمج جميع المنتجات


// ... باقي الدوال المساعدة كما هي ...

// دمج جميع المنتجات


// ========== الدوال المساعدة ==========

// الحصول على المنتجات حسب القسم (باستخدام الـ link)
export function getProductsByCategory(categoryLink) {
  return allProducts[categoryLink] || [];
}

// الحصول على منتج بواسطة ID
export function getProductById(id) {
  const searchId = typeof id === 'string' ? parseInt(id) : id;
  for (const category in allProducts) {
    const found = allProducts[category].find(p => p.id === searchId);
    if (found) return found;
  }
  return null;
}

// ✅ إصلاح دالة الحصول على منتجات مشابهة
export function getRelatedProducts(productId, categoryLink) {
  // البحث في نفس القسم
  const products = allProducts[categoryLink] || [];
  
  // إرجاع منتجات من نفس القسم باستثناء المنتج الحالي
  return products.filter(p => p.id !== productId).slice(0, 4);
}

// الحصول على جميع الأقسام (للبناء الديناميكي)
export function getAllCategories() {
  return Object.keys(allProducts);
}

// الحصول على الأقسام الرجالية
export function getMensCategories() {
  return Object.keys(mensProducts);
}

// الحصول على الأقسام النسائية
export function getWomensCategories() {
  return Object.keys(womensProducts);
}