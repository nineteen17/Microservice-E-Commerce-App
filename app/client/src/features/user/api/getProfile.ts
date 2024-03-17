import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getProfile = async () => {
  const res = await axios.get('user-service/profile');
  console.log(res.data);
  
  return res.data;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
