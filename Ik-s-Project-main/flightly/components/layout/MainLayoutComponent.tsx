import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import Box from './Box';
import {isIos} from '~/constants/utils/util';
import globalStyle from '~/globalStyle/globalStyle';
import pallete from '~/constants/colors/pallete';

interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  grayBg?: boolean;
  transparent?: boolean;
  showScroll?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}
const MainLayoutComponent: FC<MainLayoutProps> = ({
  children,
  grayBg = false,
  transparent,
  isRefreshing,
  onRefresh,
  showScroll = true,
}) => {
  return (
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={isIos ? 'padding' : 'height'}>
      <StatusBar
        backgroundColor={pallete.lightMode.white}
        barStyle={'dark-content'}
      />
      <Box
        style={[
          globalStyle.mainBg,
          grayBg && globalStyle.bgMainGray,
          transparent && globalStyle.bgTransparent,
          globalStyle.flexOne,
        ]}>
        {showScroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={!!onRefresh}
            style={[globalStyle.flexOne]}
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={!!isRefreshing}
                  progressBackgroundColor={pallete.lightMode.white}
                  onRefresh={onRefresh}
                  tintColor={pallete.lightMode.black}
                />
              ) : undefined
            }>
            <>{children}</>
          </ScrollView>
        ) : (
          children
        )}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default MainLayoutComponent;
