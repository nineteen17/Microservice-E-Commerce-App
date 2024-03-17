import { useMutation } from "@tanstack/react-query";
import { axios } from '@/lib/axios';
import { LoginRequest } from "../types";
import { useAuthStore } from "@/stores/authStore";

const loginUser = async (data: LoginRequest) => {
    const res = await axios.post('user-service/login', data)
    return res.data
}

export const useLoginUser = () => {
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem('refreshToken', data.refreshToken);
            setIsAuth(true)
        }
    })
}