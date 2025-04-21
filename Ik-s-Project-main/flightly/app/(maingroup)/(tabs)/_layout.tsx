import React, { FC } from "react";
import { Tabs } from "expo-router";
import HomeActive from "@/assets/svgs/HomeActive.svg";
import HomeInactive from "@/assets/svgs/HomeInactive.svg";
import MoreActive from "@/assets/svgs/MoreActive.svg";
import MoreInactive from "@/assets/svgs/MoreInactive.svg";
import TextComponent from "@/components/text/TextComponent";
import { ScaledSheet } from "react-native-size-matters";
import globalStyle from "@/globalStyle/globalStyle";
import pallete from "@/constants/colors/pallete";
interface bottomTextInterface {
  title: string;
  color: string;
}
const BottomTabText: FC<bottomTextInterface> = ({ color, title }) => {
  return (
    <TextComponent style={[globalStyle.fontSize10, { color }]}>
      {title}
    </TextComponent>
  );
};
const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [tabBarStyle.tabStyle],
          tabBarLabelStyle: [globalStyle.fontSize10, globalStyle.fontWeight500],
          tabBarActiveTintColor: pallete.white,
          tabBarInactiveTintColor: pallete.tabBarInactive,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? <HomeActive /> : <HomeInactive />;
            },
            tabBarLabel: ({ color }) => (
              <BottomTabText title="Home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? <MoreActive /> : <MoreInactive />;
            },
            tabBarLabel: ({ color }) => (
              <BottomTabText title="More" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const tabBarStyle = ScaledSheet.create({
  iconsize: {
    width: "22@s",
    height: "22@s",
  },
  tabStyle: {
    borderTopColor: pallete.textInputBg,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: pallete.textInputBg,
    // height: '84@s',
  },
  tabBarLabelStyle: {
    fontSize: "15@s",
    fontWeight: "bold",
  },
});

export default TabLayout;
