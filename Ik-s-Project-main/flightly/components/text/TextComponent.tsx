import { StyleProp, Text, TextStyle } from "react-native";
import React, { FC } from "react";
import globalStyle from "@/globalStyle/globalStyle";
interface textProps {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  lineThrough?: boolean;
  children: any;
}
const TextComponent: FC<textProps> = ({
  numberOfLines,
  style,
  children,
  onPress,
  lineThrough,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      allowFontScaling={false}
      style={[
        globalStyle.fontInterRegular,
        globalStyle.fontSize14,
        globalStyle.textWhite,
        lineThrough && globalStyle.lineThrough,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
