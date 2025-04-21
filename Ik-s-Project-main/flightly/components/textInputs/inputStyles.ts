import pallete from "@/constants/colors/pallete";
import { ScaledSheet } from "react-native-size-matters";
const inputStyles = ScaledSheet.create({
  iconView: {
    position: "absolute",
    right: 0,
    width: "38@s",
  },
  searchView: {
    position: "absolute",
    left: 0,
    width: "38@s",
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: pallete.primaryGrey200,
  },
  br8: {
    borderRadius: "12@s",
  },
  br16: {
    borderRadius: "16@s",
  },
  focusedStyle: {
    borderBottomWidth: "2@s",
    borderBottomColor: pallete.secondary,
    borderBottomLeftRadius: "0@s",
    borderBottomRightRadius: "0@s",
  },
  errorStyle: {
    borderBottomWidth: "2@s",
    borderBottomColor: pallete.error500,
    borderBottomLeftRadius: "0@s",
    borderBottomRightRadius: "0@s",
  },
  pinInput: {
    flexDirection: "row",
    marginTop: "20@s",
    paddingHorizontal: "17@s",
    borderRadius: 50,
  },
  pin: {
    width: "42@s",
    height: "42@s",
    marginHorizontal: "5@s",
  },
  borderRed: {
    borderColor: pallete.error,
  },
  inputHeight: {
    height: "46@s",
  },
});

export default inputStyles;
