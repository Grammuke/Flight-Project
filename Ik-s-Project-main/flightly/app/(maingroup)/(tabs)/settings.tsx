import React from "react";
import ProfileImageBox from "@/components/utils/ProfileImageBox";
import LayoutWithSafeAreaWithoutScroll from "@/components/layout/LayoutWithSafeAreaWithoutScroll";
import Box from "@/components/layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import Animated from "react-native-reanimated";
import TextComponent from "@/components/text/TextComponent";
import { useAuthStore } from "@/store/authStore";
import dayjs from "dayjs";
import { LogOut } from "lucide-react-native";
import pallete from "@/constants/colors/pallete";
import PressableComponent from "@/components/pressable/PressableComponent";
import { router } from "expo-router";

const Settings = () => {
  const savedUser = useAuthStore((state) => state.savedUser);

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
            <PressableComponent
              onPress={() => {
                router.replace("/loginscreen");
              }}
              style={[
                globalStyle.flexrow,
                globalStyle.textInputBg,
                globalStyle.alignItemsCenter,
                globalStyle.p2,
                globalStyle.borderRadius12,
              ]}
            >
              <LogOut color={pallete.error500} size={16} />

              <Box style={[globalStyle.pl0p8]}>
                <TextComponent style={[globalStyle.textError500]}>
                  Logout
                </TextComponent>
              </Box>
            </PressableComponent>
          </Box>
        </Box>
      </LayoutWithSafeAreaWithoutScroll>
    </>
  );
};

export default Settings;
