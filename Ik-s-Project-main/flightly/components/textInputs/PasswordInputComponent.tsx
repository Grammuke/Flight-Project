import { TextInput, TextInputProps } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { MotiView } from "moti";
import Box from "../layout/Box";
import EyeOpen from "@/assets/svgs/eyeOpen.svg";
import EyeClosed from "@/assets/svgs/eyeClosed.svg";
import PressableComponent from "../pressable/PressableComponent";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { transition } from "../../constants/utils/util";
import ItemTitle from "../utils/ItemTitle";
import ItemError from "../utils/ItemError";
import buttonStyle from "../button/buttonStyle";
import inputStyles from "./inputStyles";
import globalStyle from "@/globalStyle/globalStyle";
import pallete from "@/constants/colors/pallete";
export interface InputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  showContacts?: boolean;
  whiteBg?: boolean;
  setValue?: (val: string) => void;
  loading?: boolean;
  required?: boolean;
}
const PasswordInputComponent: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorText,
  title,
  whiteBg = true,
  onBlur,
  required,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const changeFocus = () => {
    setFocus(true);
  };
  const blur = (e: any) => {
    setFocus(false);
    onBlur && onBlur(e);
  };
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let iconView = null;
  if (showPassword) {
    iconView = <EyeOpen />;
  } else {
    iconView = <EyeClosed />;
  }
  const animationValue = useSharedValue(0);

  useEffect(() => {
    if (errorText && errorText?.length > 0) {
      animationValue.value = withTiming(1);
    } else {
      animationValue.value = withTiming(0);
    }
  }, [errorText, animationValue]);
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [0, 0.2, 0.4, 0.8, 1],
      [0, -4, 0, 4, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderBottomLeftRadius: withTiming(focus ? 0 : 12, { duration: 400 }),
      borderBottomRightRadius: withTiming(focus ? 0 : 12, { duration: 400 }),
      borderBottomWidth: withTiming(focus ? 2 : 1, { duration: 400 }),
      borderBottomColor: withTiming(
        focus ? pallete.secondary : pallete.primaryGrey200,
        { duration: 400 }
      ),
      // borderWidth: '1@s',
      // borderColor: pallete.primaryGrey200,
    };
  });
  return (
    <Animated.View style={[globalStyle.w10, animatedStyle]}>
      {title && <ItemTitle title={title} required={required} />}
      <MotiView
        transition={transition}
        style={[
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.flexrow,
          globalStyle.borderRadius12,
          globalStyle.textInputBg,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          // selectionColor={primaryPlain}
          style={[
            globalStyle.textWhite,
            globalStyle.w10,
            globalStyle.h10,
            globalStyle.textInputHeight,
            globalStyle.px1,
            globalStyle.fontInterRegular,
            globalStyle.pr4,
            globalStyle.fontSize14,

            buttonStyle.buttonBr,
          ]}
          placeholder={placeholder}
          onFocus={changeFocus}
          onBlur={blur}
          placeholderTextColor={pallete.primaryGrey400}
          secureTextEntry={visible}
          textContentType={!showPassword ? "name" : "password"}
          {...rest}
        />
        <Box style={[inputStyles.iconView]}>
          <PressableComponent
            onPress={toggleShowPassword}
            style={[
              globalStyle.h10,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}
          >
            <Box>{iconView}</Box>
          </PressableComponent>
        </Box>
      </MotiView>

      {errorText && <ItemError errorText={errorText} />}
    </Animated.View>
  );
};

export default PasswordInputComponent;
