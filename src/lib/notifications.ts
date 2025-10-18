import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Configuração global do comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // novos campos obrigatórios no SDK 54+
    shouldShowList: true,
  }),
});

// Tipagem do conteúdo de dados extra
export interface NotificationData {
  type: "maintenance" | "new_motorcycle" | "status_change" | "reminder";
  motorcycleId?: string;
  title: string;
  body: string;
}

// ✅ Registro de permissões e obtenção do token do dispositivo
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | undefined;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#10B981",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("❌ Falha ao obter permissão de notificações!");
    return null;
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("pushToken", token);
    console.log("✅ Push token:", token);
  } catch (error) {
    console.log("Erro ao obter push token:", error);
  }

  return token ?? null;
}

// ✅ Notificação de manutenção (quando falta <= 500 km)
export async function scheduleMaintenanceReminder(
  motorcycleId: string,
  modelName: string,
  plate: string,
  mileage: number
): Promise<boolean> {
  const maintenanceThreshold = 5000; // km
  const remainingKm = maintenanceThreshold - (mileage % maintenanceThreshold);

  if (remainingKm <= 500) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔧 Manutenção Necessária",
        body: `${modelName} (${plate}) precisa de manutenção em breve. Faltam ${remainingKm} km.`,
        data: { type: "maintenance", motorcycleId },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
      },
    });
    return true;
  }

  return false;
}

// ✅ Notificação quando uma nova moto é cadastrada
export async function notifyNewMotorcycle(
  modelName: string,
  plate: string,
  motorcycleId: string
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏍️ Nova Moto Cadastrada",
      body: `${modelName} (${plate}) foi adicionada ao sistema!`,
      data: { type: "new_motorcycle", motorcycleId },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.DEFAULT,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      repeats: false,
    },
  });
}

// ✅ Notificação quando o status de uma moto muda
export async function notifyStatusChange(
  modelName: string,
  plate: string,
  oldStatus: string,
  newStatus: string,
  motorcycleId: string
): Promise<void> {
  const statusEmojis: Record<string, string> = {
    Disponível: "✅",
    "Em Uso": "🚦",
    Manutenção: "🔧",
    Reservada: "📅",
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${statusEmojis[newStatus] || "📢"} Status Atualizado`,
      body: `${modelName} (${plate}): ${oldStatus} → ${newStatus}`,
      data: { type: "status_change", motorcycleId },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1,
      repeats: false,
    },
  });
}

// ✅ Resumo diário (9h da manhã)
export async function scheduleDailySummary(
  totalMotorcycles: number,
  availableCount: number,
  maintenanceCount: number
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📊 Resumo Diário - Moto Manager",
      body: `Total: ${totalMotorcycles} | Disponíveis: ${availableCount} | Manutenção: ${maintenanceCount}`,
      data: { type: "reminder" },
      sound: false,
      priority: Notifications.AndroidNotificationPriority.LOW,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });
}

// ✅ Cancelar todas as notificações agendadas
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// ✅ Listar todas as notificações agendadas
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}
