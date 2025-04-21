import { TextInput, TextInputProps } from "react-native";
import React, { FC, useEffect, useState } from "react";
import TextComponent from "../text/TextComponent";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MotiView } from "moti";
import { transition } from "../../constants/utils/util";
import Box from "../layout/Box";
import { Spinner, spinnerStyle } from "../progress/Spinner";
import ItemTitle from "../utils/ItemTitle";
import ItemError from "../utils/ItemError";
import inputStyles from "./inputStyles";
import buttonStyle from "../button/buttonStyle";
import EllipseLoader from "../progress/EllipseLoader";
import pallete from "@/constants/colors/pallete";
import globalStyle from "@/globalStyle/globalStyle";

interface textInputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
  multilineSmall?: boolean;
  loading?: boolean;
  showNaira?: boolean;
  isEllipse?: boolean;
  required?: boolean;
}

const TextInputComponent: FC<textInputProps> = ({
  value,
  onChangeText,
  errorText,
  title,
  multiline,
  whiteBg = true,
  editable = true,
  onFocus,
  onBlur,
  isEllipse,
  multilineSmall,
  loading,
  showNaira,
  required,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
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
    };
  });

  return (
    <Animated.View
      style={[
        globalStyle.w10,
        animatedStyle,
        //  globalStyle.bgPasteOrange500
      ]}
    >
      {title && <ItemTitle required={required} title={title} />}
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
          style={[
            globalStyle.textWhite,
            globalStyle.flexOne,
            !multiline && globalStyle.textInputHeight,
            !showNaira && globalStyle.pl1,
            showNaira && globalStyle.pl0p2,
            globalStyle.pr1,
            globalStyle.fontInterRegular,
            globalStyle.fontSize14,
            buttonStyle.buttonBr,
            multiline && globalStyle.MultiTextInputHeight,
            multiline && globalStyle.pt1,
            multiline && globalStyle.textAlignVertical,
            multilineSmall && globalStyle.MultiSmallTextInputHeight,
          ]}
          placeholderTextColor={pallete.primaryGrey400}
          onFocus={(e) => {
            onFocus && onFocus(e);
            // setFocus(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            // setFocus(false);
          }}
          multiline={multiline}
          editable={editable}
          autoCorrect={false}
          {...rest}
        />
        {!!loading && (
          <Box style={[globalStyle.absolute, { zIndex: 4, right: 8 }]}>
            <Box
              style={[
                spinnerStyle.small,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
              ]}
            >
              {isEllipse ? <EllipseLoader /> : <Spinner isPrimary />}
            </Box>
          </Box>
        )}
      </MotiView>
      {/* </Box> */}

      {errorText && <ItemError errorText={errorText} />}
    </Animated.View>
  );
};

export default TextInputComponent;
