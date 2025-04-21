import { View, Text, ImageBackground } from "react-native";
import React from "react";
import Box from "@/components/layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import flight from "@/assets/images/flight.jpg";
import { MotiView } from "moti";
import { transition } from "@/constants/utils/util";
import TextComponent from "@/components/text/TextComponent";
import ButtonComponent from "@/components/button/ButtonComponent";
import { router } from "expo-router";
import AppIcon from "@/assets/svgs/AppIcon3.svg";

const Onboarding = () => {
  return (
    <ImageBackground
      source={flight}
      style={[
        globalStyle.flexOne,
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
        globalStyle.mainBg,
      ]}
    >
      <Box
        style={[
          globalStyle.justifyBetween,
          globalStyle.pt4,
          globalStyle.flexOne,
        ]}
      >
        <Box
          style={[
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.mt1p6,
          ]}
        >
          <AppIcon width={80} height={80} />
        </Box>
        <MotiView
          transition={transition}
          // delay={100}
          from={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={[
            globalStyle.modalBr24,
            globalStyle.textInputBg,
            globalStyle.p2,
            globalStyle.w10,
            globalStyle.pb3,
          ]}
        >
          <Box>
            <TextComponent
              style={[
                globalStyle.fontGroteskBook25,
                globalStyle.fontWeight500,
                globalStyle.fontSize18,
                globalStyle.lineHeight26,
                globalStyle.letterSpacing03,
              ]}
            >
              Book Flights Seamlessly
            </TextComponent>

            <TextComponent
              style={[
                globalStyle.textPrimaryGrey400,
                globalStyle.lineHeight20,
                globalStyle.pt0p4,
              ]}
            >
              Flightly provides easy access to your flight bookings .
            </TextComponent>
          </Box>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.pt4,
            ]}
          >
            <Box style={[globalStyle.w5, globalStyle.pr0p8]}>
              <ButtonComponent
                title="Login"
                onPress={() => {
                  router.push("/loginscreen");
                }}
                secondary
              />
            </Box>
            <Box style={[globalStyle.w5, globalStyle.pl0p8]}>
              <ButtonComponent
                title="Sign Up"
                onPress={() => {
                  router.push("/getstarted");
                }}
              />
            </Box>
          </Box>
        </MotiView>
      </Box>
    </ImageBackground>
  );
};

export default Onboarding;
