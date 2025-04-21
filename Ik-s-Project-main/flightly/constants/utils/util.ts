import { MotiTransitionProp } from "moti";
import { Platform } from "react-native";
import { Easing } from "react-native-reanimated";
export * as ChangeCase from "change-case";
export const isIos = Platform.OS === "ios";

export const cleanedText = (text: string) => text.replace(/[^0-9]/g, "");
export const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

export const containsUppercase = (val: string) => {
  return /[A-Z]/.test(val);
};
export const containsLowercase = (val: string) => {
  return /[a-z]/.test(val);
};
export const containsSpecial = (val: string) => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val);
};
export const containsOneVal = (val: string) => {
  // return val.length > 0;
  return /\d/.test(val);
};
export const containsEightVal = (val: string) => {
  return val.length > 7;
};
export type registerValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type bookingValues = {
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  from: string;
  to: string;
  email: string;
};
