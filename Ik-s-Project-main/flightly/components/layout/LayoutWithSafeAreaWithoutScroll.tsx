import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { FC, ReactNode } from "react";
import Box from "./Box";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import globalStyle from "@/globalStyle/globalStyle";
import { isIos } from "@/constants/utils/util";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  grayBg?: boolean;
  blackbg?: boolean;
  showAvoiding?: boolean;
  hideTouchable?: boolean;
  transparent?: boolean;
  useAware?: boolean;
  showBg?: boolean;
  showProgress?: boolean;
  justTop?: boolean;
}
const LayoutWithSafeAreaWithoutScroll: FC<MainLayoutProps> = ({
  children,
  lightBar = true,
  grayBg,
  hideTouchable,
  transparent,
  showBg,
  showProgress,
  justTop,
}) => {
  return (
    // <KeyboardGestureArea interpolator="ios" enableSwipeToDismiss>
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={isIos ? "padding" : "height"}
    >
      <SafeAreaView
        {...(justTop
          ? {
              edges: ["top"],
            }
          : {})}
        style={[
          globalStyle.flexOne,
          globalStyle.mainBg,
          // (grayBg || showBg) && globalStyle.bgMainGray,
          transparent && globalStyle.bgTransparent,
          globalStyle.flexOne,
        ]}
      >
        <StatusBar barStyle={lightBar ? "light-content" : "dark-content"} />
        <Box
          style={[
            globalStyle.mainBg,
            transparent && globalStyle.bgTransparent,
            globalStyle.flexOne,
          ]}
        >
          {hideTouchable ? (
            <>{children}</>
          ) : (
            <TouchableWithoutFeedback
              accessible={false}
              onPress={Keyboard.dismiss}
              style={[globalStyle.flexOne]}
            >
              {children}
            </TouchableWithoutFeedback>
          )}
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LayoutWithSafeAreaWithoutScroll;
