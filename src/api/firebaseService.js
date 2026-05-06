import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Collections Names
const USERS = 'users';
const PRODUCTS = 'allProducts';
const ORDERS = 'orders';
const NOTIFICATIONS = 'notifications';
const SETTINGS = 'siteSettings';
const ADS = 'adRequests';
const PLAN_REQUESTS = 'planUpgradeRequests';

export const firebaseService = {
  // --- Users ---
  async getUser(userId) {
    const docRef = doc(db, USERS, userId.toString());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  async getUserByPhone(phone) {
    const q = query(collection(db, USERS), where('phone', '==', phone));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  },

  async saveUser(userData) {
    const userId = userData.id.toString();
    await setDoc(doc(db, USERS, userId), {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  },

  async deleteUser(userId) {
    await deleteDoc(doc(db, USERS, userId.toString()));
  },

  async getAllUsers() {
    const querySnapshot = await getDocs(collection(db, USERS));
    return querySnapshot.docs.map(doc => doc.data());
  },

  // --- Products ---
  async getAllProducts() {
    const querySnapshot = await getDocs(collection(db, PRODUCTS));
    return querySnapshot.docs.map(doc => doc.data());
  },

  async saveProduct(productData) {
    const productId = productData.id.toString();
    await setDoc(doc(db, PRODUCTS, productId), {
      ...productData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  },

  async deleteProduct(productId) {
    await deleteDoc(doc(db, PRODUCTS, productId.toString()));
  },

  // --- Orders ---
  async saveOrder(orderData) {
    const orderId = orderData.id.toString();
    await setDoc(doc(db, ORDERS, orderId), {
      ...orderData,
      createdAt: serverTimestamp()
    });
  },

  async getAllOrders() {
    const querySnapshot = await getDocs(collection(db, ORDERS));
    return querySnapshot.docs.map(doc => doc.data());
  },

  async getOrdersByUser(userId, role) {
    const field = role === 'seller' ? 'sellerId' : 'customerId';
    const q = query(collection(db, ORDERS), where(field, '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  },

  // --- Settings & Requests ---
  async getSettings() {
    const docSnap = await getDoc(doc(db, SETTINGS, 'global'));
    return docSnap.exists() ? docSnap.data() : {};
  },

  async saveSettings(settings) {
    await setDoc(doc(db, SETTINGS, 'global'), settings, { merge: true });
  },

  async addRequest(type, requestData) {
    const collectionName = type === 'ad' ? ADS : PLAN_REQUESTS;
    const reqId = Date.now().toString();
    await setDoc(doc(db, collectionName, reqId), {
      ...requestData,
      id: reqId,
      createdAt: serverTimestamp()
    });
  },

  async getRequests(type) {
    const collectionName = type === 'ad' ? ADS : PLAN_REQUESTS;
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => doc.data());
  },

  // --- Cart ---
  async getCart(userId) {
    const docSnap = await getDoc(doc(db, 'carts', userId.toString()));
    return docSnap.exists() ? docSnap.data().items : [];
  },

  async saveCart(userId, items) {
    await setDoc(doc(db, 'carts', userId.toString()), {
      items,
      updatedAt: serverTimestamp()
    });
  },

  async saveAccountChangeRequest(request) {
    await addDoc(collection(db, 'accountChangeRequests'), {
      ...request,
      createdAt: serverTimestamp()
    });
  }
};
