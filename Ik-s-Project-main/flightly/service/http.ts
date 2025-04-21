import { useStore } from "@/store/store";
import { useAuthStore } from "@/store/authStore";
import { useLoggedInStore } from "@/store/loginSlice";
import { http } from "./config";

export const useHttp = () => {
  const { access_token } = useLoggedInStore((state) => state);
  const { showToast } = useStore((state) => state);
  const { loggedIn } = useAuthStore();

  // const {handleUnAuthenticatedError} = useHandleUnAuthenticatedError();

  http.interceptors.request.use((params) => {
    if (access_token) {
      params.headers.Authorization = `Bearer ${access_token}`;
    }
    return params;
  });
  http.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      const errorMessage =
        error?.response?.data?.message ?? "An error occurred";
      //  "Unauthenticated."
      if (
        (!loggedIn && errorMessage === "Unauthenticated.") ||
        error?.response?.status === 500
      ) {
        return;
      } else {
        showToast({
          status: 2,
          message: errorMessage,
        });
        // handleUnAuthenticatedError(error);
      }

      return Promise.reject(error);
    }
  );

  return {
    http,
  };
};
