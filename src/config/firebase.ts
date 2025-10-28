import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAuNVMvxPmUL5P7jWTkNrLvmwJn-LS6KmM",
  authDomain: "moto-manager-3f7f4.firebaseapp.com",
  projectId: "moto-manager-3f7f4",
  storageBucket: "moto-manager-3f7f4.appspot.com", // corrigido: deve ser appspot.com
  messagingSenderId: "58537955068",
  appId: "1:58537955068:web:fa2352587b237479581179",
};

// Garante que não inicializa o app duas vezes
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Inicializa autenticação corretamente
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
export default app;
