import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { RegisterRequest } from '../types';

const registerUser = async (data: RegisterRequest) => {
  const res = await axios.post('/user-service/register', data);
  return res.data;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
