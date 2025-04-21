import { ScrollView, StatusBar } from "react-native";
import React, { FC, ReactElement, ReactNode } from "react";
import Box from "./Box";

import { RefreshControl } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import globalStyle from "@/globalStyle/globalStyle";
import pallete from "@/constants/colors/pallete";
import { isIos } from "@/constants/utils/util";
import { SafeAreaView } from "react-native-safe-area-context";
interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
  refreshControl?: ReactElement;
  hideTouchable?: boolean;
  transparent?: boolean;
  isRefreshing?: boolean;
  showProgress?: boolean;
  onRefresh?: () => void;
  showBg?: boolean;
}
const LayoutWithSafeArea: FC<MainLayoutProps> = ({
  children,
  grayBg,
  transparent,
  isRefreshing,
  onRefresh,
  showProgress,
  showBg,
}) => {
  return (
    // <KeyboardGestureArea interpolator={!isIos ? 'linear' : 'ios'}>
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={isIos ? "padding" : "height"}
    >
      <StatusBar backgroundColor={pallete.mainBg} barStyle={"light-content"} />
      <SafeAreaView
        style={[
          globalStyle.flexOne,
          transparent ? globalStyle.bgTransparent : globalStyle.mainBg,
        ]}
      >
        <Box
          style={[
            globalStyle.mainBg,
            transparent && globalStyle.bgTransparent,
            globalStyle.flexOne,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={!!onRefresh}
            style={[globalStyle.flexOne]}
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={!!isRefreshing}
                  progressBackgroundColor={pallete.white}
                  onRefresh={onRefresh}
                  tintColor={pallete.black}
                />
              ) : undefined
            }
          >
            {children}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // </KeyboardGestureArea>
  );
};

export default LayoutWithSafeArea;
