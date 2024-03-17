import { logoutUser } from "@/features/auth/api/logout";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";

export const logoutHelper = async () => {
  try {
    await logoutUser();
    localStorage.removeItem('refreshToken');
    useAuthStore.getState().clearIsAuth();
  } catch (error) {
    console.error("Logout failed:", error);
  }

  useNotificationStore.getState().addNotification({
    type: 'warning',
    title: 'Session Expired',
    message: 'Your session has expired. Please log in again to continue.',
  });

};
