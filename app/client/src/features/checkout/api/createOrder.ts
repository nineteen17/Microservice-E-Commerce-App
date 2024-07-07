import { useMutation } from "@tanstack/react-query";
import { axios } from '@/lib/axios';
import { Order } from "../types";

const createOrder =  async (data: Order) => {
    const res = await axios.post('order-service/', data)
    return res.data;
}

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: createOrder
    })
}