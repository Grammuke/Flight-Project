import React, {FC, ReactNode} from 'react';
import {
  ImageBackground,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from './Box';
import {StatusBar} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import dottedBg from '~/assets/images/dottedBg.png';
import globalStyle from '~/globalStyle/globalStyle';
interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
  lightBar?: boolean;
  hideTouchable?: boolean;
  transparent?: boolean;
  showBg?: boolean;
}
const MainLayoutWithoutScrollComponent: FC<MainLayoutProps> = ({
  children,
  grayBg,
  lightBar,
  hideTouchable,
  transparent,
  showBg,
}) => {
  return (
    // <KeyboardGestureArea interpolator="ios" enableSwipeToDismiss>
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle={lightBar ? 'light-content' : 'dark-content'} />

      <Box
        style={[
          globalStyle.mainBg,
          grayBg && globalStyle.bgMainGray,
          transparent && globalStyle.bgTransparent,
          globalStyle.flexOne,
        ]}>
        <ImageBackground
          source={showBg ? dottedBg : undefined}
          style={[globalStyle.w10, globalStyle.h10]}>
          {hideTouchable ? (
            <>{children}</>
          ) : (
            <TouchableWithoutFeedback
              accessible={false}
              onPress={Keyboard.dismiss}
              style={[globalStyle.flexOne]}>
              {children}
            </TouchableWithoutFeedback>
          )}
        </ImageBackground>
      </Box>
    </KeyboardAvoidingView>
    // </KeyboardGestureArea>
  );
};

export default MainLayoutWithoutScrollComponent;
