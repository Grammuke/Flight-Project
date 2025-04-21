import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import globalStyle from "@/globalStyle/globalStyle";
import Box from "@/components/layout/Box";
import ToastComponent from "@/components/toast/ToastComponent";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    "SharpGrotesk-Medium20": require("@/assets/fonts/SharpGrotesk-Medium20.otf"),
    "SharpGrotesk-Book20": require("@/assets/fonts/SharpGrotesk-Book20.otf"),
    "SharpGrotesk-Medium25": require("@/assets/fonts/SharpGrotesk-Medium25.otf"),
    "SharpGrotesk-SemiBold25": require("@/assets/fonts/SharpGrotesk-SemiBold25.otf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (loaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, fontError]);
  const queryClient = new QueryClient();
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);
  if (!loaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <Box style={[globalStyle.flexOne]}>
              <MainNavigation />
              <ToastComponent />
            </Box>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

const MainNavigation = () => {
  return (
    // <Redirect href={'/loginscreen'} />
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(maingroup)" />
    </Stack>
  );
};
