import { axios } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const logoutUser = async () => {
  const res = await axios.post("user-service/logout");
  console.log(res);
  
  return res.data;
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem('refreshToken');
      clearIsAuth();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
