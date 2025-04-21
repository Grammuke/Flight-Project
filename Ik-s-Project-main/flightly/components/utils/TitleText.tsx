import React, { FC } from "react";
import Box from "../layout/Box";
import TextComponent from "../text/TextComponent";
import globalStyle from "@/globalStyle/globalStyle";
interface titleTextProps {
  title: string;
  desc?: string;
  bigText?: boolean;
  isCenter?: boolean;
}
const TitleText: FC<titleTextProps> = ({ title, isCenter, desc, bigText }) => {
  return (
    <Box>
      <TextComponent
        style={[
          globalStyle.fontSize20,
          globalStyle.fontGroteskMedium20,
          bigText && globalStyle.fontSize24,
          isCenter && globalStyle.textCenter,
        ]}
      >
        {title}
      </TextComponent>
      {desc && (
        <TextComponent
          style={[
            globalStyle.textPrimaryGrey200,
            globalStyle.pt0p4,
            isCenter && globalStyle.textCenter,
          ]}
        >
          {desc}
        </TextComponent>
      )}
    </Box>
  );
};

export default TitleText;
