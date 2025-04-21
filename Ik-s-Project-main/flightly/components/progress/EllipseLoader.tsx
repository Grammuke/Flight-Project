import React, { FC, useEffect } from "react";
import Box from "../layout/Box";
import { ScaledSheet } from "react-native-size-matters";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import globalStyle from "@/globalStyle/globalStyle";
import pallete from "@/constants/colors/pallete";

const EllipseLoader = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress.value === 2) {
        progress.value = 0;
      } else {
        progress.value++;
      }
    }, 400);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <Box
      style={[
        globalStyle.flexrow,
        globalStyle.alignItemsCenter,
        globalStyle.justifyCenter,
        globalStyle.gap2,
      ]}
    >
      {new Array(3).fill("a").map((_, idx) => (
        <ButtonDot key={idx.toString()} index={idx} currentIndex={progress} />
      ))}
    </Box>
  );
};

export interface dotInterface {
  index: number;
  currentIndex: SharedValue<number>;
}
const ButtonDot: FC<dotInterface> = ({ currentIndex, index }) => {
  const dotStyle = useAnimatedStyle(() => {
    const isActive = currentIndex.value === index;
    return {
      backgroundColor: withTiming(
        isActive ? pallete.black : pallete.primaryGrey400
      ),
      width: withTiming(isActive ? 5 : 4),
      height: withTiming(isActive ? 5 : 4),
      opacity: withTiming(isActive ? 1 : 0.7),
    };
  });
  return <Animated.View style={[ellipseStyle.btn, dotStyle]} />;
};

const ellipseStyle = ScaledSheet.create({
  btn: {
    width: "3@s",
    height: "3@s",
    borderRadius: "3@s",
  },
});

export default EllipseLoader;
