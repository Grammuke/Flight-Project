import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect} from 'react';
import globalStyle, {height} from '../../globalStyle/globalStyle';
import Animated, {
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import BlurComponent from './BlurComponent';
import {isIos} from '../../constants/utils/util';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {spring_config} from '../bottomSheet/BottomSheetComponent';
import {View} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

interface slideProps {
  //   shown: boolean;
  children: ReactNode;
  zIndex?: number;
  showBlur?: boolean;
  avoidKeyboard?: boolean;
  setShowBlur?: Dispatch<SetStateAction<boolean>>;
}

const SlideUpComponent: FC<slideProps> = ({
  children,
  setShowBlur,
  zIndex,
  showBlur,
  avoidKeyboard,
}) => {
  const viewRef = useAnimatedRef<View>();
  const transY = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(transY.value, spring_config),
    };
  });
  useEffect(() => {
    if (showBlur) {
      transY.value = 0;
    }
  }, [showBlur, transY]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx: {startTop: number}) {
      ctx.startTop = transY.value;
    },
    onActive(event, ctx) {
      if (event.translationY > 0) {
        transY.value = ctx.startTop + event.translationY;
      }
    },
    onEnd() {
      if (transY.value < 200) {
        transY.value = 0;
      } else {
        // reset transY
        transY.value = height;
        if (setShowBlur) {
          runOnJS(setShowBlur)(false);
        }
      }
    },
  });
  return (
    <>
      {showBlur && isIos && <BlurComponent />}
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[
          globalStyle.width,
          globalStyle.height,
          globalStyle.bgWhite,
          globalStyle.absolute,
          // globalStyle.px2p4,
          globalStyle.justifyEnd,
          // globalStyle.pb3,
          {
            zIndex: zIndex ?? 40,
            backgroundColor: '#272D3433',
          },
        ]}>
        <PanGestureHandler
          onGestureEvent={setShowBlur ? gestureHandler : undefined}>
          {avoidKeyboard ? (
            <KeyboardAvoidingView behavior={'padding'}>
              <Animated.View style={[aStyle]} ref={viewRef as any}>
                {children}
              </Animated.View>
            </KeyboardAvoidingView>
          ) : (
            <Animated.View style={[aStyle]} ref={viewRef as any}>
              {children}
            </Animated.View>
          )}
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default SlideUpComponent;
