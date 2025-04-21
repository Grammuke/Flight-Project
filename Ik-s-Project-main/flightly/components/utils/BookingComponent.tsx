import React from "react";
import TextComponent from "../text/TextComponent";
import Box from "../layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import { PlaneTakeoff, Pencil, Calendar, Trash } from "lucide-react-native";
import pallete from "@/constants/colors/pallete";
import PressableComponent from "../pressable/PressableComponent";
import dayjs from "dayjs";
import { Spinner, spinnerStyle } from "../progress/Spinner";
import { router } from "expo-router";
import useFlights from "@/service/flights";
import { useStore } from "@/store/store";

const BookingComponent = ({ item }: { item: any }) => {
  const { useDeleteBooking } = useFlights();
  const { showToast } = useStore((state) => state);

  const { deleteBookingMutation, isLoadingDeleteBooking: loading } =
    useDeleteBooking();
  const deleteItem = () => {
    if (!item?._id) return;
    deleteBookingMutation(
      {
        id: item?._id,
      },
      {
        onSuccess: () => {
          showToast({
            message: "Booking deleted successfully",
            status: 1,
            isBottom: false,
          });
        },
      }
    );
  };
  return (
    <Box
      style={[
        globalStyle.textInputBg,
        globalStyle.p2p4,
        globalStyle.borderRadius24,
      ]}
    >
      <Box
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
            globalStyle.fontSize12,
            globalStyle.lineHeight16,
          ]}
        >
          {item?._id?.slice(0, 6)}
        </TextComponent>

        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.gap8,
            globalStyle.alignItemsCenter,
          ]}
        >
          <PressableComponent
            onPress={() => {
              router.push({
                pathname: "/create",
                params: {
                  flight: JSON.stringify({
                    from: item?.from ?? "",
                    to: item?.to ?? "",
                    id: item?._id ?? "",
                    date: item?.date ?? "",
                    time: item?.startTime ?? "",
                    // endTime: item?.endTime ?? "",
                  }),
                },
              });
            }}
            hitSlop={8}
            style={[globalStyle.p0p5, globalStyle.bgSecondary, globalStyle.br]}
          >
            {<Pencil color={pallete.white} size={12} />}
          </PressableComponent>
          <PressableComponent
            onPress={deleteItem}
            disabled={loading}
            hitSlop={8}
            style={[globalStyle.p0p5, globalStyle.bgError, globalStyle.br]}
          >
            {loading ? (
              <Box style={[spinnerStyle.smallest]}>
                <Spinner />
              </Box>
            ) : (
              <Trash color={pallete.white} size={12} />
            )}
          </PressableComponent>
        </Box>
      </Box>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.pt1p6,
          globalStyle.alignItemsCenter,
          globalStyle.w10,
          //   globalStyle.bgError,
        ]}
      >
        <Box style={[globalStyle.w4p5]}>
          <TextComponent
            style={[
              globalStyle.fontGroteskMedium25,
              globalStyle.fontSize16,
              globalStyle.lineHeight26,
            ]}
          >
            {dayjs(item?.startTime ?? "").format("h:mm A")}
          </TextComponent>
          <TextComponent
            style={[globalStyle.fontInterMedium, globalStyle.fontSize12]}
          >
            {item?.from ?? ""}
          </TextComponent>
        </Box>
        <Box>
          <PlaneTakeoff color={pallete.white} />
        </Box>
        <Box style={[globalStyle.w4p5, globalStyle.alignItemsEnd]}>
          {/* <Box> */}
          <TextComponent
            style={[
              globalStyle.fontGroteskMedium25,
              globalStyle.fontSize16,
              globalStyle.lineHeight26,
            ]}
          >
            {dayjs(item?.endTime ?? "").format("h:mm A")}
          </TextComponent>
          <TextComponent
            style={[globalStyle.fontInterMedium, globalStyle.fontSize12]}
          >
            {item?.to ?? ""}
          </TextComponent>
          {/* </Box> */}
        </Box>
      </Box>

      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.pt1p6,
          globalStyle.alignItemsCenter,
          globalStyle.justifyBetween,
        ]}
      >
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.gap2,
          ]}
        >
          <Calendar size={12} color={pallete.white} />
          <TextComponent
            style={[globalStyle.fontInterMedium, globalStyle.fontSize12]}
          >
            {dayjs(item?.date).format("ddd MMM D")}
          </TextComponent>
        </Box>
        <TextComponent
          style={[
            globalStyle.fontGroteskMedium25,
            globalStyle.fontSize12,
            globalStyle.lineHeight26,
          ]}
        >
          ${Number(item?.price)?.toFixed(2)}
        </TextComponent>
      </Box>
    </Box>
  );
};

export default BookingComponent;
