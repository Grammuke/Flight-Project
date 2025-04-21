import React, { FC, ReactNode } from "react";
import Box from "../layout/Box";
import TextComponent from "../text/TextComponent";
import PressableComponent from "../pressable/PressableComponent";
import ChevronLeftBlack from "@/assets/svgs/BackArrow.svg";
// import { stepInterface } from './StepComponent';
import { isIphoneX } from "react-native-iphone-screen-helper";
import { router } from "expo-router";
import globalStyle from "@/globalStyle/globalStyle";
import { isIos } from "@/constants/utils/util";
export interface headerInterface {
  // extends Partial<stepInterface>
  showBackIcon?: boolean;
  showBackText?: boolean;
  text?: string;
  centerText?: string;
  showProgress?: boolean;
  disabled?: boolean;
  noPadding?: boolean;
  total?: number;
  current?: number;
  rightIcon?: ReactNode;
  bottomView?: ReactNode;
  onBackPress?: () => void;
}
const HeaderComponent: FC<headerInterface> = ({
  showBackIcon = true,
  onBackPress,
  text,
  rightIcon,
  centerText,
  showBackText = false,
  disabled,
  noPadding,
}) => {
  return (
    <PressableComponent
      disabled={disabled}
      scaleVal={1}
      onPress={onBackPress ?? router.back}
      style={[
        globalStyle.flexrow,
        globalStyle.alignItemsCenter,
        globalStyle.justifyCenter,
        globalStyle.w10,
        // globalStyle.bgAccentBlue500,
        !noPadding &&
          (isIphoneX()
            ? globalStyle.mt1p2
            : isIos
            ? globalStyle.mt2p4
            : globalStyle.mt5),
        // isIphoneX() ? globalStyle.mt1p2 : globalStyle.mt5,
        // globalStyle.pb1,
      ]}
    >
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          globalStyle.justifyBetween,
          globalStyle.absolute,
          globalStyle.w10,
          isIphoneX()
            ? globalStyle.mt1p2
            : isIos
            ? globalStyle.mt2p4
            : globalStyle.mt5,
          {
            zIndex: 30,
          },
        ]}
      >
        {showBackIcon && (
          // {showBackIcon && canGoBack() && (
          <Box>
            <PressableComponent
              onPress={onBackPress ?? router.back}
              style={[
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                globalStyle.flexrow,
                globalStyle.pr1p2,
                // globalStyle.pb0p8,
                // globalStyle.bgAccentBlue400,
              ]}
            >
              <ChevronLeftBlack />
              {showBackText && router.canGoBack() && (
                <TextComponent
                  style={[
                    globalStyle.pl0p4,
                    !text && globalStyle.textPrimaryGrey500,
                    globalStyle.fontInterSemiBold,
                    globalStyle.fontSize13,
                  ]}
                >
                  {text ?? "Back"}
                </TextComponent>
              )}
            </PressableComponent>
          </Box>
        )}

        {rightIcon && rightIcon}
      </Box>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.w10,
          globalStyle.justifyCenter,
        ]}
      >
        <TextComponent
          style={[globalStyle.textPrimaryGrey500, globalStyle.fontWeight500]}
        >
          {centerText}
        </TextComponent>
      </Box>
    </PressableComponent>
  );
};

export default HeaderComponent;
