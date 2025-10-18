// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAuNVMvxPmUL5P7jWTkNrLvmwJn-LS6KmM",
  authDomain: "moto-manager-3f7f4.firebaseapp.com",
  projectId: "moto-manager-3f7f4",
  storageBucket: "moto-manager-3f7f4.firebasestorage.app", // confira se é appspot.com no console
  messagingSenderId: "58537955068",
  appId: "1:58537955068:web:fa2352587b237479581179",
};

// Garante que não inicializa o app duas vezes no fast refresh
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Para web usamos getAuth(); no React Native precisamos de initializeAuth com persistência nativa
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : (() => {
        try {
          // se já existe uma instância inicializada com persistência, apenas reutiliza
          return getAuth(app);
        } catch {
          // primeira inicialização no RN com persistência em AsyncStorage
          return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
          });
        }
      })();

export default app;
