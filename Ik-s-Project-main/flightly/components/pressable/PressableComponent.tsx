import {Pressable, PressableProps} from 'react-native';
import React, {FC, ReactNode} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface pressProps extends PressableProps {
  children: ReactNode;
  scaleVal?: number;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableComponent: FC<pressProps> = ({children, scaleVal, ...rest}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
      transform: [
        {
          scale: withTiming(scale.value),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <AnimatedPressable
        onPressIn={() => {
          scale.value = scaleVal ?? 0.97;
          opacity.value = 0.75;
        }}
        onPressOut={() => {
          scale.value = 1;
          opacity.value = 1;
        }}
        hitSlop={10}
        style={[]}
        {...rest}>
        {children}
      </AnimatedPressable>
    </Animated.View>
  );
};

export default PressableComponent;
