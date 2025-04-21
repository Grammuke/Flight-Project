import React, { useEffect, useMemo } from "react";
import LayoutWithSafeArea from "@/components/layout/LayoutWithSafeArea";
import globalStyle from "@/globalStyle/globalStyle";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import TextComponent from "@/components/text/TextComponent";
import Box from "@/components/layout/Box";
import { Controller, useForm } from "react-hook-form";
import TextInputComponent from "@/components/textInputs/TextInputComponent";
import { ArrowRightLeft } from "lucide-react-native";
import pallete from "@/constants/colors/pallete";
import DateTime from "@/components/dateTime/DateTime";
import ButtonComponent from "@/components/button/ButtonComponent";
import useFlights from "@/service/flights";
import { useAuthStore } from "@/store/authStore";
import dayjs from "dayjs";
import { useStore } from "@/store/store";
import { router, useLocalSearchParams } from "expo-router";

interface FormValues {
  from: string;
  to: string;
  no: string;
  date: null | Date;
  time: null | Date;
}
const Create = () => {
  const { flight } = useLocalSearchParams<{ flight: string }>();
  const parsedFlight = useMemo(
    () => (flight ? JSON.parse(flight) : null),
    [flight]
  );
  console.log({
    parsedFlight,
  });

  const savedUser = useAuthStore((state) => state.savedUser);
  const { showToast } = useStore((state) => state);
  const { useCreateBooking, useUpdateBooking } = useFlights();
  const { createBookingMutation, isLoadingCreateBooking } = useCreateBooking();
  const { isLoadingUpdateBooking, updateBookingMutation } = useUpdateBooking();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      from: "",
      to: "",
      no: "",
      date: null,
      time: null,
    },
  });
  const start = watch("time");

  console.log({
    parsedFlight,
  });

  useEffect(() => {
    if (parsedFlight) {
      reset((prev) => ({
        ...prev,
        to: parsedFlight?.to,
        from: parsedFlight?.from,
        time: new Date(parsedFlight?.time),
        date: new Date(parsedFlight?.date),
      }));
    }
  }, []);

  const bookFlight = (data: FormValues) => {
    if (parsedFlight?.from) {
      updateBookingMutation(
        {
          from: data.from,
          to: data.to,
          date: data.date?.toString()!,
          endTime: dayjs(start)
            .add(Math.floor(Math.random() * 7) + 4, "hours")
            .toString(),
          // .format("h:mm A"),
          startTime: dayjs(start).toString(),
          id: parsedFlight?.id ?? "",
          // .format("h:mm A"),
        },
        {
          onSuccess: (createResponse) => {
            console.log({
              createResponse,
            });
            showToast({
              message: "Booking updated successfully",
              status: 1,
            });
            reset();
            router.back();
          },
        }
      );
    } else {
      createBookingMutation(
        {
          from: data.from,
          to: data.to,
          date: data.date?.toString()!,
          email: savedUser?.email!,
          price: (Math.random() * 1200 + 300).toString(),
          endTime: dayjs(start)
            .add(Math.floor(Math.random() * 7) + 4, "hours")
            .toString(),
          // .format("h:mm A"),
          startTime: dayjs(start).toString(),
          // .format("h:mm A"),
        },
        {
          onSuccess: (createResponse) => {
            console.log({
              createResponse,
            });
            showToast({
              message: "Booking created successfully",
              status: 1,
            });
            reset();
            router.back();
          },
        }
      );
    }
  };
  console.log({
    startTime: dayjs(start)
      .add(Math.floor(Math.random() * 7) + 4, "hours")
      .toString(),
  });

  return (
    <LayoutWithSafeArea>
      <Box style={[globalStyle.px2, globalStyle.flexOne]}>
        <Box
          style={[
            globalStyle.pb0p8,
            globalStyle.pt1p6,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
          ]}
        >
          <Animated.View
            entering={SlideInUp.duration(450)}
            exiting={SlideOutUp.duration(450)}
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
              globalStyle.w10,
            ]}
          >
            <TextComponent
              style={[
                globalStyle.fontGroteskMedium25,
                globalStyle.fontSize18,
                globalStyle.lineHeight24,
                globalStyle.textCenter,
              ]}
            >
              {parsedFlight ? "Edit" : "Create"} Booking
            </TextComponent>
          </Animated.View>
        </Box>

        <TextComponent style={[globalStyle.fontInterMedium, globalStyle.pt1p6]}>
          Where are you going to?
        </TextComponent>

        <Box style={[globalStyle.pt1p6]}>
          <Box>
            <Box style={[]}>
              <Controller
                name="from"
                control={control}
                rules={{
                  required: {
                    message: "Enter a location",
                    value: true,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInputComponent
                    value={value}
                    // loading={isLoadingGetOrganuzations}
                    // loading={true}
                    errorText={errors.from?.message}
                    onChangeText={onChange}
                    placeholder="From"
                    whiteBg={false}
                    isEllipse
                  />
                )}
              />
            </Box>
            <Box style={[globalStyle.pt0p8]}>
              <Controller
                name="to"
                control={control}
                rules={{
                  required: {
                    message: "Enter a location",
                    value: true,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInputComponent
                    value={value}
                    // loading={isLoadingGetOrganuzations}
                    // loading={true}
                    errorText={errors.to?.message}
                    onChangeText={onChange}
                    placeholder="To"
                    whiteBg={false}
                    isEllipse
                  />
                )}
              />
            </Box>

            {/* <Box
              style={[
                globalStyle.absolute,
                {
                  left: "45%",
                  top: "42%",
                },
              ]}
            >
              <Box
                style={[
                  globalStyle.br,
                  globalStyle.p0p4,
                  globalStyle.bgSecondary,
                  {
                    transform: [
                      {
                        rotate: "90deg",
                      },
                    ],
                  },
                ]}
              >
                <ArrowRightLeft color={pallete.white} size={12} />
              </Box>
            </Box> */}
          </Box>
          <Box
            style={[
              globalStyle.pt0p8,
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
              globalStyle.gap8,
            ]}
          >
            <Box style={[globalStyle.flexOne]}>
              <Controller
                control={control}
                name={"date"}
                rules={{
                  required: {
                    value: true,
                    message: `Select a date`,
                  },
                }}
                render={({ field: { value } }) => (
                  <DateTime
                    date={value ?? new Date()}
                    setDate={(val: Date) => {
                      setValue("date", val);
                      clearErrors("date");
                    }}
                    placeholder="Date"
                    noBefore
                    initial={parsedFlight?.date}
                    errorText={errors.date?.message}
                  />
                )}
              />
            </Box>
            <Box style={[globalStyle.flexOne]}>
              <Controller
                control={control}
                name={"time"}
                rules={{
                  required: {
                    value: true,
                    message: `Select a time`,
                  },
                }}
                render={({ field: { value } }) => (
                  <DateTime
                    date={value ?? new Date()}
                    setDate={(val: Date) => {
                      setValue("time", val);
                      clearErrors("time");
                    }}
                    placeholder="Time"
                    pickerType="time"
                    initial={parsedFlight?.time}
                    errorText={errors.time?.message}
                  />
                )}
              />
              {/* <Controller
                name="no"
                control={control}
                rules={{
                  required: {
                    message: "Enter a location",
                    value: true,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInputComponent
                    value={value}
                    keyboardType="number-pad"
                    // loading={isLoadingGenorganuzations}
                    // loading={true}
                    errorText={errors.no?.message}
                    onChangeText={onChange}
                    placeholder="Number of tickets"
                    whiteBg={false}
                    isEllipse
                  />
                )}
              /> */}
            </Box>
          </Box>
        </Box>

        <Box style={[globalStyle.pt3p6]}>
          <ButtonComponent
            title={parsedFlight?.from ? "Edit Flight" : "Book FLight"}
            onPress={handleSubmit(bookFlight)}
            loading={isLoadingCreateBooking || isLoadingUpdateBooking}
          />
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Create;
