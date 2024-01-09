import { login, signup } from "@/services/auth";
import { useAuthContext } from "@/state/auth";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/login");
    },
    onError: (res: any) => {
      toast.error(res.message);
    },
  });
};
export const useLogin = () => {
  const { dispatch } = useAuthContext();
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      toast.success(res.message);
      dispatch({
        type: "SET_LOGIN",
        payload: res.data,
      });
    },
    onError: (res: any) => {
      toast.error(res.message);
    },
  });
};
