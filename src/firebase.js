// src/firebase.js
// إعدادات Firebase - يجب استبدالها ببيانات مشروعك من console.firebase.google.com
import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB0DTyNbNZmYTneq7bdTDcv8qFx2Thn-bQ",
  authDomain: "tweednet.firebaseapp.com",
  projectId: "tweednet",
  storageBucket: "tweednet.firebasestorage.app",
  messagingSenderId: "539784245682",
  appId: "1:539784245682:web:16807af06b68663846f4ab"
};

const app = initializeApp(firebaseConfig);

// تفعيل خاصية Long Polling فقط للمساعدة في تجاوز الحجب
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const auth = getAuth(app);
export default app;
