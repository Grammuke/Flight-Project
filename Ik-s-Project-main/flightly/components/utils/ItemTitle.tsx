import React, { FC } from "react";
import { InputProps } from "../textInputs/SearchInputComponent";
import TextComponent from "../text/TextComponent";
import Box from "../layout/Box";
import globalStyle from "@/globalStyle/globalStyle";

const ItemTitle: FC<Pick<InputProps, "title" | "required">> = ({
  title,
  required,
}) => {
  return (
    <Box
      style={[
        globalStyle.flexrow,
        globalStyle.mb0p8,
        globalStyle.alignItemsCenter,
      ]}
    >
      <TextComponent
        style={[
          globalStyle.fontSize12,
          globalStyle.fontInterLight,
          globalStyle.textPrimaryGrey300,
        ]}
      >
        {title}
      </TextComponent>
      {required && (
        <TextComponent
          style={[
            globalStyle.fontSize12,
            globalStyle.fontInterLight,
            globalStyle.errorText,
          ]}
        >
          &nbsp;*
        </TextComponent>
      )}
    </Box>
  );
};

export default ItemTitle;
