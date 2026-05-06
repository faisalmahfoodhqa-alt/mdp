import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as DefaultProducts from '../data/products';
import {
  ADMIN_ROLES,
  hasPermission as hasPermissionByRole,
  canAccessAdminTab as canAccessAdminTabByRole,
  getAdminRole,
  getAdminRoleLabel as getAdminRoleLabelFromRbac
} from '../utils/rbac';
import { useBackend } from '../config/backend';
import { backendApi } from '../api/backendApi';
// Removed firebaseService import

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

const TRIAL_DAYS = 90;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const getUsers = () => {
    try {
      const primary = JSON.parse(localStorage.getItem('all_users') || '[]');
      if (Array.isArray(primary) && primary.length > 0) return primary;
      const legacy = JSON.parse(localStorage.getItem('users') || '[]');
      return Array.isArray(legacy) ? legacy : [];
    } catch {
      return [];
    }
  };
  
  const saveUsers = (users) => {
    localStorage.setItem('all_users', JSON.stringify(users));
    localStorage.setItem('users', JSON.stringify(users));
  };

  const getProducts = () => {
    try {
      const primary = JSON.parse(localStorage.getItem('all_products') || '[]');
      if (Array.isArray(primary) && primary.length > 0) return primary;
      const legacy = JSON.parse(localStorage.getItem('allProducts') || '[]');
      return Array.isArray(legacy) ? legacy : [];
    } catch {
      return [];
    }
  };

  const saveProducts = (products) => {
    localStorage.setItem('all_products', JSON.stringify(products));
    localStorage.setItem('allProducts', JSON.stringify(products));
  };

  const refreshOrders = async () => {
    if (!useBackend) return;
    try {
      const { orders } = await backendApi.listOrders();
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, orders: orders || [] };
        localStorage.setItem('user', JSON.stringify(next));
        return next;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const refreshPublicCatalog = async () => {
    if (!useBackend) return;
    try {
      const { items } = await backendApi.listProducts({ limit: 500 });
      setAllProducts(items || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const initialToken = localStorage.getItem('token');

    const fetchData = async () => {
      try {
          // One-time migrations for legacy localStorage schemas
          try {
            const MIG_FLAG = 'migrations.orderStatus_v1';
            const already = localStorage.getItem(MIG_FLAG);
            if (!already) {
              const ORDER_STATUS_ALIASES = { shipped: 'shipping', confirmed: 'processing' };
              const normalizeOrderStatus = (s) => ORDER_STATUS_ALIASES[s] || s;

              const migrateOrder = (o) => {
                if (!o || typeof o !== 'object') return o;
                const next = { ...o };
                if (next.status) next.status = normalizeOrderStatus(next.status);
                return next;
              };

              const safeParse = (key, fallback) => {
                try {
                  const v = JSON.parse(localStorage.getItem(key) || 'null');
                  return v ?? fallback;
                } catch {
                  return fallback;
                }
              };

              const allOrders = safeParse('all_orders', []);
              if (Array.isArray(allOrders)) {
                const migrated = allOrders.map(migrateOrder);
                localStorage.setItem('all_orders', JSON.stringify(migrated));
              }

              const usersList = safeParse('all_users', []);
              if (Array.isArray(usersList)) {
                const migratedUsers = usersList.map((u) => {
                  if (!u || typeof u !== 'object') return u;
                  if (!Array.isArray(u.orders)) return u;
                  return { ...u, orders: u.orders.map(migrateOrder) };
                });
                localStorage.setItem('all_users', JSON.stringify(migratedUsers));
                // keep legacy key in sync if present
                if (localStorage.getItem('users') !== null) {
                  localStorage.setItem('users', JSON.stringify(migratedUsers));
                }
              }

              localStorage.setItem(MIG_FLAG, new Date().toISOString());
            }
          } catch {
            // ignore migration errors to avoid blocking app startup
          }

          // Unify change requests key (legacy: accountChangeRequests -> change_requests)
          try {
            const MIG_FLAG = 'migrations.changeRequests_v1';
            const already = localStorage.getItem(MIG_FLAG);
            if (!already) {
              const safeParse = (key, fallback) => {
                try {
                  const v = JSON.parse(localStorage.getItem(key) || 'null');
                  return v ?? fallback;
                } catch {
                  return fallback;
                }
              };
              const legacy = safeParse('accountChangeRequests', []);
              const current = safeParse('change_requests', []);
              const legacyArr = Array.isArray(legacy) ? legacy : [];
              const currentArr = Array.isArray(current) ? current : [];
              if (legacyArr.length > 0 && currentArr.length === 0) {
                localStorage.setItem('change_requests', JSON.stringify(legacyArr));
              }
              // keep legacy key present for backward compatibility
              if (localStorage.getItem('accountChangeRequests') !== null) {
                localStorage.setItem('accountChangeRequests', JSON.stringify(safeParse('change_requests', legacyArr)));
              }
              localStorage.setItem(MIG_FLAG, new Date().toISOString());
            }
          } catch {}

          // Unify products key (legacy: allProducts -> all_products)
          try {
            const MIG_FLAG = 'migrations.productsKey_v1';
            const already = localStorage.getItem(MIG_FLAG);
            if (!already) {
              const safeParse = (key, fallback) => {
                try {
                  const v = JSON.parse(localStorage.getItem(key) || 'null');
                  return v ?? fallback;
                } catch {
                  return fallback;
                }
              };
              const legacy = safeParse('allProducts', []);
              const current = safeParse('all_products', []);
              const legacyArr = Array.isArray(legacy) ? legacy : [];
              const currentArr = Array.isArray(current) ? current : [];
              if (legacyArr.length > 0 && currentArr.length === 0) {
                localStorage.setItem('all_products', JSON.stringify(legacyArr));
              }
              // keep legacy key synced if present
              if (localStorage.getItem('allProducts') !== null) {
                localStorage.setItem('allProducts', JSON.stringify(safeParse('all_products', legacyArr)));
              }
              localStorage.setItem(MIG_FLAG, new Date().toISOString());
            }
          } catch {}

          if (useBackend) {
            try {
              const cat = await backendApi.listProducts({ limit: 500 });
              if (!cancelled) setAllProducts(cat.items || []);
            } catch (e) {
              console.warn('تعذر تحميل المنتجات من الخادم:', e);
              let localProducts = getProducts();
              if (localProducts.length === 0) {
                const flattened = [];
                const source = {
                  mens: DefaultProducts.mensProducts || {},
                  womens: DefaultProducts.womensProducts || {}
                };
                Object.values(source).forEach((categoryGroup) => {
                  Object.values(categoryGroup).forEach((productsList) => {
                    if (Array.isArray(productsList)) flattened.push(...productsList);
                  });
                });
                localProducts = flattened;
                saveProducts(localProducts);
              }
              if (!cancelled) setAllProducts(localProducts);
            }

            if (initialToken) {
              try {
                const data = await backendApi.me();
                if (cancelled) return;
                let u = {
                  ...data.user,
                  wishlist: data.user.wishlist || [],
                  orders: data.user.orders || [],
                  followedStores: data.user.followedStores || [],
                  products: []
                };
                if (u.role === 'seller') {
                  try {
                    const sp = await backendApi.listProducts({ sellerId: u.id, limit: 500 });
                    u.products = sp.items || [];
                  } catch {
                    u.products = [];
                  }
                }
                if (u.role === 'customer' || u.role === 'seller') {
                  try {
                    const lo = await backendApi.listOrders();
                    u.orders = lo.orders || [];
                  } catch {
                    u.orders = [];
                  }
                }
                setUser(u);
                localStorage.setItem('user', JSON.stringify(u));
                setToken(initialToken);
              } catch {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (!cancelled) {
                  setUser(null);
                  setToken(null);
                }
              }
            }
          } else {
            let localProducts = getProducts();
            if (localProducts.length === 0) {
              const flattened = [];
              const source = {
                mens: DefaultProducts.mensProducts || {},
                womens: DefaultProducts.womensProducts || {}
              };
              Object.values(source).forEach((categoryGroup) => {
                Object.values(categoryGroup).forEach((productsList) => {
                  if (Array.isArray(productsList)) flattened.push(...productsList);
                });
              });
              localProducts = flattened;
              saveProducts(localProducts);
            }
            if (!cancelled) setAllProducts(localProducts);

            try {
              const saved = localStorage.getItem('user');
              if (saved) {
                const parsed = JSON.parse(saved);
                const users = getUsers();
                const latestUser = users.find((x) => String(x.id) === String(parsed.id));
                if (latestUser) {
                  setUser(latestUser);
                  localStorage.setItem('user', JSON.stringify(latestUser));
                }
              }
            } catch {
              /* ignore */
            }
          }
        } catch (err) {
          console.error('Local sync error:', err);
        } finally {
          if (!cancelled) setLoading(false);
        }
      };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);



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

  const upgradePlan = async (planName) => {
    if (!user || user.role !== 'seller') return { success: false, error: 'غير مصرح' };
    const planInfo = PLANS[planName];
    if (!planInfo) return { success: false, error: 'الباقة غير موجودة' };
    
    const updatedData = {
      plan: planName,
      isPaid: true,
      isApproved: true,
      maxProducts: planInfo.maxProducts,
      maxImagesPerProduct: planInfo.maxImagesPerProduct,
      paidAt: new Date().toISOString()
    };
    
    await updateUser(updatedData);
    return { success: true };
  };

  const registerCustomer = async (userData) => {
    try {
      if (useBackend) {
        try {
          const data = await backendApi.register({
            role: 'customer',
            fullName: userData.fullName,
            phone: userData.phone,
            password: userData.password
          });
          localStorage.setItem('token', data.token);
          setToken(data.token);
          let u = {
            ...data.user,
            wishlist: data.user.wishlist || [],
            orders: [],
            followedStores: data.user.followedStores || []
          };
          try {
            const lo = await backendApi.listOrders();
            u.orders = lo.orders || [];
          } catch {
            u.orders = [];
          }
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          return { success: true, user: u };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }

      const users = getUsers();
      const existing = users.find(u => u.phone === userData.phone);
      if (existing) return { success: false, error: 'رقم الجوال موجود مسبقاً' };
      
      const parts = userData.fullName.trim().split(/\s+/);
      const displayName = parts.length === 1 ? userData.fullName : `${parts[0]} ${parts[parts.length - 1]}`;
      
      const newUser = {
        id: Date.now(),
        role: 'customer',
        fullName: userData.fullName,
        displayName: displayName,
        phone: userData.phone,
        password: userData.password,
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c88c23&color=fff`,
        createdAt: new Date().toISOString(),
        notifications: [],
        orders: [],
        wishlist: [],
        followedStores: [],
        walletBalance: 0
      };
      
      users.push(newUser);
      saveUsers(users);
      
      const fakeToken = 'token-' + Date.now();
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(fakeToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Customer registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const registerSeller = async (userData, plan = 'trial', duration = 'monthly') => {
    try {
      userData.plan = plan;
      userData.planDuration = duration;

      if (useBackend) {
        try {
          const body = {
            role: 'seller',
            plan,
            planDuration: duration,
            fullName: userData.fullName,
            phone: userData.phone,
            password: userData.password,
            email: userData.email || '',
            storeName: userData.storeName,
            storeUrl: userData.storeUrl || '',
            businessActivity: userData.businessActivity || '',
            address: userData.address || {},
            addressDetails: userData.addressDetails || '',
            storeLocation: userData.storeLocation || null,
            deliveryMode: userData.deliveryMode || 'seller',
            deliveryPricePerKm: Number(userData.deliveryPricePerKm) || 0,
            storeFrontPhotoUrl: userData.storeFrontPhotoUrl ? String(userData.storeFrontPhotoUrl).slice(0, 1200000) : ''
          };
          const data = await backendApi.register(body);
          localStorage.setItem('token', data.token);
          setToken(data.token);
          let u = {
            ...data.user,
            wishlist: data.user.wishlist || [],
            orders: [],
            followedStores: data.user.followedStores || [],
            products: []
          };
          try {
            const sp = await backendApi.listProducts({ sellerId: u.id, limit: 500 });
            u.products = sp.items || [];
          } catch {
            u.products = [];
          }
          try {
            const lo = await backendApi.listOrders();
            u.orders = lo.orders || [];
          } catch {
            u.orders = [];
          }
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          await refreshPublicCatalog();
          return { success: true, user: u };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }

      const users = getUsers();
      const existing = users.find(u => u.phone === userData.phone);
      if (existing) return { success: false, error: 'رقم الجوال موجود مسبقاً' };
      
      const parts = userData.fullName.trim().split(/\s+/);
      const displayName = parts.length === 1 ? userData.fullName : `${parts[0]} ${parts[parts.length - 1]}`;
      const planInfo = PLANS[plan || 'trial'];
      
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
        addressDetails: userData.addressDetails || '',
        storeLocation: userData.storeLocation || null,

        createdAt: new Date().toISOString(),
        trialStartDate: new Date().toISOString(),
        plan: userData.plan || 'trial',
        isPaid: userData.plan !== 'trial',
        isApproved: false,
        maxProducts: planInfo.maxProducts,
        maxImagesPerProduct: planInfo.maxImagesPerProduct,
        products: [],
        notifications: [],
        logo: '', 
        banner: '',
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c88c23&color=fff`,
        socialLinks: { facebook: '', instagram: '', tiktok: '' },
        isVacationMode: false,
        isVerified: false,
        verificationStatus: 'unverified',
        verificationDocs: [],
        // Delivery design: seller chooses who fulfills delivery.
        // For now, even platform mode still falls back to seller execution.
        deliveryMode: userData.deliveryMode || 'seller',
        deliveryService: 'merchant',
        hasDelivery: true,
        deliveryPricePerKm: 0,
        storeFrontPhotoUrl: userData.storeFrontPhotoUrl || ''
      };
      
      users.push(newUser);
      saveUsers(users);
      
      const fakeToken = 'token-' + Date.now();
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(fakeToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration function error:', error);
      return { success: false, error: error.message };
    }
  };

  const login = async (phone, password) => {
    try {
      if (useBackend) {
        try {
          const data = await backendApi.login(phone, password);
          localStorage.setItem('token', data.token);
          setToken(data.token);
          let u = {
            ...data.user,
            wishlist: data.user.wishlist || [],
            orders: data.user.orders || [],
            followedStores: data.user.followedStores || [],
            products: []
          };
          if (u.role === 'seller') {
            try {
              const sp = await backendApi.listProducts({ sellerId: u.id, limit: 500 });
              u.products = sp.items || [];
            } catch {
              u.products = [];
            }
          }
          if (u.role === 'customer' || u.role === 'seller') {
            try {
              const lo = await backendApi.listOrders();
              u.orders = lo.orders || [];
            } catch {
              u.orders = [];
            }
          }
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          return { success: true, user: u };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }

      const users = getUsers();
      const ADMIN_PHONE = '776981756';
      const ADMIN_PASSWORD = 'faisala123';
      let workingUsers = [...users];

      // ضمان وجود حساب الأدمن الافتراضي بدون حذف/تغيير بيانات المستخدمين الآخرين
      if (String(phone) === ADMIN_PHONE && String(password) === ADMIN_PASSWORD) {
        const adminIndex = workingUsers.findIndex((u) => String(u.phone) === ADMIN_PHONE);
        if (adminIndex === -1) {
          const adminUser = {
            id: Date.now(),
            role: 'admin',
            adminRole: ADMIN_ROLES.SUPER_ADMIN,
            fullName: 'Admin',
            username: 'admin',
            phone: ADMIN_PHONE,
            password: ADMIN_PASSWORD,
            notifications: [],
            orders: [],
            wishlist: [],
            followedStores: [],
            createdAt: new Date().toISOString()
          };
          workingUsers.push(adminUser);
          saveUsers(workingUsers);
        } else if (workingUsers[adminIndex].role !== 'admin' || String(workingUsers[adminIndex].password) !== ADMIN_PASSWORD) {
          // تحديث بسيط للحساب الموجود ليطابق بيانات الأدمن المطلوبة
          workingUsers[adminIndex] = {
            ...workingUsers[adminIndex],
            role: 'admin',
            adminRole: workingUsers[adminIndex].adminRole || ADMIN_ROLES.SUPER_ADMIN,
            password: ADMIN_PASSWORD,
            fullName: workingUsers[adminIndex].fullName || 'Admin',
            username: workingUsers[adminIndex].username || 'admin'
          };
          saveUsers(workingUsers);
        }
      }

      const foundUser = workingUsers.find(u => String(u.phone) === String(phone));
      
      if (foundUser && foundUser.password === password) {
        const fakeToken = 'token-' + Date.now();
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(foundUser));
        setToken(fakeToken);
        setUser(foundUser);
        return { success: true, user: foundUser };
      }
      return { success: false, error: 'رقم الجوال أو كلمة المرور غير صحيحة' };
    } catch (error) {
      console.error('Detailed Login Error:', error);
      return { success: false, error: `خطأ: ${error.message}` };
    }
  };

  const logout = async () => {
    if (useBackend && token) {
      try {
        await backendApi.logout();
      } catch {
        /* يتم مسح الجلسة محلياً على كل حال */
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  const updateUser = async (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    if (useBackend) {
      const patchBody = { ...updatedData };
      delete patchBody.products;
      delete patchBody.id;
      delete patchBody.role;
      delete patchBody.phone;
      if (Object.keys(patchBody).length > 0) {
        try {
          const { user: serverUser } = await backendApi.patchMe(patchBody);
          const merged = { ...updatedUser, ...serverUser };
          setUser(merged);
          localStorage.setItem('user', JSON.stringify(merged));
        } catch (e) {
          console.error(e);
        }
      }
    }

    const users = getUsers();
    const index = users.findIndex((u) => String(u.id) === String(user.id));
    if (index !== -1) {
      users[index] = updatedUser;
      saveUsers(users);
    }
  };

  const addProduct = async (productData) => {
    if (!user || user.role !== 'seller') return { success: false, error: 'غير مصرح' };
    const status = getAccountStatus();
    if (status.isLocked) return { success: false, error: 'الحساب موقوف' };

    const currentCount = (user.products || []).length;
    if (currentCount >= status.maxProducts) {
      return { success: false, error: `لقد وصلت للحد الأقصى من المنتجات في باقتك (${status.maxProducts} منتج). قم بترقية الباقة لإضافة المزيد.` };
    }

    if (useBackend) {
      try {
        const created = await backendApi.createProduct({
          ...productData,
          storeName: user.storeName
        });
        const { items } = await backendApi.listProducts({ sellerId: user.id, limit: 500 });
        const nextUser = { ...user, products: items || [] };
        setUser(nextUser);
        localStorage.setItem('user', JSON.stringify(nextUser));
        await refreshPublicCatalog();
        return { success: true, product: created };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    const newProduct = {
      id: Date.now(),
      sellerId: user.id,
      storeName: user.storeName,
      ...productData,
      createdAt: new Date().toISOString(),
      isVisible: true
    };
    
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    const updatedUserProducts = [newProduct, ...(user.products || [])];
    await updateUser({ products: updatedUserProducts });
    setAllProducts(prev => [newProduct, ...prev]);
    
    return { success: true, product: newProduct };
  };

  const updateProduct = async (productId, updatedData) => {
    if (useBackend) {
      try {
        await backendApi.updateProduct(productId, updatedData);
        if (user?.role === 'seller') {
          const { items } = await backendApi.listProducts({ sellerId: user.id, limit: 500 });
          const nextUser = { ...user, products: items || [] };
          setUser(nextUser);
          localStorage.setItem('user', JSON.stringify(nextUser));
        }
        setAllProducts((prev) => prev.map((p) => (String(p.id) === String(productId) ? { ...p, ...updatedData } : p)));
        await refreshPublicCatalog();
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    const products = getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedData };
      saveProducts(products);
    }

    const updatedUserProducts = (user.products || []).map(p => p.id === productId ? { ...p, ...updatedData } : p);
    await updateUser({ products: updatedUserProducts });
    setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedData } : p));
    return { success: true };
  };

  const deleteProduct = async (productId) => {
    if (useBackend) {
      try {
        await backendApi.deleteProduct(productId);
        if (user?.role === 'seller') {
          const { items } = await backendApi.listProducts({ sellerId: user.id, limit: 500 });
          const nextUser = { ...user, products: items || [] };
          setUser(nextUser);
          localStorage.setItem('user', JSON.stringify(nextUser));
        }
        setAllProducts((prev) => prev.filter((p) => String(p.id) !== String(productId)));
        await refreshPublicCatalog();
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    let products = getProducts();
    products = products.filter(p => p.id !== productId);
    saveProducts(products);

    const updatedProducts = (user.products || []).filter(p => p.id !== productId);
    await updateUser({ products: updatedProducts });
    setAllProducts(prev => prev.filter(p => p.id !== productId));
    return { success: true };
  };

  const toggleWishlist = async (product) => {
    if (!user) { navigate('/login'); return false; }
    const currentWishlist = user.wishlist || [];
    const exists = currentWishlist.find(p => p.id === product.id);
    const updatedWishlist = exists ? currentWishlist.filter(p => p.id !== product.id) : [...currentWishlist, product];
    await updateUser({ wishlist: updatedWishlist });
    return !exists;
  };

  const toggleFollowStore = async (store) => {
    if (!user) { navigate('/login'); return false; }
    const normalizedStore = { id: store.id || store.name, name: store.name };
    const currentFollowedStores = user.followedStores || [];
    const exists = currentFollowedStores.some((s) => String(s.id) === String(normalizedStore.id));
    const updatedFollowedStores = exists
      ? currentFollowedStores.filter((s) => String(s.id) !== String(normalizedStore.id))
      : [...currentFollowedStores, normalizedStore];
    await updateUser({ followedStores: updatedFollowedStores });
    return !exists;
  };

  const isFollowingStore = (storeId) =>
    (user?.followedStores || []).some((s) => String(s.id) === String(storeId));

  const checkUserExists = async (phone) => {
    if (useBackend) {
      try {
        const r = await backendApi.checkPhone(phone);
        return r.exists ? r.field || 'phone' : null;
      } catch {
        return null;
      }
    }
    const users = getUsers();
    return users.some((u) => String(u.phone) === String(phone)) ? 'phone' : null;
  };

  const resetPasswordByPhone = async (phone, newPassword) => {
    if (useBackend) {
      try {
        await backendApi.resetPasswordPhone(phone, newPassword);
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }
    const users = getUsers();
    const index = users.findIndex((u) => String(u.phone) === String(phone));
    if (index === -1) return { success: false, error: 'المستخدم غير موجود' };
    users[index] = { ...users[index], password: newPassword };
    saveUsers(users);
    if (user && String(user.phone) === String(phone)) {
      const updatedCurrentUser = { ...user, password: newPassword };
      setUser(updatedCurrentUser);
      localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
    }
    return { success: true };
  };

  const markNotificationAsRead = async (notificationId) => {
    const notifications = (user?.notifications || []).map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    await updateUser({ notifications });
  };

  const clearNotifications = async () => {
    await updateUser({ notifications: [] });
  };

  const value = {
    user,
    token,
    loading,
    login,
    registerCustomer,
    registerSeller,
    logout,
    updateUser,
    addProduct,
    updateProduct,
    deleteProduct,
    getAccountStatus,
    upgradePlan,
    allProducts,
    toggleWishlist,
    toggleFollowStore,
    isFollowingStore,
    refreshOrders,
    refreshPublicCatalog,
    checkUserExists,
    resetPasswordByPhone,
    markNotificationAsRead,
    clearNotifications,
    getAdminRole: () => getAdminRole(user),
    getAdminRoleLabel: () => getAdminRoleLabelFromRbac(user),
    hasPermission: (permission) => hasPermissionByRole(user, permission),
    canAccessAdminTab: (tabKey) => canAccessAdminTabByRole(user, tabKey),
    isInWishlist: (productId) => (user?.wishlist || []).some(p => p.id === productId),
    isAuthenticated: !!user,
    isCustomer: user?.role === 'customer',
    isSeller: user?.role === 'seller',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};