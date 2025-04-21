import React, { useEffect } from "react";
import Box from "../layout/Box";
import TextComponent from "../text/TextComponent";
import PressableComponent from "../pressable/PressableComponent";
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CloseToast from "@/assets/svgs/CloseToast.svg";
import SuccessToastIcon from "@/assets/svgs/SuccessToastIcon.svg";
import ErrorToastIcon from "@/assets/svgs/ErrorToastIcon.svg";
import InfoToastIcon from "@/assets/svgs/InfoToast.svg";
import { Keyboard } from "react-native";
import { useStore } from "@/store/store";
import globalStyle from "@/globalStyle/globalStyle";
const ToastComponent = () => {
  const isBottom = useStore((state) => state.isBottom);
  const hideToast = useStore((state) => state.hideToast);
  const desc = useStore((state) => state.desc);
  const status = useStore((state) => state.status);
  const message = useStore((state) => state.message);
  const keyboardValue = useSharedValue(0);
  const hideTheToast = () => {
    hideToast();
  };
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        hideTheToast();
      }, 5000);
      return () => clearTimeout(timeout);
    } else {
      hideTheToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        keyboardValue.value = event.endCoordinates.height;
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        keyboardValue.value = 0;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardValue]);
  const bottomStyle = useAnimatedStyle(() => ({
    bottom: withTiming(40 + keyboardValue.value),
  }));
  const topStyle = useAnimatedStyle(() => ({
    top: withTiming(40),
  }));
  if (!message) {
    return null;
  }

  return (
    <>
      {message && (
        <Animated.View
          entering={(isBottom ? SlideInDown : SlideInUp).duration(450)}
          exiting={(isBottom ? SlideOutDown : SlideOutUp).duration(450)}
          style={[
            globalStyle.apiToast,
            globalStyle.flexrow,
            globalStyle.bgWhite,
            globalStyle.p1p2,
            globalStyle.borderRadius16,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            isBottom && bottomStyle,
            !isBottom && topStyle,
            status === 1 && globalStyle.borderToastSuccess,
            status === 2 && globalStyle.borderToastError,
            // animatedStyle,
          ]}
        >
          <Box>
            {status === 1 && <SuccessToastIcon />}
            {status === 2 && <ErrorToastIcon />}
            {status === 3 && <InfoToastIcon />}
          </Box>
          <Box
            style={[
              globalStyle.justifyCenter,
              globalStyle.px1,
              globalStyle.flexOne,
            ]}
          >
            <TextComponent
              style={[
                status === 1 && globalStyle.textAccentGreen600,
                status === 2 && globalStyle.textError500,
                status === 3 && globalStyle.textPrimaryGrey500,
                globalStyle.fontGroteskBook20,
                globalStyle.fontWeight500,
                globalStyle.lineHeight20,
              ]}
            >
              {message}
            </TextComponent>
            {desc && (
              <TextComponent
                style={[
                  status === 1 && globalStyle.textAccentGreen600,
                  status === 2 && globalStyle.textError500,
                  status === 3 && globalStyle.textPrimaryGrey400,
                  globalStyle.fontInterRegular,
                  globalStyle.lineHeight16,
                  globalStyle.fontSize11,
                ]}
              >
                {desc}
              </TextComponent>
            )}
          </Box>
          <Box
            style={[globalStyle.justifyCenter, globalStyle.alignItemsCenter]}
          >
            <PressableComponent
              onPress={() => {
                hideToast();
              }}
            >
              <CloseToast />
            </PressableComponent>
          </Box>
        </Animated.View>
      )}
    </>
  );
};

export default ToastComponent;
