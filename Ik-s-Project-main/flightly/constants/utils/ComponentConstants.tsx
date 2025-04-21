import React from "react";
import { Linking } from "react-native";
import {
  containsEightVal,
  containsLowercase,
  containsOneVal,
  containsSpecial,
  containsUppercase,
} from "./util";
import CheckGreen from "@/assets/svgs/checkGreen.svg";
import CheckAsh from "@/assets/svgs/checkAsh.svg";

export const dotEmail = "banking-assist@dot.ai";
// export const dotEmail = 'support@dot.ai';
// export const dotWhatsapp = '+2349162490617';
export const dotWhatsapp = "https://wa.link/jg1lbt";
export const dotPhone = "+2349162490617";
const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.app.dothmo";
const appStoreLink =
  "https://apps.apple.com/us/app/dot-hmo-mobile/id1636647619";
export const openPlayStore = () => {
  Linking.openURL(playStoreLink);
};
export const openAppStore = () => {
  Linking.openURL(appStoreLink);
};
export const openPhone = () => {
  Linking.openURL(`tel:${dotPhone}`);
};
export const openEmail = () => {
  Linking.openURL(`mailto:${dotEmail}`);
};
export const openWhatsapp = () => {
  // Linking.openURL(`https://wa.me/${dotWhatsapp}`);
  Linking.openURL(dotWhatsapp);
};
const reviewList = [
  `Documentation review`,
  `Investigation`,
  `Vetting and payment process`,
];

export const useTickLists = (watchpassword: string) => {
  const tickLists = [
    {
      icon: containsUppercase(watchpassword) ? <CheckGreen /> : <CheckAsh />,
      text: "One capital letter",
    },
    {
      icon: containsLowercase(watchpassword) ? <CheckGreen /> : <CheckAsh />,
      text: "One small letter",
    },
    {
      icon: containsOneVal(watchpassword) ? <CheckGreen /> : <CheckAsh />,
      text: "At least 1 digit",
    },
    {
      icon: containsSpecial(watchpassword) ? <CheckGreen /> : <CheckAsh />,
      text: "At least 1 symbol (@,&,$..)",
    },
    {
      icon: containsEightVal(watchpassword) ? <CheckGreen /> : <CheckAsh />,

      text: "At least 8 characters long",
    },
  ];
  const isDisabled = () => {
    return (
      !containsUppercase(watchpassword) ||
      !containsLowercase(watchpassword) ||
      !containsOneVal(watchpassword) ||
      !containsSpecial(watchpassword) ||
      !containsEightVal(watchpassword)
    );
  };

  return {
    tickLists,
    isDisabled,
  };
};
