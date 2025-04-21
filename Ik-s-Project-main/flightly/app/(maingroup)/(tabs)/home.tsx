import React from "react";
import Box from "@/components/layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import TextComponent from "@/components/text/TextComponent";
import Animated from "react-native-reanimated";
import ProfileImageBox from "@/components/utils/ProfileImageBox";
import dayjs from "dayjs";
import BookingComponent from "@/components/utils/BookingComponent";
import LayoutWithSafeAreaWithoutScroll from "@/components/layout/LayoutWithSafeAreaWithoutScroll";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { CalendarPlus2 } from "lucide-react-native";
import { PlaneLanding } from "lucide-react-native";
import PressableComponent from "@/components/pressable/PressableComponent";
import pallete from "@/constants/colors/pallete";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import useFlights from "@/service/flights";
import ButtonComponent from "@/components/button/ButtonComponent";
const Home = () => {
  const savedUser = useAuthStore((state) => state.savedUser);
  const { useGetFlights } = useFlights();
  const { data, isLoading, refetch, isFetching } = useGetFlights({
    email: savedUser?.email!,
  });

  console.log({
    isLoading,
    data,
  });

  return (
    <>
      <LayoutWithSafeAreaWithoutScroll justTop hideTouchable>
        <Box style={[globalStyle.px2, globalStyle.flexOne]}>
          <Box style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
            <Animated.View
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
                Hello {savedUser?.name}
              </TextComponent>

              <ProfileImageBox size={24} />
            </Animated.View>
          </Box>
          <TextComponent
            style={[globalStyle.fontInterMedium, globalStyle.fontSize14]}
          >
            {dayjs().format("ddd MMM D, YYYY")}
          </TextComponent>
          <Box style={[globalStyle.pt2p4, globalStyle.flexOne]}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={!!isFetching}
                  progressBackgroundColor={pallete.textInputBg}
                  onRefresh={refetch}
                  tintColor={pallete.white}
                />
              }
              showsVerticalScrollIndicator={false}
              style={[globalStyle.flexOne]}
              ListHeaderComponent={
                <>
                  {isLoading && (
                    <ActivityIndicator color={pallete.white} size={"large"} />
                  )}
                </>
              }
              contentContainerStyle={[globalStyle.gap16]}
              data={data}
              renderItem={({ index, item }) => (
                <Box key={index.toString()}>
                  <BookingComponent item={item} />
                </Box>
              )}
              ListEmptyComponent={
                <>
                  <Box
                    style={[
                      globalStyle.height0p6,
                      globalStyle.justifyCenter,
                      globalStyle.alignItemsCenter,
                    ]}
                  >
                    <PlaneLanding color={pallete.white} size={68} />
                    <TextComponent
                      style={[
                        // globalStyle.fontGroteskMedium25,
                        globalStyle.fontSize16,
                        // globalStyle.lineHeight16,
                        globalStyle.pt1,
                      ]}
                    >
                      You have not made any bookings yet
                    </TextComponent>
                    <Box style={[globalStyle.pt2p4]}>
                      <ButtonComponent
                        onPress={() => {
                          router.navigate("/create");
                        }}
                        title="Add New"
                      />
                    </Box>
                  </Box>
                </>
              }
            />
          </Box>
        </Box>
      </LayoutWithSafeAreaWithoutScroll>

      <Box
        style={[
          globalStyle.absolute,
          {
            bottom: 20,
            right: 20,
          },
        ]}
      >
        <PressableComponent
          onPress={() => router.navigate("/create")}
          style={[globalStyle.p1, globalStyle.br, globalStyle.bgSecondary]}
        >
          <CalendarPlus2 color={pallete.white} />
        </PressableComponent>
      </Box>
    </>
  );
};

export default Home;
