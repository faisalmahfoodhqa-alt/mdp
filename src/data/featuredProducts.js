// src/data/featuredProducts.js

// ✅ منتجات مميزة من قاعدة البيانات الفعلية
export const featuredProducts = [
  // منتج 1: مطرقة ثقب
  {
    id: 6501,
    name: 'مطرقة ثقب كهربائية 800 واط',
    price: 120,
    oldPrice: 180,
    rating: 4.8,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format'],
    seller: { name: 'متجر الأدوات', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 50
  },
  // منتج 2: جهاز لحام
  {
    id: 6601,
    name: 'جهاز لحام 200 أمبير',
    price: 450,
    oldPrice: 600,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1581092335855-bdf1e5e34b2c?w=800&auto=format'],
    seller: { name: 'متجر المعدات', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 20
  },
  // منتج 3: آيفون 15 برو
  {
    id: 3001,
    name: 'آيفون 15 برو',
    price: 3999,
    oldPrice: 4499,
    rating: 4.9,
    reviews: 345,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format'],
    seller: { name: 'متجر التقنية', whatsapp: '776981756', rating: 4.9, verified: true },
    inStock: true,
    stock: 15
  },
  // منتج 4: فستان بنات
  {
    id: 2101,
    name: 'فستان بنات صيفي منقط',
    price: 69,
    oldPrice: 99,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format'],
    seller: { name: 'متجر بناتي', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 95
  },
  // منتج 5: أرز بسمتي
  {
    id: 4001,
    name: 'أرز بسمتي هندي فاخر 5 كجم',
    price: 45,
    oldPrice: 55,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format'],
    seller: { name: 'متجر المواد الغذائية', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 500
  },
  // منتج 6: تويوتا كامري
  {
    id: 5001,
    name: 'تويوتا كامري 2024',
    price: 125000,
    oldPrice: 135000,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format'],
    seller: { name: 'معرض السيارات', whatsapp: '776981756', rating: 4.9, verified: true },
    inStock: true,
    stock: 5
  },
  // منتج 7: فيلا فاخرة
  {
    id: 7001,
    name: 'فيلا فاخرة للبيع',
    price: 1500000,
    oldPrice: 1800000,
    rating: 4.9,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format'],
    seller: { name: 'مكتب عقاري', whatsapp: '776981756', rating: 4.9, verified: true },
    inStock: true,
    stock: 1
  },
  // منتج 8: إطارات ميشلان
  {
    id: 5301,
    name: 'إطارات ميشلان 225/55R17',
    price: 450,
    oldPrice: 550,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format'],
    seller: { name: 'متجر الإطارات', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 50
  },
  // منتج 9: دهان داخلي
  {
    id: 6301,
    name: 'دهان داخلي أكريليك 3 لتر',
    price: 45,
    oldPrice: 60,
    rating: 4.8,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
    images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format'],
    seller: { name: 'متجر الدهانات', whatsapp: '776981756', rating: 4.8, verified: true },
    inStock: true,
    stock: 400
  }
];

// ✅ تصدير افتراضي أيضاً للتأكد
export default featuredProducts;