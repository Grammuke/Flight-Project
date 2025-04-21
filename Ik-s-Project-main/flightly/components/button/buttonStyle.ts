import pallete from "@/constants/colors/pallete";
import { ScaledSheet } from "react-native-size-matters";

const buttonStyle = ScaledSheet.create({
  buttonBr: {
    borderRadius: "12@s",
    height: "46@s",
  },
  dot: {
    width: "8@s",
    height: "8@s",
    borderRadius: "8@s",
    backgroundColor: pallete.passCodeGray,
    marginRight: "8@s",
  },
});

export default buttonStyle;
