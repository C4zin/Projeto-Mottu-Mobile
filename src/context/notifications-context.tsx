"use client";

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { registerForPushNotificationsAsync } from "../lib/notifications";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  notificationsEnabled: boolean;
  enableNotifications: () => Promise<void>;
  disableNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType>({
  expoPushToken: null,
  notification: null,
  notificationsEnabled: false,
  enableNotifications: async () => {},
  disableNotifications: async () => {},
});

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);


  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {

    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        setNotificationsEnabled(true);
      }
    });


    const sub1 = Notifications.addNotificationReceivedListener((n) => {
      console.log("Notification received:", n);
      setNotification(n);
    });


    const sub2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(" Notification response:", response);
      const data = response.notification.request.content.data as { motorcycleId?: string };

      if (data?.motorcycleId) {
        router.push({
          pathname: "/motorcycle/[id]",
          params: { id: String(data.motorcycleId) },
        });
      }
    });


    notificationListener.current = sub1;
    responseListener.current = sub2;


    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  const enableNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      setExpoPushToken(token);
      setNotificationsEnabled(true);
    }
  };

  const disableNotifications = async () => {
    setNotificationsEnabled(false);
    await Notifications.cancelAllScheduledNotificationsAsync();

  };

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        notificationsEnabled,
        enableNotifications,
        disableNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextType {
  return useContext(NotificationContext);
}
