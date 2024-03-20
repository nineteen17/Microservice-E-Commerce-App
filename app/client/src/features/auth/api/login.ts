import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { LoginRequest } from '../types';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

const loginUser = async (data: LoginRequest) => {
    const res = await axios.post('user-service/login', data);
    return res.data;
};

export const useLoginUser = () => {
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const navigate = useNavigate();
    const location = useLocation();    
    const from = location.state?.from?.pathname || '/profile';

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem('refreshToken', data.refreshToken);
            setIsAuth(true);
            navigate(from, { replace: true });
        },
    });
};
