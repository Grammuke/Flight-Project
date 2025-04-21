import { TouchableOpacityProps } from "react-native";
import React, { FC, useCallback, useEffect } from "react";
import TextComponent from "../text/TextComponent";
import Box from "../layout/Box";
import { useSharedValue } from "react-native-reanimated";
import PressableComponent from "../pressable/PressableComponent";
import { Spinner, spinnerStyle } from "../progress/Spinner";
import buttonStyle from "./buttonStyle";
import globalStyle from "@/globalStyle/globalStyle";

interface buttonProps extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  loading?: boolean;
  transparent?: boolean;
  secondary?: boolean;
  noBorder?: boolean;
  error?: boolean;
  errorText?: boolean;
}

const ButtonComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  transparent = false,
  noBorder,
  secondary,
  error,
  errorText,
  ...rest
}) => {
  const currentPos = useSharedValue(0);
  const changer = useCallback(() => {
    if (loading) {
      if (currentPos.value === 2) {
        currentPos.value = 0;
      } else {
        currentPos.value = currentPos.value + 1;
      }
    }
  }, [currentPos, loading]);
  useEffect(() => {
    const interval = setInterval(() => {
      changer();
    }, 250);

    return () => clearInterval(interval);
  }, [changer]);
  return (
    <PressableComponent
      activeOpacity={0.5}
      onPress={onPress}
      role="button"
      disabled={disabled || loading}
      accessibilityState={{
        disabled: disabled || loading,
      }}
      {...rest}
      style={[
        // globalStyle.py1p5,
        buttonStyle.buttonBr,
        globalStyle.flexrow,
      ]}
    >
      <Box
        // backgroundColor={'mainBackground'}
        style={[
          globalStyle.w10,
          buttonStyle.buttonBr,
          globalStyle.secondaryBg,
          secondary && globalStyle.borderMain,
          disabled && globalStyle.secondaryBg20,
          (loading || secondary) && globalStyle.bgTransparent,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}
      >
        {!loading && (
          <TextComponent
            style={[
              globalStyle.flexrow,
              globalStyle.textCenter,
              !transparent && globalStyle.textWhite,
              // secondary && globalStyle.textMain,
              // globalStyle.fontSize16,
              globalStyle.fontInterMedium,
            ]}
          >
            {title}
          </TextComponent>
        )}
        {loading && (
          <Box style={[spinnerStyle.smallLoad]}>
            <Spinner isPrimary={transparent} />
          </Box>
        )}
      </Box>
    </PressableComponent>
  );
};

export default ButtonComponent;
