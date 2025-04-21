import { bookingValues, registerValues } from "@/constants/utils/util";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useFlights = () => {
  const { http } = useHttp();
  const queryClient = useQueryClient();
  const useGetFlights = (queryParams: { email: string }) => {
    const queryFn = async () => {
      return await http.get("flights", {
        params: queryParams,
      });
    };
    const { data, refetch, error, isLoading, isFetching } = useQuery({
      queryFn: queryFn,
      queryKey: ["flights", queryParams.email],
    });

    return {
      data: data?.data?.data ?? [],
      refetch,
      error,
      isLoading,
      isFetching,
    };
  };
  const useCreateBooking = () => {
    const mutationFn = async (body: bookingValues) => {
      return await http.post("flights/create", body);
    };
    const {
      mutateAsync: createBookingMutation,
      isLoading: isLoadingCreateBooking,
      isSuccess,
    } = useMutation(mutationFn, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["flights"],
        });
      },
    });

    return { createBookingMutation, isSuccess, isLoadingCreateBooking };
  };
  const useUpdateBooking = () => {
    const mutationFn = async ({
      id,
      ...rest
    }: {
      id: string;
      date: string;
      startTime: string;
      endTime: string;
      from: string;
      to: string;
    }) => {
      return await http.patch(`flights/update/${id}`, rest);
    };
    const {
      mutateAsync: updateBookingMutation,
      isLoading: isLoadingUpdateBooking,
      isSuccess,
    } = useMutation(mutationFn, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["flights"],
        });
      },
    });

    return { updateBookingMutation, isSuccess, isLoadingUpdateBooking };
  };
  const useDeleteBooking = () => {
    const mutationFn = async ({ id }: { id: string }) => {
      return await http.delete(`flights/delete/${id}`);
    };
    const {
      mutateAsync: deleteBookingMutation,
      isLoading: isLoadingDeleteBooking,
      isSuccess,
    } = useMutation(mutationFn, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["flights"],
        });
      },
    });

    return { deleteBookingMutation, isSuccess, isLoadingDeleteBooking };
  };
  return {
    useGetFlights,
    useCreateBooking,
    useDeleteBooking,
    useUpdateBooking,
  };
};

export default useFlights;
