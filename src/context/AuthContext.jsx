import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as DefaultProducts from '../data/products';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// تعريف الباقات
export const PLANS = {
  trial: {
    name: 'المجانية',
    nameEn: 'trial',
    maxProducts: 20,
    maxImagesPerProduct: 2,
    price: 0,
    color: '#6c757d',
    badge: '🎁',
    duration: '90 يوم'
  },
  bronze: {
    name: 'البرونزية',
    nameEn: 'bronze',
    maxProducts: 40,
    maxImagesPerProduct: 5,
    basePrice: 2900,
    color: '#cd7f32',
    badge: '🥉'
  },
  silver: {
    name: 'الفضية',
    nameEn: 'silver',
    maxProducts: 90,
    maxImagesPerProduct: 5,
    basePrice: 4900,
    color: '#c0c0c0',
    badge: '🥈'
  },
  gold: {
    name: 'الذهبية',
    nameEn: 'gold',
    maxProducts: 1000000,
    maxImagesPerProduct: 5,
    basePrice: 9900,
    color: '#ffd700',
    badge: '👑'
  }
};

const TRIAL_DAYS = 10;

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [allProducts, setAllProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('allProducts') || '[]');
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user' && !e.newValue) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        // Ensure initial admin exists
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const adminExists = users.some(u => u.role === 'admin');
        
        if (!adminExists) {
          const defaultAdmin = {
            id: 'admin_initial',
            role: 'admin',
            fullName: 'مدير نظام توريد نت',
            phone: '776981756',
            password: 'admin',
            createdAt: new Date().toISOString()
          };
          users.push(defaultAdmin);
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Seed or refresh global products list
        let currentAll = JSON.parse(localStorage.getItem('allProducts') || '[]');
        
        if (currentAll.length === 0) {
          const flattened = [];
          Object.values(DefaultProducts).forEach(categoryGroup => {
            if (categoryGroup && typeof categoryGroup === 'object') {
              Object.values(categoryGroup).forEach(productsList => {
                if (Array.isArray(productsList)) {
                  flattened.push(...productsList);
                }
              });
            }
          });
          currentAll = flattened;
        }
        
        setAllProducts(currentAll);
        localStorage.setItem('allProducts', JSON.stringify(currentAll));
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          const latestUser = users.find(u => u.id === parsedUser.id);
          
          if (latestUser) {
            setUser(latestUser);
            localStorage.setItem('user', JSON.stringify(latestUser));
          } else {
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // حساب حالة حساب البائع
  const getAccountStatus = (targetUser = user) => {
    if (!targetUser || targetUser.role !== 'seller') return null;
    
    const plan = targetUser.plan || 'trial';
    const trialStart = targetUser.trialStartDate ? new Date(targetUser.trialStartDate) : new Date();
    const now = new Date();
    const daysPassed = Math.floor((now - trialStart) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, TRIAL_DAYS - daysPassed);
    const isTrialExpired = daysPassed >= TRIAL_DAYS;
    const isPaid = targetUser.isPaid || false;
    const isLocked = plan === 'trial' && isTrialExpired && !isPaid;
    
    return {
      plan,
      planInfo: PLANS[plan] || PLANS.trial,
      trialStart,
      daysPassed,
      daysLeft,
      isTrialExpired,
      isPaid,
      isLocked,
      maxProducts: targetUser.maxProducts || PLANS[plan]?.maxProducts || 5,
      maxImagesPerProduct: targetUser.maxImagesPerProduct || PLANS[plan]?.maxImagesPerProduct || 3
    };
  };

  // ترقية باقة البائع
  const upgradePlan = (planName) => {
    if (!user || user.role !== 'seller') return { success: false, error: 'غير مصرح' };
    const planInfo = PLANS[planName];
    if (!planInfo) return { success: false, error: 'الباقة غير موجودة' };
    
    const updatedData = {
      plan: planName,
      isPaid: true,
      isApproved: true, // المدفوعة تحتاج موافقة إدارية
      maxProducts: planInfo.maxProducts,
      maxImagesPerProduct: planInfo.maxImagesPerProduct,
      paidAt: new Date().toISOString()
    };
    
    updateUser(updatedData);
    addNotification('ترقية الباقة', `تم ترقية حسابك إلى الباقة ${planInfo.name} بنجاح`, 'success');
    return { success: true };
  };

  // دالة مساعدة لحفظ اسم المستخدم بشكل صحيح (أول وآخر كلمة فقط للعرض)
  const getDisplayName = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return fullName;
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  // التحقق من وجود المستخدم (لمنع تكرار التسجيل)
  const checkUserExists = (phone, email, storeName) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (phone && users.find(u => u.phone === phone)) return 'phone';
    if (email && users.find(u => u.email === email)) return 'email';
    if (storeName && users.find(u => u.storeName === storeName)) return 'storeName';
    return null;
  };

  // تسجيل عميل جديد
const registerCustomer = async (userData) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.phone === userData.phone)) {
      return { success: false, error: 'رقم الجوال موجود مسبقاً' };
    }
    
    const displayName = getDisplayName(userData.fullName);
    
    const newUser = {
      id: Date.now(),
      role: 'customer',
      fullName: userData.fullName,
      displayName: displayName,
      phone: userData.phone,
      password: userData.password,
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c88c23&color=fff`,
      createdAt: new Date().toISOString(),
      notifications: [{
        id: Date.now(),
        title: 'مرحباً بك',
        message: `أهلاً بك ${displayName} في توريد نت`,
        type: 'success',
        date: new Date().toISOString(),
        read: false
      }],
      orders: [],
      wishlist: [],
      followedStores: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    const fakeToken = 'token-' + Date.now();
    
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setToken(fakeToken);
    setUser(userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  // تسجيل بائع جديد
 const registerSeller = async (userData) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.phone === userData.phone)) {
      return { success: false, error: 'رقم الجوال موجود مسبقاً' };
    }
    
    if (userData.email && users.find(u => u.email === userData.email)) {
      return { success: false, error: 'البريد الإلكتروني موجود مسبقاً' };
    }
    
    if (userData.storeName && users.find(u => u.storeName === userData.storeName)) {
      return { success: false, error: 'اسم المتجر مستخدم من قِبَل بائع آخر' };
    }
    
    const trialStartDate = new Date().toISOString();
    const selectedPlan = userData.plan || 'trial';
    const planInfo = PLANS[selectedPlan];
    const displayName = getDisplayName(userData.fullName);
    
    const newUser = {
      id: Date.now(),
      role: 'seller',
      fullName: userData.fullName,
      displayName: displayName,
      phone: userData.phone,
      email: userData.email || '',
      password: userData.password,
      storeName: userData.storeName,
      storeUrl: userData.storeUrl || '',
      address: userData.address,
      createdAt: new Date().toISOString(),
      trialStartDate,
      plan: selectedPlan,
      planDuration: userData.planDuration || 'monthly',
      isPaid: selectedPlan !== 'trial',
      isApproved: false, // الجميع يحتاج موافقة إدارية الآن لبدء العمل
      maxProducts: planInfo.maxProducts,
      maxImagesPerProduct: planInfo.maxImagesPerProduct,
      products: [],
      notifications: [{
        id: Date.now(),
        title: 'مرحباً بك',
        message: `أهلاً بك البائع ${displayName} في توريد نت`,
        type: 'success',
        date: new Date().toISOString(),
        read: false
      }],
      wishlist: [],
      following: [],
      logo: '', 
      banner: '',
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c88c23&color=fff`,
      socialLinks: { facebook: '', instagram: '', tiktok: '' },
      isVacationMode: false,
      addressDetails: userData.addressDetails || '',
      storeLocation: userData.storeLocation || { lat: 15.352, lng: 44.207 },
      businessCategory: userData.businessCategory || '',
      businessActivity: userData.businessActivity || '',
      isVerified: false,
      verificationStatus: 'unverified',
      verificationDocs: [],
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    const fakeToken = 'token-' + Date.now();
    
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setToken(fakeToken);
    setUser(userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  // تسجيل الدخول
 const login = async (phone, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.phone === phone && u.password === password);
    
    if (foundUser) {
      // السماح للبائع بالدخول حتى لو لم يتم تفعيله لكي يرى صفحة التوثيق
      
      const { password: _, ...userWithoutPassword } = foundUser;
      const fakeToken = 'token-' + Date.now();
      
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setToken(fakeToken);
      setUser(userWithoutPassword);
      
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'رقم الجوال أو كلمة المرور غير صحيحة' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
  // تسجيل الدخول عبر Google (محاكاة)
  const loginWithGoogle = async (credentialResponse, userType = 'customer', additionalData = {}) => {
    try {
      const fakeUser = {
        id: Date.now(),
        phone: `google_${Date.now()}`,
        email: `google_${Date.now()}@gmail.com`,
        role: userType,
        fullName: additionalData.fullName || 'مستخدم Google',
        displayName: additionalData.fullName?.split(' ')[0] || 'مستخدم',
        ...additionalData
      };
      
      const fakeToken = 'google-token-' + Date.now();
      
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      
      setToken(fakeToken);
      setUser(fakeUser);
      
      return { success: true, user: fakeUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // تسجيل الدخول عبر Facebook
  const loginWithFacebook = async (accessToken, userType = 'customer', additionalData = {}) => {
    return loginWithGoogle(accessToken, userType, additionalData);
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  // تحديث بيانات المستخدم
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  // استعادة كلمة المرور عبر رقم الجوال
  const resetPasswordByPhone = async (phone, newPassword) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(u => u.phone === phone);
      
      if (index === -1) {
        return { success: false, error: 'رقم الجوال غير مسجل' };
      }
      
      users[index].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // إضافة منتج جديد ومزامنته مع المتجر
  const addProduct = (productData) => {
    if (!user || user.role !== 'seller') return { success: false, error: 'غير مصرح' };
    
    const status = getAccountStatus();
    if (status.isLocked) return { success: false, error: 'الحساب موقوف بسبب انتهاء التجربة' };
    
    // منع إضافة المنتجات إذا لم يكن الحساب موثقاً
    if (!user.isVerified) {
      return { success: false, error: 'يرجى توثيق حسابك أولاً (رفع الهوية/الجواز) لتتمكن من إضافة وبيع منتجاتك في المنصة' };
    }
    
    const currentProducts = user.products || [];
    if (currentProducts.length >= status.maxProducts) {
      return { success: false, error: `وصلت للحد الأقصى (${status.maxProducts} منتج) في باقتك الحالية` };
    }
    
    const newProduct = {
      id: Date.now(),
      sellerId: user.id,
      storeName: user.storeName,
      storeUrl: user.storeUrl,
      whatsapp: user.phone,
      ...productData,
      inStock: productData.stock && parseInt(productData.stock) > 0 ? true : false,
      isOffer: productData.isOffer || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVisible: productData.isVisible !== undefined ? productData.isVisible : true
    };
    
    // تحديث منتجات البائع
    const updatedUserProducts = [newProduct, ...currentProducts];
    updateUser({ products: updatedUserProducts });
    
    // تحديث القائمة العامة (المتجر)
    const newAllProducts = [newProduct, ...allProducts];
    setAllProducts(newAllProducts);
    localStorage.setItem('allProducts', JSON.stringify(newAllProducts));
    
    return { success: true, product: newProduct };
  };

  // تحديث منتج موجود ومزامنته
  const updateProduct = (productId, updatedData) => {
    if (!user || user.role !== 'seller') return { success: false, error: 'غير مصرح' };
    
    // تحديث في قائمة البائع الشخصية
    const updatedUserProducts = (user.products || []).map(p => 
      p.id === productId ? { 
        ...p, 
        ...updatedData, 
        inStock: updatedData.stock !== undefined ? (parseInt(updatedData.stock) > 0) : p.inStock,
        updatedAt: new Date().toISOString() 
      } : p
    );
    updateUser({ products: updatedUserProducts });
    
    // تحديث في القائمة العامة للمتجر
    const updatedAllProducts = allProducts.map(p => 
      p.id === productId ? { 
        ...p, 
        ...updatedData, 
        inStock: updatedData.stock !== undefined ? (parseInt(updatedData.stock) > 0) : p.inStock,
        updatedAt: new Date().toISOString() 
      } : p
    );
    setAllProducts(updatedAllProducts);
    localStorage.setItem('allProducts', JSON.stringify(updatedAllProducts));
    
    return { success: true };
  };

  // تقديم طلب التوثيق
  const submitVerification = (docs) => {
    if (!user || user.role !== 'seller') return { success: false };
    
    const updatedData = {
      verificationStatus: 'pending',
      verificationDocs: docs, // { docType, files: [...] }
      verificationSubmittedAt: new Date().toISOString()
    };
    
    updateUser(updatedData);
    addNotification('طلب توثيق', 'تم استلام مستندات التوثيق الخاصة بك. يتم مراجعتها الآن من قبل الإدارة.', 'info');

    // إرسال إشعار للأدمن
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const adminIndex = allUsers.findIndex(u => u.role === 'admin');
    if (adminIndex !== -1) {
      if (!allUsers[adminIndex].notifications) allUsers[adminIndex].notifications = [];
      allUsers[adminIndex].notifications.unshift({
        id: Date.now() + 1,
        title: '🔔 طلب توثيق جديد',
        message: `قام البائع "${user.storeName}" بتقديم طلب توثيق جديد ومستندات للهوية.`,
        type: 'warning',
        date: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('users', JSON.stringify(allUsers));
    }

    return { success: true };
  };

  // حذف منتج
  const deleteProduct = (productId) => {
    if (!user || user.role !== 'seller') return { success: false };
    
    const updatedProducts = (user.products || []).filter(p => p.id !== productId);
    updateUser({ products: updatedProducts });
    
    const newAll = allProducts.filter(p => p.id !== productId);
    setAllProducts(newAll);
    localStorage.setItem('allProducts', JSON.stringify(newAll));
    return { success: true };
  };

  // المفضلة
  const toggleWishlist = (product) => {
    if (!user) {
      navigate('/login');
      return false;
    }
    const currentWishlist = user.wishlist || [];
    const exists = currentWishlist.find(p => p.id === product.id);
    let updatedWishlist;
    
    if (exists) {
      updatedWishlist = currentWishlist.filter(p => p.id !== product.id);
    } else {
      updatedWishlist = [...currentWishlist, product];
    }
    
    updateUser({ wishlist: updatedWishlist });
    return !exists;
  };

  const isInWishlist = (productId) => {
    return (user?.wishlist || []).some(p => p.id === productId);
  };

  // متابعة المتاجر
  const toggleFollowStore = (storeData) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const followed = user.followedStores || [];
    const exists = followed.find(s => s.id === storeData.id);
    let updatedFollowed;
    
    if (exists) {
      updatedFollowed = followed.filter(s => s.id !== storeData.id);
    } else {
      updatedFollowed = [...followed, storeData];
    }
    
    updateUser({ followedStores: updatedFollowed });
  };

  const isFollowingStore = (storeId) => {
    return (user?.followedStores || []).some(s => s.id === storeId);
  };

  // الإشعارات
  const addNotification = (title, message, type = 'info', id = Date.now()) => {
    const currentNotifications = user?.notifications || [];
    if (currentNotifications.find(n => n.id === id)) return;
    
    const newNotif = { id, title, message, type, date: new Date().toISOString(), read: false };
    updateUser({ notifications: [newNotif, ...currentNotifications] });
  };

  const markNotificationAsRead = (id) => {
    const updated = (user?.notifications || []).map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    updateUser({ notifications: updated });
  };

  const clearNotifications = () => {
    updateUser({ notifications: [] });
  };

  // إعادة إرسال الكود
  const resendVerificationCode = async (phone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addNotification('رمز جديد', `تم إعادة إرسال رمز التحقق إلى الرقم ${phone}`, 'success');
        resolve({ success: true });
      }, 1500);
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    loginWithGoogle,
    loginWithFacebook,
    registerCustomer,
    registerSeller,
    logout,
    updateUser,
    addProduct,
    updateProduct,
    deleteProduct,
    submitVerification,
    getAccountStatus,
    getSubscriptionStatus: getAccountStatus,
    upgradePlan,
    allProducts: (allProducts || []).filter(p => {
      // إذا كان المنتج استاتيكياً (ليس له sellerId) فنعتبره موثقاً افتراضياً أو نعتمد على حقل verified فيه
      if (!p.sellerId) return true;
      
      // إذا كان للمنتج sellerId، نبحث عن البائع في قائمة المستخدمين للتأكد من توثيقه
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const seller = users.find(u => u.id === p.sellerId);
      return seller && seller.isVerified;
    }),
    toggleWishlist,
    isInWishlist,
    toggleFollowStore,
    isFollowingStore,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    resendVerificationCode,
    resetPasswordByPhone,
    checkUserExists,
    PLANS,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'customer',
    isSeller: user?.role === 'seller',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};