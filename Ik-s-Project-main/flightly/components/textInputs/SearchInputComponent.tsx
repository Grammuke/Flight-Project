import { TextInput, TextInputProps } from "react-native";
import React, { FC, useState } from "react";
import { MotiView } from "moti";
import Box from "../layout/Box";
import SearchIcon from "@/assets/svgs/SearchIcon.svg";
import IonIcons from "@expo/vector-icons/Ionicons";
import PressableComponent from "../pressable/PressableComponent";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import ItemTitle from "../utils/ItemTitle";
import ItemError from "../utils/ItemError";
import buttonStyle from "../button/buttonStyle";
import inputStyles from "./inputStyles";
import globalStyle from "@/globalStyle/globalStyle";
import pallete from "@/constants/colors/pallete";
export interface InputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  setVal?: React.Dispatch<React.SetStateAction<string>>;
  whiteBg?: boolean;
  grayBg?: boolean;
  required?: boolean;
}
const SearchInputComponent: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorText,
  title,
  setVal,
  whiteBg = true,
  grayBg,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const changeFocus = () => {
    setFocus(true);
  };
  const blur = () => {
    setFocus(false);
  };
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
    <Box>
      {title && <ItemTitle title={title} />}
      <MotiView
        style={[
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          buttonStyle.buttonBr,
          !whiteBg && globalStyle.borderInput,
        ]}
      >
        <Box
          style={[
            inputStyles.searchView,
            globalStyle.h10,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
          ]}
        >
          <SearchIcon />
        </Box>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          style={[
            globalStyle.textBlack,
            globalStyle.w10,
            globalStyle.h10,
            globalStyle.textInputHeight,
            globalStyle.px1,
            globalStyle.fontInterRegular,
            globalStyle.pl4,
            !!value && globalStyle.pr4,
            globalStyle.fontSize14,

            buttonStyle.buttonBr,
          ]}
          placeholder={placeholder}
          onFocus={changeFocus}
          onBlur={blur}
          placeholderTextColor={pallete.primaryGrey400}
          {...rest}
        />
        {value && value.length > 0 && (
          <Box style={[inputStyles.iconView, globalStyle.h10]}>
            <PressableComponent
              onPress={() => setVal && setVal("")}
              style={[
                globalStyle.w10,
                globalStyle.h10,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
              ]}
            >
              <IonIcons size={24} name="close-sharp" color={pallete.black} />
            </PressableComponent>
          </Box>
        )}
      </MotiView>

      {errorText && <ItemError errorText={errorText} />}
    </Box>
  );
};

export default SearchInputComponent;
