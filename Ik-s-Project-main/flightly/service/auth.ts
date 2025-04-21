import { registerValues } from "@/constants/utils/util";
import { useHttp } from "./http";
import { useMutation } from "@tanstack/react-query";
const useAuth = () => {
  const { http } = useHttp();
  const useInitResetPassword = () => {
    const mutationFn = async (payload: { email: string }) => {
      return await http.post<any>("/reset-password", payload);
    };
    const { mutate: initResetPasswordMutation, isLoading: isLoadingInitReset } =
      useMutation(mutationFn);

    return { initResetPasswordMutation, isLoadingInitReset };
  };
  const useCreateAccount = () => {
    const mutationFn = async (body: registerValues) => {
      return await http.post("user", body);
    };
    const {
      mutateAsync: createAccountMutation,
      isLoading: isLoadingCreateAccount,
      isSuccess,
    } = useMutation(mutationFn);

    return { createAccountMutation, isSuccess, isLoadingCreateAccount };
  };
  const useResetPassword = () => {
    const mutationFn = async (payload: {
      token: string;
      email: string;
      new_password: string;
      confirm_password: string;
    }) => {
      return await http.put<any>("/reset-password", payload);
    };
    const { mutate: resetPasswordMutation, isLoading: isLoadingResetPassword } =
      useMutation(mutationFn);

    return { resetPasswordMutation, isLoadingResetPassword };
  };

  const useLoginMutation = () => {
    const mutationFn = async (payload: { email: string; password: string }) => {
      return await http.post<any>("login", payload);
    };
    const { mutate: logUserInMutation, isLoading: isLoadingLogin } =
      useMutation(mutationFn);

    return { logUserInMutation, isLoading: isLoadingLogin };
  };
  const useRegisterMutation = () => {
    const mutationFn = async (payload: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      // handle: string;
    }) => {
      return await http.post<any>("/registration", payload);
    };
    const { mutate: registerUserMutation, isLoading: isLoadingRegister } =
      useMutation(mutationFn);

    return { registerUserMutation, isLoading: isLoadingRegister };
  };

  return {
    useInitResetPassword,
    useLoginMutation,
    useResetPassword,
    useRegisterMutation,
    useCreateAccount,
  };
};

export default useAuth;
